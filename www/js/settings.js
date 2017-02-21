function settingsInit() {
    globals.currentPage = "SETTINGS";
    
    var genderPreferences = [];

    $("#settings-delete-popup").hide();
    
    //The back button is clicked
    $("#settings-messages-side").click(function() {
        pageTransition("match.html", matchInit);
    });
    
    $("#settings-DOB").change(function() {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                ato: globals.accessToken,
                req_type: "editProfile",
                field: "age",
                data: $("#settings-DOB").val()
            },
            url: SERVER_ADDRESS + '/settings.php',
            success: function(data) {
                console.log(data);
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
           console.log(textStatus);
        });
    });
    
    $("#settings-identity-input").change(function() {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                ato: globals.accessToken,
                req_type: "editProfile",
                field: "gender",
                data: $("#settings-identity-input").val()
            },
            url: SERVER_ADDRESS + '/settings.php',
            success: function(data) {
                console.log(data);
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
           console.log(textStatus);
        });
    });
    
    $("#settings-delete-account").click(function() {
        $("#settings-delete-popup").show();
    });
    
    $("#confirm-delete-account").click(function() {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                ato: globals.accessToken,
                req_type: "deleteAccount"
            },
            url: SERVER_ADDRESS + '/settings.php',
            success: function(data) {
                $("#settings-delete-popup").hide();
                
                pageTransition("login.html", loginInit);
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
           console.log(textStatus);
        });
    });
    
    $("#cancel-delete-account").click(function() {
        $("#settings-delete-popup").hide();
    });
    
    function sendGenderPreferences() {
        genderPreferences = [];
        
        if ($("#settings-men-preference").prop("checked")) {
            genderPreferences.push("Male");
        }
        
        if ($("#settings-women-preference").prop("checked")) {
            genderPreferences.push("Female");
        }
        
        if ($("#settings-non-binary-preference").prop("checked")) {
            genderPreferences.push("Non-Binary");
        }
        
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                ato: globals.accessToken,
                req_type: "editProfile",
                field: "gender_preference",
                data: genderPreferences.join(String.fromCharCode(31))
            },
            url: SERVER_ADDRESS + '/settings.php',
            success: function(data) {
                console.log(data);
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
           console.log(textStatus);
        });
    }
    
    $("#settings-men-preference").change(function() {
        sendGenderPreferences();
    });
    
    $("#settings-women-preference").change(function() {
        sendGenderPreferences();
    });
    
    $("#settings-non-binary-preference").change(function() {
        sendGenderPreferences();
    });
    
    showLoader();
    
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            ato: globals.accessToken,
            user_id: globals.userID,
            req_type: "getProfile"
        },
        url: SERVER_ADDRESS + '/settings.php',
        success: function(data) {
            console.log(data);
            
            $("#settings-DOB").val(data.age);
            $("#settings-identity-input").val(data.gender);
            
            genderPreferences = data.gender_preference.split(String.fromCharCode(31));
            
            //If Male is in the gender prefernces
            if (genderPreferences.indexOf("Male") != -1) {
                $("#settings-men-preference").prop("checked", true);
            }
            
            //If Female is in the gender preferences
            if (genderPreferences.indexOf("Female") != -1) {
                $("#settings-women-preference").prop("checked", true);
            }
            
            //If Non-Binary is in the gender prefernces
            if (genderPreferences.indexOf("Non-Binary") != -1) {
                $("#settings-non-binary-preference").prop("checked", true);
            }
            
            hideLoader();
        },
    }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
       console.log(textStatus);
    });
}
