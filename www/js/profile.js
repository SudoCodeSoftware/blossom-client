function profileInit() {
    currentPage = "PROFILE";
    
    //The back button is clicked
    $("#close-button").click(function() {
        pageTransition("match.html", matchInit);
    });
    
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