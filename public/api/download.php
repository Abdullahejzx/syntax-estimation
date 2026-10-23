<?php
/**
 * Serves an uploaded plan file from the private uploads folder.
 * Links are created by quote.php and signed with download_secret, so they can't be
 * guessed or altered, and they stop working after download_ttl_days.
 */

declare(strict_types=1);

define('SYNTAX_API', true);

require __DIR__ . '/lib/bootstrap.php';

function not_found(): void
{
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'This download link is invalid or has expired.';
    exit;
}

$config = load_config();

$ref = isset($_GET['ref']) ? (string) $_GET['ref'] : '';
$file = isset($_GET['f']) ? (string) $_GET['f'] : '';
$expires = isset($_GET['exp']) ? (int) $_GET['exp'] : 0;
$sig = isset($_GET['sig']) ? (string) $_GET['sig'] : '';

// Strict formats rule out path traversal before anything touches the filesystem
if (!preg_match('/^SYN-\d{6}-[A-F0-9]{6}$/', $ref) || !preg_match('/^[a-f0-9]{32}\.[a-z0-9]{2,5}$/', $file)) {
    not_found();
}
if ($expires < time()) {
    not_found();
}
$expected = sign_download((string) $config['download_secret'], $ref, $file, $expires);
if (!hash_equals($expected, $sig)) {
    not_found();
}

$dir = submission_dir((string) $config['upload_dir'], $ref);
$path = $dir . '/' . $file;
if (!is_file($path)) {
    not_found();
}

// Use the original file name from the submission record for the download
$name = $file;
$record = json_decode((string) @file_get_contents($dir . '/submission.json'), true);
if (is_array($record) && is_array($record['files'] ?? null)) {
    foreach ($record['files'] as $entry) {
        if (($entry['stored'] ?? '') === $file && is_string($entry['name'] ?? null)) {
            $name = $entry['name'];
            break;
        }
    }
}
$asciiName = preg_replace('/[^A-Za-z0-9._ -]/', '_', $name) ?? $file;

while (ob_get_level() > 0) {
    ob_end_clean();
}
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="' . $asciiName . '"; filename*=UTF-8\'\'' . rawurlencode($name));
header('Content-Length: ' . (string) filesize($path));
header('X-Content-Type-Options: nosniff');
header('Cache-Control: private, no-store');
header('X-Robots-Tag: noindex, nofollow');
readfile($path);
exit;
