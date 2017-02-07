function signupPage3Init() {
    globals.currentPage = "SIGNUP_P3";
    
    $("#signup-p3-next").click(function() {
        
    });
    
    $("#signup-p3-back").click(function() {
        pageTransition("signup/page2.html", signupPage2Init);
    });
}