function matchInit() {
    globals.currentPage = "MATCH";

    $("#user-portrait").css("background-image", "url('" + globals.profilePicURL + "')");

    var matches = [0];  //the 0 is shifted off the end on the first card swap
    var matchCacheSize = 3; //how many matches before more are fetched

    //Chat button at top right
    $("#messages-side").click(function() {
        pageTransition("messages.html", messagesInit);
    });

    //Tick button (bottom right)
    $("#tick").click(function() {
        console.log(matches[0]);
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                ato: globals.accessToken,
                matchId: matches[0].fb_id,
                req_type: "ticked"
            },
            url: SERVER_ADDRESS + '/match.php',
            success: function(data) {
                console.log(data);
                if (data[0] != '0') {   //The other person matched
                    $("#match-ticked-popup").load("tickPopup.html", function() {

                        $("#close-match-popup").click(function() {
                            $("#match-ticked-popup").html("");
                        });

                        $("#match-popup-match-pic").css("background-image", "url('" + data[1].cover + "')");

                        $("#new_match_poppup_user_name").html(data[1].name);
                    });
                }
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            console.log(textStatus);
        });

        nextCard();
    });

    //Cross button (bottom left)
    $("#cross").click(function() {
        nextCard();
    });

    $("#user-portrait").click(function() {
        globals.profile.userSelected = globals.userID;
        pageTransition("profile.html", profileInit);
    });

    $("#settings-side").click(function() {
        pageTransition("settings.html", settingsInit);
    });

    initMatches();

    //Identical to updateMatches, except that this
    //automatically loads the first card
    function initMatches() {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                ato: globals.accessToken
            },
            url: SERVER_ADDRESS + '/match.php',
            success: function(data) {
                if (data[0] != '0') {   //If there are matches
                    matches = matches.concat(data);
                    nextCard();
                }
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            console.log(textStatus);
        });
    }

    function updateMatches() {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                ato: globals.accessToken
            },
            url: SERVER_ADDRESS + '/match.php',
            success: function(data) {
                matches = matches.concat(data);
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
            console.log(textStatus);
        });
    }

    function nextCard() {
        matches.shift();

        //There are two cards, one being visible, the other one
        //being the buffer card that has everything loaded into it
        //before the cards being switched
        if ($("#match-card-1").is(":visible")) {
            $("#card-2-name").html(matches[0].name);
            $("#card-2-age").html(matches[0].age);
            $("#card-2-image").css("background-image", "url('" + matches[0].photo + "')");

            $("#card-2-image").click(function() {
                globals.profile.userSelected = matches[0].fb_id;
                pageTransition("profile.html", profileInit);
            });

            if (matches[0].photo === null) {
                $("#card-1-image").css("background-color", "black");
            }

            $("#match-card-1").animate({
                    opacity: 0.0
                },
                200,
                "linear",
                function() {
                    $("#match-card-1").hide();
                    $("#match-card-2").show();

                    $("#match-card-2").animate({
                            opacity: 1.0
                        },
                        200,
                        "linear",
                        function() {

                        }
                    );
                }
            );
        }

        else {
            $("#card-1-name").html(matches[0].name);
            $("#card-1-age").html(matches[0].age);
            $("#card-1-image").css("background-image", "url('" + matches[0].photo + "')");

            $("#card-1-image").click(function() {
                globals.profile.userSelected = matches[0].fb_id;
                pageTransition("profile.html", profileInit);
            });

            if (matches[0].photo === null) {
                $("#card-1-image").css("background-color", "black");
            }

            $("#match-card-2").animate({
                    opacity: 0.0
                },
                200,
                "linear",
                function() {
                    $("#match-card-2").hide();
                    $("#match-card-1").show();

                    $("#match-card-1").animate({
                            opacity: 1.0
                        },
                        200,
                        "linear",
                        function() {

                        }
                    );
                }
            );
        }

        if (matches.length <= matchCacheSize) {
            updateMatches();
        }
    }
}
