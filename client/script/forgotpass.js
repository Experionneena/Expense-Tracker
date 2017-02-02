
function forgotPassword() {
    var newp = document.getElementById('password').value;
    var confirm = document.getElementById('confirm').value;
    var passreg= newp.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
    console.log(newp,confirm);
    if (newp == "") {
        bootbox.alert("Please enter new password");
    }
    else if (confirm == "") {
        bootbox.alert("Please confirm your password");
    }
    else if (confirm != newp ) {
        bootbox.alert("Passwords do not match!!");
    }
    else if (passreg == null || password.length<10) {
        bootbox.alert("password is not strong (should contain 10-15 characters including a special character,an uppercase letter and a number)");
        return false;
    }
    else {
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
var split = window.location.href.split("?");
var token = split[1];
console.log(token);
httpObj.open('POST','http://192.168.1.225:8082/SETPASSWORD',true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send('token='+token+'&new1='+newp);
}
