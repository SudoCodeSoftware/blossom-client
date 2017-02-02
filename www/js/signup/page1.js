function signupPage1Init() {
    $.ajax({
        type: "POST",
        //dataType: "json",
        data: {
            ato: globals.accessToken,
            type: "signup_personal",
            DOB: "420",
            preference: "attack helicopters"
        },
        url: SERVER_ADDRESS + '/user_details.php',
        success: function(data) {
            console.log(data);
            //$("#firstnameInput").val(data[1].split(' ')[0])
            //$("#lastnameInput").val(data[1].split(' ')[1])
        },
    }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
        $("#infoText").html("Connection Failure)");
        console.log(textStatus);
    });
    
    //The sign up button on the sign up page was pressed
    $("#signup-p1-next").click(function() {
            $("#infoText").html("Validating...");
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    ato: globals.accessToken, 
                    type: "signup_personal", 
                    DOB: $("#userDOB").val(), 
                    pref: $("#preferenceInput").val()},
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
        });

    //The back button on the Sign up page is clicked
    $("#back").click(function() {
        pageTransition("login.html", loginInit);
    });
}