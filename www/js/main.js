$("#loginDiv").css({perspective: 500, rotateY: 0});

var SERVER_ADDRESS = "https://www.sudo-code.com/cgi-bin";
var addContactSelected;
var fbResponse;
var chatContactSelected;
var currentPage;
var accessToken;

$(document).ready(function() {
    pageTransition("splash.html", function() {});
    
    /*var fbLoginSuccess = function (userData) {
        console.log("UserInfo: ", userData);
    }*/
    
    accessToken = window.localStorage.getItem("accessToken");
    console.log(accessToken);
    //if (device.platform != "browser") {
        initApp();  //This happens in statusChangeCallback for browser
    //}
});

function initApp() {
    if (accessToken == undefined) {
        pageTransition("login.html", loginInit);
    }
    
    else {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                at: accessToken
            },
            url: SERVER_ADDRESS + '/login.php',
            success: function(data) {

                if (data[0] === "2") {    //Username authentication failure
                    pageTransition("login.html", loginInit);
                }
                else if (data[0] === "1a") {   //Success (User already exists)
                    pageTransition("match.html", matchInit);
                }
                else if (data[0] === "1b") {   //Success (User doesn't already exist)
                    pageTransition("signup/page1.html", signupPage1);
                }
                else {
                    pageTransition("login.html", loginInit);
                }
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            console.log("INIT FAILURE: " + textStatus);
            pageTransition("login.html", loginInit);
        });
    }
}

function pageTransition(pageURL, initFunction) {
    if ($("#page1").is(":visible")) {
        $("#page2").load(pageURL, function() {
            $("#page1").animate({
                    opacity: 0.0
                }, 
                200, 
                "linear", 
                function() {
                    $("#page1").hide();
                    $("#page2").show();

                    $("#page2").animate({
                            opacity: 1.0
                        },
                        200, 
                        "linear", 
                        function() {
                            $("#page1").html("");
                            initFunction();
                        }
                    );
                }
            );
        });
    }
    else {
        $("#page1").load(pageURL, function() {
            $("#page2").animate({
                    opacity: 0.0
                }, 
                200, 
                "linear", 
                function() {
                    $("#page2").hide();
                    $("#page1").show();

                    $("#page1").animate({
                            opacity: 1.0
                        }, 
                        200, 
                        "linear",
                        function() {
                            $("#page2").html("");
                            initFunction();
                        }
                    );
                }
            );
        });
    }
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {

    fbResponse = response;
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }

    if (device.platform == "browser") {
        accessToken = fbResponse.authResponse.accessToken;
    }
    
    initApp();
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '303510073316531',
        cookie     : true,  // enable cookies to allow the server to access 
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.5' // use graph api version 2.5
    });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) 
        return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));