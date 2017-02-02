var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
// var md5 = require('md5');
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
	                var token = jwt.sign({empid:json1[0].empid}, 'neena',{expiresIn:60*10000});
					
					js.token = token;
					console.log(js);
					 var text='http://192.168.1.225:8082/forgotpass.html?'+token;
					// var a='192.168.1.225/reset/'+token;
	           		// var text = 'Reset password here  192.168.1.225/reset/'+token;
	                email.sendMail(json1[0].email,text);
	            	js1.message="Password reset link is sent to your mail";
                    console.log(js);
                    response.send(js);
	           
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

forgotRouter.post('/SETPASSWORD',function(req, res){

	var password=req.body.password;
	var token=req.body.token;
	// password=md5(password);
	var js={"status":"","message":"","token":""};
	// if(password.length==""||password.length>32){

	// 	console.log("error");
	// 	js.status=403;
	// 	res.send(js);
	// 	js.message="Password Change Failed";
	// 	return false;
	// }
	// else{

		var decoded = jwt.verify(token, 'neena',function(err,decoded){
		if(err){
			console.log("token expired");
		}
		else{
			connection.query('UPDATE user set Password=? where empid=?',[password,decoded.empid],function(err,rows){
				var data=JSON.stringify(rows);
				var json=JSON.parse(data);
				js.status=200;
				js.message="Password Changed Successfully";
				res.send(js);
			});
		}
		});
	// }
})


module.exports = forgotRouter;


// userRouter.post('/forgotPassword',function (req, res){
//    var userid=req.body.userid;
//    var js1={"message":""};
   
//        conn.query('select EID,Email from user where EID=?',[userid],function(err,rows){
//            if(!err){
//                if(rows.length > 0){
//                    var data1=JSON.stringify(rows);
//                    var json1=JSON.parse(data1);
//                    var token2 = jwt.sign({ eid: json1[0].EID}, 'aliya',{expiresIn:60*10000});
//                    var text='http://192.168.1.236/REGISTER/CLIENT/resetpassword.html?'+token2;
//                    email.sendMail(json1[0].Email,token2,text);
//                    js1.message="Password reset link is sent to your mail";
//                    console.log(js1);
//                    res.send(js1);
//                }
//                else {
//                    js1.message="Invalid EID";
//                    console.log(js1);
//                    res.send(js1);
//                }
//            }
//            else{
//                console.log("error in forgot possword");
//            }    
//        });
// });