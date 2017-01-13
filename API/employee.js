var employeeRouter = express.Router();
employeeRouter.get('/EMPLOYEE/:id',function (request, response){
	var id1=request.params.id;
	console.log(id1);
	connection.query('select * from expense where expense.empid = "'+id1+'" limit 5',function(err,rows){
			var data=JSON.stringify(rows);
			var json=JSON.parse(data);
			console.log(json);
			response.send(json);
	    });

});

employeeRouter.post('/EMPLOYEE',function(request, response){

	var fstream;
	var field={};
    var js={"status":'403',"message":" failed",};
    new Promise(function(resolve, reject){
	    request.pipe(request.busboy);
		request.busboy.on('file', function (fieldname, file, filename) {
			console.log("Uploading: " + filename); 
			field["bill"]=filename;
		    fstream = fs.createWriteStream(__dirname + '/API/images/' + filename);
		    file.pipe(fstream);
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