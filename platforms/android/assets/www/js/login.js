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
    
    //document.getElementById("mainloader").style.visibility = 'hidden';
    
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
                    facebookConnectPlugin.browserInit("303155660018639");
                }

                var fbLoginSuccess = function (userData) {
                    console.log(userData);
                    globals.fbAuthResponse = userData.authResponse;
                    globals.accessToken = globals.fbAuthResponse.accessToken;
                    globals.userID = globals.fbAuthResponse.userID;
                    
                    window.localStorage.setItem('accessToken', globals.accessToken);
                    window.localStorage.setItem('userID', globals.userID);
                    
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