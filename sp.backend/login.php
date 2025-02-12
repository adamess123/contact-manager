<?php
// Database connection
include 'db.php';

// Get raw POST request data
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Validate required fields
if (!isset($data["Username"], $data["Password"])) {
    echo json_encode(["error" => "All fields are required"]);
    exit();
}

$Username = $data["Username"];
$Password = $data["Password"];

// Prepare the SQL query
$stmt = $conn->prepare("SELECT ID, Password FROM Users WHERE Username = ?");
if (!$stmt) {
    echo json_encode(["error" => "Database error: " . $conn->error]);
    exit();
}

$stmt->bind_param("s", $Username);
$stmt->execute();
$stmt->store_result();

// Bind result variables
$stmt->bind_result($ID, $HashedPassword);
$stmt->fetch();

if ($stmt->num_rows > 0 && password_verify($Password, $HashedPassword)) {
    echo json_encode(["message" => "Login successful", "UserID" => $ID]);
} else {
    echo json_encode(["error" => "Invalid credentials"]);
}

$stmt->close();
$conn->close();
?>
