<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$inData = getRequestInfo();

// Expecting JSON in the order: firstname, lastname, username, password
if (!isset($inData["firstname"], $inData["lastname"], $inData["username"], $inData["password"])) {
    sendResultInfoAsJson(["error" => "All fields are required"]);
    exit();
}

$firstname    = $inData["firstname"];
$lastname     = $inData["lastname"];
$username     = $inData["username"];
$passwordHash = password_hash($inData["password"], PASSWORD_DEFAULT);

// Check if username already exists
$stmt = $conn->prepare("SELECT ID FROM Users WHERE Username=?");
if (!$stmt) {
    sendResultInfoAsJson(["error" => "Database error: " . $conn->error]);
    exit();
}
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $stmt->close();  // Close the SELECT statement before exiting
    sendResultInfoAsJson(["error" => "Username already registered."]);
    exit();
}
$stmt->close();  // Close the SELECT statement after the check

// Insert the new user
$stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Username, Password) VALUES (?, ?, ?, ?)");
if (!$stmt) {
    sendResultInfoAsJson(["error" => "Database error: " . $conn->error]);
    exit();
}
$stmt->bind_param("ssss", $firstname, $lastname, $username, $passwordHash);

if ($stmt->execute()) {
    sendResultInfoAsJson(["message" => "User registered successfully!"]);
} else {
    sendResultInfoAsJson(["error" => "Failed to register user: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
