<?php
// Establish database connection and helper functions
include 'db.php';

// Get login credentials from request
$inData = getRequestInfo();

// Validate required fields
if (!isset($inData["username"], $inData["password"])) {
    sendResultInfoAsJson(["error" => "All fields are required"]);
    exit();
}

// Extract user input
$username = $inData["username"];
$password = $inData["password"];

// Prepare SQL query to fetch user details
$stmt = $conn->prepare("SELECT ID, FirstName, LastName, Password FROM Users WHERE Username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

// Check if a user record exists
if ($row = $result->fetch_assoc()) {
    // Verify the provided password against the stored hash
    if (password_verify($password, $row["Password"])) {
        returnWithInfo($row["FirstName"], $row["LastName"], $row["ID"]);
    } else {
        sendResultInfoAsJson(["error" => "Invalid credentials"]);
    }
} else {
    sendResultInfoAsJson(["error" => "No Records Found"]);
}

// Close the prepared statement and database connection
$stmt->close();
$conn->close();

// Sends user details as a JSON response upon successful login
function returnWithInfo($firstName, $lastName, $id)
{
    sendResultInfoAsJson(["id" => $id, "firstName" => $firstName, "lastName" => $lastName, "error" => ""]);
}
?>
