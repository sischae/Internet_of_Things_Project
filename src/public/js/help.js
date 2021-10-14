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
WEBSOCKET
******************************************************************************************/

// setup connection to the WebsocketServer
var ws_client = new WebSocket('ws://localhost:8000');
var last_err = false;

ws_client.onopen = () => {
    
    ws_client.send('connect_help');                                                                                           // connect as control panel
    
    ws_client.onmessage = (message) => {
        let msg = JSON.parse(message.data);
        
        if(msg.id == "error") {
            alert('[WARNING]\r\nThe target pressure was set to ' + msg.setpoint + 'Pa but could not be reached in a reasonable time!\r\nCurrent pressure: ' + msg.pressure + 'Pa');
        }
    };
};

