function logout() {
   bootbox.confirm({ 
       size: "small",
       message: "Do you want to logout ?", 
       callback: function(result) { 
            if (result == true) {
                localStorage.removeItem('token1');
                localStorage.removeItem('role');
                localStorage.removeItem('id');
                 localStorage.removeItem('name');
                // localStorage.clear();
                window.location.reload();
                window.location = 'index.html';
            }
            else {
                bootbox.alert({ 
                    size: "small",
                    title: "Alert",
                    message: "you pressed cancel!!", 
                    callback: function() {}
                })
            }
        }
    });
}

function viewImage(bill) {

    console.log("haiii");
    if (bill == "") {
        bootbox.alert({ 
            size: "small",
            title: "Alert",
            message: "No bills are available for this expense...", 
            callback: function() {}
        })
    }
    else {
        var image = document.createElement("IMG");
        image.setAttribute("src", bill);
        image.setAttribute("width", "100%");
        image.setAttribute("height", "100%");
        document.getElementById('mbody1').innerHTML = "";
        document.getElementById('mbody1').appendChild(image);
        console.log(mbody);
        $('#myModal1').modal('show');
    }
}
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}