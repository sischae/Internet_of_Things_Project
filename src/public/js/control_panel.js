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

var cur_mode = 0;


// checkbox: false = automatic mode, true = manual mode
document.getElementById("mode_switch").addEventListener("click", function() {
    if(!document.getElementById("mode_switch").checked) {
        set_mode(0);                                                                                                        // AUTOMATIC MODE
    } else {
        set_mode(1);                                                                                                        // MANUAL MODE
    }
});


// enable one and disable the other control panel
function disp_mode(mode) {
    if(mode == 0) {                                                                                                         // AUTOMATIC MODE
        document.getElementById("mode_switch").checked = false;
        
        // toggle overlay
        document.getElementById('overlay_disabled_automatic').style.display = "none";                                       // hide overlay
        document.getElementById('flex_control_automatic').style.opacity =  1;                                               // set flexbox opacity
        document.getElementById('flex_control_automatic').style.webkitFilter = "blur(0px)";                                 // remove flexbox blur
        
        document.getElementById('overlay_disabled_manual').style.display = "block";                                         // hide overlay
        document.getElementById('flex_control_manual').style.opacity =  0.5;                                                // set flexbox opacity
        document.getElementById('flex_control_manual').style.webkitFilter = "blur(1px)";                                    // remove flexbox blur
    } else {                                                                                                                // MANUAL MODE
        document.getElementById("mode_switch").checked = true;
        
        // toggle overlay
        document.getElementById('overlay_disabled_manual').style.display = "none";                                          // hide overlay
        document.getElementById('flex_control_manual').style.opacity =  1;                                                  // set flexbox opacity
        document.getElementById('flex_control_manual').style.webkitFilter = "blur(0px)";                                    // remove flexbox blur
        
        document.getElementById('overlay_disabled_automatic').style.display = "block";                                      // hide overlay
        document.getElementById('flex_control_automatic').style.opacity =  0.5;                                             // set flexbox opacity
        document.getElementById('flex_control_automatic').style.webkitFilter = "blur(1px)";                                 // remove flexbox blur
    }
}


// initially fetch current mode from server and adjust display
function init_mode() {
    fetch('/get_mode', {
        method: 'get',
    }).then(res => {
        return res.text().then(text => {
            if(res.status == 200) {
                cur_mode = parseInt(text);
                disp_mode(cur_mode);
            }
        });
    });
}
init_mode();



// set mode on the server
function set_mode(mode) {
    fetch('/set_mode?mode=' + mode, {
        method: 'post',
    }).then(res => {
        if(res.status == 200) {
            disp_mode(mode);
        } else {
            if(document.getElementById("mode_switch").checked) {
                document.getElementById("mode_switch").checked = false;
            } else {
                document.getElementById("mode_switch").checked = true;
            }
        }
    });
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
                    'rgba(30, 128, 133, 0.2)'
                ],
                borderColor: [
                    'rgba(30, 128, 133, 1)'
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
                    'rgba(28, 188, 196, 0.2)'
                ],
                borderColor: [
                    'rgba(28, 188, 196, 1)'
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
var input_pressure = document.getElementById("target_pressure");
var input_fan_speed = document.getElementById("target_fan_speed");

input_pressure.addEventListener('change', e => {
    document.getElementById("label_target_pressure").innerHTML = input_pressure.value + 'Pa';
    send_cmd('set_pressure', input_pressure.value);
});

input_fan_speed.addEventListener('change', e => {
    document.getElementById("label_target_fan_speed").innerHTML = input_fan_speed.value + '%';
    send_cmd('set_fan_speed', input_fan_speed.value);
});


function send_cmd(cmd, value) {
    fetch('/cmd?cmd=' + cmd + '&value=' + value, {
        method: 'post',
    }).then(response => {
        return 0;
    });
}


function get_target_values() {
    fetch('/get_target_values', {
        method: 'get',
    }).then(response => response.json())
    .then(data => {
        document.getElementById("label_target_pressure").innerHTML = data.target_pressure + 'Pa';
        document.getElementById("label_target_fan_speed").innerHTML = data.target_fan_speed + '%';
        input_pressure.value = data.target_pressure;
        input_fan_speed.value = data.target_fan_speed;
    });
}
get_target_values();


/******************************************************************************************
WEBSOCKET
******************************************************************************************/

// setup connection to the WebsocketServer
var ws_client = new WebSocket('ws://localhost:8000');
var last_err = false;

ws_client.onopen = () => {
    
    ws_client.send('connect_cp');                                                                                           // connect as control panel
    
    ws_client.onmessage = (message) => {
        let msg = JSON.parse(message.data);
        
        
        if(msg.id == "data") {
            // update plot_pressure
            if(plot_pressure_interval == 'all') {
                let tim = new Date(Date.now());
                pressure_x.push(tim.formatDDMM());
                pressure_y.push(parseInt(msg.pressure));

                //plot_pressure.labels = pressure_x;
                plot_pressure.data.datasets.forEach(dataset => {
                    dataset.data = pressure_y;
                  });
                plot_pressure.update();
            } else if (plot_pressure_interval == 'day') {
                let tim = new Date(Date.now());
                pressure_x.push(tim.formatHHMMSS());
                pressure_y.push(parseInt(msg.pressure));

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
                pressure_y.push(parseInt(msg.pressure));

                //plot_pressure.labels = pressure_x;
                plot_pressure.data.datasets.forEach(dataset => {
                    dataset.data = pressure_y;
                  });
                plot_pressure.update();
            }
            
            // update plot_fan_speed
            if(plot_fan_speed_interval == 'all') {
                let tim = new Date(Date.now());
                fan_speed_x.push(tim.formatDDMM());
                fan_speed_y.push(parseInt(msg.speed));

                //plot_pressure.labels = pressure_x;
                plot_fan_speed.data.datasets.forEach(dataset => {
                    dataset.data = fan_speed_y;
                  });
                plot_fan_speed.update();
            } else if (plot_fan_speed_interval == 'day') {
                let tim = new Date(Date.now());
                fan_speed_x.push(tim.formatHHMMSS());
                fan_speed_y.push(parseInt(msg.speed));

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
                fan_speed_y.push(parseInt(msg.speed));

                //plot_pressure.labels = pressure_x;
                plot_fan_speed.data.datasets.forEach(dataset => {
                    dataset.data = fan_speed_y;
                  });
                plot_fan_speed.update();
            }
            
            
            // check for error
            if(msg.error) {
                alert('[WARNING]\r\nThe target pressure was set to ' + msg.setpoint + 'Pa but could not be reached in a reasonable time!\r\nCurrent pressure: ' + msg.pressure + 'Pa');
            }
        }
    };
};







