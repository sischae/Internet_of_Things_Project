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





window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 1000px)").matches) {
        document.getElementById("flex_title").innerHTML = 'VentPro';
        //document.getElementById("flex_user").innerHTML = 'big';
        document.getElementById("flex_menu").innerHTML = `
            <a href="/help" class="flex_menu_text_active" id="menu_help_text">Help</a><a href="/help" class="flex_menu_item" id="menu_help"><img src="/public/img/icon_help.svg" class="menu_icon_active" /></a>
            <a href="/control_panel" class="flex_menu_text_inactive" id="menu_control_panel_text">Control Panel</a><a href="/control_panel" class="flex_menu_item" id="menu_control_panel"><img src="/public/img/icon_control_panel.svg" class="menu_icon_inactive" /></a>
            <a href="/settings" class="flex_menu_text_inactive" id="menu_settings_text">Settings</a><a href="/settings" class="flex_menu_item" id="menu_settings"><img src="/public/img/icon_settings.svg" class="menu_icon_inactive" /></a>
            <a href="/logout" class="flex_menu_text_inactive" id="menu_logout_text">Logout</a><a href="/" id="logout" class="flex_menu_item" ><img src="/public/img/icon_logout.svg" class="menu_icon_inactive" /></a>
        `;
        add_logout_listener();
    } else {
        document.getElementById("flex_menu").innerHTML = `
            <a href="/help" class="flex_menu_item" id="menu_help"><img src="/public/img/icon_help.svg" class="menu_icon_active" /></a>
            <a href="/control_panel" class="flex_menu_item" id="menu_control_panel"><img src="/public/img/icon_control_panel.svg" class="menu_icon_inactive" /></a>
            <a href="/settings" class="flex_menu_item" id="menu_settings"><img src="/public/img/icon_settings.svg" class="menu_icon_inactive" /></a>
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
