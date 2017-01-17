var express = require('express');
var mysql = require('mysql');

var adminRouter = express.Router();
var connection=mysql.createConnection({host:"localhost",user:"root",password:"neena",database:"expense_tracker"});

adminRouter.get('/ADMIN',function(request, response){
	connection.query("select empname,category,amount,bill,CONCAT(EXTRACT(DAY FROM date),'/',EXTRACT(MONTH FROM date),'/',EXTRACT(YEAR FROM date)) date,user.empid from expense,user where expense.empid=user.empid order by date desc",function(err,rows){
		var data=JSON.stringify(rows);
		var json=JSON.parse(data);
		response.send(json);
    });
});
module.exports = adminRouter;