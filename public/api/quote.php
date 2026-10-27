<?php
/**
 * Quote form endpoint for Arvex Designs.
 *
 * Accepts POSTs from the website's forms (formType = full-quote | quick-quote | sample-request | newsletter),
 * validates and sanitizes them, stores uploaded plans in a private folder, emails the team a
 * summary with signed download links, and sends the visitor a confirmation.
 * Always answers with JSON: { ok, message?, reference?, errors? }.
 *
 * Settings live in config.php (copy config.example.php). Requires PHP 7.4+.
 */

declare(strict_types=1);

define('SYNTAX_API', true);

require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/emails.php';
require __DIR__ . '/lib/PHPMailer/Exception.php';
require __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require __DIR__ . '/lib/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

// ---------------------------------------------------------------------------
// Request checks
// ---------------------------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    json_response(405, ['ok' => false, 'message' => 'Method not allowed.']);
}

$config = load_config();
$uploadDir = (string) $config['upload_dir'];

// Only accept submissions from our own site
$origin = isset($_SERVER['HTTP_ORIGIN']) ? (string) $_SERVER['HTTP_ORIGIN'] : '';
if ($origin !== '' && !empty($config['allowed_origins']) && !in_array($origin, $config['allowed_origins'], true)) {
    json_response(403, ['ok' => false, 'message' => 'This form can only be submitted from our website.']);
}

// When the request is bigger than post_max_size, PHP silently drops $_POST and $_FILES
$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
$postMax = ini_bytes((string) ini_get('post_max_size'));
if ($postMax > 0 && $contentLength > $postMax && empty($_POST)) {
    json_response(413, [
        'ok'      => false,
        'message' => 'Your files are larger than our server accepts in one upload. Please share a Dropbox or Google Drive link instead.',
    ]);
}

// Spam: honeypot field filled in, or submitted faster than a person could. Pretend it worked.
$fakeSuccess = ['ok' => true, 'reference' => 'SYN-' . date('ymd') . '-' . strtoupper(bin2hex(random_bytes(3)))];
if (trim(post('website')) !== '') {
    json_response(200, $fakeSuccess);
}
// "elapsed" is how long the form was open, in milliseconds, measured by the visitor's browser
$elapsed = post('elapsed');
if ($elapsed !== '' && ctype_digit($elapsed) && (int) $elapsed < (int) $config['min_seconds_to_submit'] * 1000) {
    json_response(200, $fakeSuccess);
}

// Spam: too many submissions from one address
$rateKey = hash_hmac('sha256', client_ip(), (string) $config['download_secret']);
if (!rate_limit_ok($uploadDir . '/.ratelimit', $rateKey, (int) $config['rate_limit']['max'], (int) $config['rate_limit']['window_seconds'])) {
    json_response(429, [
        'ok'      => false,
        'message' => 'We have received several requests from your connection. Please wait a little while, or email or call us instead.',
    ]);
}

// ---------------------------------------------------------------------------
// Read and validate fields
// ---------------------------------------------------------------------------

$formType = post('formType');
if (!in_array($formType, ['full-quote', 'quick-quote', 'sample-request', 'newsletter'], true)) {
    json_response(400, ['ok' => false, 'message' => 'Unknown form.']);
}

$state = strtoupper(clean_text(post('state'), 2));
$s = [
    'formType'         => $formType,
    'context'          => clean_text(post('context'), 120),
    'name'             => clean_text(post('name'), 100),
    'company'          => clean_text(post('company'), 120),
    'email'            => strtolower(clean_text(post('email'), 254)),
    'phone'            => clean_text(post('phone'), 30),
    'role'             => clean_text(post('role'), 60),
    'projectName'      => clean_text(post('projectName'), 150),
    'projectType'      => clean_text(post('projectType'), 80),
    'city'             => clean_text(post('city'), 80),
    'state'            => in_array($state, US_STATES, true) ? $state : '',
    'services'         => clean_list($_POST['services'] ?? [], 10),
    'trades'           => clean_list($_POST['trades'] ?? [], 20),
    'turnaround'       => in_array(post('turnaround'), ['Standard', 'Rush'], true) ? post('turnaround') : '',
    'bidDate'          => preg_match('/^\d{4}-\d{2}-\d{2}$/', post('bidDate')) ? post('bidDate') : '',
    'size'             => clean_text(post('size'), 80),
    'planLink'         => clean_text(post('planLink'), 500),
    'notes'            => clean_multiline(post('notes'), 4000),
    'smsTransactional' => post('smsTransactional') === 'yes',
    'smsMarketing'     => post('smsMarketing') === 'yes',
];

