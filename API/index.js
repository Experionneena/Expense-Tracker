var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var fs = require('fs');
var login = require('./login');
var admin = require('./admin')

var busboy = require('connect-busboy');
var connection=mysql.createConnection({host:"localhost",user:"root",password:"neena",database:"expense_tracker"});
var app = express();
var userRouter = express.Router();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(busboy());

userRouter.get('/EMPLOYEE/:id',function (request, response){
	var id1=request.params.id;
	console.log(id1);
	connection.query('select * from expense where expense.empid = "'+id1+'" limit 5',function(err,rows){
			var data=JSON.stringify(rows);
			var json=JSON.parse(data);
			console.log(json);
			response.send(json);
	    });

});
userRouter.delete('/EMPLOYEE/:id',function (request, response){
	var id1=request.params.id;
	console.log(id1);
	connection.query('delete from expense where expense.empid = "'+id1+'"',function(err,rows){
			var data=JSON.stringify(rows);
			var json=JSON.parse(data);
			console.log(json);
			response.send(json);
	    });

});
userRouter.put('/EMPLOYEE/:id',function (request, response){
	var id1=request.params.id;
	console.log(id1);
	var post;
	// connection.query('update expense SET ? where expense.empid = "'+id1+'"',[post],function(err,rows){
	// 		var data=JSON.stringify(rows);
	// 		var json=JSON.parse(data);
	// 		console.log(json);
	// 		response.send(json);
	//     });

});


userRouter.post('/EMPLOYEE',function(request, response){

	var fstream;
	var field={};
    var js={"status":'403',"message":" failed",};
    new Promise(function(resolve, reject){
	    request.pipe(request.busboy);
		request.busboy.on('file', function (fieldname, file, filename) {
			console.log("Uploading: " + filename); 
			field["bill"]=filename;
		    fstream = fs.createWriteStream(__dirname + '/images/' + filename);
		    fstream1 = fs.createWriteStream('/var/www/html/project/client/images/' + filename);
		    file.pipe(fstream);
		    file.pipe(fstream1);
		    fstream.on('close', function () {
		            //response.redirect('back');
		    });
		});

		request.busboy.on('field', function(fieldname, val) {
		    	//console.log(fieldname, val);
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
console.log(field);
});
app.use('/',userRouter);
app.use('/',login);
app.use('/',admin)
//app.use('/upload', express.multipart({ uploadDir: '/var/www/html/project/images' }));
//app.use('/view',adminRouter);


var server = app.listen(8088,function(){
	var port = server.address().port;
	console.log("Listening  on port %s", port);
});