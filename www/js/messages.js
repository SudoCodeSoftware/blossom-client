function messagesInit() {
    currentPage = "MESSAGES";
    
    //Fill the messages list
    //This request is for getting active conversations
    $(".fa-arrow-left").click(function() {
        pageTransition("match.html", matchInit);
    });
    
    function checkNewMessages() {
        if (currentPage === "MESSAGES") {
            $.ajax({
                type: "POST",
                //dataType: "json",
                data: {
                    ato: fbResponse.authResponse.accessToken,
                    contact_id: chatContactSelected,
                    req_type: "check_cache"
                },
                url: SERVER_ADDRESS + "/chat.php",
                success: function(data) {
                    var messages = data[0].split(String.fromCharCode(31));
                    $("#listBackground").html("");    //Wipe it
                    for (var i = 1; i < messages.length-1; i+=2) {    //dunno why, but it's creating one more div than it should
                        $("#listBackground").append("<div " + "\" class=\"listItem addContactListItem\"><p class=\"listItemText\">" + messages[i-1] + ":    " + messages[i]+"</p></div>");
                    }
                },
            }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
                    console.log(textStatus);
            });

            setTimeout(function(){ 
                checkNewMessages(); 
            }, 1000);
        }
    }
    
    //Initial message check
    $.ajax({
        type: "POST",
        //dataType: "json",
        data: {
            ato: fbResponse.authResponse.accessToken,
            contact_id: chatContactSelected,
            req_type: "check"
        },
        url: SERVER_ADDRESS + "/chat.php",
        success: function(data) {
            var messages = data[0].split(String.fromCharCode(31));
            $("#listBackground").html("");    //Wipe it
            for (var i = 1; i < messages.length-1; i+=2) {    //dunno why, but it's creating one more div than it should
                $("#listBackground").append("<div " + "\" class=\"listItem addContactListItem\"><p class=\"listItemText\">" + messages[i-1] + ":    " + messages[i]+"</p></div>");
            }
            
            setTimeout(function(){ 
                checkNewMessages(); 
            }, 1000);
        },
    }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            console.log(textStatus);
    });
    
    //The back button on the contacts page is clicked
    $("#back").click(function() {
        pageTransition("conversation.html", conversationInit);
    });
    
    $("#send").click(function() {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                ato: fbResponse.authResponse.accessToken, 
                contact_id: chatContactSelected ,
                req_type: "send",
                message: $("#messageInput").val()
            },
            url: SERVER_ADDRESS + "/chat.php",
            success: function(data) {
                console.log(data);
                $("#messageInput").val('');
                messagesInit();
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            console.log(textStatus);
        });
    });
}