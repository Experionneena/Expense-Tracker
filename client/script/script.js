
function validateForm() {
    var id = document.forms["validation"]["userid"].value;
     var password = document.forms["validation"]["password"].value;
     password = (Crypto.MD5(password)).toString(); console.log(password);

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
	var password = document.forms["validation"]["password"].value;
    password = (Crypto.MD5(password)).toString(); console.log(password);
	var httpObj=new	XMLHttpRequest();
	httpObj.onreadystatechange=function()
	{
		if(this.readyState=='4' && this.status=='200')
		{
			var result=this.responseText;
				//global.console.log(result);
			result=JSON.parse(result);
			// console.log(result);
			// console.log(result.user_type);
			if(result.status=='200')
			{
				//console.log(result.message);
				//window.console.log(result.status);
				//document.getElementById("result").innerHTML=result.message;
				if(result.user_type=='admin'){
					window.location='admin.html';
				}
				else if(result.user_type=='user'){
					window.location='employee.html';
				}
			}
			else{
				 alert(result.message);
			// 	console.log(result.message);
			// 	document.getElementById("result").innerHTML=result.message;
			}
		}
	}
	httpObj.open('POST','http://127.0.0.1:8088/login',true);
	httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
	httpObj.send('userId='+document.getElementById('userid').value+'&password='+password);
}