var express = require('express');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var validator = require('validator');
var md5 = require('md5');
var nodemailer = require('nodemailer');

var mail = require('./mail');
var adminRouter = express.Router();
var connection=mysql.createConnection({host:"localhost",user:"root",password:"neena",database:"expense_tracker"});

adminRouter.get('/EXPENSE',function(request, response) {
		var id2={};
		var id2=request.headers.authorization;
		id2=JSON.parse(id2);
		console.log(id2.token,id2.role);
		if (id2.token == "") {
			console.log("invalid user");
		}
		else {
			var decoded = jwt.verify(id2.token, 'neena');
			console.log(decoded);
			if (decoded.role == id2.role) {
				console.log("valid user");
				connection.query("select empname,category,amount,bill,CONCAT(EXTRACT(DAY FROM date),'/',EXTRACT(MONTH FROM date),'/',EXTRACT(YEAR FROM date)) date,user.empid,expense_id from expense,user where expense.empid=user.empid order by date desc",function(err,rows){
					var data=JSON.stringify(rows);
					var json=JSON.parse(data);
					response.send(json);
			    });	
			}
			else {
				console.log("invalid user");
			}
		}
});

adminRouter.get('/USEREXPENSE/:id',function(request, response) {
	    console.log("haii");
		var exid=request.params.id;
		console.log("exid"+exid);
		var id2={};
		var id2=request.headers.authorization;
		id2=JSON.parse(id2);
		console.log(id2.token,id2.role);
		if (id2.token == "") {
			console.log("invalid user");
		}
		else {
			var decoded = jwt.verify(id2.token, 'neena');
			console.log(decoded);
			if (decoded.role == id2.role) {
				console.log("valid user");
				connection.query("select empname,category,amount,bill,CONCAT(EXTRACT(DAY FROM date),'/',EXTRACT(MONTH FROM date),'/',EXTRACT(YEAR FROM date)) date,user.empid,expense_id from expense,user where expense.empid=user.empid and expense_id=?",[exid],function(err,rows){
					var data=JSON.stringify(rows);
					var json=JSON.parse(data);
					console.log(json);
					response.send(json);
			    });	
			}
			else {
				console.log("invalid user");
			}
		}
});

adminRouter.get('/TOTAL/:id',function(request, response) {
		var id=request.params.id;
		var id2={};
		var id2=request.headers.authorization;
		id2=JSON.parse(id2);
		console.log(id2.token,id2.role);
		if (id2.token == "") {
			console.log("valid user");
		}
		else {
			var decoded = jwt.verify(id2.token, 'neena');
			console.log(decoded);
			if (decoded.role == id2.role) {
				console.log("valid user");
			    connection.query("select sum(amount) amount,empname,category from expense,user where expense.empid=user.empid and expense.empid='"+id+"' group by category",function(err,rows){
			    	if (!err) {
			    	var data=JSON.stringify(rows);
					var json=JSON.parse(data);
					console.log(json);
					response.send(json);
					}
			    });	
			}
		}
});

adminRouter.post('/EMPLOYEE',function(request, response) {
		var id2={};
		var id2=request.headers.authorization;
		var id=request.body.id;
		var name=request.body.name;
		var passwordo=mail.generatePassword();
		var password=md5(passwordo);
		var email=request.body.email;
		var status=false;
		if (validator.isEmpty(id)) {
			js.message="id missing in server side";
		}
	    if (validator.isEmpty(name)) {
	    	js.message="name missing in server side"; 
	    }    
	    if (validator.isEmpty(password)) {
	    	js.message="password missing in server side";  
	    }  
	    if (validator.isEmpty(email)) {
	    	js.message="email missing in server side";  
	    }  
	    if (password.length!=32) {
	    	js.message="invalid password at server side";  
	    }  
		console.log(id,password,email);
		id2=JSON.parse(id2);
		console.log(id2.token,id2.role);
		if (id2.token == "") {
			console.log("valid user");
		}
		else {
			var decoded = jwt.verify(id2.token, 'neena');
			console.log(decoded);
			if (decoded.role == id2.role) {
				console.log("valid user");
				var js={'message':""};
				var post1 = {empid:id,empname:name,password:password,email:email,status:status};
				connection.query('insert into user set ?',[post1],function(err,rows) {
					if (!err) {
						var data=JSON.stringify(rows);
						var json=JSON.parse(data);
						js.message = "success";
						var text = 'you are added to expense tracker system successfully.Use your Employee Id as user id and your password is  '+passwordo;
						mail.sendMail(email,text);
					}
					else {
						console.log(err);
						js.message = "failed";
					}
					console.log(json);
					response.send(js);
			    });	
			}
			else {
				console.log("invalid user");
			}
		}
});



module.exports = adminRouter;