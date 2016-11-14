function matchInit() {
    currentPage = "MATCH";
    
    $("#messages-side").click(function() {
            pageTransition("messages.html", messagesInit);
        });
    
    $("#addContactDiv" ).load( "addContact.html", function() {
        //Whenever the search bar in add contact page is changed
        $("#addContactSearchInput").on("input propertychange paste", function() {
            var search = $("#addContactSearchInput").val();
            if (search === "") {    //This is just because the server wants "*" for everything
                search = "*";
            }

            $.ajax({
                type: "POST",
                dataType: "json",
                data: {type: "search", search: search},
                url: SERVER_ADDRESS,
                success: function(data) {
                    var names = data.split(" ");
                    $("#addContactListBackground").html("");    //Wipe it
                    for (var i = 0; i < names.length; i++) {
                        $("#addContactListBackground").append("<div id=\"addContactUser" + names[i] + "\" class=\"listItem addContactListItem\"><p class=\"listItemText\">" + names[i] + "</p></div>");
                    }

                    //When a list item in the addContacts div is clicked
                    $(".addContactListItem").click(function() {
                        if ('#' + addContactSelected != undefined) {
                            $(addContactSelected).css("background-color", "white");
                        }

                        addContactSelected = $(this).attr("id");
                        $(this).css("background-color", "blue");
                    });
                },
            });
        });
        
        //The back button on the addContacts page is clicked
        $("#settings-side").click(function() {
            pageTransition("#addContactDiv", "#contactsDiv");
        });
         
        //The add contact button on the add contact page was clicked
        $("#addContactAddContact").click(function() {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {type: "c_request_1", user1: currentUser, user2: addContactSelected.split("addContactUser")[1]},
                url: SERVER_ADDRESS,
                success: function(data) {

                },
            });
        });
    });
}