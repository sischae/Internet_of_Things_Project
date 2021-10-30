'use strict';


// adjust spacer height depending on the error message to keep the same height of the flexbox
if(document.getElementById("label_error").innerHTML != '') {
    document.getElementById("spacer").style.height = "44px";
}
