function signupPage2Init() {
    globals.currentPage = "SIGNUP_P2";
    
    $("#signup-p2-next").click(function() {
        if ($("#signup-p2-emailInput").val() != "") {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    ato: globals.accessToken,
                    req_type: "verifyZid1", 
                    email: $("#signup-p2-emailInput").val()
                },
                url: SERVER_ADDRESS + '/user_details.php',
                success: function(data) {
                    console.log(data);
                    globals.verificationToken = data;
                    pageTransition("signup/page3.html", signupPage3Init);
                },
            }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
                console.log(textStatus)
            });
        }
    });

    $("#signup-p2-back").click(function() {
        pageTransition("signup/page1.html", signupPage1Init);
    });
}