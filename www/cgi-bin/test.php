<?php
function getConversationID($user_1, $user_2, $conn) {
    if ($user_2 != '') {
        $chat_query = "SELECT * FROM active_conversations WHERE user_1 ='".$user_2."' and user_2 = '".$user_1."'";
        $response = $conn->query($chat_query);
        $response = $response->fetch_assoc();
        $conversation_id = $response["conversation_id"];
    }
    if ($response == '') {
        $chat_query = "SELECT * FROM active_conversations WHERE user_1 ='".$user_1."' and user_2 = '".$user_2."'";
        $response = $conn->query($chat_query);
        $response = $response->fetch_assoc();
        $conversation_id = $response["conversation_id"];
    } 
    if ($user_2 == '') {
        $conversation_id = array();
        $chat_query = "SELECT * FROM active_conversations WHERE user_1 ='".$user_1."' OR user_2 = '".$user_1."'";
        $response = $conn->query($chat_query);
        while ($row = $response->fetch_assoc()) {
            array_push($conversation_id, $row['conversation_id']);
        } 
    }
    return $conversation_id;
}
?>