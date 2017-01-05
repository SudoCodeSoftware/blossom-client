function chatInit() {
    //The back button on the contacts page is clicked
    $("#back-button").click(function() {
        pageTransition("messages.html", messagesInit);
    });
    
    
    //Fill the messages list
    //This request is for getting active conversations
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
            console.log(data);
            /*
            <div class="talk-bubble tri-right round btm-right-in user">
              <div class="talktext">
                <p>Please stop messaging me.</p>
              </div>
            </div>*/
        },
    }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            console.log(textStatus);
    });
    
    $("#listBackground").click(function() {
        chatContactSelected = $(this).text();
        pageTransition("messages.html", messagesInit);
    });
    /*
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            ato: accessToken,
            contact_id: contactID,
            req_type: "send",
            message: "nudes plz"
        },
        url: SERVER_ADDRESS + "/chat.php",
        success: function(data) {
            console.log(data);
        },
    }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            console.log(textStatus);
    });*/
}