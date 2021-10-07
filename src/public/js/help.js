'use strict';

/******************************************************************************************
LOGOUT
******************************************************************************************/

document.getElementById("logout").addEventListener("click", function() {
    // send request to officially log out
    var logout_request = new XMLHttpRequest();
    logout_request.open( "GET", '/req_logout', false );
    logout_request.send( null );
    
    // send invalid request to log out
    var logout = new XMLHttpRequest();
    logout.open("GET", "/logout", true, "invalid", "invalid");
    logout.send();

    // forward user to logout page
    setTimeout(function () {
        window.location.href = "/logout";
    }, 10);
});

function add_logout_listener() {
    document.getElementById("menu_logout_text").addEventListener("click", function() {
        // send request to officially log out
        var logout_request = new XMLHttpRequest();
        logout_request.open( "GET", '/req_logout', false );
        logout_request.send( null );
        
        // send invalid request to log out
        var logout = new XMLHttpRequest();
        logout.open("GET", "/logout", true, "invalid", "invalid");
        logout.send();

        // forward user to logout page
        setTimeout(function () {
            window.location.href = "/logout";
        }, 10);
    });
}

add_logout_listener();




/******************************************************************************************
HELP PAGES
******************************************************************************************/

var help_button_back = document.getElementById("help_button_back");
var help_button_next = document.getElementById("help_button_next");



help_button_back.addEventListener("click", function() {
    // show last page
    
    // check if buttons need to get enabled/disabled
});

help_button_next.addEventListener("click", function() {
    // show next page
    
    // check if buttons need to get enabled/disabled
});
