var express = require('express');
var validator = require('validator');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var busboy = require('connect-busboy');
var fs = require('fs');
path = require('path');
var nodemailer = require('nodemailer');
var moment = require('moment'); 
var admin = require('./admin');
var employee = require('./employee');
var app = express();
app.use(express.static('images'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(busboy());


var connection = mysql.createConnection({host:"localhost",user:"root",password:"neena",database:"expense_tracker"});
var loginRouter = express.Router();

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'client/index.html'));
});
app.use(express.static(path.join(__dirname, '..', 'client')));

loginRouter.post('/login',function(request, response) {
	var id = request.body.userId;
	var password = request.body.password;
	console.log(id,password);
	if ((validator.isEmpty(id) && validator.isEmpty(password))) {
		js.message = "id and password missing in server side";
	}
    if ((validator.isEmpty(id))) {
    	js.message = "id missing in server side"; 
    }    
    if ((validator.isEmpty(password))) {
    	js.message = "password missing in server side";  
    }   
	connection.query('select empid,password,status,empname from user where empid ="'+id+'"',function(err,rows){
		var data = JSON.stringify(rows);
		var json = JSON.parse(data);
 		var js = {"status":'403',"message":"Login failed","user_type":null,"token":"","empname":"","empid":""};
 		if (rows.length > 0) {
			if (id == json[0].empid && password == json[0].password) {
				js.status = '200';
				js.message = "Login success";
				console.log(json.status);
				if (json[0].status == true) {
				    js.user_type = "admin";
				}
				else js.user_type = "user";
				var token = jwt.sign({role:js.user_type}, 'neena',{expiresIn:60*10000});
				js.empname = json[0].empname;
				js.empid = json[0].empid;
				js.token = token;
				console.log(js.empname);
			}
		}
		response.send(js);
    });
});

loginRouter.post('/EXPENSE/:key',function(request, response) {
	var fstream;
	var field = {};
    var js = {"status":'403',"message":" failed",};
    new Promise (function(resolve, reject) {
    	request.pipe(request.busboy);
		request.busboy.on('file', function (fieldname, file, filename) {
			console.log("Uploading: " + filename); 
			field["bill"] = filename;
			if (field["bill"] == "") { return false;}
			var timestamp = new Date().getTime();
			field["bill"] = timestamp+field["bill"];
			console.log(field["bill"]);
			filename=timestamp+filename;
		   fstream = fs.createWriteStream(__dirname + '/images/' + filename);
		    file.pipe(fstream);
		    fstream.on('close', function () {
			});
		});
		request.pipe(request.busboy);
		request.busboy.on('field', function(fieldname, val) {
		    	console.log(fieldname, val);
				field[fieldname] = val;
		});
		resolve();
	}).then(function() {
		if (validator.isEmpty(field["empid"])) {
			console.log("employee id missing in server side");
		}
		else if (validator.isEmpty(field["date"])) {
			console.log("date  missing in server side");
		}
		else if (validator.isEmpty(field["category"])) {
			console.log("category  missing in server side");
		}
		else if (validator.isEmpty(field["amount"])) {
			console.log("amount missing in server side");
		}
		else {
			var id = field["empid"];
			console.log(id);
			console.log("date"+field["date"]);
			field["date"] = new Date(field["date"]);
			connection.query('INSERT INTO expense SET ?' , field ,function (err,result) {
	              if (!err) {
					js.status = '200';
	                js.message = "success";
	                console.log(js);
	                sendMail('expensetracker11@gmail.com',id);
	                response.send(js);
	            }
	            else
	            	console.log(err);
	        });
		}
	}).catch(function() {
		console.log("uploading failed");
		js.message = "failed";
		response.send(js);
	});
});

var sendMail=function(toAddress,id) {
    return new Promise(function(resolve,reject) {
	var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'expensetracker11@gmail.com ',
            pass: 'expensetracker' 
        }
    });
    var text = 'A new expense is added yo the system by the user having employee id '+id;
	var mailOptions = {
        from: 'expensetracker11@gmail.com',
        to: toAddress,
        subject: 'New Expense',
        text: text
    };
	transporter.sendMail(mailOptions, function(error, info){
        if(!error){
            console.log(info);
            resolve();
        }else{
            reject();
        }
    });
	});
}

app.use('/',loginRouter);
app.use('/',employee);
app.use('/',admin);

var server = app.listen(8082,function() {
	var port = server.address().port;
	console.log("Listening  on port %s", port);
});