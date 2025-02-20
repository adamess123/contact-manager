<?php

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';


$inData = getRequestInfo();

// Uncomment to see requestinfo
//sendResultInfoAsJson(["error" => $inData]);
//exit();

if (!isset($inData["ownerID"], $inData["firstName"], $inData["lastName"], $inData["email"])) {
	sendResultInfoAsJson(["error" => "All fields are required"]);
	exit();
}

// Set variables
$first = $inData["firstName"];
$last = $inData["lastName"];
$email = $inData["email"];
$ownerID = $inData["ownerID"];

// Check for duplicate contacts?

// Add contact
$stmt = $conn->prepare("INSERT INTO Contacts (OwnerID, FirstName, LastName, Email) VALUES (?, ?, ?, ?)");
if (!$stmt) {
    sendResultInfoAsJson(["error" => "Database error: " . $conn->error]);
    exit();
}

$stmt->bind_param("isss", $ownerID, $first, $last, $email);

if ($stmt->execute()) {
	sendResultInfoAsJson(["message" => "Contact added successfully!"]);
} else { 
	sendResultInfoAsJson(["error" => "Failed to add contact: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
