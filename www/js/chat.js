function chatInit() {
    currentPage = "CHAT";
    
    var interval = null;
    
    function fillMessages(data) {
        //Data is terminated by empty string
        //and is in the form id, message, id,
        //message etc.
        for (var i = 0; data[i] != ""; i += 2) {
            var id = data[i];
            var nextID = data[i + 2];
            var message = data[i + 1];

            if (id == userID) {
                if (nextID != userID) {
                    $("#message-area").append('\
                        <div class="talk-bubble tri-right round btm-right-in user">\
                            <div class="talktext">\
                                <p>' + message + '</p>\
                            </div>\
                        </div>');
                }
                
                else {
                    $("#message-area").append('\
                        <div class="talk-bubble round btm-right-in user">\
                            <div class="talktext">\
                                <p>' + message + '</p>\
                            </div>\
                        </div>');
                }
            }

            else if (id == contactID) {
                if (nextID != contactID) {
                    $("#message-area").append('\
                        <div class="talk-bubble tri-right round btm-left-in match">\
                            <div class="talktext">\
                                <p>' + message + '</p>\
                            </div>\
                        </div>');
                }
                
                else {
                    $("#message-area").append('\
                        <div class="talk-bubble round btm-left-in match">\
                            <div class="talktext">\
                                <p>' + message + '</p>\
                            </div>\
                        </div>');
                }
            }
        }
    }
    
    function updateMessages() {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                ato: accessToken,
                contact_id: contactID,
                req_type: "check_cache"
            },
            url: SERVER_ADDRESS + "/chat.php",
            success: function(data) {
                fillMessages(data);
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            console.log(textStatus);
        });
    }
    
    //The back button on the contacts page is clicked
    $("#back-button").click(function() {
        clearInterval(interval);    //Halt message updates
        pageTransition("messages.html", messagesInit);
    });
    
    
    //Fill the messages list
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            ato: accessToken,
            contact_id: contactID,
            req_type: "check"
        },
        url: SERVER_ADDRESS + "/chat.php",
        success: function(data) {
            fillMessages(data);
            setInterval(updateMessages, 3000);
        },
    }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
        console.log(textStatus);
    });
    
    $("#chat-submit").click(function() {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                ato: accessToken,
                contact_id: contactID,
                req_type: "send",
                message: $("#chat-textbox").val()
            },
            url: SERVER_ADDRESS + "/chat.php",
            success: function(data) {
                
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
                console.log(textStatus);
        });

        $("#chat-textbox").val("");
    });
    
    $("#chat-textbox").on("keyup", function (e) {
        if(e.which === 13){    //Enter
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    ato: accessToken,
                    contact_id: contactID,
                    req_type: "send",
                    message: $("#chat-textbox").val()
                },
                url: SERVER_ADDRESS + "/chat.php",
                success: function(data) {
                    
                },
            }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
                    console.log(textStatus);
            });

            $("#chat-textbox").val("");
        }
    });
}