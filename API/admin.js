var express = require('express');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');


var adminRouter = express.Router();
var connection=mysql.createConnection({host:"localhost",user:"root",password:"neena",database:"expense_tracker"});

adminRouter.get('/EXPENSE/:key',function(request, response){
		var id2={};
		id2=request.params.key;
		id2=JSON.parse(id2);
		//var id3 = request.body.role;
		console.log(id2.token,id2.role);
		if(id2.token == ""){
			
		}
		else{
			var decoded = jwt.verify(id2.token, 'neena');
			console.log(decoded);
			if(decoded.role == id2.role){
				console.log("valid user");
				if(id2.role=="admin"){
					connection.query("select empname,category,amount,bill,CONCAT(EXTRACT(DAY FROM date),'/',EXTRACT(MONTH FROM date),'/',EXTRACT(YEAR FROM date)) date,user.empid from expense,user where expense.empid=user.empid order by date desc",function(err,rows){
					var data=JSON.stringify(rows);
					var json=JSON.parse(data);
					response.send(json);
			    	});	
				}
				else if(id2.role=="user"){
					connection.query("select empid,CONCAT(EXTRACT(DAY FROM date),'/',EXTRACT(MONTH FROM date),'/',EXTRACT(YEAR FROM date)) date,category,amount,expense_id from expense where expense.empid = '"+id1+"' order by expense.date desc",function(err,rows){
					var data=JSON.stringify(rows);
					var json=JSON.parse(data);
					//console.log(json);
					response.send(json);
	    			});
				}
				
			}
			else{
				console.log("invalid user");
			}
		}
});
module.exports = adminRouter;