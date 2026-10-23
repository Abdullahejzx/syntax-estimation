<?php
/**
 * Email bodies for quote.php. Every value is escaped with h() before it goes into HTML.
 */

declare(strict_types=1);

if (!defined('SYNTAX_API')) {
    http_response_code(403);
    exit;
}

const FORM_LABELS = [
    'full-quote'     => 'Full quote request',
    'quick-quote'    => 'Quick quote request',
    'sample-request' => 'Sample estimate request',
];

/** Wraps content in a simple, email-client-safe layout. */
function email_layout(string $title, string $body, array $company): string
{
    return '<!doctype html><html><body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,Helvetica,sans-serif;color:#1a2433;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:24px 12px;"><tr><td align="center">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;">'
        . '<tr><td style="background:#0b2545;padding:18px 24px;border-radius:8px 8px 0 0;">'
        . '<span style="color:#ffffff;font-size:18px;font-weight:bold;">' . h($company['name'] ?? 'Syntax Estimation') . '</span>'
        . '<div style="height:3px;width:48px;background:#f28c28;margin-top:8px;"></div></td></tr>'
        . '<tr><td style="padding:24px;">'
        . '<h1 style="margin:0 0 16px;font-size:20px;color:#0b2545;">' . h($title) . '</h1>'
        . $body
        . '</td></tr>'
        . '<tr><td style="padding:16px 24px;border-top:1px solid #e2e8f0;font-size:12px;color:#4a5568;">'
        . h($company['name'] ?? '') . ' · ' . h($company['phone'] ?? '') . ' · ' . h($company['email'] ?? '')
        . '</td></tr></table></td></tr></table></body></html>';
}

/** Two-column table of label/value rows; empty values are skipped. */
function email_table(array $rows): string
{
    $html = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;margin:0 0 20px;">';
    foreach ($rows as $label => $value) {
        if ($value === '' || $value === null || $value === []) {
            continue;
        }
        $display = is_array($value) ? implode(', ', $value) : (string) $value;
        $html .= '<tr><td style="padding:8px 10px;border-bottom:1px solid #e2e8f0;width:38%;color:#4a5568;vertical-align:top;">' . h($label) . '</td>'
            . '<td style="padding:8px 10px;border-bottom:1px solid #e2e8f0;color:#0b2545;font-weight:bold;white-space:pre-line;">' . h($display) . '</td></tr>';
    }
    return $html . '</table>';
}

function email_heading(string $text): string
{
    return '<h2 style="margin:24px 0 8px;font-size:15px;color:#0b2545;text-transform:uppercase;letter-spacing:.04em;">' . h($text) . '</h2>';
}

/** The summary rows shared by the internal and plain-text emails. */
function submission_rows(array $s): array
{
    return [
        'Form'           => FORM_LABELS[$s['formType']] ?? $s['formType'],
        'Reference'      => $s['reference'],
        'Received'       => $s['receivedAt'],
        'Page / context' => $s['context'],
        'Name'           => $s['name'],
        'Company'        => $s['company'],
        'Email'          => $s['email'],
        'Phone'          => $s['phone'],
        'Role'           => $s['role'],
        'Project name'   => $s['projectName'],
        'Project type'   => $s['projectType'],
        'Location'       => trim($s['city'] . ($s['city'] && $s['state'] ? ', ' : '') . $s['state']),
        'Services'       => $s['services'],
        'Trades'         => $s['trades'],
        'Turnaround'     => $s['turnaround'],
        'Bid due date'   => $s['bidDate'],
        'Approx. size'   => $s['size'],
        'Plan link'      => $s['planLink'],
        'Notes'          => $s['notes'],
    ];
}

