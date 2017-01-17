function signupPage1() {
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            at: fbResponse.authResponse.accessToken
        },
        url: SERVER_ADDRESS + '/login.php',
        success: function(data) {
            console.log(data);
            $("#firstnameInput").val(data[1].split(' ')[0])
            $("#lastnameInput").val(data[1].split(' ')[1])
        },
    }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
        $("#infoText").html("Connection Failure)");
        console.log(textStatus);
    });
    
    //The sign up button on the sign up page was pressed
    $("#next").click(function() {
            $("#infoText").html("Validating...");
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {ato: fbResponse.authResponse.accessToken, type: "signup_personal", DOB: $("#userDOB").val(), pref: $("#preferenceInput").val()},
                url:  SERVER_ADDRESS + '/user_details.php',
                success: function(data){
                    console.log(data);
                    if (data[0] === "1") {
                        $("#infoText").html("Data Updated");
                        pageTransition("signup/page2.html", signupPage2);
                    }
                    else if (data === "2") {
                        $("#infoText").html("Authentication Failed");
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