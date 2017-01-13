var express = require('express');
var mysql = require('mysql');

var adminRouter = express.Router();
var connection=mysql.createConnection({host:"localhost",user:"root",password:"neena",database:"expense_tracker"});

adminRouter.get('/ADMIN',function(request, response){
	connection.query('select * from expense,user where expense.empid=user.empid order by date desc',function(err,rows){
		var data=JSON.stringify(rows);
		var json=JSON.parse(data);
		//console.log(json);
		response.send(json);
    });
});
module.exports = adminRouter;