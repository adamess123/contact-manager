<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$inData = getRequestInfo();

// Validate input
if (empty($inData["firstname"]) || empty($inData["lastname"]) || empty($inData["username"]) || empty($inData["password"])) {
    sendResultInfoAsJson(["error" => "All fields are required"]);
    exit();
}

$firstname = trim($inData["firstname"]);
$lastname = trim($inData["lastname"]);
$username = trim($inData["username"]);
$passwordHash = password_hash($inData["password"], PASSWORD_DEFAULT);

// Function to check if the username exists
function usernameExists($conn, $username) {
    $stmt = $conn->prepare("SELECT ID FROM Users WHERE Username=?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $exists = $stmt->num_rows > 0;
    $stmt->close();
    return $exists;
}

// Check if username already exists
if (usernameExists($conn, $username)) {
    sendResultInfoAsJson(["error" => "Username already taken."]);
    exit();
}

// Insert the new user
$stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Username, Password) VALUES (?, ?, ?, ?)");
if (!$stmt) {
    sendResultInfoAsJson(["error" => "Database error: " . $conn->error]);
    exit();
}
$stmt->bind_param("ssss", $firstname, $lastname, $username, $passwordHash);

if ($stmt->execute()) {
    $userId = $stmt->insert_id;
    returnWithInfo($firstname, $lastname, $userId);
} else {
    sendResultInfoAsJson(["error" => "Failed to register user."]);
}

$stmt->close();
$conn->close();
?>
