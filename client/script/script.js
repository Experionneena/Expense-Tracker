// document.body.style.backgroundImage = "url('images/expensetracker.jpg')";
function validateForm() {
    var id = document.forms["validation"]["userid"].value;
    var password = document.forms["validation"]["password"].value;
    if (id == "" && password=="") {
        bootbox.alert("Please enter user id and password");
		return false;
    }
    else if (id == "") {
        bootbox.alert("Please enter user id");
        return false;
    }
    else if (password == "") {
        bootbox.alert("Please enter password");
        return false;
    }
    else if (id.search( /^\d+$/) == -1) {
        bootbox.alert("Please enter a valid userid");
        return false;
    }
    else{
        validateUser();
    }
}

function validateUser(){
	var id = document.getElementById('userid').value;
	localStorage.setItem('id',id);
	var password = document.forms["validation"]["password"].value;
    password = (Crypto.MD5(password)).toString(); console.log(password);
	var httpObj=new	XMLHttpRequest();
	httpObj.onreadystatechange=function() {
		if (this.readyState=='4' && this.status=='200') {
			var result=this.responseText;
			result=JSON.parse(result);
			console.log(result);
			if (result.status=='200') {
				if (result.user_type=='admin') {
					window.location='admin.html';
				}
				else if (result.user_type=='user') {
					window.location='employee.html';
				}
				console.log(result.token);				
				localStorage.setItem('token1',result.token);
				localStorage.setItem('role',result.user_type);
				localStorage.setItem('name',result.empname);
				var role = localStorage.getItem('role');
				var name = localStorage.getItem('name');
				console.log(name);				
			}
			else {
				bootbox.alert({ 
		            size: "small",
		            title: "Alert",
		            message: "Invalid login credentials", 
		            callback: function() {}
		        })
			}
		}
	}
	httpObj.open('POST','http://192.168.1.225:8082/login',true);
	httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
	httpObj.send('userId='+document.getElementById('userid').value+'&password='+password);
}

$(function() {
    if (localStorage.chkbx && localStorage.chkbx != '') {
        $('#remember_me').attr('checked', 'checked');
        $('#userid').val(localStorage.usrname);
        $('#password').val(localStorage.pass);
    } else {
        $('#remember_me').removeAttr('checked');
        $('#userid').val('');
        $('#password').val('');
    }
	$('#remember_me').click(function() {
 		if ($('#remember_me').is(':checked')) {
            localStorage.usrname = $('#userid').val();
            localStorage.pass = $('#password').val();
            localStorage.chkbx = $('#remember_me').val();
        } else {
            localStorage.usrname = '';
            localStorage.pass = '';
            localStorage.chkbx = '';
        }
    });
});


$('#forgot').click(function(){
     bootbox.confirm({
       size: "medium",
       message: "Do you want to reset your new password by mail ?",
       callback: function(result) {
            if (result == true) {
		    bootbox.prompt({
              size: "small",
              title: "Enter your user ID please...",
              callback: function(result){
                  if(result == null){
                 
             		
                  }
                  var uid = result;
                    var httpObj1 = new XMLHttpRequest();
                      httpObj1.onreadystatechange = function(){
                          if(this.readyState == '4' && this.status == '200'){
                             // console.log("success client");
                             var result = this.responseText;
                             result = JSON.parse(result);
                             console.log(result);
                             if(result.message == "error"){
                                 bootbox.alert("Invalid User Id");
                             }
                            else if(result.message == "success"){
                                 bootbox.alert(" Password reset link is sent to your mail");
                             }
                            
                     }
                  }
                  httpObj1.open('POST','http://192.168.1.225:8082/PASSWORD',true);
                  httpObj1.setRequestHeader('content-type','application/x-www-form-urlencoded');
                  console.log("But why123456789");
                  httpObj1.send('userid='+uid);
              }
          })
            }
        }
    })
 })
      
           
      
