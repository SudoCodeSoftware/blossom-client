function signupPage2() {
    $("#next").click(function() {
        $("#infoText").html("Validating...");
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {type: "signup_uni", email: $("#emailInput").val(), zid: $("#zIDInput").val(), degree: $("#degreeInput").val() , faculty:$("#faculty1Input").val() + String.fromCharCode(31) +$("#faculty2Input").val() , year: $("#yearInput").val(), ato: fbResponse.authResponse.accessToken },
            url: SERVER_ADDRESS + '/user_details.php',
            success: function(data) {
                console.log(data);
                if (data[0] === "1") {
                    $("#infoText").html("Data Updated");
                    pageTransition("home.html", homeInit);
                }
                else if (data === "2") {
                    $("#infoText").html("Authentication Failed");
                    pageTransition("login.html", loginInit);
                }
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            $("#infoText").html("Connection Failure");
        });
    });

    //The back button on the Sign up page is clicked
    $("#back").click(function() {
        pageTransition("signup/page1.html", pSignupInit);
    });
}