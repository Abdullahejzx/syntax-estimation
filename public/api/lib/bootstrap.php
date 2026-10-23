<?php
/**
 * Shared helpers for quote.php and download.php.
 * This folder is blocked from direct web access by lib/.htaccess.
 */

declare(strict_types=1);

if (!defined('SYNTAX_API')) {
    http_response_code(403);
    exit;
}

/** Version of the SMS consent wording shown on the website (components/forms/SmsConsent.tsx). */
const SMS_CONSENT_VERSION = '2026-10-23';
const SMS_CONSENT_TEXT = [
    'transactional' => 'Text me about this quote request and my project (scheduling, delivery and account updates) from Syntax Estimation. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.',
    'marketing'     => 'Send me occasional marketing texts (estimating tips and offers) from Syntax Estimation. Consent is not a condition of purchase. Msg & data rates may apply. Reply STOP to opt out.',
];

const US_STATES = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
    'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
    'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

/** Blocks all web access to a folder (Apache 2.2 / 2.4 and LiteSpeed). */
const DENY_ALL_HTACCESS = "Options -Indexes\n<IfModule mod_authz_core.c>\n    Require all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\n    Order allow,deny\n    Deny from all\n</IfModule>\n";

/** Accepted MIME types per extension (checked with finfo). CAD files often report as octet-stream. */
const MIME_MAP = [
    'pdf'  => ['application/pdf', 'application/x-pdf'],
    'dwg'  => ['application/acad', 'application/x-acad', 'application/dwg', 'image/vnd.dwg', 'image/x-dwg', 'application/octet-stream'],
    'dxf'  => ['image/vnd.dxf', 'application/dxf', 'text/plain', 'text/x-dxf', 'application/octet-stream'],
    'zip'  => ['application/zip', 'application/x-zip-compressed', 'multipart/x-zip', 'application/octet-stream'],
    'jpg'  => ['image/jpeg'],
    'jpeg' => ['image/jpeg'],
    'png'  => ['image/png'],
    'webp' => ['image/webp'],
    'tif'  => ['image/tiff'],
    'tiff' => ['image/tiff'],
];

function load_config(): array
{
    $file = dirname(__DIR__) . '/config.php';
    if (!is_file($file)) {
        json_response(500, ['ok' => false, 'message' => 'The form is not configured yet. Please email or call us instead.']);
    }
    $config = require $file;
    if (!is_array($config)) {
        json_response(500, ['ok' => false, 'message' => 'The form is not configured correctly.']);
    }
    return $config;
}

/** Sends a JSON response and stops. */
function json_response(int $status, array $body): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

