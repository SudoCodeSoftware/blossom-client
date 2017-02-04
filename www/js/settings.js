function settingsInit() {
    globals.currentPage = "SETTINGS";

    //The back button is clicked
    $("#settings-messages-side").click(function() {
        pageTransition("match.html", matchInit);
    });
}
