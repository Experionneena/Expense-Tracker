var express = require('express');
var validator = require('validator');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');

var connection=mysql.createConnection({host:"localhost",user:"root",password:"neena",database:"expense_tracker"});
var loginRouter = express.Router();
loginRouter.post('/login',function(request, response){
	var id=request.body.userId;
	var password=request.body.password;
	console.log(id,password);
	if ((validator.isEmpty(id) && validator.isEmpty(password))) {
		js.message="id and password missing in server side";
	}
    if ((validator.isEmpty(id))){
    	js.message="id missing in server side"; 
    }    
    if ((validator.isEmpty(password))){
    	js.message="password missing in server side";  
    }   
	connection.query('select empid,password,status from user where empid ="'+id+'"',function(err,rows){
		var data=JSON.stringify(rows);
		var json=JSON.parse(data);
		//console.log(json);
 		var js={"status":'403',"message":"Login failed","user_type":null};
 		if(rows.length > 0){
			if(id==json[0].empid && password==json[0].password){
				js.status='200';
				js.message="Login success";
				console.log(json.status);
				if(json[0].status==true){
				    js.user_type="admin";
				}
				else js.user_type="user";
			}
		}
		//console.log(js);
		response.send(js);
    });
});
module.exports = loginRouter;