$("#loginDiv").css({perspective: 500, rotateY: 0});

var globals = {};   //Can have stuff shoved in it for communication between pages
var SERVER_ADDRESS = "https://www.sudo-code.com/cgi-bin";

$(document).ready(function() {
    pageTransition("splash.html", function() {});
    
    globals.accessToken = window.localStorage.getItem("accessToken");
    
    //if (device.platform != "browser") {
        initApp();  //This happens in statusChangeCallback for browser
    //}
});

function initApp() {
    if (globals.accessToken == undefined) {
        pageTransition("login.html", loginInit);
    }
    
    else {
        pageTransition("login.html", loginInit);
        //verifyAccessToken();
    }
}

function pageTransition(pageURL, initFunction) {
    if ($("#page1").is(":visible")) {
        $("#page2").load(pageURL, function() {
            initFunction();
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
                            
                        }
                    );
                }
            );
        });
    }
    else {
        $("#page1").load(pageURL, function() {
            initFunction();
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
                            
                        }
                    );
                }
            );
        });
    }
}

function verifyAccessToken() {
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            at: globals.accessToken
        },
        url: SERVER_ADDRESS + '/login.php',
        success: function(data) {
            globals.profilePicURL = data[1];

            if (data[0] === "2") {    //Username authentication failure
                pageTransition("login.html", loginInit);
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