//console.log("hai");
var httpObj=new	XMLHttpRequest();


httpObj.onreadystatechange=function(){
	if(this.readyState=='4' && this.status=='200')
	{
		var result=this.responseText;
		result=JSON.parse(result);
		//console.log(typeof result[4].bill);
		var table = document.getElementById('tablebody');
		content = "<div class='table-responsive'><table class='table table-hover'><thead><tr><th>No.</th><th>Name</th><th>Employee id</th><th>Date</th><th>Category</th><th>Amount</th><th>Bill</th></tr></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {
        var d = new Date(element.date);
        content += "<tr><td>" + i + "</td><td>" + element.empname + "</td><td>" + element.empid + "</td><td>" + element.date + "</td><td>" + element.category + "</td><td>" + element.amount + "</td><td><img src='../client/images/" +element.bill +"'></td>";
         // content += "<tr><td>" + i + "</td><td>" + element.empname + "</td><td>" + element.empid + "</td><td>" + element.date + "</td><td>" + element.category + "</td><td>" + element.amount + "</td><td><img src='images/20170103_160801.jpg'></td>";
        i++;
        });
        content += "</tbody> </table> </div>";
        document.getElementById('container').innerHTML = content;
    }
}
httpObj.open('GET','http://127.0.0.1:8088/ADMIN',true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send();