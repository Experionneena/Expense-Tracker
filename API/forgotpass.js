var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var email = require('./mail');
var connection = mysql.createConnection({host:"localhost",user:"root",password:"neena",database:"expense_tracker"});
var forgotRouter = express.Router();

forgotRouter.post('/PASSWORD',function (request, response){
    var userid=request.body.userid;
    // console.log(userid);
    var js1={"message":""};
    if (userid == "") {
    	 js1.message = "id missing in server side";
    	 console.log("haiii");
   	}
    else{
        connection.query('select * from user where empid=?',[userid],function(err,rows){
            if(!err){
            	console.log(rows);
            	if(rows.length > 0){
            		var js = {"status":'403',"message":"Login failed","user_type":null,"token":"","empname":"","empid":""};
	                var data1 = JSON.stringify(rows);
	                var json1 = JSON.parse(data1);
	                console.log(json1);
	                js.empname = json1[0].empname;
					js.empid = json1[0].empid;
	                var token = jwt.sign({empid:js.empid}, 'neena',{expiresIn:60*10000});
					
					js.token = token;
					console.log(js);
					// var a='192.168.1.225/reset/'+token;
	           		var text = 'Reset password here  192.168.1.225/reset/'+token;
	                email.sendMail(json1[0].email,text);
	           
	           
            	}
            	else {
	                js1.message = "error";
	                console.log(js);
	                response.send(js);
    			}
        	}
        });
		
	}
});

forgotRouter.post('/reset/:token',function (request, response){
	
});

module.exports = forgotRouter;