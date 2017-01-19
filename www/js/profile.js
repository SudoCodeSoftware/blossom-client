function profileInit() {
    currentPage = "PROFILE";
    
    //The back button is clicked
    $("#close-button").click(function() {
        pageTransition("match.html", matchInit);
    });
}