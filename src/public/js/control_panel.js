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
        // toggle overlay
        document.getElementById('overlay_disabled_automatic').style.display = "none";                                       // hide overlay
        document.getElementById('flex_control_automatic').style.opacity =  1;                                               // set flexbox opacity
        document.getElementById('flex_control_automatic').style.webkitFilter = "blur(0px)";                                 // remove flexbox blur
        
        document.getElementById('overlay_disabled_manual').style.display = "block";                                         // hide overlay
        document.getElementById('flex_control_manual').style.opacity =  0.5;                                                // set flexbox opacity
        document.getElementById('flex_control_manual').style.webkitFilter = "blur(1px)";                                    // remove flexbox blur
    } else {                                                                                                                // MANUAL MODE
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


// define prototypes for date formats

Date.prototype.formatDDMMYYYY = function(){
    return this.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2}) + "." +  (this.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2}) + "." +  this.getFullYear();
}

Date.prototype.formatDDMM = function(){
    return this.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2}) + "." +  (this.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2});
}

Date.prototype.formatHHMMSS = function(){
    return this.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2}) + ":" +  this.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2}) + ":" +  this.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2});
}




var pressure_x = [];
var pressure_y = [];
var fan_speed_x = [];
var fan_speed_y = [];

var plot_pressure;
var plot_fan_speed;

var plot_pressure_interval = 'all';
var plot_fan_speed_interval = 'all';

