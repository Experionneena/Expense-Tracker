var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var validator = require('validator');
var fs = require('fs');
var busboy = require('connect-busboy');

var connection=mysql.createConnection({host:"localhost",user:"root",password:"neena",database:"expense_tracker"});
var app = express();
var userRouter = express.Router();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(busboy());
userRouter.post('/login',function(request, response){
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
		console.log(json);
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
		console.log(js);
		response.send(js);
    });
});
userRouter.post('/upload',function(request, response){
	var fstream;
	var field={};
    var js={"status":'403',"message":" failed",};
    new Promise(function(resolve, reject){
    	request.pipe(request.busboy);
	    request.busboy.on('file', function (fieldname, file, filename) {
		    console.log("Uploading: " + filename); 
		    field["bill"]=filename;
		    fstream = fs.createWriteStream(__dirname + '/images/' + filename);
		    file.pipe(fstream);
		    fstream.on('close', function () {
	    	});
	    });
		request.busboy.on('field', function(fieldname, val) {
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
	});
	console.log(field);
});
app.use('/',userRouter);

var server = app.listen(8082,function(){
	var port = server.address().port;
	console.log("Listening  on port %s", port);
});