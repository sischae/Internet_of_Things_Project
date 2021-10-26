'use strict';

/******************************************************************************************
LOGOUT
******************************************************************************************/

document.getElementById("logout").addEventListener("click", function(e) {
    e.preventDefault();
    
    fetch('/req_logout', {
        method: 'get',
    }).then(res => {
        if(res.status == 200) {
            logout(function (err) {
                if (err) {
                    throw err;
                }
                
                ws_client.close();                                                                      // close websocket connection
                window.location.href = "/logout";
            });
        }
    });
});

document.getElementById("menu_logout_text").addEventListener("click", function(e) {
    e.preventDefault();
    
    fetch('/req_logout', {
        method: 'get',
    }).then(res => {
        if(res.status == 200) {
            logout(function (err) {
                if (err) {
                    throw err;
                }
                
                ws_client.close();                                                                      // close websocket connection
                window.location.href = "/logout";
            });
        }
    });
});


function logout (done) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/logout", true, "invalid", "invalid");
    xhr.onload = function () {
        done(null, xhr.response);
    };
    xhr.onerror = function () {
        done(xhr.response);
    };
    xhr.send();
}




/******************************************************************************************
WEBSOCKET
******************************************************************************************/

// setup connection to the WebsocketServer
var ws_client = new WebSocket('ws://localhost:8000');
var last_err = false;

ws_client.onopen = () => {
    
    ws_client.send('connect_help');                                                                     // connect as control panel
    
    ws_client.onmessage = (message) => {
        let msg = JSON.parse(message.data);
        
        if(msg.id == "error") {
            let recent_error = 0;
            
            try {
                recent_error = document.cookie.split('; ').find(row => row.startsWith('error=')).split('=')[1];
            } catch (e) {
                document.cookie = "error=" + msg.error;
                
            }
            
            if(recent_error != msg.error) {
                document.cookie = "error=" + msg.error;
                alert('[WARNING]\r\nThe target pressure was set to ' + msg.setpoint + 'Pa but could not be reached in a reasonable time!\r\nCurrent pressure: ' + msg.pressure + 'Pa');
            }
        }
    };
};


window.onbeforeunload = function() {
    ws_client.onclose = function () {};                                                                 // disable onclose handler
    ws_client.close();                                                                                  // close websocket connection
};




/******************************************************************************************
ACCORDION
******************************************************************************************/

var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
    } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
    }
});
}
