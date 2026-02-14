<?php
/**
 * Contact Form Mail Handler
 * Upload this file to your PHP server.
 * Update the CORS origin and recipient email below.
 */

// === CONFIGURATION ===
$recipient_email = "hello@greenessence.com";  // Change to your email
$allowed_origin  = "https://id-preview--90c068ac-32d0-42b2-8a5a-198d565a6a79.lovable.app"; // Update with your domain

// === RATE LIMITING (file-based, per IP) ===
$rate_limit_dir    = sys_get_temp_dir() . '/contact_rate_limit';
$rate_limit_max    = 5;    // Max requests per window
$rate_limit_window = 3600; // Window in seconds (1 hour)

if (!is_dir($rate_limit_dir)) {
    mkdir($rate_limit_dir, 0700, true);
}

$client_ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rate_file   = $rate_limit_dir . '/' . md5($client_ip) . '.json';
$now         = time();
$submissions = [];

if (file_exists($rate_file)) {
    $submissions = json_decode(file_get_contents($rate_file), true) ?: [];
    // Remove expired entries
    $submissions = array_values(array_filter($submissions, function ($ts) use ($now, $rate_limit_window) {
        return ($now - $ts) < $rate_limit_window;
    }));
}

// === CORS HEADERS ===
header("Access-Control-Allow-Origin: $allowed_origin");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

// Check rate limit
if (count($submissions) >= $rate_limit_max) {
    http_response_code(429);
    echo json_encode(["success" => false, "message" => "Too many requests. Please try again later."]);
    exit;
}

// Get JSON body
$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid request body"]);
    exit;
}

// === HONEYPOT CHECK (anti-bot) ===
// If the hidden "website" field is filled, it's likely a bot
if (!empty($input['website'] ?? '')) {
    // Silently accept but don't send — fool the bot
    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
    exit;
}

// === SANITIZE & VALIDATE ===
$name         = filter_var(trim($input['name'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
$email        = filter_var(trim($input['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone        = filter_var(trim($input['phone'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
$message      = filter_var(trim($input['message'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
$project_type = filter_var(trim($input['projectType'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);

// === HEADER INJECTION PROTECTION ===
// Strip newline characters from all fields used in email headers
function strip_header_injection($str) {
    return str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], '', $str);
}

$name  = strip_header_injection($name);
$email = strip_header_injection($email);
$phone = strip_header_injection($phone);
$project_type = strip_header_injection($project_type);

// Reject if email contains newlines (definite injection attempt)
if ($email !== filter_var(trim($input['email'] ?? ''), FILTER_SANITIZE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email format"]);
    exit;
}

// Required fields
if (empty($name) || strlen($name) > 100) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid name"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 255) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email"]);
    exit;
}

if (empty($message) || strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid message"]);
    exit;
}

// === BUILD EMAIL ===
$subject = "New Contact: " . substr($name, 0, 50) . " - " . substr($project_type, 0, 30);

$body  = "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n";
$body .= "Project Type: $project_type\n";
$body .= "IP: $client_ip\n";
$body .= "---\n\n";
$body .= "Message:\n$message\n";

$headers  = "From: noreply@" . strip_header_injection($_SERVER['SERVER_NAME']) . "\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// === SEND ===
$sent = mail($recipient_email, $subject, $body, $headers);

if ($sent) {
    // Record this submission for rate limiting
    $submissions[] = $now;
    file_put_contents($rate_file, json_encode($submissions));

    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send email"]);
}
