function conversationInit() {
    //Fill the messages list
    //This request is for getting active conversations
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            ato: fbResponse.authResponse.accessToken, 
            req_type: "active_conv"
        },
        url: SERVER_ADDRESS + "/chat.php",
        success: function(data) {
            console.log(data);
            var messages = data[0].split(String.fromCharCode(31));
            $("#listBackground").html("");    //Wipe it
            for (var i = 0; i < messages.length; i++) {    //dunno why, but it's creating one more div than it should
                $("#listBackground").append("<div " + "\" class=\"listItem addContactListItem\"><p id= \"userName\" class=\"listItemText\">" + messages[i] + "</p></div>");
            }
        },
    }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            console.log(textStatus);
    });
    
    //The back button on the contacts page is clicked
    $("#back").click(function() {
        pageTransition("home.html", homeInit);
    });
    
    $("#listBackground").click(function() {
        chatContactSelected = $(this).text();
        pageTransition("messages.html", messagesInit);
    });
    
}