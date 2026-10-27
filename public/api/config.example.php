<?php
/**
 * Quote form settings.
 *
 * 1. Copy this file to config.php in the same folder (config.php is git-ignored).
 * 2. Fill in your SMTP details and a long random download_secret.
 * 3. Upload config.php to public_html/api/ on Hostinger.
 *
 * Never commit config.php or put real passwords in this example file.
 */

return [
    // SMTP account used to send email (Hostinger: Emails > your mailbox > Configuration)
    'smtp' => [
        'host'     => 'smtp.hostinger.com',
        'port'     => 465,          // 465 with 'ssl', or 587 with 'tls'
        'secure'   => 'ssl',        // 'ssl' or 'tls'
        'username' => 'info@arvexdesigns.net',
        'password' => 'CHANGE_ME',
    ],

    // "From" address on every email (normally the same mailbox as the SMTP username)
    'from_email' => 'info@arvexdesigns.net',
    'from_name'  => 'Bidnora Engineering',

    // Who receives new quote requests (one or more addresses)
    'notify_to' => ['info@arvexdesigns.net'],

    // Shown in the confirmation email sent to the visitor
    'company' => [
        'name'    => 'Bidnora Engineering',
        'phone'   => '(201) 555-0148',
        'email'   => 'info@arvexdesigns.net',
        'website' => 'https://www.arvexdesigns.net',
    ],

    // Public site address, used to build file download links (no trailing slash)
    'base_url' => 'https://www.arvexdesigns.net',

    // Where uploaded plans are stored. The default is OUTSIDE public_html (one level up),
    // so files can never be opened directly from the web. Must be writable by PHP.
    'upload_dir' => dirname(__DIR__, 2) . '/bidnora-uploads',

    // Secret used to sign download links. Use 64+ random characters, e.g. from
    // https://www.random.org/strings/ or `openssl rand -hex 32`. Changing it breaks old links.
    'download_secret' => 'CHANGE_ME_TO_A_LONG_RANDOM_STRING',

    // How long download links in the notification email keep working
    'download_ttl_days' => 30,

    // Upload limits (keep in sync with lib/uploads.ts in the website code)
    'max_total_bytes'    => 100 * 1024 * 1024,
    'max_files'          => 20,
    'allowed_extensions' => ['pdf', 'dwg', 'dxf', 'zip', 'jpg', 'jpeg', 'png', 'webp', 'tif', 'tiff'],

    // Spam protection
    'rate_limit' => [
        'max'            => 5,     // submissions allowed per IP address...
        'window_seconds' => 3600,  // ...within this many seconds
    ],
    'min_seconds_to_submit' => 3,  // forms submitted faster than this are treated as bots

    // Only accept submissions from these origins (leave empty to skip the check)
    'allowed_origins' => [
        'https://www.arvexdesigns.net',
        'https://arvexdesigns.net',
    ],

    // Optional: absolute path to a sample estimate PDF attached to sample-request confirmations
    'sample_attachment' => null,

    // Set to true only while testing: error responses then include technical details
    'debug' => false,
];
