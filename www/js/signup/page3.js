function signupPage3Init() {
    globals.currentPage = "SIGNUP_P3";
    
    $("#signup-p3-next").click(function() {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                ato: globals.accessToken,
                req_type: "verifyZid2", 
                verificationToken: $("#signup-p3-code-input").val()
            },
            url: SERVER_ADDRESS + '/user_details.php',
            success: function(data) {
                console.log(data);
                
                if (data[0] == 0) {    //Correct code
                    globals.university = data[1];
                    pageTransition("signup/page4.html", signupPage4Init);
                }
                
                else {
                    //Tell them they got it wrong
                }
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            console.log(textStatus)
        });
    });
    
    $("#signup-p3-back").click(function() {
        pageTransition("signup/page2.html", signupPage2Init);
    });
}