function chatInit() {
    globals.currentPage = "CHAT";
    
    var interval = null;    //Variable for the checking for new messages polling
    var currentMessageMarker = -1;    //How many messages from the oldest we have not got
    
    $("#contact-name").html(sanitizeString(globals.messages.contactName));
    $("#contact-pic").css("background-image", "url('" + globals.messages.contactImgURL + "')");
    
    function appendMessages(data) {
        //If there's stuff in the message area and the last 
        //existing message's sender is the same as the first incoming
        //message's sender
        if ($("#message-area").children().last().length != 0
            && $("#message-area").children().last().hasClass("user") == (data[0] == globals.userID)) {
            $("#message-area").children().last().removeClass("tri-right");
        }
        
        for (var i = 0; i < data.length; i += 2) {
            var id = data[i];
            var nextID = data[i + 2];
            var message = data[i + 1];
            
            if (id == globals.userID) {
                if (nextID != globals.userID) {
                    $("#message-area").append('\
                        <div class="talk-bubble tri-right round btm-right-in user">\
                            <div class="talktext">\
                                <p>' + sanitizeString(message) + '</p>\
                            </div>\
                        </div>');
                }
                
                else {
                    $("#message-area").append('\
                        <div class="talk-bubble round btm-right-in user">\
                            <div class="talktext">\
                                <p>' + sanitizeString(message) + '</p>\
                            </div>\
                        </div>');
                }
            }

            else if (id == globals.messages.contactID) {
                if (nextID != globals.messages.contactID) {
                    $("#message-area").append('\
                        <div class="talk-bubble tri-right round btm-left-in match">\
                            <div class="talktext">\
                                <p>' + sanitizeString(message) + '</p>\
                            </div>\
                        </div>');
                }
                
                else {
                    $("#message-area").append('\
                        <div class="talk-bubble round btm-left-in match">\
                            <div class="talktext">\
                                <p>' + sanitizeString(message) + '</p>\
                            </div>\
                        </div>');
                }
            }
        }
    }
    
    function prependMessages(data) {
        //If there's stuff in the message area and the last 
        //existing message's sender is the same as the first incoming
        //message's sender
        if ($("#message-area").children().last().length != 0
            && $("#message-area").children().last().hasClass("user") == (data[0] == globals.userID)) {
            $("#message-area").children().last().removeClass("tri-right");
        }
        
        for (var i = data.length - 2; i >= 0; i -= 2) {
            var id = data[i];
            var nextID = data[i + 2];
            var message = data[i + 1];
            
            if (id == globals.userID) {
                if (nextID != globals.userID) {
                    $("#message-area").prepend('\
                        <div class="talk-bubble tri-right round btm-right-in user">\
                            <div class="talktext">\
                                <p>' + sanitizeString(message) + '</p>\
                            </div>\
                        </div>');
                }
                
                else {
                    $("#message-area").prepend('\
                        <div class="talk-bubble round btm-right-in user">\
                            <div class="talktext">\
                                <p>' + sanitizeString(message) + '</p>\
                            </div>\
                        </div>');
                }
            }

            else if (id == globals.messages.contactID) {
                if (nextID != globals.messages.contactID) {
                    $("#message-area").prepend('\
                        <div class="talk-bubble tri-right round btm-left-in match">\
                            <div class="talktext">\
                                <p>' + sanitizeString(message) + '</p>\
                            </div>\
                        </div>');
                }
                
                else {
                    $("#message-area").prepend('\
                        <div class="talk-bubble round btm-left-in match">\
                            <div class="talktext">\
                                <p>' + sanitizeString(message) + '</p>\
                            </div>\
                        </div>');
                }
            }
        }
    }
    
    function updateMessages() {
        if (globals.currentPage != "CHAT") {
            clearInterval(interval);    //Halt message updates
        } else {
        
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    ato: globals.accessToken,
                    contact_id: globals.messages.contactID,
                    req_type: "check_cache",
                },
                url: SERVER_ADDRESS + "/chat.php",
                success: function(data) {
                    console.log(data);

                    if (data[0] != "") {
                        appendMessages(data);
                    }
                },
            }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
                console.log(textStatus);
            });
        }
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
            ato: globals.accessToken,
            contact_id: globals.messages.contactID,
            req_type: "check",
            marker: currentMessageMarker
        },
        url: SERVER_ADDRESS + "/chat.php",
        success: function(data) {
            console.log(data);
            appendMessages(data[0]);
            currentMessageMarker = data[1];
            interval = setInterval(updateMessages, 3000);
        },
    }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
        console.log(textStatus);
    });
    
    $("#chat-load-more-messages").click(function() {
        //Fill the messages list
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                ato: globals.accessToken,
                contact_id: globals.messages.contactID,
                req_type: "check",
                marker: currentMessageMarker
            },
            url: SERVER_ADDRESS + "/chat.php",
            success: function(data) {
                console.log(data);
                console.log(currentMessageMarker);
                prependMessages(data[0]);
                currentMessageMarker = data[1];
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            console.log(textStatus);
        });
    });
    
    $("#chat-submit").click(function() {
        if ($("#chat-textbox").val() != "") {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    ato: globals.accessToken,
                    contact_id: globals.messages.contactID,
                    req_type: "send",
                    message: $("#chat-textbox").val()
                },
                url: SERVER_ADDRESS + "/chat.php",
                success: function(data) {

                },
            }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
                    console.log(textStatus);
            });
        }

        $("#chat-textbox").val("");
    });
    
    $("#chat-textbox").on("keyup", function (e) {
        if(e.which === 13){    //Enter
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    ato: globals.accessToken,
                    contact_id: globals.messages.contactID,
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