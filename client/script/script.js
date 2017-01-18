localStorage.setItem('key', 'hfcx');
 				//console.log(localStorage.getItem('key'));
function validateForm() {
    var id = document.forms["validation"]["userid"].value;
     var password = document.forms["validation"]["password"].value;
     if (id == "" && password=="") {
        alert("Please enter user id and password");
		return false;
    }
    else if(id == ""){
        alert("Please enter user id");
        return false;
    }
    else if(password == ""){
        alert("Please enter password");
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
	httpObj.onreadystatechange=function()
	{
		if(this.readyState=='4' && this.status=='200')
		{
			var result=this.responseText;
			result=JSON.parse(result);
			console.log(result);
			if(result.status=='200')
			{
				if(result.user_type=='admin'){
					window.location='admin.html';
				}
				else if(result.user_type=='user'){
					window.location='employee.html';
				}
				 console.log(result.token);				
			
				 localStorage.setItem('token1',result.token);
				
				  localStorage.setItem('role',result.user_type);
				  localStorage.setItem('name',result.empname);
				  // localStorage.setItem('id',result.empid);
				   var role = localStorage.getItem('role');
				   var name = localStorage.getItem('name');
				 console.log(name);				
			}
			else{
				 alert(result.message);
			}
		}
	}
	httpObj.open('POST','http://192.168.1.225:8082/login',true);
	httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
	httpObj.send('userId='+document.getElementById('userid').value+'&password='+password);
}