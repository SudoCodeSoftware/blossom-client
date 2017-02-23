$("#loginDiv").css({perspective: 500, rotateY: 0});

var globals = {};   //Can have stuff shoved in it for communication between pages
var SERVER_ADDRESS = "https://www.sudo-code.com/cgi-bin";

$(document).ready(function() {
    $("#page2").hide();
    
    globals.accessToken = window.localStorage.getItem("accessToken");
    globals.userID = window.localStorage.getItem("userID");
    
    globals.profile = {};
    
    waitForKeyboardToDeignToJoinUs();
    
    initApp();
    
    //if (device.platform != "browser") {
    //    initApp();  //This happens in statusChangeCallback for browser
    //}
});

function waitForKeyboardToDeignToJoinUs() {
    if (typeof(Keyboard) == "undefined") {
        setTimeout(function() {
            waitForKeyboardToDeignToJoinUs();
        }, 250);
    }

    else {
        Keyboard.shrinkView(true);
    }
}

function initApp() {
    if (globals.accessToken == undefined || globals.userID == undefined) {
        pageTransition("login.html", loginInit);
    }
    
    else {
        verifyAccessToken();
    }
}

function getAgeFromBirthdate(birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

//Makes the string safe to stick in HTML
function sanitizeString(string) {
    var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}

//Undoes sanitization (for displaying, for example, in edit textboxes)
function unsanitizeString(string) {
    var parser = new DOMParser;
    var dom = parser.parseFromString(
        '<!doctype html><body>' + string,
        'text/html');
    return dom.body.textContent;
}

function showLoader() {
    $("body").append('<div id="loading-overlay" class="modalOverlay">');
    $("#loading-overlay").append('<div class="main-loader centered"></div>');
}

function hideLoader() {
    $("#loading-overlay").remove();
}

function pageTransition(pageURL, initFunction) {
    hideLoader();
    
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
            console.log(data);
            globals.profilePicURL = data[1];
            //pageTransition("signup/page1.html", signupPage1Init);
            
            if (data[0] === "2") {    //Username authentication failure
                pageTransition("login.html", loginInit);
            }
            else if (data[0] === "1a") {   //Success (User already exists)
                pageTransition("match.html", matchInit);
            }
            else if (data[0] === "1b") {   //Success (User doesn't already exist)
                globals.userName = data[2];
                pageTransition("signup/page1.html", signupPage1Init);
            }
        },
    }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
        console.log(textStatus);
    });
}