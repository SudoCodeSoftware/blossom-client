function loginInit() {
    currentPage = "LOGIN";
    
    $("#slideshow > div:gt(0)").hide();

    setInterval(function() { 
        $('#slideshow > div:first')
            .fadeOut(2000)
            .next()
            .fadeIn(500)
            .end()
            .appendTo('#slideshow');
    }, 6000);
    
    function verifyAccessToken() {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                at: accessToken
            },
            url: SERVER_ADDRESS + '/login.php',
            success: function(data) {
                if (data[0] === "2") {    //Username authentication failure
                    $("#infoText").html("Authentication Failure");
                }
                else if (data[0] === "1a") {   //Success (User already exists)
                    pageTransition("match.html", matchInit);
                }
                else if (data[0] === "1b") {   //Success (User doesn't already exist)
                    pageTransition("signup/page1.html", signupPage1);
                }
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            console.log(textStatus);
        });
    }
    
    document.getElementById("mainloader").style.visibility = 'hidden';
    
    //Login on the login page clicked
    $("#login").click(function() {
        function waitForFacebookToDeignToJoinUs() {
            if (typeof(facebookConnectPlugin) == "undefined") {
                setTimeout(function() {
                    waitForFacebookToDeignToJoinUs();
                }, 250);
            }

            else {
                if (window.cordova.platformId == "browser") {
                    facebookConnectPlugin.browserInit("303510073316531");
                }

                var fbLoginSuccess = function (userData) {
                    accessToken = userData.authResponse.accessToken;
                    window.localStorage.setItem('accessToken', accessToken);
                    verifyAccessToken();
                }

                facebookConnectPlugin.login(["public_profile"],
                    fbLoginSuccess,
                    function (error) {
                        console.log(error);
                    }
                );
            }
        }
    
        waitForFacebookToDeignToJoinUs();
    });
}