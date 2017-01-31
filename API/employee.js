var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var fs = require('fs');
var validator = require('validator');
var busboy = require('connect-busboy');
var jwt = require('jsonwebtoken');
var md5 = require('md5');

var connection = mysql.createConnection({host:"localhost",user:"root",password:"neena",database:"expense_tracker"});
var app = express();
var userRouter = express.Router();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(busboy());

userRouter.get('/EXPENSE/:id',function (request, response){
	var id = request.params.id;
	console.log(id);
	var key = {};
	var id2=request.headers.authorization;
	key = JSON.parse(id2);
	if(key.token == ""){
		console.log("invalid user");
	}
	else{
		var decoded = jwt.verify(key.token, 'neena');
		if(decoded.role == key.role){
			console.log("valid user");
			connection.query("select empid,CONCAT(EXTRACT(DAY FROM date),'/',EXTRACT(MONTH FROM date),'/',EXTRACT(YEAR FROM date)) date,category,amount,expense_id,bill from expense where expense.empid = '"+id+"' order by expense.date desc",function(err,rows){
				var data = JSON.stringify(rows);
				var json = JSON.parse(data);
				console.log(json);
				response.send(json);
	   		});
		}
	}
});

userRouter.delete('/EXPENSE/:id',function (request, response){
		var id1 = request.params.id;
		var id2=request.headers.authorization;
		id2 = JSON.parse(id2);
		console.log(id2.token,id2.role);
		if (id2.token == "") {
			console.log("invalid user");
		}
		else {
			var decoded = jwt.verify(id2.token, 'neena');
			console.log(decoded);
			if (decoded.role == id2.role) {
				console.log("valid user");
				connection.query('select bill from expense where expense.expense_id = "'+id1+'"',function(err,rows){
					var data = JSON.stringify(rows);
					var json = JSON.parse(data);
					var filename = json[0].bill;
					console.log(filename);
					if(filename == ""){ return false;}
					fs.unlink(__dirname + '/images/' + filename);
				});
				connection.query('delete from expense where expense.expense_id = "'+id1+'"',function(err,rows){
					var data = JSON.stringify(rows);
					var json = JSON.parse(data);
					console.log(json);
					response.send(json);
	   			 });
			}
		}
});

userRouter.put('/PASSWORD',function (request, response) {
	var new1 = request.body.new1;
	var id = request.body.id;
	var current = request.body.current;
	var id2=request.headers.authorization;
	console.log(new1,id,current);
	key = JSON.parse(id2);
	var js = {'message':""};
	if (validator.isEmpty(current)) {
	    js.message = "current password missing in server side";  
	} 
	if (validator.isEmpty(new1)) {
	    js.message = "new password missing in server side";  
	} 
	if (new1.length!=32) {
	    js.message =  "invalid password";  
	}   
	if(key.token == "") {
		console.log("invalid user");
	}
	else {
		var decoded = jwt.verify(key.token, 'neena');
		if (decoded.role == key.role) {
			console.log("valid user");
			connection.query('select password from user where empid='+id,function(err,rows){
				var data = JSON.stringify(rows);
				var data = JSON.parse(data);
				console.log(current,data[0].password);
				if (current == data[0].password) {
					connection.query('update user set password="'+new1+'" where empid='+id ,function(err,rows){
						var data = JSON.stringify(rows);
						var json = JSON.parse(data);
						if (!err) {
							console.log("password changed");
							js.message = "success";
						}
					});
		   			js.message = "success";
				}
				else {
					js.message = "wrong password";
				}
				console.log(js);
				response.send(js);
			});
		}
	}
});

module.exports = userRouter;

