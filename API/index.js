var express = require('express');
var validator = require('validator');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var busboy = require('connect-busboy');
var fs = require('fs');

var admin = require('./admin');
var employee = require('./employee');
var app = express();
app.use(express.static('images'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(busboy());


var connection=mysql.createConnection({host:"localhost",user:"root",password:"neena",database:"expense_tracker"});
var loginRouter = express.Router();

loginRouter.post('/login',function(request, response){
	var id=request.body.userId;
	var password=request.body.password;
	console.log(id,password);
	if ((validator.isEmpty(id) && validator.isEmpty(password))) {
		js.message="id and password missing in server side";
	}
    if ((validator.isEmpty(id))){
    	js.message="id missing in server side"; 
    }    
    if ((validator.isEmpty(password))){
    	js.message="password missing in server side";  
    }   
	connection.query('select empid,password,status from user where empid ="'+id+'"',function(err,rows){
		var data=JSON.stringify(rows);
		var json=JSON.parse(data);
 		var js={"status":'403',"message":"Login failed","user_type":null};
 		if(rows.length > 0){
			if(id==json[0].empid && password==json[0].password){
				js.status='200';
				js.message="Login success";
				console.log(json.status);
				if(json[0].status==true){
				    js.user_type="admin";
				}
				else js.user_type="user";
			}
		}
		response.send(js);
    });
});

loginRouter.post('/EMPLOYEE',function(request, response) {
	var fstream;
	var field={};
    var js={"status":'403',"message":" failed",};
    new Promise(function(resolve, reject){
    	request.pipe(request.busboy);
		request.busboy.on('file', function (fieldname, file, filename) {
			console.log("Uploading: " + filename); 
			field["bill"]=filename;
			if (field["bill"]=="") { return false;}
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
	}).then(function(){
		field["date"]=new Date(field["date"]);
		console.log(field);
		connection.query('INSERT INTO expense SET ?' , field ,function (err,result) {
              if (!err) {
				js.status='200';
                js.message="success";
                console.log(js);
                response.send(js);
            }
            else
            	console.log(err);
        });
	}).catch(function(){
		console.log("uploading failed");

		});
});

app.use('/',loginRouter);
app.use('/',employee);
app.use('/',admin);



var server = app.listen(8082,function(){
	var port = server.address().port;
	console.log("Listening  on port %s", port);
});