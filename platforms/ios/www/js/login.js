function loginInit() {
    currentPage = "LOGIN";
    
    document.getElementById("mainloader").style.visibility = 'hidden';
    //Login on the login page clicked
    $("#login").click(function() {
        document.getElementById("mainloader").style.visibility = 'visible';
        $("#infoText").html("Authenticating...");
        
        var access_token;
        console.log("Authenticating");
        if (device.platform == "browser"){
            if (fbResponse.authResponse.accessToken != undefined)
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    at: fbResponse.authResponse.accessToken
                },
                url: SERVER_ADDRESS + '/login.php',
                success: function(data) {
                    if (data[0] === "2") {    //Username authentication failure
                        $("#infoText").html("Authentication Failure");
                    }
                    else if (data[0] === "1a") {   //Success (User already exists)
                        $("#infoText").html("&nbsp;");   //Get rid of the text in case the user returns to the login page
                        pageTransition("match.html", matchInit);
                    }
                    else if (data[0] === "1b") {   //Success (User doesn't already exist)
                        $("#infoText").html("&nbsp;");   //Get rid of the text in case the user returns to the login page
                        pageTransition("signup/page1.html", signupPage1);
                    }
                },
            }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
                $("#infoText").html("Connection Failure");
                console.log(textStatus);
            });
        
        if (fbResponse === undefined) {
                FB.login();
            } 
        } else {
                permissions = 'email,public_profile';
                appId = '303510073316531';
                redirectUrl = 'http://localhost:3000/';
                authorize_url  = "https://m.facebook.com/dialog/oauth?";
                authorize_url += "client_id=" + appId;
                authorize_url += "&redirect_uri=" + redirectUrl;
                authorize_url += "&display=touch";
                authorize_url += "&response_type=token";
                authorize_url += "&type=user_agent";

                if (permissions !== '') {
                    authorize_url += "&scope=" + permissions;
                }


                var appInBrowser = window.open(authorize_url, '_blank');

                appInBrowser.addEventListener('loadstart', function(location) {

                    if (location.url.indexOf("access_token") !== -1) {
                        //Success
                        window.localStorage.setItem('facebook_accessToken', location.url.match(/access_token=(.*)$/)[1].split('&expires_in')[0]);
                          $.ajax({
                                type: "POST",
                                dataType: "json",
                                data: {
                                    at: location.url.match(/access_token=(.*)$/)[1].split('&expires_in')[0]
                                },
                                url: SERVER_ADDRESS + '/login.php',
                                success: function(data) {
                                    if (data[0] === "2") {    //Username authentication failure
                                        $("#infoText").html("Authentication Failure");
                                    }
                                    else if (data[0] === "1a") {   //Success (User already exists)
                                        $("#infoText").html("&nbsp;");   //Get rid of the text in case the user returns to the login page
                                        pageTransition("match.html", matchInit);
                                    }
                                    else if (data[0] === "1b") {   //Success (User doesn't already exist)
                                        $("#infoText").html("&nbsp;");   //Get rid of the text in case the user returns to the login page
                                        pageTransition("signup/page1.html", signupPage1);
                                    }
                                },
                            }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
                                $("#infoText").html("Connection Failure");
                                console.log(textStatus);
                            });
                        appInBrowser.close();
                    }

                    if (location.url.indexOf("error_reason=user_denied") !== -1) {
                        //User denied
                        $("#infoText").html("Authentication Error");
                        window.localStorage.setItem('facebook_accessToken', null);
                        appInBrowser.close();
                    }
                });
            }
        
       document.getElementById("mainloader").style.visibility = 'hidden';
            
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                at: fbResponse.authResponse.accessToken
            },
            url: SERVER_ADDRESS + '/login.php',
            success: function(data) {
                console.log(data);
                if (data[0] === "2") {    //Username authentication failure
                    $("#infoText").html("Authentication Failure");
                }
                else if (data[0] === "1a") {   //Success (User already exists)
                    $("#infoText").html("&nbsp;");   //Get rid of the text in case the user returns to the login page
                    pageTransition("match.html", matchInit);
                }
                else if (data[0] === "1b") {   //Success (User doesn't already exist)
                    $("#infoText").html("&nbsp;");   //Get rid of the text in case the user returns to the login page
                    pageTransition("signup/page1.html", signupPage1);
                }
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            $("#infoText").html("Connection Failure");
            console.log(textStatus);
        });
        
        
    });
}