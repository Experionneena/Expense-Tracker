var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var fs = require('fs');
var busboy = require('connect-busboy');
//app.use(express.static('images'));

var connection=mysql.createConnection({host:"localhost",user:"root",password:"neena",database:"expense_tracker"});
var app = express();
var userRouter = express.Router();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(busboy());

userRouter.get('/EMPLOYEE/:id',function (request, response){
	var id1=request.params.id;
	//var id2=request.body.tokenc;
	//console.log(id2);
	connection.query("select empid,CONCAT(EXTRACT(DAY FROM date),'/',EXTRACT(MONTH FROM date),'/',EXTRACT(YEAR FROM date)) date,category,amount,expense_id from expense where expense.empid = '"+id1+"' order by expense.date desc",function(err,rows){
			var data=JSON.stringify(rows);
			var json=JSON.parse(data);
			//console.log(json);
			response.send(json);
	    });

});

userRouter.delete('/EXPENSE/:id',function (request, response){
	var id1=request.params.id;
	console.log(id1);
	connection.query('delete from expense where expense.expense_id = "'+id1+'"',function(err,rows){
			var data=JSON.stringify(rows);
			var json=JSON.parse(data);
			//console.log(json);
			response.send(json);
	    });
});

module.exports = userRouter;
