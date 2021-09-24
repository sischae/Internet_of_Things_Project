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




/******************************************************************************************
SWITCH MODE
******************************************************************************************/

// DEMONSTRATION ONLY
document.getElementById("trigger_loading_animation").addEventListener("click", function() {
    document.getElementById("overlay").style.display = "block";
    setTimeout(function() {
        document.getElementById("overlay").style.display = "none";
    }, 2000);
});

