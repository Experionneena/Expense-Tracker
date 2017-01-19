var express = require('express');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');


var adminRouter = express.Router();
var connection=mysql.createConnection({host:"localhost",user:"root",password:"neena",database:"expense_tracker"});

adminRouter.get('/EXPENSE/:key',function(request, response){
		var id2={};
		id2=request.params.key;
		id2=JSON.parse(id2);
		console.log(id2.token,id2.role);
		if(id2.token == ""){
			console.log("valid user");
		}
		else{
			var decoded = jwt.verify(id2.token, 'neena');
			console.log(decoded);
			if(decoded.role == id2.role){
				console.log("valid user");
				connection.query("select empname,category,amount,bill,CONCAT(EXTRACT(DAY FROM date),'/',EXTRACT(MONTH FROM date),'/',EXTRACT(YEAR FROM date)) date,user.empid from expense,user where expense.empid=user.empid order by date desc",function(err,rows){
					var data=JSON.stringify(rows);
					var json=JSON.parse(data);
					response.send(json);
			    });	
			}
			else{
				console.log("invalid user");
			}
		}
});
adminRouter.get('/TOTAL/:id/:key',function(request, response){
		var id=request.params.id;
		var id2={};
		id2=request.params.key;
		id2=JSON.parse(id2);
		console.log(id2.token,id2.role);
		if(id2.token == ""){
			console.log("valid user");
		}
		else{
			var decoded = jwt.verify(id2.token, 'neena');
			console.log(decoded);
			if(decoded.role == id2.role){
				console.log("valid user");
				//var js={'amount':"",'name':""};
				// connection.query("select sum(amount) amount,empname from expense,user where expense.empid=user.empid and expense.empid='"+id+"'",function(err,rows){
				// 	var data=JSON.stringify(rows);
				// 	var json=JSON.parse(data);
				// 	//console.log(json);
				// 	// js.sum=json[0].amount;
				// 	// js.name=JSON[0].empname;
				// 	// console.log(js.sum);
				// //	response.send(json);
			 //    });	
			    connection.query("select sum(amount) amount,empname,category from expense,user where expense.empid=user.empid and expense.empid='"+id+"' group by category",function(err,rows){
					var data=JSON.stringify(rows);
					var json=JSON.parse(data);
					console.log(json);
					// js.sum=json[0].amount;
					// js.name=JSON[0].empname;
					//console.log(json);
					response.send(json);
			    });	
			}
			else{
				console.log("invalid user");
			}
		}
});
adminRouter.post('/EMPLOYEE/:key',function(request, response){
		var id2={};
		id2=request.params.key;
		var id=request.body.id;
		var name=request.body.name;
		var password=request.body.password;
		var email=request.body.email;
		var status=false;
		console.log(id,password,email);
		id2=JSON.parse(id2);
		console.log(id2.token,id2.role);
		if(id2.token == ""){
			console.log("valid user");
		}
		else{
			var decoded = jwt.verify(id2.token, 'neena');
			console.log(decoded);
			if(decoded.role == id2.role){
				console.log("valid user");
				var post1 = {empid:id,empname:name,password:password,email:email,status:status};
         //var abc='INSERT INTO request SET '+post1
				connection.query('insert into user set ?',[post1],function(err,rows){
					var data=JSON.stringify(rows);
					var json=JSON.parse(data);
					console.log(json);
					response.send(json);
			    });	
			}
			else{
				console.log("invalid user");
			}
		}
});

module.exports = adminRouter;