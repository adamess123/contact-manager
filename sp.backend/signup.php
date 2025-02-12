<?php
// Establish database connection and helper functions
include 'db.php';

// Get user input from the request
$inData = getRequestInfo();

// Validate required fields
if (!isset($inData["username"], $inData["firstname"], $inData["lastname"], $inData["password"])) {
    sendResultInfoAsJson(["error" => "All fields are required"]);
    exit();
}

// Extract user details from request data
$firstname = $inData["firstname"];
$lastname = $inData["lastname"];
$username = $inData["username"];
$password = password_hash($inData["password"], PASSWORD_DEFAULT); // Hash the password for security

// Check if the username already exists
$stmt = $conn->prepare("SELECT ID FROM Users WHERE Username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    sendResultInfoAsJson(["error" => "Username already registered."]);
} else {
    // Insert new user into the database
    $stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Username, Password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $firstname, $lastname, $username, $password);

    if ($stmt->execute()) {
        sendResultInfoAsJson(["message" => "User registered successfully!"]);
    } else {
        sendResultInfoAsJson(["error" => "Failed to register user"]);
    }
}

// Close the prepared statement and database connection
$stmt->close();
$conn->close();
?>
