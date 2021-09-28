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
SWITCH MODE
******************************************************************************************/

// INIT: DELETE AFTER FETCHING THE MODE IS IMPLEMENTED!!!
document.getElementById('overlay_disabled_automatic').style.display = "none";                                               // hide overlay
document.getElementById('flex_control_automatic').style.opacity =  1;                                                       // set flexbox opacity
document.getElementById('flex_control_automatic').style.webkitFilter = "blur(0px)";                                         // remove flexbox blur
document.getElementById('overlay_disabled_manual').style.display = "block";                                                 // hide overlay
document.getElementById('flex_control_manual').style.opacity =  0.5;                                                        // set flexbox opacity
document.getElementById('flex_control_manual').style.webkitFilter = "blur(1px)";                                            // remove flexbox blur



// checkbox: false = automatic mode, true = manual mode
document.getElementById("mode_switch").addEventListener("click", function() {
    if(!document.getElementById("mode_switch").checked) {                                                                   // AUTOMATIC MODE
        console.log('automatic mode');
        
        // toggle overlay
        document.getElementById('overlay_disabled_automatic').style.display = "none";                                       // hide overlay
        document.getElementById('flex_control_automatic').style.opacity =  1;                                               // set flexbox opacity
        document.getElementById('flex_control_automatic').style.webkitFilter = "blur(0px)";                                 // remove flexbox blur
        
        document.getElementById('overlay_disabled_manual').style.display = "block";                                         // hide overlay
        document.getElementById('flex_control_manual').style.opacity =  0.5;                                                // set flexbox opacity
        document.getElementById('flex_control_manual').style.webkitFilter = "blur(1px)";                                    // remove flexbox blur
    } else {                                                                                                                // MANUAL MODE
        console.log('manual mode');
        
        // toggle overlay
        document.getElementById('overlay_disabled_manual').style.display = "none";                                          // hide overlay
        document.getElementById('flex_control_manual').style.opacity =  1;                                                  // set flexbox opacity
        document.getElementById('flex_control_manual').style.webkitFilter = "blur(0px)";                                    // remove flexbox blur
        
        document.getElementById('overlay_disabled_automatic').style.display = "block";                                      // hide overlay
        document.getElementById('flex_control_automatic').style.opacity =  0.5;                                             // set flexbox opacity
        document.getElementById('flex_control_automatic').style.webkitFilter = "blur(1px)";                                 // remove flexbox blur
    }
});







/******************************************************************************************
RESPONSIVE HEADER
******************************************************************************************/

// initially resize header if the page was loaded in a small window or on a mobile phone
resize_header();

window.addEventListener("resize", function() {
    resize_header();
})


// responsive header functionallity
function resize_header(){
    if (window.matchMedia("(min-width: 930px)").matches) {
        document.getElementById("flex_title").innerHTML = 'VentPro';
        //document.getElementById("flex_user").innerHTML = 'big';
        document.getElementById("flex_menu").innerHTML = `
            <a href="/help" class="flex_menu_text_inactive" id="menu_help_text">Help</a><a href="/help" class="flex_menu_item" id="menu_help"><img src="/public/img/icon_help.svg" class="menu_icon_inactive" /></a>
            <a href="/control_panel" class="flex_menu_text_active" id="menu_control_panel_text">Control Panel</a><a href="/control_panel" class="flex_menu_item" id="menu_control_panel"><img src="/public/img/icon_control_panel.svg" class="menu_icon_active" /></a>
            <a href="/settings" class="flex_menu_text_inactive" id="menu_settings_text">Settings</a><a href="/settings" class="flex_menu_item" id="menu_settings"><img src="/public/img/icon_settings.svg" class="menu_icon_inactive" /></a>
            <a href="/logout" class="flex_menu_text_inactive" id="menu_logout_text">Log out</a><a href="/logout" id="logout" class="flex_menu_item" ><img src="/public/img/icon_logout.svg" class="menu_icon_inactive" /></a>
        `;
        add_logout_listener();
    } else {
        document.getElementById("flex_menu").innerHTML = `
            <a href="/help" class="flex_menu_item" id="menu_help"><img src="/public/img/icon_help.svg" class="menu_icon_inactive" /></a>
            <a href="/control_panel" class="flex_menu_item" id="menu_control_panel"><img src="/public/img/icon_control_panel.svg" class="menu_icon_active" /></a>
            <a href="/settings" class="flex_menu_item" id="menu_settings"><img src="/public/img/icon_settings.svg" class="menu_icon_inactive" /></a>
            <a href="/logout" id="logout" class="flex_menu_item" ><img src="/public/img/icon_logout.svg" class="menu_icon_inactive" /></a>
        
        `
        if (window.matchMedia("(min-width: 580px)").matches) {
            document.getElementById("flex_title").innerHTML = 'VentPro';
            //document.getElementById("flex_user").innerHTML = '';
        } else {
            document.getElementById("flex_title").innerHTML = '';
            //document.getElementById("flex_user").innerHTML = '';
        }
    }
}







/******************************************************************************************
PLOTS
******************************************************************************************/



function display_example_plot_automatic() {
    var ctx = document.getElementById('chart_automatic').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [0, 1, 2, 3, 4, 5],
            datasets: [{
                label: 'current pressure',
                data: [12, 50, 110, 15, 22, 3],
                backgroundColor: [
                    'rgba(204, 80, 107, 0.2)'
                ],
                borderColor: [
                    'rgba(204, 80, 107, 1)'
                ],
                borderWidth: 1,
                tension: 0.4
            }]
        },
        options: {
            scales: {
                y: {
                    suggestedMin: 0,
                    suggestedMax: 120,
                    beginAtZero: true,
                    ticks: {
                        // append unit to scale
                        callback: function(value, index, values) {
                            return value + 'Pa';
                        }
                    }
                }
            },
            elements: {
                point: {
                    radius: 2
                }
            }
        }
    });
}

function display_example_plot_manual() {
    var ctx = document.getElementById('chart_manual').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [0, 1, 2, 3, 4, 5],
            datasets: [{
                label: 'current fan speed',
                data: [10, 30, 80, 75, 5, 30],
                backgroundColor: [
                    'rgba(64, 153, 60, 0.2)'
                ],
                borderColor: [
                    'rgba(64, 153, 60, 1)'
                ],
                borderWidth: 1,
                tension: 0.4
            }]
        },
        options: {
            scales: {
                y: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                    beginAtZero: true,
                    ticks: {
                        // append unit to scale
                        callback: function(value, index, values) {
                            return value + '%';
                        }
                    }
                }
            },
            elements: {
                point: {
                    radius: 2
                }
            }
        }
    });
}

display_example_plot_automatic();
display_example_plot_manual();




/******************************************************************************************
SET TARGEt VALUES
******************************************************************************************/

document.getElementById("target_fan_speed").addEventListener('input', e => {
    document.getElementById("label_target_fan_speed").innerHTML = document.getElementById("target_fan_speed").value + '%';
});

document.getElementById("target_pressure").addEventListener('input', e => {
    document.getElementById("label_target_pressure").innerHTML = document.getElementById("target_pressure").value + 'Pa';
});

