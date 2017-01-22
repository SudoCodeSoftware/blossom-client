<?php

function initDB(){
    $servername = "localhost";
    $username = "sudocode";
    $password = "sud0mcnuggets!";

    // Create connection
    $conn = new mysqli($servername, $username, $password);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    $mysql_init = 'USE sudocode_unyouth';
    $conn->query($mysql_init);
    
    if ($_POST["req"] == "list"){
        $output = getList($conn);
    }
    else{
        $output = getContact($conn);   
    }
    
    echo json_encode($output); 
}

function getContact($conn){
    $council = $_POST["council"];
    $query = "SELECT * FROM council_data WHERE ORGNAME = '".$council."'";
    $result = $conn->query($query);
    $result = $result->fetch_assoc();
    return $result;
}

function getList($conn){
    $query = "SELECT * FROM council_data";
    $result = $conn->query($query);
    $storeResult = array();
    while ($row = $result->fetch_assoc()) {
            array_push($storeResult, $row['ORGNAME']);
        } 
    return $storeResult;
}

initDB()
?>