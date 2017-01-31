var tokenc = localStorage.getItem('token1');
var role = localStorage.getItem('role');
var name = localStorage.getItem('name');
var id = localStorage.getItem('id');
if (tokenc == null || role == null || role == "admin") {
    window.location = "index.html";
}     
var key = {'token':tokenc,'role':role};
key = JSON.stringify(key);
var name = localStorage.getItem('name'); 
var welcome="Welcome"+"  "+name;
console.log(welcome);
var t = document.createTextNode(welcome);
document.getElementById('welcome').appendChild(t);

function resetPassword() {
    var current = document.getElementById('current').value;
    var newp = document.getElementById('new').value;
    var confirm = document.getElementById('confirm').value;
    console.log(current,newp,confirm);
    if (current == "") {
        bootbox.alert("Please enter current password");
    }
    else if (newp == "") {
        bootbox.alert("Please enter new password");
    }
    else if (confirm == "") {
        bootbox.alert("Please confirm your password");
    }
    else if (confirm != newp ) {
        bootbox.alert("Passwords do not match!!");
    }
    else {
        current = (Crypto.MD5(current)).toString();
        newp = (Crypto.MD5(newp)).toString();
        var httpObj=new XMLHttpRequest();
        httpObj.onreadystatechange=function() {
            if (this.readyState=='4' && this.status=='200') {
                var result=this.responseText;
                result=JSON.parse(result);
                console.log(result.message); 
                if (result.message=="wrong password") {
                    bootbox.alert({ 
                      size: "small",
                      title: "Alert",
                      message: "wrong password", 
                      callback: function(){
                            window.location.reload();
                       }
                    })
                }
                else if (result.message=="success") {
                 bootbox.alert({ 
                      size: "small",
                      title: "Alert",
                      message: "password is successfully changed", 
                      callback: function(){
                            window.location.reload();
                       }
                    })
                }
            }
        }
    }
httpObj.open('PUT','http://192.168.1.225:8082/PASSWORD',true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.setRequestHeader("Authorization", key);
httpObj.send('id='+id+'&current='+current+'&new1='+newp);
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
                    callback: function() {}
                })
            }
        }
    });
}
