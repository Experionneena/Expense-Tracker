var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var fs = require('fs');
var busboy = require('connect-busboy');
var jwt = require('jsonwebtoken');

var connection=mysql.createConnection({host:"localhost",user:"root",password:"neena",database:"expense_tracker"});
var app = express();
var userRouter = express.Router();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(busboy());

userRouter.get('/EMPLOYEE/:id/:key',function (request, response){
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
			connection.query("select empid,CONCAT(EXTRACT(DAY FROM date),'/',EXTRACT(MONTH FROM date),'/',EXTRACT(YEAR FROM date)) date,category,amount,expense_id from expense where expense.empid = '"+id+"' order by expense.date desc",function(err,rows){
				var data=JSON.stringify(rows);
				var json=JSON.parse(data);
				//console.log(json);
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
		//var id3 = request.body.role;
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
					//console.log(json);
					response.send(json);
	   			 });
			}}
});

module.exports = userRouter;
