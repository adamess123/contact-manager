<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Credentials
$host = "localhost";
$db_name = "ContactManager";
$username = "root";
$password = "8zdiIU5gA+Ww";

// Establish connection to database
$conn = new mysqli($host, $username, $password, $db_name);

// Connection error checker
if ($conn->connect_error) {
    sendResultInfoAsJson(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Gets JSON input
function getRequestInfo()
{
    return json_decode(file_get_contents("php://input"), true);
}

// Sends JSON response
function sendResultInfoAsJson($obj)
{
    header('Content-type: application/json');
    echo json_encode($obj);
}

// Returns user info in JSON format
function returnWithInfo($firstName, $lastName, $id) {
    $retVal = [
        "id"        => $id,
        "firstname" => $firstName,
        "lastname"  => $lastName
    ];
    sendResultInfoAsJson($retVal);
}

?>
