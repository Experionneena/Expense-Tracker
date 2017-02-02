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
            	
	                var data1 = JSON.stringify(rows);
	                var json1 = JSON.parse(data1);
	                console.log(json1);
	                js1.empname = json1[0].empname;
					js1.empid = json1[0].empid;
	                var token = jwt.sign({empid:json1[0].empid}, 'neena',{expiresIn:60*10000});
					
					console.log(js1);
					var text = 'Hai '+json1[0].empname+',<br><br>Reset your password here   http://192.168.1.225:8082/forgotpass.html?'+token+'<br><br>Regards,<br>Admin';

					 // var text='http://192.168.1.225:8082/forgotpass.html?'+token;
	                email.sendMail(json1[0].email,text);
	            	js1.message="success";
                    console.log(js1);
                    response.send(js1);
	           
            	}
            	else {
	                js1.message = "error";
	                console.log(js);
	                response.send(js);
    			}
        	}
        	else{
               console.log("error in forgot possword");
           } 
        });
	}
});

forgotRouter.put('/SETPASSWORD',function(req, res){
	var password = req.body.newp;
	var token = req.body.token;
	var js = {"status":"","message":""};
	if( password.length == ""|| password.length > 32 ){

		console.log("error");
		js.status=403;
		res.send(js);
		js.message = "Password Change Failed";
		return false;
	}
	else{

		var decoded = jwt.verify(token, 'neena',function(err,decoded){
			console.log("decoded.empid"+decoded.empid+password);
			if(err){
				console.log("token expired");
				js.message = "token expired";
			}
			else{
				connection.query('UPDATE user set Password=? where empid=?',[password,decoded.empid],function(err,rows){
					var data = JSON.stringify(rows);
					var json = JSON.parse(data);
					js.status = 200;
					js.message = "Password Changed Successfully";
					res.send(js);
				});
			}
		});
	}
})


module.exports = forgotRouter;
