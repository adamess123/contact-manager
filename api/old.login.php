<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$inData = getRequestInfo();

if (!isset($inData["username"], $inData["password"])) {
    sendResultInfoAsJson(["error" => "All fields are required"]);
    exit();
}

$username = $inData["username"];
$password = $inData["password"];

$stmt = $conn->prepare("SELECT ID, FirstName, LastName, Password FROM Users WHERE Username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row["Password"])) {
        returnWithInfo($row["FirstName"], $row["LastName"], $row["ID"]);
    } else {
        sendResultInfoAsJson(["error" => "Invalid credentials or Non-existant User"]);
    }
} else {
    sendResultInfoAsJson(["error" => "Invalid credentials or Non-existant User (Second else for testing)"]);
}

$stmt->close();
$conn->close();
?>