/** Plain text from user input: no tags, no control characters, trimmed and length-limited. */
function clean_text($value, int $max = 200): string
{
    if (!is_string($value)) {
        return '';
    }
    $value = strip_tags($value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    $value = trim(preg_replace('/[ \t]+/u', ' ', $value) ?? '');
    return mb_substr($value, 0, $max, 'UTF-8');
}

/** Multi-line text (notes): same as clean_text but keeps line breaks. */
function clean_multiline($value, int $max = 4000): string
{
    if (!is_string($value)) {
        return '';
    }
    $value = str_replace(["\r\n", "\r"], "\n", strip_tags($value));
    $value = preg_replace('/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    $value = preg_replace("/\n{3,}/", "\n\n", $value) ?? '';
    return mb_substr(trim($value), 0, $max, 'UTF-8');
}

/** A list of short strings (checkbox groups), de-duplicated and capped. */
function clean_list($value, int $maxItems = 20, int $maxLen = 80): array
{
    if (!is_array($value)) {
        return [];
    }
    $out = [];
    foreach ($value as $item) {
        $item = clean_text($item, $maxLen);
        if ($item !== '' && !in_array($item, $out, true)) {
            $out[] = $item;
        }
        if (count($out) >= $maxItems) {
            break;
        }
    }
    return $out;
}

function post(string $key): string
{
    return isset($_POST[$key]) && is_string($_POST[$key]) ? $_POST[$key] : '';
}

function valid_email(string $email): bool
{
    return $email !== '' && strlen($email) <= 254 && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function valid_phone(string $phone): bool
{
    $digits = preg_replace('/\D/', '', $phone) ?? '';
    return strlen($digits) >= 10 && strlen($digits) <= 15;
}

function valid_url(string $url): bool
{
    if ($url === '' || strlen($url) > 500 || filter_var($url, FILTER_VALIDATE_URL) === false) {
        return false;
    }
    $scheme = strtolower((string) parse_url($url, PHP_URL_SCHEME));
    return in_array($scheme, ['http', 'https'], true);
}

function client_ip(): string
{
    // REMOTE_ADDR is the only value a client can't forge on shared hosting
    return isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : '0.0.0.0';
}

/** Converts php.ini sizes like "128M" to bytes. */
function ini_bytes(string $value): int
{
    $value = trim($value);
    if ($value === '') {
        return 0;
    }
    $unit = strtolower(substr($value, -1));
    $number = (int) $value;
    switch ($unit) {
        case 'g':
            return $number * 1024 * 1024 * 1024;
        case 'm':
            return $number * 1024 * 1024;
        case 'k':
            return $number * 1024;
        default:
            return (int) $value;
    }
}

/** Creates a folder that the web server will never list or serve. */
function ensure_private_dir(string $dir): bool
{
    if (!is_dir($dir) && !mkdir($dir, 0750, true) && !is_dir($dir)) {
        return false;
    }
    if (!is_file($dir . '/.htaccess')) {
        @file_put_contents($dir . '/.htaccess', DENY_ALL_HTACCESS);
    }
    if (!is_file($dir . '/index.html')) {
        @file_put_contents($dir . '/index.html', '');
    }
    return is_writable($dir);
}

/**
 * Simple file-based rate limit: at most $max hits per $window seconds per key.
 * Returns false when the limit has been reached.
 */
function rate_limit_ok(string $dir, string $key, int $max, int $window): bool
{
    if (!ensure_private_dir($dir)) {
        return true; // Don't block real visitors if the folder can't be created
    }
    $file = $dir . '/' . $key . '.json';
    $now = time();
    $fp = @fopen($file, 'c+');
    if ($fp === false) {
        return true;
    }
    flock($fp, LOCK_EX);
    $hits = json_decode((string) stream_get_contents($fp), true);
    $hits = is_array($hits) ? array_values(array_filter($hits, function ($t) use ($now, $window) {
        return is_int($t) && $t > $now - $window;
    })) : [];
    $allowed = count($hits) < $max;
    if ($allowed) {
        $hits[] = $now;
    }
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, (string) json_encode($hits));
    flock($fp, LOCK_UN);
    fclose($fp);
    return $allowed;
}

/** HMAC signature for a download link. */
function sign_download(string $secret, string $ref, string $file, int $expires): string
{
    return hash_hmac('sha256', $ref . '|' . $file . '|' . $expires, $secret);
}

/** Folder for a reference like SYN-261023-A1B2C3 → {upload_dir}/2026/10/SYN-261023-A1B2C3 */
function submission_dir(string $uploadDir, string $ref): string
{
    $yy = substr($ref, 4, 2);
    $mm = substr($ref, 6, 2);
    return rtrim($uploadDir, '/\\') . '/20' . $yy . '/' . $mm . '/' . $ref;
}

function log_error(string $uploadDir, string $message): void
{
    if (ensure_private_dir($uploadDir)) {
        @file_put_contents($uploadDir . '/errors.log', '[' . date('c') . '] ' . $message . "\n", FILE_APPEND | LOCK_EX);
    }
}

/** Human-readable file size. */
function format_bytes(int $bytes): string
{
    if ($bytes >= 1048576) {
        return round($bytes / 1048576, 1) . ' MB';
    }
    if ($bytes >= 1024) {
        return round($bytes / 1024) . ' KB';
    }
    return $bytes . ' B';
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
