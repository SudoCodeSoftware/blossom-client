$("#loginDiv").css({perspective: 500, rotateY: 0});

var SERVER_ADDRESS = "https://www.sudo-code.com/cgi-bin";
var profilePicURL;
var currentPage;
var accessToken;
var userID;     //FB ID of the user
var contactID;  //FB ID of the current contact (e.g. on the conversation page)

$(document).ready(function() {
    pageTransition("splash.html", function() {});
    
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
        pageTransition("login.html", loginInit);
        //verifyAccessToken();
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

function verifyAccessToken() {
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            at: accessToken
        },
        url: SERVER_ADDRESS + '/login.php',
        success: function(data) {
            profilePicURL = data[1];

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