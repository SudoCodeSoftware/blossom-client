<?php

function getBitches() {
    include 'login.php';
    //check the access token and store it in $check (array - 0=output, 1=user)
    $check = checkAT();
    
    if ($check[0] == '1a'){
        $servername = "localhost";
        $username = "sudocode";
        $password = "sud0mcnuggets!";
        // Create connection
        $conn = new mysqli($servername, $username, $password);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        $mysql_init = 'USE sudocode_blossom';
        $conn->query($mysql_init);
        $user_id = $check[1]->getProperty('id');
        $dbquery = "SELECT * FROM user_data where fb_id = '".$user_id."'";
        $response = $conn->query($dbquery);
        $user_response = $response->fetch_assoc();
        
        $dbquery = 'SELECT * FROM user_data';
        $response = $conn->query($dbquery);
        $response = $response->fetch_assoc();
        var_dump(echo($response));
        matches = array();
        $threshold = 10;
        $level = 0;
        foreach (count($response) as $curr_id) {
            //matching algorithm
            if ($user_response["gender_preference"] == $curr_id["gender"]) {
                if ($user_response["uni"] == $curr_id["uni"]){
                    $level += 10;
                }
                $user_fac = explode(chr(31),$user_response["faculty"]);
                $match_fac = explode(chr(31), $curr_id["faculty"]);
                if ($user_fac[0] == $match_fac[0]){
                    $level += 10;
                }
                if (count($user_fac) > 1 and count($match_fac) > 1) {
                    if ($user_fac[1] == $match_fac[1]){
                    $level += 10;
                    }
                }
                if ($user_response["degree"] == $curr_id["degree"]) {
                    $level += 10
                }
                
                $from = new DateTime($user_response["age"]);
                $to   = new DateTime('today');
                $user_age =  $from->diff($to)->y;
                
                $from = new DateTime($curr_id["age"]);
                $to   = new DateTime('today');
                $match_age = $from->diff($to)->y;
                
                $level -= abs(($user_age - $match_age));
            }
                    
            if ($level >= $threshold) {
                array_push(matches, $curr_id)
            }   
        }
        
        } else {
            output = '2'
        
        }
    return json_encode(output);
    } 

?>