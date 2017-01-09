function chatInit() {
    currentPage = "CHAT";
    
    var interval = null;
    
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

                //Data is terminated by empty string
                //and is in the form id, message, id,
                //message etc.
                for (var i = 0; data[i] != ""; i += 2) {
                    var id = data[i];
                    var message = data[i + 1];

                    if (id == userID) {
                         $("#message-area").append('\
                            <div class="talk-bubble tri-right round btm-right-in user">\
                                <div class="talktext">\
                                    <p>' + message + '</p>\
                                </div>\
                            </div>');
                    }

                    else if (id == contactID) {
                        $("#message-area").append('\
                            <div class="talk-bubble tri-right round btm-left-in match">\
                                <div class="talktext">\
                                    <p>' + message + '</p>\
                                </div>\
                            </div>');
                    }
                }
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
            
            //Data is terminated by empty string
            //and is in the form id, message, id,
            //message etc.
            for (var i = 0; data[i] != ""; i += 2) {
                var id = data[i];
                var message = data[i + 1];
                
                if (id == userID) {
                     $("#message-area").append('\
                        <div class="talk-bubble tri-right round btm-right-in user">\
                            <div class="talktext">\
                                <p>' + message + '</p>\
                            </div>\
                        </div>');
                }
                
                else if (id == contactID) {
                    $("#message-area").append('\
                        <div class="talk-bubble tri-right round btm-left-in match">\
                            <div class="talktext">\
                                <p>' + message + '</p>\
                            </div>\
                        </div>');
                }
            }
            
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