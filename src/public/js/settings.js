'use strict';

/******************************************************************************************
LOGOUT
******************************************************************************************/

document.getElementById("logout").addEventListener("click", function() {
    logout();
});


function logout() {
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
}




/******************************************************************************************
LOGIN ACTIVITY
******************************************************************************************/

let log = JSON.parse('[]');                                                                             // stores all cars returned from the server

// fetch all activities
fetch('/activity', {                                                                                    // send get request to fetch all cars in the system
    method: 'get',
}).then(res => res.text()).then(res => {
    log = JSON.parse(res);                                                                              // parse returned json object to cars
    
    
    let count = log.length;
    let list_length = 8;
    if(count < 8) list_length = count;
    
    // add a flex box for each activity
    for (let i = 0; i < list_length; i++) {
        addLog(log[i].timestamp, log[i].user);                                                          // create a new flex box and add it to the page
    }
    
    // fill list with placeholder items to keep same size
    if(list_length < 8) {
        for (let i = 0; i < (8 - list_length); i++) {
            addLog('&nbsp;', '');                                                                       // create a new spaceholder and add it to the list
        }
    }
    
    // add information about data access
    const info = document.createElement('div');                                                         // create new div
    info.innerHTML = `Only admins can see all users log-in activity.`;
    info.className = 'info'; 
    document.getElementById('log_users').appendChild(info);                                             // finally add the created div to the main page
});


// create a new flex box and add it to the main page
function addLog(timestamp, user) {
    const div = document.createElement('div');                                                          // create new div

    div.className = 'flex_log_data';                                                                    // set div class
    
    // add all information about the car as innerHTML of the created div
    div.innerHTML = timestamp + user;
    
    document.getElementById('log_users').appendChild(div);                                              // finally add the created div to the main page
}




/******************************************************************************************
SET NEW PASSWORD
******************************************************************************************/

document.getElementById('flex_acc_change_pw').addEventListener('submit', e => {
    e.preventDefault();
    let pw = document.getElementById('new_pw').value;                                                   // get password from form
    
    
    fetch('/change_password/?password=' + pw, {                                                         // send post request
        method: 'post',
    }).then(res => res).then(res => {
        if(res.status == 200) {                                                                         // user was added successfully
            alert('[OK] Your password has been changed successfully.');
            document.getElementById('new_pw').value = '';                                               // reset input for password
            logout();
        } else {                                                                                        // something went wrong
            alert('[ERROR] Something went wrong.');
            document.getElementById('new_pw').value = '';                                               // reset input for password
        }
    });
});



/******************************************************************************************
ADD NEW USER
******************************************************************************************/

document.getElementById('flex_acc_add_user').addEventListener('submit', e => {
    e.preventDefault();
    
    let username = document.getElementById('add_user_username').value;                                  // get username from form
    let pw = document.getElementById('add_user_password').value;                                        // get password from form
    
    fetch('/add_user/?username=' + username + '&password=' + pw, {                                      // send post request
        method: 'post',
    }).then(res => res).then(res => {
        if(res.status == 200) {                                                                         // user was added successfully
            alert('[OK] The user was successfully added to the system.');
            document.getElementById('add_user_username').value = '';                                    // reset input for username
            document.getElementById('add_user_password').value = '';                                    // reset input for password
        } else if(res.status == 403) {                                                                  // permission denied
            alert('[Forbidden] Only admins can add new users.');
            document.getElementById('add_user_username').value = '';                                    // reset input for username
            document.getElementById('add_user_password').value = '';                                    // reset input for password
        } else if(res.status == 409) {                                                                  // user already exists
            alert('[Conflict] The user already exists.');
            document.getElementById('add_user_username').value = '';                                    // reset input for username
            document.getElementById('add_user_password').value = '';                                    // reset input for password
        } else {                                                                                        // something went wrong
            alert('[ERROR] Something went wrong.');
            document.getElementById('add_user_username').value = '';                                    // reset input for username
            document.getElementById('add_user_password').value = '';                                    // reset input for password
        }
    });
});

