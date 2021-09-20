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
LOGIN ACTIVITY
******************************************************************************************/

let log = JSON.parse('[]');                                                                             // stores all cars returned from the server

// fetch all activities
fetch('/activity', {                                                                                    // send get request to fetch all cars in the system
    method: 'get',
}).then(res => res.text()).then(res => {
    log = JSON.parse(res);                                                                              // parse returned json object to cars
    
    // add a flex box for each activity
    for (let i in log) {
      addLog(log[i].timestamp, log[i].user);                                                            // create a new flex box and add it to the main page
    }
});


// create a new flex box and add it to the main page
function addLog(timestamp, user) {
    const div = document.createElement('div');                                                          // create new div

    div.className = 'flex_log_data';                                                                    // set div class
    
    // add all information about the car as innerHTML of the created div
    div.innerHTML = timestamp + ` : `+ user;
    
    document.getElementById('log_users').appendChild(div);                                               // finally add the created div to the main page
}

