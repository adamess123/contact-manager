// This file sets up database connection in PHP

<?php
$host = "localhost";
$db_name = "ContactManager";
$username = "root";
$password = "8zdiIU5gA+Ww";

$conn = new mysqli($host, $username, $password, $db_name);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>