function display_plot_pressure() {
    var ctx = document.getElementById('chart_automatic').getContext('2d');
    plot_pressure = new Chart(ctx, {
        type: 'line',
        data: {
            labels: pressure_x,
            datasets: [{
                label: 'current pressure',
                data: pressure_y,
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

function display_plot_fan_speed() {
    var ctx = document.getElementById('chart_manual').getContext('2d');
    plot_fan_speed = new Chart(ctx, {
        type: 'line',
        data: {
            labels: fan_speed_x,
            datasets: [{
                label: 'current fan speed',
                data: fan_speed_y,
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



function init_plot_pressure(interval) {
    fetch('/data_cp?data=pressure&interval=' + interval, {
        method: 'get',
    }).then(response => response.json())
    .then(data => {
        let buff_xs = [];
        let buff_ys = [];
        
        for (let i in data) {
            let time = new Date(data[i].timestamp);                                                                         // format time
            
            if(interval == 'all') {
                buff_xs.push(time.formatDDMM());
            } else {
                buff_xs.push(time.formatHHMMSS());
            }
            
            buff_ys.push(data[i].pressure);
        }
        
        pressure_x = buff_xs;
        pressure_y = buff_ys;
        
        display_plot_pressure();
    });
}

function init_plot_fan_speed(interval) {
    fetch('/data_cp?data=fan_speed&interval=' + interval, {
        method: 'get',
    }).then(response => response.json())
    .then(data => {
        let buff_xs = [];
        let buff_ys = [];
        
        for (let i in data) {
            let time = new Date(data[i].timestamp);                                                                         // format time
            
            if(interval == 'all') {
                buff_xs.push(time.formatDDMM());
            } else {
                buff_xs.push(time.formatHHMMSS());
            }
            
            buff_ys.push(data[i].fan_speed);
        }
        
        fan_speed_x = buff_xs;
        fan_speed_y = buff_ys;
        
        display_plot_fan_speed();
    });
}

init_plot_pressure('all');
init_plot_fan_speed('all');


// BUTTONS

document.getElementById("btn_pressure_all").addEventListener("click", function() {
    plot_pressure.destroy();
    plot_pressure_interval = 'all';
    init_plot_pressure('all');
});
document.getElementById("btn_pressure_day").addEventListener("click", function() {
    plot_pressure.destroy();
    plot_pressure_interval = 'day';
    init_plot_pressure('day');
});
document.getElementById("btn_pressure_minute").addEventListener("click", function() {
    plot_pressure.destroy();
    plot_pressure_interval = 'minute';
    init_plot_pressure('minute');
});

document.getElementById("btn_fan_speed_all").addEventListener("click", function() {
    plot_fan_speed.destroy();
    plot_fan_speed_interval = 'all';
    init_plot_fan_speed('all');
});
document.getElementById("btn_fan_speed_day").addEventListener("click", function() {
    plot_fan_speed.destroy();
    plot_fan_speed_interval = 'day';
    init_plot_fan_speed('day');
});
document.getElementById("btn_fan_speed_minute").addEventListener("click", function() {
    plot_fan_speed.destroy();
    plot_fan_speed_interval = 'minute';
    init_plot_fan_speed('minute');
});





/******************************************************************************************
SET TARGET VALUES
******************************************************************************************/

document.getElementById("target_fan_speed").addEventListener('input', e => {
    document.getElementById("label_target_fan_speed").innerHTML = document.getElementById("target_fan_speed").value + '%';
});

document.getElementById("target_pressure").addEventListener('input', e => {
    document.getElementById("label_target_pressure").innerHTML = document.getElementById("target_pressure").value + 'Pa';
});





/******************************************************************************************
WEBSOCKET
******************************************************************************************/

// setup connection to the WebsocketServer
const ws_client = new WebSocket('ws://localhost:8000');

ws_client.onopen = () => {
    //console.log('[WebSocket] Connected to the server');
    
    ws_client.send('ping');
    
    ws_client.onmessage = (message) => {
        //console.log('[WebSocket] Received message: ' + message.data);
        
        // update plot_pressure
        if(Number.isInteger(parseInt(message.data))) {
            if(plot_pressure_interval == 'all') {
                let tim = new Date(Date.now());
                pressure_x.push(tim.formatDDMM());
                pressure_y.push(parseInt(message.data));

                //plot_pressure.labels = pressure_x;
                plot_pressure.data.datasets.forEach(dataset => {
                    dataset.data = pressure_y;
                  });
                plot_pressure.update();
            } else if (plot_pressure_interval == 'day') {
                let tim = new Date(Date.now());
                pressure_x.push(tim.formatHHMMSS());
                pressure_y.push(parseInt(message.data));

                //plot_pressure.labels = pressure_x;
                plot_pressure.data.datasets.forEach(dataset => {
                    dataset.data = pressure_y;
                  });
                plot_pressure.update();
            } else if (plot_pressure_interval == 'minute') {
                let tim = new Date(Date.now());
                
                // remove the first element of both arrays
                if(pressure_y.length > 30) {
                    pressure_y.shift();
                    pressure_x.shift();
                }
                
                pressure_x.push(tim.formatHHMMSS());
                pressure_y.push(parseInt(message.data));

                //plot_pressure.labels = pressure_x;
                plot_pressure.data.datasets.forEach(dataset => {
                    dataset.data = pressure_y;
                  });
                plot_pressure.update();
            }
        }
        
        // update plot_fan_speed
        if(Number.isInteger(parseInt(message.data))) {
            if(plot_fan_speed_interval == 'all') {
                let tim = new Date(Date.now());
                fan_speed_x.push(tim.formatDDMM());
                fan_speed_y.push(parseInt(message.data));

                //plot_pressure.labels = pressure_x;
                plot_fan_speed.data.datasets.forEach(dataset => {
                    dataset.data = fan_speed_y;
                  });
                plot_fan_speed.update();
            } else if (plot_fan_speed_interval == 'day') {
                let tim = new Date(Date.now());
                fan_speed_x.push(tim.formatHHMMSS());
                fan_speed_y.push(parseInt(message.data));

                //plot_pressure.labels = pressure_x;
                plot_fan_speed.data.datasets.forEach(dataset => {
                    dataset.data = fan_speed_y;
                  });
                plot_fan_speed.update();
            } else if (plot_fan_speed_interval == 'minute') {
                let tim = new Date(Date.now());
                
                // remove the first element of both arrays
                if(fan_speed_y.length > 30) {
                    fan_speed_y.shift();
                    fan_speed_x.shift();
                }
                
                fan_speed_x.push(tim.formatHHMMSS());
                fan_speed_y.push(parseInt(message.data));

                //plot_pressure.labels = pressure_x;
                plot_fan_speed.data.datasets.forEach(dataset => {
                    dataset.data = fan_speed_y;
                  });
                plot_fan_speed.update();
            }
        }
    };
};





