function signupPage4Init() {
    globals.currentPage = "SIGNUP_P4";
    
    $("#signup-p4-faculty-input").change(function() {
        showLoader();
        
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                ato: globals.accessToken,
                req_type: "retrieveDegrees",
                faculty: $("#signup-p4-faculty-input").find(":selected").text()
            },
            url: SERVER_ADDRESS + '/settings.php',
            success: function(data) {
                $("#signup-p4-degree-input").html('<option value="" disabled selected>degree</option>');

                for (var i = 0; i < data.length; i++) {
                    $("#signup-p4-degree-input").append('<option value="degree-code">' + data[i] + '</option>');
                }
                
                hideLoader();
            },
        }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
           console.log(textStatus);
        });
    });
    
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            ato: globals.accessToken,
            req_type: "retrieveFaculties",
            university: globals.userUniversity
        },
        url: SERVER_ADDRESS + '/settings.php',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                $("#signup-p4-faculty-input").append('<option value="faculty-code">' + data[i] + '</option>');
            }
        },
    }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
       console.log(textStatus);
    });
    
    $("#signup-p4-next").click(function() {
        if ($("#signup-p4-faculty-input").val() != null &&
            $("#signup-p4-degree-input").val() != null &&
            $("#signup-p4-year-input").val() != null) {
            
            showLoader();
            
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    ato: globals.accessToken,
                    req_type: "editProfile",
                    field: "faculty",
                    data: $("#signup-p4-faculty-input").find(":selected").text()
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
                    data: $("#signup-p4-degree-input").find(":selected").text()
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
                    field: "year",
                    data: $("#signup-p4-year-input").val()
                },
                url: SERVER_ADDRESS + '/settings.php',
                success: function(data) {
                    console.log(data);
                    pageTransition("match.html", matchInit);
                },
            }).fail(function(dunnoWhatThisArgumentDoes, textStatus) {
               console.log(textStatus);
            });
        }
    });
    
    $("#signup-p4-back").click(function() {
        pageTransition("signup/page3.html", signupPage3Init);
    });
}