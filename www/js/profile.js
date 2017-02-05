function profileInit() {
    globals.currentPage = "PROFILE";
    
    var UNSWSocieties = ["BSoc", "UNSW Equestrian", "Tea &amp; Coffee", "AnimeSoc", "Karl Marx Dick-Riding Soc"];
    var UTSSocities = ["VidyaSoc", "BurritoSoc"];
    var USydSocieties = ["USydStuff1", "USydStuff2", "USydStuff3"];
    
    var studyingUniChangeActive = false;
    var descriptionChangeActive = false;
    var societyChangeActive = false;
    
    var userUniversity;
    var userSocieties;
    
    //Only shown if they press the change button
    $("#profile-faculty-input").hide();
    $("#profile-degree-input").hide();
    $("#profile-description-input").hide();
    $("#societyInput").hide();
    
    //If it's another user's profile (they can't edit it)
    if (globals.profile.userSelected != globals.userID) {
        $("#profile-studying-uni-change").hide();
        $("#profile-description-change").hide();
        $("#profile-socieities-change").hide();
    }
    
    //The back button is clicked
    $("#close-button").click(function() {
        pageTransition("match.html", matchInit);
    });
    
    $("#profile-studying-uni-change").click(function() {
        if (studyingUniChangeActive) {  //We're deactivating edit mode and submitting
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    ato: globals.accessToken,
                    req_type: "editProfile",
                    field: "faculty",
                    data: $("#profile-faculty-input").find(":selected").text()
                },
                url: SERVER_ADDRESS + '/settings.php',
                success: function(data) {
                    console.log(data);
                },
            }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
               console.log(textStatus);
            });
            
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    ato: globals.accessToken,
                    req_type: "editProfile",
                    field: "degree",
                    data: $("#profile-degree-input").find(":selected").text()
                },
                url: SERVER_ADDRESS + '/settings.php',
                success: function(data) {
                    console.log(data);
                },
            }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
               console.log(textStatus);
            });
            
            $("#profile-degree").html($("#profile-degree-input").find(":selected").text());
            $("#profile-studying-uni-change").html("change");
            
            $("#profile-faculty-input").hide();
            $("#profile-degree-input").hide();
            
            studyingUniChangeActive = false;
        }
        
        else {  //We're activiting edit mode
            $("#profile-faculty-input").show();
            $("#profile-degree-input").show();
            
            $("#profile-studying-uni-change").html("submit");
            
            studyingUniChangeActive = true;
        }
    });
    
    $("#profile-description-change").click(function() {
        if (descriptionChangeActive) {  //We're deactivating edit mode and submitting
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    ato: globals.accessToken,
                    req_type: "editProfile",
                    field: "description",
                    data: $("#profile-description-input").val()
                },
                url: SERVER_ADDRESS + '/settings.php',
                success: function(data) {
                    console.log(data);
                },
            }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
               console.log(textStatus);
            });
            
            $("#profile-description").html(sanitizeString($("#profile-description-input").val()));
            $("#profile-description-change").html("edit");
            
            $("#profile-description-input").hide();
            $("#profile-description").show();
            
            descriptionChangeActive = false;
        }
        
        else { //We're activating edit mode
            $("#profile-description-input").val($("#profile-description").html());
            $("#profile-description-input").show();
            $("#profile-description").hide();
            $("#profile-description-change").html("submit");
            
            descriptionChangeActive = true;
        }
        
    });
    
    $("#profile-faculty-input").change(function() {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                ato: globals.accessToken,
                req_type: "retrieveDegrees",
                faculty: $("#profile-faculty-input").find(":selected").text()
            },
            url: SERVER_ADDRESS + '/settings.php',
            success: function(data) {
                console.log(data);
                $("#profile-degree-input").html('<option value="" disabled selected>degree</option>');
                
                for (var i = 0; i < data.length; i++) {
                    $("#profile-degree-input").append('<option value="degree-code">' + data[i] + '</option>');
                }
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
           console.log(textStatus);
        });
    });
    
    $("#societyInput").change(function() {
        userSocieties.push($("#societyInput").find(":selected").text()) 
    });
    
    $("#profile-socieities-change").click(function() {
        
        //We're closing edit mode. Submit and close
        if (societyChangeActive) {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    ato: globals.accessToken,
                    req_type: "editProfile",
                    field: "societies",
                    data: userSocieties.join(String.fromCharCode(31))
                },
                url: SERVER_ADDRESS + '/settings.php',
                success: function(data) {
                    console.log(data);
                },
            }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
               console.log(textStatus);
            });
            
            $("#profile-societies").append('\
                <tr>\
                    <td class="engulf">• ' + userSocieties[userSocieties.length - 1] + '</td>\
                    <td class="delete-society-option delete-col"><i class="fa fa-times-circle-o" aria-hidden="true"></i></td>\
                </tr>'
            )
            
            $("#societyInput").hide();
            $("#profile-socieities-change").html("change");
            
            enableSocietyDelete();
            
            societyChangeActive = false;
        }
        
        //We're opening edit mode
        else {
            $("#societyInput").show();
            $("#profile-socieities-change").html("add");
            
            societyChangeActive = true;
        }
    });
    
    //Needs to be re-run every time a new society is added
    function enableSocietyDelete() {
        $(".delete-society-option").click(function() {
            userSocieties.pop();

            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    ato: globals.accessToken,
                    req_type: "editProfile",
                    field: "societies",
                    data: userSocieties.join(String.fromCharCode(31))
                },
                url: SERVER_ADDRESS + '/settings.php',
                success: function(data) {
                    console.log(data);
                },
            }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
               console.log(textStatus);
            });

            $(this).parent().remove();
        });
    }
    
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            ato: globals.accessToken,
            user_id: globals.profile.userSelected,
            req_type: "getProfile"
        },
        url: SERVER_ADDRESS + '/settings.php',
        success: function(data) {
            $("#profile-image").css("background-image", "url('" + data.cover + "')");
            $("#profile-name").html(data.username);
            $("#profile-age").html(data.age);
            $("#profile-degree").html(data.degree);
            $("#profile-uni").html(data.uni);
            $("#profile-description").html(data.description);
            
            userUniversity = data.uni;
            userSocieties = data.societies.split(String.fromCharCode(31));
            
            if (userSocieties[0] == "") {
                userSocieties = [];
            }
            
            //Populate the society list
            
            //If it's their own profile (they can edit it)
            if (globals.profile.userSelected == globals.userID) {
                for (var i = 0; i < userSocieties.length; i++) {
                    $("#profile-societies").append('\
                        <tr>\
                            <td class="engulf">• ' + userSocieties[i] + '</td>\
                            <td class="delete-society-option delete-col"><i class="fa fa-times-circle-o" aria-hidden="true"></i></td>\
                        </tr>'
                    )
                }
            }
            
            //It's not their own profile so they can't edit it
            else {
                for (var i = 0; i < userSocieties.length; i++) {
                    $("#profile-societies").append('\
                        <tr>\
                            <td class="engulf">• ' + userSocieties[i] + '</td>\
                        </tr>'
                    )
                }
            }
            
            enableSocietyDelete();
            
            //Populate the faculty list. This needs to be done after getProfile
            //since we need the university
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    ato: globals.accessToken,
                    req_type: "retrieveFaculties",
                    university: userUniversity
                },
                url: SERVER_ADDRESS + '/settings.php',
                success: function(data) {
                    for (var i = 0; i < data.length; i++) {
                        $("#profile-faculty-input").append('<option value="faculty-code">' + data[i] + '</option>');
                    }
                },
            }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
               console.log(textStatus);
            });
            
            //Populate the society list
            if (userUniversity == "UNSW") {
                for (var i = 0; i < UNSWSocieties.length; i++) {
                    $("#societyInput").append('<option value="soc-code">' + UNSWSocieties[i] + '</option>');
                }
            }
            
            else if (userUniversity == "UTS") {
                for (var i = 0; i < UTSSocities.length; i++) {
                    $("#societyInput").append('<option value="soc-code">' + UTSSocities[i] + '</option>');
                }
            }
            
            else if (userUniversity == "USyd") {
                for (var i = 0; i < USydSocieties.length; i++) {
                    $("#societyInput").append('<option value="soc-code">' + USydSocieties[i] + '</option>');
                }
            }
        },
    }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
       console.log(textStatus);
    });
}