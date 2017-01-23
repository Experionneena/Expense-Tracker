var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var fs = require('fs');
var validator = require('validator');
var busboy = require('connect-busboy');
var jwt = require('jsonwebtoken');
var md5 = require('md5');

var connection=mysql.createConnection({host:"localhost",user:"root",password:"neena",database:"expense_tracker"});
var app = express();
var userRouter = express.Router();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(busboy());

userRouter.get('/EXPENSE/:id/:key',function (request, response){
	var id = request.params.id;
	var key = {};
	key = JSON.parse(request.params.key);
	if(key.token == ""){
		console.log("invalid user");
	}
	else{
		var decoded = jwt.verify(key.token, 'neena');
		if(decoded.role == key.role){
			console.log("valid user");
			connection.query("select empid,CONCAT(EXTRACT(DAY FROM date),'/',EXTRACT(MONTH FROM date),'/',EXTRACT(YEAR FROM date)) date,category,amount,expense_id,bill from expense where expense.empid = '"+id+"' order by expense.date desc",function(err,rows){
				var data=JSON.stringify(rows);
				var json=JSON.parse(data);
				response.send(json);
	   		});
		}
	}
});

userRouter.delete('/EXPENSE/:id/:key',function (request, response){
	var id1=request.params.id;
	var id2={};
		id2=request.params.key;
		id2=JSON.parse(id2);
		console.log(id2.token,id2.role);
		if(id2.token == ""){
			console.log("invalid user");
		}
		else{
			var decoded = jwt.verify(id2.token, 'neena');
			console.log(decoded);
			if(decoded.role == id2.role){
				console.log("valid user");
				connection.query('delete from expense where expense.expense_id = "'+id1+'"',function(err,rows){
					var data=JSON.stringify(rows);
					var json=JSON.parse(data);
					response.send(json);
	   			 });
			}}
});
userRouter.put('/PASSWORD/:key',function (request, response){
	var new1 = request.body.new1;
	var id=request.body.id;
	var current=request.body.current;
	current=md5(current);
	new1=md5(new1);
	console.log(new1,id,current);
	key = JSON.parse(request.params.key);
	var js={'message':""};
	if (validator.isEmpty(current)){
	    js.message="current password missing in server side";  
	} 
	if (validator.isEmpty(new1)){
	    js.message="new password missing in server side";  
	} 
	if (new1.length!=32){
	    js.message="invalid password";  
	}   
	if(key.token == ""){
		console.log("invalid user");
	}
	else{
		var decoded = jwt.verify(key.token, 'neena');
		if(decoded.role == key.role){
			console.log("valid user");
			
			connection.query('select password from user where empid='+id,function(err,rows){
				var d=JSON.stringify(rows);
				var d=JSON.parse(d);
				console.log(current,d[0].password);
				if(current==d[0].password){
					connection.query('update user set password="'+new1+'" where empid='+id ,function(err,rows){
						var data=JSON.stringify(rows);
						var json=JSON.parse(data);
						if(!err){
							console.log("password changed");
							js.message="success";
						}
					});
		   			js.message="success";
				}
				else{
					js.message="wrong password";
				}
				console.log(js);
				response.send(js);
			});

		}
	}
});

module.exports = userRouter;

