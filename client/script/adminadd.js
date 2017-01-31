 var tokenc = localStorage.getItem('token1');
var role = localStorage.getItem('role');
if (tokenc == null || role == null || role == "user"){
    window.location = "index.html";
}     
var key = {'token':tokenc,'role':role};
key = JSON.stringify(key);
var httpObj = new  XMLHttpRequest();
function addEmployee(){
    var id = document.getElementById('id').value;
    var name = document.getElementById('name1').value;
    var email = document.getElementById('mailid').value;
    console.log(id,name,email);
    httpObj.onreadystatechange = function() {
        if (this.readyState == '4' && this.status == '200') {
            var result = this.responseText;
            result = JSON.parse(result);
            console.log(result);
            if (result.message == "success") {
                alert("Added a new employee successfully");
                window.location.reload();
            }
            else if (result.message == "failed") {
                alert("Employee is already added");
                window.location.reload();
            }
        }
    }
httpObj.open('POST','http://192.168.1.225:8082/EMPLOYEE',true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.setRequestHeader("Authorization", key);
httpObj.send('id='+id+'&name='+name+'&email='+email);
}

function validateForm() {
    var id = document.forms["validation"]["id"].value;
    var name = document.forms["validation"]["name1"].value;
    var email = document.getElementById('mailid').value;
    var regex = /^[a-zA-Z ]{2,30}$/;
    var matching = email.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
    var reg = /^\d+$/;
    if (id == "") {
        bootbox.alert("Please enter employee id");
        return false;
    }
    else if (id == "") {
        bootbox.alert("Please enter user id");
        return false;
    }
    else if (name == "") {
        bootbox.alert("Please enter name of employee");
        return false;
    }
    else if (email == "") {
        bootbox.alert("Please enter email of employee");
        return false;
    }
    else if (id.search(reg) == -1) {
        bootbox.alert("invalid employee id");
        return false;
    }
    else if (!regex.test(name)) {
        bootbox.alert("invalid employee name");
        return false;
    }
    else if (matching == null) {
        bootbox.alert("invalid email format");
        return false;
    }
    else{
        addEmployee();
    }
}

function logout() {
   bootbox.confirm({ 
       size: "small",
       message: "Do you want to logout ?", 
       callback: function(result) {
            if (result == true) {
                localStorage.setItem('token1',null);
                localStorage.setItem('role',null);
                localStorage.clear();
                window.location.reload();
                window.location = 'index.html';
            }
            else {
                bootbox.alert({ 
                    size: "small",
                    title: "Alert",
                    message: "you pressed cancel!!", 
                    callback: function(){}
                })
            }
        }
    });
}
