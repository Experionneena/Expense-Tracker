var httpObj=new	XMLHttpRequest();
httpObj.onreadystatechange=function(){
	if(this.readyState=='4' && this.status=='200')
	{

		var result=this.responseText;
		result=JSON.parse(result);
		var table = document.getElementById('tablebody');
		content = "<div class='table-responsive'><table class='table table-hover'><thead><tr><th>No.</th><th></th><th>Name</th><th></th><th>Employee id</th><th></th><th>Date</th><th></th><th>Category</th><th></th><th>Amount</th><th></th><th>Bill</th></tr></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {
            var d = new Date(element.date);
            content += "<tr><td>" + i + "</td><td></td><td>" + element.empname + "</td><td></td><td>" + element.empid + "</td><td></td><td>" + element.date + "</td><td></td><td>" + element.category + "</td><td></td><td>" + element.amount + "</td><td></td><td id='imagetd'><img src='http://192.168.1.225:8082/" +element.bill +"' alt='No biils are available'></td></tr>";
            i++;
        });
        content += "</tbody> </table> </div>";
        document.getElementById('list').innerHTML = content;
    }
}
httpObj.open('GET','http://192.168.1.225:8082/EXPENSE',true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send();

function logout(){
     window.location.reload();
     window.location = 'index.html';
    
}