<?php
// Database connection
include 'db.php';

// Get raw POST request data
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Ensure all fields are present
if (!isset($data["username"], $data["firstname"], $data["lastname"], $data["password"])) {
    echo json_encode(["error" => "All fields are required (username, firstname, lastname, password)."]);
    exit();
}

$firstname = $data["firstname"];
$lastname = $data["lastname"];
$username = $data["username"];
$password = password_hash($data["password"], PASSWORD_DEFAULT); // Hash password

// Debugging: Check database connection
if (!$conn) {
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Check if Username already exists
$checkQuery = $conn->prepare("SELECT ID FROM Users WHERE Username = ?");
if (!$checkQuery) {
    echo json_encode(["error" => "Query preparation failed (checkQuery): " . $conn->error]);
    exit();
}
$checkQuery->bind_param("s", $username);
$checkQuery->execute();
$result = $checkQuery->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["error" => "Username already registered."]);
    exit();
}

// Insert new user
$query = $conn->prepare("INSERT INTO Users (FirstName, LastName, Username, Password) VALUES (?, ?, ?, ?)");
if (!$query) {
    echo json_encode(["error" => "Query preparation failed (query): " . $conn->error]);
    exit();
}
$query->bind_param("ssss", $firstname, $lastname, $username, $password);

if ($query->execute()) {
    echo json_encode(["message" => "User registered successfully!"]);
} else {
    echo json_encode(["error" => "Failed to register user: " . $conn->error]);
}

// Close connections
$checkQuery->close();
$query->close();
$conn->close();
?>
