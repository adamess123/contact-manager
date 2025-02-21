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
//sendResultInfoAsJson(["Cookie ID" => $CookieID]);
//exit();

if ($inData["filterFirst"] == 0 AND $inData["filterLast"] == 0 AND $inData["filterEmail"] == 0) {
        sendResultInfoAsJson(["error" => "Must have at least one filter chosen"]);
        exit();
}

// Set variables
$search = $inData["search"];
$filterFirst = $inData["filterFirst"];
$filterLast = $inData["filterLast"];
$filterEmail = $inData["filterEmail"];

// Base Query
$query = "SELECT * FROM Contacts";


// Build our query if search isn't empty
if(!empty($search)) {

	// Stuff for SQL Injection
	//$searchEscaped = $conn->real_escape_string($search);

	$searchEscaped = $search;

	$query .= " WHERE (";
	$firstFilterExists = false;
	
	// Filter by First
	if($filterFirst == 1) {
		$query .= "LOWER(FirstName) LIKE LOWER('%$searchEscaped%')";
		$firstFilterExists = true;
	}

	// Filter by Last
	if ($filterLast == 1) {
        if ($firstFilterExists) {
            $query .= " OR ";
        }
        $query .= "LOWER(LastName) LIKE LOWER('%$searchEscaped%')";
        $firstFilterExists = true;
    }

	// Filter by Email
	if ($filterEmail == 1) {
        if ($firstFilterExists) {
            $query .= " OR ";
        }
        $query .= "LOWER(Email) LIKE LOWER('%$searchEscaped%')";
    }
    $query .= ")";

}

// Query for contacts
$stmt = $conn->prepare($query);
if (!$stmt) {
    sendResultInfoAsJson(["error" => "Database error: " . $conn->error]);
    exit();
}


if ($stmt->execute()) {
	$result = $stmt->get_result();
	$contacts = $result->fetch_all(MYSQLI_ASSOC); // Needs argument
	sendResultInfoAsJson(["contacts" => $contacts]);
	//sendResultInfoAsJson(["message" => "Contacts retrieved successfully!"]);
} else {
	sendResultInfoAsJson(["error" => "Failed to retrieve contacts: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