/** Email to the Syntax Estimation team: full details plus download links. */
function notification_email(array $s, array $files, array $config): array
{
    $who = $s['name'] !== '' ? $s['name'] : $s['email'];
    $subject = sprintf('New %s %s – %s%s', strtolower(FORM_LABELS[$s['formType']] ?? 'request'), $s['reference'], $who, $s['company'] !== '' ? ' (' . $s['company'] . ')' : '');

    $body = email_table(submission_rows($s));

    if ($files) {
        $body .= email_heading('Uploaded files (' . count($files) . ')');
        $body .= '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;margin:0 0 8px;">';
        foreach ($files as $f) {
            $body .= '<tr><td style="padding:6px 0;"><a href="' . h($f['url']) . '" style="color:#2f6fdb;font-weight:bold;">' . h($f['name']) . '</a>'
                . ' <span style="color:#4a5568;">(' . h(format_bytes($f['size'])) . ')</span></td></tr>';
        }
        $body .= '</table><p style="font-size:12px;color:#4a5568;margin:0 0 20px;">Download links expire in ' . (int) $config['download_ttl_days'] . ' days. Files are stored in ' . h($s['reference']) . ' in the uploads folder.</p>';
    }

    $sms = [];
    $sms['Transactional texts'] = $s['smsTransactional'] ? 'Yes (opted in)' : 'No';
    $sms['Marketing texts'] = $s['smsMarketing'] ? 'Yes (opted in)' : 'No';
    if ($s['smsTransactional'] || $s['smsMarketing']) {
        $sms['Consent recorded'] = $s['receivedAt'] . ' from IP ' . $s['ip'] . ' (wording version ' . SMS_CONSENT_VERSION . ')';
    }
    $body .= email_heading('SMS consent') . email_table($sms);

    if ($s['email'] !== '') {
        $body .= '<p style="font-size:14px;margin:0;">Reply to this email to respond to ' . h($who) . ' directly.</p>';
    }

    $text = '';
    foreach (submission_rows($s) as $label => $value) {
        if ($value !== '' && $value !== []) {
            $text .= $label . ': ' . (is_array($value) ? implode(', ', $value) : $value) . "\n";
        }
    }
    foreach ($files as $f) {
        $text .= 'File: ' . $f['name'] . ' (' . format_bytes($f['size']) . ') ' . $f['url'] . "\n";
    }
    foreach ($sms as $label => $value) {
        $text .= $label . ': ' . $value . "\n";
    }

    return [$subject, email_layout('New request ' . $s['reference'], $body, $config['company']), $text];
}

/** Short confirmation to the person who submitted the form. */
function confirmation_email(array $s, int $fileCount, array $config): array
{
    $company = $config['company'];
    $first = trim(explode(' ', $s['name'])[0] ?? '');
    $hello = '<p style="font-size:15px;margin:0 0 14px;">' . ($first !== '' ? 'Hi ' . h($first) . ',' : 'Hello,') . '</p>';

    if ($s['formType'] === 'sample-request') {
        $subject = 'Your sample estimate from ' . $company['name'];
        $intro = $config['sample_attachment']
            ? 'Thanks for your interest. Your sample estimate is attached to this email, so you can see exactly how our deliverables are organized.'
            : 'Thanks for your interest. We will email your sample estimate shortly, so you can see exactly how our deliverables are organized.';
        $body = $hello . '<p style="font-size:15px;margin:0 0 14px;">' . h($intro) . '</p>'
            . '<p style="font-size:15px;margin:0 0 14px;">When you have a project to price, upload your plans at <a href="' . h($company['website']) . '/get-a-quote/" style="color:#2f6fdb;">' . h(preg_replace('#^https?://#', '', $company['website']) ?? '') . '/get-a-quote</a> for a free, fixed quote.</p>';
        $text = strip_tags(str_replace(['</p>', '<br>'], "\n\n", $body));
        return [$subject, email_layout('Thanks for your request', $body, $company), $text];
    }

    $subject = 'We received your quote request (' . $s['reference'] . ')';
    $summary = [
        'Reference' => $s['reference'],
        'Project'   => $s['projectName'] !== '' ? $s['projectName'] : $s['projectType'],
        'Location'  => trim($s['city'] . ($s['city'] && $s['state'] ? ', ' : '') . $s['state']),
        'Services'  => $s['services'],
        'Files'     => $fileCount ? $fileCount . ' file' . ($fileCount === 1 ? '' : 's') . ' received' : '',
        'Plan link' => $s['planLink'],
    ];
    $body = $hello
        . '<p style="font-size:15px;margin:0 0 14px;">Thanks for sending your project to ' . h($company['name']) . '. An estimator will review your plans and email you a fixed quote and delivery date, usually the same business day.</p>'
        . email_table($summary)
        . '<p style="font-size:15px;margin:0 0 14px;">Bid due soon? Call us at <a href="tel:' . h(preg_replace('/[^0-9+]/', '', $company['phone']) ?? '') . '" style="color:#2f6fdb;font-weight:bold;">' . h($company['phone']) . '</a> or reply to this email.</p>'
        . '<p style="font-size:15px;margin:0;">The ' . h($company['name']) . ' team</p>';

    $text = "Thanks for sending your project to {$company['name']}. Reference: {$s['reference']}.\n"
        . "An estimator will review your plans and email you a fixed quote and delivery date, usually the same business day.\n"
        . "Bid due soon? Call {$company['phone']} or reply to this email.\n";

    return [$subject, email_layout('We received your request', $body, $company), $text];
}
