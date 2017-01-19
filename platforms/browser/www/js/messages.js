function messagesInit() {
    currentPage = "MESSAGES";
    
    //Fill the messages list
    //This request is for getting active conversations
    $(".fa-arrow-left").click(function() {
        pageTransition("match.html", matchInit);
    });

    
    //TODO: Fix this
    function checkNewMessages() {
        if (currentPage === "MESSAGES") {
            /*$.ajax({
                type: "POST",
                //dataType: "json",
                data: {
                    ato: accessToken,
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
            }, 1000);*/
        }
    }
    
    //Initial message check
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            ato: accessToken,
            req_type: "active_conv"
        },
        url: SERVER_ADDRESS + "/chat.php",
        success: function(data) {
            console.log(data);
            $("#convo-container").html("");    //Wipe it
            
            for (var i = 0; i < data.length; i++) {
                var senderPicURL = data[i][3];
                var senderName = data[i][0];
                var senderID = data[i][1];
                var senderUni = data[i][2];
                var prevMessageSender = data[i][4][0];
                var prevMessage = data[i][4][1];
                
                if (prevMessageSender == "") {  //They're a new contact
                    $("#new-matches").append(
                        '<div id="person' + i.toString() + '" class="match-portrait" style="background-image: url(\''+ senderPicURL + '\');"></div>'
                    );
                }
                
                else {              //There's an existing conversation
                    $("#convo-container").append(
                        '<div id="person' + i.toString() + '" class="convo-section">\
                            <div class="image-section">\
                                <div class="convo-portrait" style="background-image: url(\''+ senderPicURL + '\');"></div>\
                            </div>\
                            <div class="text-section">\
                                <p class="message-sender"><span>' + senderName + '</span> from <span>' + senderUni + '</span></p>\
                                <br>\
                                <p class="last-message">' + prevMessageSender + '<i class="fa" aria-hidden="true"></i>:&nbsp' + prevMessage + '</p>\
                            </div>\
                        </div>'
                    );
                }
                
                $("#person" + i.toString()).data("fb_id", senderID);    //Stored for retrieval upon click
                $("#person" + i.toString()).data("name", senderName);
                
                $("#person" + i).click(function() {
                    contactID = $(this).data().fb_id;
                    contactName = $(this).data().name;
                    pageTransition("chat.html", chatInit);
                });
            }
            
            setTimeout(function(){ 
                checkNewMessages(); 
            }, 1000);
        },
    }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            console.log(textStatus);
    });
}