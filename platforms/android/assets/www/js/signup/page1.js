function signupPage1Init() {
    globals.currentPage = "SIGNUP_P1";
    
    $("#signup-p1-name").val(globals.userName);
    
    //The sign up button on the sign up page was pressed
    $("#signup-p1-next").click(function() {
        if ($("#signup-p1-DOB").val() != "" && $("#signup-p1-gender-input").val() != null) {
            $("body").append('<div class="modalOverlay">');
            
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    ato: globals.accessToken, 
                    req_type: "signup_personal", 
                    DOB: $("#signup-p1-DOB").val(), 
                    gender: $("#signup-p1-gender-input").find(":selected").text()
                },
                url:  SERVER_ADDRESS + '/user_details.php',
                success: function(data){
                    console.log(data);
                    if (data[0] === "1") {
                        pageTransition("signup/page2.html", signupPage2Init);
                    }
                    else if (data === "2") {
                        $("#infoText").html("Signup failed");
                        pageTransition("login.html", loginInit);
                    }
                },
            }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
                $("#onfoText").html("Connection Failure");
                console.log(textStatus);
            });
        }
    });

    //The back button on the Sign up page is clicked
    $("#back").click(function() {
        pageTransition("login.html", loginInit);
    });
}