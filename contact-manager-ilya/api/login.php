<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$inData = getRequestInfo();

if (empty($inData["username"]) || empty($inData["password"])) {
    sendResultInfoAsJson(["error" => "All fields are required"]);
    exit();
}

$username = trim($inData["username"]);
$password = $inData["password"];

// Fetch user details
$stmt = $conn->prepare("SELECT ID, FirstName, LastName, Password FROM Users WHERE Username = ? OR UserEmail = ?");
if (!$stmt) {
    sendResultInfoAsJson(["error" => "Database error: " . $conn->error]);
    exit();
}

$stmt->bind_param("ss", $username, $username);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row["Password"])) {
        returnWithInfo($row["FirstName"], $row["LastName"], $row["ID"]);
    } else {
        sendResultInfoAsJson(["error" => "Invalid username or password."]);
    }
} else {
    sendResultInfoAsJson(["error" => "Invalid username or password."]);
}

$stmt->close();
$conn->close();
?>
