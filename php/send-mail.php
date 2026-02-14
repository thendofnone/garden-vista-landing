<?php
/**
 * Contact Form Mail Handler
 * Upload this file to your PHP server.
 * Update the CORS origin and recipient email below.
 */

// === CONFIGURATION ===
$recipient_email = "hello@greenessence.com";  // Change to your email
$allowed_origin  = "https://id-preview--90c068ac-32d0-42b2-8a5a-198d565a6a79.lovable.app"; // Update with your domain

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

// Get JSON body
$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid request body"]);
    exit;
}

// === SANITIZE & VALIDATE ===
$name         = filter_var(trim($input['name'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
$email        = filter_var(trim($input['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone        = filter_var(trim($input['phone'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
$message      = filter_var(trim($input['message'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
$project_type = filter_var(trim($input['projectType'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);

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
$subject = "New Contact: $name - $project_type";

$body  = "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n";
$body .= "Project Type: $project_type\n";
$body .= "---\n\n";
$body .= "Message:\n$message\n";

$headers  = "From: noreply@" . $_SERVER['SERVER_NAME'] . "\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// === SEND ===
$sent = mail($recipient_email, $subject, $body, $headers);

if ($sent) {
    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send email"]);
}
