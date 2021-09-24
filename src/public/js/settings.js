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
LOGIN ACTIVITY
******************************************************************************************/

let log = JSON.parse('[]');                                                                             // stores all cars returned from the server
let list_length = 8;
let pages = 0;
let cur_page = 0;
let last_amm = 0;

// fetch all activities
fetch('/activity', {                                                                                    // send get request to fetch all cars in the system
    method: 'get',
}).then(res => res.text()).then(res => {
    log = JSON.parse(res);                                                                              // parse returned json object to cars

    let count = log.length;                                                                             // get length of received array
    pages = Math.ceil(count/list_length);                                                               // calculate how many pages of the given lenght can be displayed
    last_amm = count % list_length;                                                                     // calculate how many elements can be displayed on the last page
    
    if(last_amm == 0) {                                                                                 // prevent generating an empty page
        pages = pages - 1;
    }
    
    loadPage('');                                                                                       // load default page (page 0)
});



// load other page of log-in activities
function loadPage(dir) {
    // clear the hole list
    document.getElementById('log_users').innerHTML = '';
    
    // add title
    const title = document.createElement('div');                                                        // create title
    title.innerHTML = `
                    <h3>Log in activity</h3>
    `;
    title.style = "margin-bottom: 0px;";                                                                // reduce margin-bottom
    title.className = "flex_log_data";                                                                  // set class
    document.getElementById('log_users').appendChild(title);                                            // add title
    
    
    // check if button was pressed and update cur_page if allowed
    if(dir == 'last' && cur_page != 0) {
        cur_page = cur_page - 1;                                                                        // generate last page
    } else if(dir == 'next' && cur_page < (pages - 1)) {
        cur_page = cur_page + 1;                                                                        // generate next page
    }
    
    
    if(cur_page < pages - 1 || ((cur_page == pages - 1) && last_amm == 0)) {                            // if the page to be displayed is full of elements
        // add a flex box for each activity
        for (let i = 0; i < list_length; i++) {
            addLog(log[(cur_page * 8) + i].timestamp, log[(cur_page * 8) + i].user, i);                 // create a new flex box and add it to the page
        }
    } else {                                                                                            // if the page to be displayed is the last page and has less than list_length elements
        // add a flex box for each activity
        let i = 0;
        for (i = 0; i < last_amm; i++) {
            addLog(log[(cur_page * 8) + i].timestamp, log[(cur_page * 8) + i].user, i);                 // create a new flex box and add it to the page
        }
        while(i < 8) {
            addLog('&nbsp;', '', i);                                                                    // create a new spaceholder and add it to the list
            i++;
        }
    }
    
    
    // add navigation
    const arrows = document.createElement('div');                                                       // create buttons to navigate between the pages
    arrows.innerHTML = `
            <button id="lastPage" class="page_nav" style="margin-left: 30px;"><--</button>
            <button id="nextPage" class="page_nav">--></button>
            <label class="info" style="margin-left: 0px;">` + (cur_page + 1) + `/` + pages + `</label>
    `;
    document.getElementById('log_users').appendChild(arrows);                                           // add buttons
    
    // add event listeners for both buttons
    document.getElementById("lastPage").addEventListener("click", function(){
        loadPage('last');
    });
    document.getElementById("nextPage").addEventListener("click", function() {
        loadPage('next')
    });
    
    
    // enable/disable buttons depending on the current page
    if(cur_page == 0) {                                                                                 // first page
        document.getElementById("lastPage").disabled = true;
        if(pages == 1) {                                                                                // only one page available
            document.getElementById("nextPage").disabled = true;
        } else {
            document.getElementById("nextPage").disabled = false;
        }
    } else if(cur_page == (pages - 1)) {                                                                // last page available
        document.getElementById("nextPage").disabled = true;
        if(cur_page == 0) {                                                                             // not the first page at the same time
            document.getElementById("lastPage").disabled = true;
        } else {
            document.getElementById("lastPage").disabled = false;
        }
    } else {                                                                                            // not the first && not the last page available
        document.getElementById("lastPage").disabled = false;
        document.getElementById("nextPage").disabled = false;
    }
    
    
    // add information about data access
    const info = document.createElement('div');                                                         // create info
    info.innerHTML = `
        <div>
            <label>Only admins can see all users log-in activity.</label>
        </div>
    `;
    info.className = 'info';                                                                            // set class
    document.getElementById('log_users').appendChild(info);                                             // add info
}



// create a new flex box and add it to the main page
function addLog(timestamp, user, idx) {
    const div = document.createElement('div');                                                          // create new div

    div.className = 'flex_log_data';                                                                    // set div class
    
    // add all information about the car as innerHTML of the created div
    div.innerHTML = timestamp + user;
    
    // change margin-bottom on last element
    if(idx == list_length - 1) {
        div.style = "margin-bottom: 10px;";
    }
    
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







window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 1000px)").matches) {
        document.getElementById("flex_title").innerHTML = 'VentPro';
        //document.getElementById("flex_user").innerHTML = 'big';
        document.getElementById("flex_menu").innerHTML = `
            <a href="/help" class="flex_menu_text_inactive" id="menu_help_text">Help</a><a href="/help" class="flex_menu_item" id="menu_help"><img src="/public/img/icon_help.svg" class="menu_icon_inactive" /></a>
            <a href="/control_panel" class="flex_menu_text_inactive" id="menu_control_panel_text">Control Panel</a><a href="/control_panel" class="flex_menu_item" id="menu_control_panel"><img src="/public/img/icon_control_panel.svg" class="menu_icon_inactive" /></a>
            <a href="/settings" class="flex_menu_text_active" id="menu_settings_text">Settings</a><a href="/settings" class="flex_menu_item" id="menu_settings"><img src="/public/img/icon_settings.svg" class="menu_icon_active" /></a>
            <a href="/logout" class="flex_menu_text_inactive" id="menu_logout_text">Logout</a><a href="/" id="logout" class="flex_menu_item" ><img src="/public/img/icon_logout.svg" class="menu_icon_inactive" /></a>
        `;
        add_logout_listener();
    } else {
        document.getElementById("flex_menu").innerHTML = `
            <a href="/help" class="flex_menu_item" id="menu_help"><img src="/public/img/icon_help.svg" class="menu_icon_inactive" /></a>
            <a href="/control_panel" class="flex_menu_item" id="menu_control_panel"><img src="/public/img/icon_control_panel.svg" class="menu_icon_inactive" /></a>
            <a href="/settings" class="flex_menu_item" id="menu_settings"><img src="/public/img/icon_settings.svg" class="menu_icon_active" /></a>
            <a href="/" id="logout" class="flex_menu_item" ><img src="/public/img/icon_logout.svg" class="menu_icon_inactive" /></a>
        
        `
        if (window.matchMedia("(min-width: 620px)").matches) {
            document.getElementById("flex_title").innerHTML = 'VentPro';
            //document.getElementById("flex_user").innerHTML = '';
        } else {
            document.getElementById("flex_title").innerHTML = '';
            //document.getElementById("flex_user").innerHTML = '';
        }
    }
})
