<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$inData = getRequestInfo();

// Validate input
if (empty($inData["firstname"]) || empty($inData["lastname"]) || empty($inData["username"]) || empty($inData["email"]) || empty($inData["password"])) {
    sendResultInfoAsJson(["error" => "All fields are required"]);
    exit();
}

$firstname = trim($inData["firstname"]);
$lastname = trim($inData["lastname"]);
$username = trim($inData["username"]);
$email = trim($inData["email"]);
$passwordHash = password_hash($inData["password"], PASSWORD_DEFAULT);

// Function to check if the username exists
function usernameOrEmailExists($conn, $username) {
    $stmt = $conn->prepare("SELECT ID FROM Users WHERE Username=? OR UserEmail=?");
    $stmt->bind_param("ss", $username,$email);
    $stmt->execute();
    $stmt->store_result();
    $exists = $stmt->num_rows > 0;
    $stmt->close();
    return $exists;
}

// Check if username already exists
if (usernameOrEmailExists($conn, $username)) {
    sendResultInfoAsJson(["error" => "Username or Email already taken."]);
    exit();
}

// Insert the new user
$stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Username, Password, UserEmail) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) {
    sendResultInfoAsJson(["error" => "Database error: " . $conn->error]);
    exit();
}
$stmt->bind_param("sssss", $firstname, $lastname, $username, $passwordHash, $email);

if ($stmt->execute()) {
    $userId = $stmt->insert_id;
    returnWithInfo($firstname, $lastname, $userId);
} else {
    sendResultInfoAsJson(["error" => "Failed to register user."]);
}

$stmt->close();
$conn->close();
?>
