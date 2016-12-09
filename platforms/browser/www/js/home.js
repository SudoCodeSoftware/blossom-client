function homeInit() {
    currentPage = "HOME";
    
    $("#messages").click(function() {
        pageTransition("conversation.html", conversationInit);
    });

    $("#createConversation").click(function() {
         $.ajax({
            type: "POST",
            //dataType: "json",
            data: {
                req_type: 'create',
                ato: fbResponse.authResponse.accessToken, 
                contact_id: '10153893995894037'
            },
            url: SERVER_ADDRESS + '/chat.php',
            success: function(data) {
                console.log(data);
                if (data[0] === "2") {    //Username authentication failure
                    $("#infoText").html("Authentication Failure");
                }
                else if (data[0] === "1") {   //Success (User already exists)
                    pageTransition("home.html", homeInit);
                }
                else if (data[0] === "1a") {   //Success (User doesn't already exist)
                    pageTransition("signup/page1.html", signupPage1);
                }
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            $("#infoText").html("Connection Failure)");
            console.log(textStatus);
        });    
    
    });

    $("#match").click(function() {
        pageTransition("#homeDiv", "conRequestsDiv");
    });
}