$errors = [];
if (!valid_email($s['email'])) {
    $errors['email'] = 'Enter a valid email address.';
}
// Sample requests and newsletter sign-ups only need an email address
$emailOnly = in_array($formType, ['sample-request', 'newsletter'], true);
if (!$emailOnly) {
    if ($s['name'] === '') {
        $errors['name'] = 'Enter your name.';
    }
    if (!valid_phone($s['phone'])) {
        $errors['phone'] = 'Enter a phone number with area code.';
    }
    if ($s['role'] === '') {
        $errors['role'] = 'Choose the option that describes you.';
    }
}
if ($s['planLink'] !== '' && !valid_url($s['planLink'])) {
    $errors['planLink'] = 'Paste the full link, starting with https://';
}
if ($formType === 'full-quote') {
    if ($s['projectType'] === '') {
        $errors['projectType'] = 'Choose a project type.';
    }
    if ($s['city'] === '') {
        $errors['city'] = 'Enter the project city.';
    }
    if ($s['state'] === '') {
        $errors['state'] = 'Choose the project state.';
    }
    if (!$s['services']) {
        $errors['services'] = 'Choose at least one service.';
    }
}

// ---------------------------------------------------------------------------
// Validate uploaded files
// ---------------------------------------------------------------------------

$uploads = [];
if (!$emailOnly && isset($_FILES['files']) && is_array($_FILES['files']['name'] ?? null)) {
    $f = $_FILES['files'];
    $count = count($f['name']);
    $total = 0;
    $finfo = function_exists('finfo_open') ? finfo_open(FILEINFO_MIME_TYPE) : false;

    for ($i = 0; $i < $count; $i++) {
        $error = (int) $f['error'][$i];
        if ($error === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        $original = clean_text((string) $f['name'][$i], 180);
        if ($error === UPLOAD_ERR_INI_SIZE || $error === UPLOAD_ERR_FORM_SIZE) {
            $errors['files'] = sprintf('%s is larger than our server accepts. Please share a link instead.', $original);
            break;
        }
        if ($error !== UPLOAD_ERR_OK || !is_uploaded_file((string) $f['tmp_name'][$i])) {
            $errors['files'] = sprintf('%s did not upload completely. Please try again.', $original);
            break;
        }
        $ext = strtolower(pathinfo($original, PATHINFO_EXTENSION));
        if (!in_array($ext, $config['allowed_extensions'], true)) {
            $errors['files'] = sprintf('%s is not a supported file type. Use PDF, DWG, DXF, ZIP or images.', $original);
            break;
        }
        if ($finfo) {
            $mime = (string) finfo_file($finfo, (string) $f['tmp_name'][$i]);
            if (!in_array($mime, MIME_MAP[$ext] ?? [], true)) {
                $errors['files'] = sprintf('%s does not look like a valid .%s file.', $original, $ext);
                break;
            }
        }
        $size = (int) $f['size'][$i];
        $total += $size;
        $uploads[] = ['tmp' => (string) $f['tmp_name'][$i], 'name' => $original, 'ext' => $ext, 'size' => $size];
    }
    if ($finfo) {
        finfo_close($finfo);
    }
    if (!isset($errors['files'])) {
        if (count($uploads) > (int) $config['max_files']) {
            $errors['files'] = sprintf('Please upload %d files or fewer, or zip them together.', (int) $config['max_files']);
        } elseif ($total > (int) $config['max_total_bytes']) {
            $errors['files'] = sprintf('Your files total %s. The limit is %s; please share a link for larger sets.', format_bytes($total), format_bytes((int) $config['max_total_bytes']));
        }
    }
}

if ($formType === 'full-quote' && !$uploads && $s['planLink'] === '' && mb_strlen($s['notes']) < 20 && !isset($errors['files'])) {
    $errors['files'] = 'Upload your plans, paste a link, or describe the project in the notes.';
}

if ($errors) {
    json_response(422, ['ok' => false, 'message' => 'Please check the highlighted fields.', 'errors' => $errors]);
}

// ---------------------------------------------------------------------------
// Store the submission
// ---------------------------------------------------------------------------

$s['reference'] = 'SYN-' . date('ymd') . '-' . strtoupper(bin2hex(random_bytes(3)));
$s['receivedAt'] = date('Y-m-d H:i:s T');
$s['ip'] = client_ip();
$s['userAgent'] = clean_text((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 300);

$dir = submission_dir($uploadDir, $s['reference']);
if (!ensure_private_dir($uploadDir) || (!is_dir($dir) && !mkdir($dir, 0750, true))) {
    log_error($uploadDir, 'Could not create ' . $dir);
    json_response(500, ['ok' => false, 'message' => 'We could not save your request. Please email or call us instead.']);
}

$storedFiles = [];
$expires = time() + (int) $config['download_ttl_days'] * 86400;
$baseUrl = rtrim((string) $config['base_url'], '/');
foreach ($uploads as $u) {
    $stored = bin2hex(random_bytes(16)) . '.' . $u['ext'];
    if (!move_uploaded_file($u['tmp'], $dir . '/' . $stored)) {
        log_error($uploadDir, 'move_uploaded_file failed for ' . $s['reference'] . ' / ' . $u['name']);
        json_response(500, ['ok' => false, 'message' => 'We could not save your files. Please try again or share a link instead.']);
    }
    @chmod($dir . '/' . $stored, 0640);
    $sig = sign_download((string) $config['download_secret'], $s['reference'], $stored, $expires);
    $storedFiles[] = [
        'name'   => $u['name'],
        'stored' => $stored,
        'size'   => $u['size'],
        'url'    => $baseUrl . '/api/download.php?' . http_build_query(['ref' => $s['reference'], 'f' => $stored, 'exp' => $expires, 'sig' => $sig]),
    ];
}

// Keep a record on disk, including SMS consent evidence, even if email delivery fails
$record = $s;
$record['files'] = array_map(function ($file) {
    return ['name' => $file['name'], 'stored' => $file['stored'], 'size' => $file['size']];
}, $storedFiles);
$record['smsConsent'] = [
    'version'       => SMS_CONSENT_VERSION,
    'transactional' => $s['smsTransactional'] ? SMS_CONSENT_TEXT['transactional'] : null,
    'marketing'     => $s['smsMarketing'] ? SMS_CONSENT_TEXT['marketing'] : null,
];
@file_put_contents($dir . '/submission.json', (string) json_encode($record, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

// ---------------------------------------------------------------------------
// Send email
// ---------------------------------------------------------------------------

/** Creates a PHPMailer instance using the SMTP settings from config.php. */
function make_mailer(array $config): PHPMailer
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = (string) $config['smtp']['host'];
    $mail->Port = (int) $config['smtp']['port'];
    $mail->SMTPAuth = true;
    $mail->Username = (string) $config['smtp']['username'];
    $mail->Password = (string) $config['smtp']['password'];
    $mail->SMTPSecure = $config['smtp']['secure'] === 'tls' ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->Timeout = 20;
    $mail->setFrom((string) $config['from_email'], (string) $config['from_name']);
    $mail->isHTML(true);
    return $mail;
}

// 1. Notify the team
try {
    [$subject, $html, $text] = notification_email($s, $storedFiles, $config);
    $mail = make_mailer($config);
    foreach ((array) $config['notify_to'] as $to) {
        $mail->addAddress((string) $to);
    }
    $mail->addReplyTo($s['email'], $s['name']);
    $mail->Subject = $subject;
    $mail->Body = $html;
    $mail->AltBody = $text;
    $mail->send();
} catch (MailException $e) {
    log_error($uploadDir, 'Notification email failed for ' . $s['reference'] . ': ' . $e->getMessage());
    json_response(500, [
        'ok'        => false,
        'reference' => $s['reference'],
        'message'   => sprintf(
            'Your request was saved (reference %s), but we could not send the confirmation email. Please call %s so we can follow up.',
            $s['reference'],
            (string) $config['company']['phone']
        ) . (!empty($config['debug']) ? ' [' . $e->getMessage() . ']' : ''),
    ]);
}

// 2. Confirm to the visitor (a failure here is logged but doesn't fail the request)
try {
    [$subject, $html, $text] = confirmation_email($s, count($storedFiles), $config);
    $mail = make_mailer($config);
    $mail->addAddress($s['email'], $s['name']);
    $mail->addReplyTo((string) $config['company']['email'], (string) $config['company']['name']);
    $mail->Subject = $subject;
    $mail->Body = $html;
    $mail->AltBody = $text;
    if ($formType === 'sample-request' && !empty($config['sample_attachment']) && is_file((string) $config['sample_attachment'])) {
        $mail->addAttachment((string) $config['sample_attachment']);
    }
    $mail->send();
} catch (MailException $e) {
    log_error($uploadDir, 'Confirmation email failed for ' . $s['reference'] . ': ' . $e->getMessage());
}

json_response(200, [
    'ok'        => true,
    'reference' => $s['reference'],
    'message'   => 'Thanks! Your request has been received.',
]);
