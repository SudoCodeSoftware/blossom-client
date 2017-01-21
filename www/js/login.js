function loginInit() {
    globals.currentPage = "LOGIN";

    setInterval(function() { 
        $('#slideshow > div:first')
            .fadeOut(2000)
            .next()
            .fadeIn(500)
            .end()
            .appendTo('#slideshow');
    }, 6000);
    
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
                    var fbAuthResponse = userData.authResponse;
                    accessToken = fbAuthResponse.accessToken;
                    globals.userID = fbAuthResponse.userID;
                    console.log(userData);
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