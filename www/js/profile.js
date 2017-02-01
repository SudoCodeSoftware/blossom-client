function profileInit() {
    currentPage = "PROFILE";
    
    var studyingUniChangeActive = false;
    
    //The back button is clicked
    $("#close-button").click(function() {
        pageTransition("match.html", matchInit);
    });
    
    //Only shown if they press the change button
    $("#profile-faculty-input").hide();
    $("#profile-degree-input").hide();
    
    if (globals.profile.userSelected != globals.userID) {
        $("#profile-studying-uni-change").hide();
        $("#profile-description-change").hide();
        $("#profile-socieities-change").hide();
    }
    
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
            
            $("#profile-faculty-input").hide();
            $("#profile-degree-input").hide();
            
            $("#profile-studying-uni-change").html("change");
            
            studyingUniChangeActive = false;
        }
        
        else {  //We're activiting edit mode
            $("#profile-faculty-input").show();
            $("#profile-degree-input").show();
            
            $("#profile-studying-uni-change").html("submit");
            
            studyingUniChangeActive = true;
        }
    });
    
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
            
            for (var i = 0; i < data.societies.length; i++) {
                $("#profile-societies").append("<li>- " + data.societies[i] + "</li>")
            }
        },
    }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
       console.log(textStatus);
    });
}