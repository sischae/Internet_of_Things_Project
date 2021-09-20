'use strict';

document.getElementById("logout").addEventListener("click", function() {
    // send invalid request
    var XHR = new XMLHttpRequest();
    XHR.open("GET", "/logout", true, "invalid", "invalid");
    XHR.send();

    // forward user to logout page
    setTimeout(function () {
        window.location.href = "/logout";
    }, 100);
});
