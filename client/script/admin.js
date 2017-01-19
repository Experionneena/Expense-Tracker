var tokenc = localStorage.getItem('token1');
var role = localStorage.getItem('role');
if(tokenc==null || role==null){
    window.location = "index.html";
}     
  console.log(role);   
  var empidarr=[];   
  var total=0; 
  total=parseInt(total);
  console.log(total); 
var httpObj=new	XMLHttpRequest();
httpObj.onreadystatechange=function(){
	if(this.readyState=='4' && this.status=='200')
	{
        var result=this.responseText;
		result=JSON.parse(result);
        var empidarr=[];
		var table = document.getElementById('tablebody');
		content = "<div class='table-responsive'><table class='table table-hover'><thead><tr><th>No.</th><th></th><th>Name</th><th></th><th>Employee id</th><th></th><th>Date</th><th></th><th>Category</th><th></th><th>Amount</th><th></th><th>Bill</th></tr></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {
            var d = new Date(element.date);
            content += "<tr><td>" + i + "</td><td></td><td>" + element.empname + "</td><td></td><td>" + element.empid + "</td><td></td><td>" + element.date + "</td><td></td><td>" + element.category + "</td><td></td><td>" + element.amount + "</td><td></td><td id='imagetd'><img src='http://192.168.1.225:8082/" +element.bill +"' alt='No biils are available'></td></tr>";
            empidarr[i-1]= element.empid;
            i++;
        });
        content += "</tbody> </table> </div>";
        document.getElementById('list').innerHTML = content;
        console.log(empidarr);
        var li = document.getElementById("sel1");
        var uniques = empidarr.unique()
        console.log(uniques);
        uniques.forEach(myFunction);
        function myFunction(item, index) {
              console.log(item);
              var option1 = document.createElement("option");
              option1.text = item;
              option1.value = item;
              option1.innerHTML=item;
              li.appendChild(option1); 
        }
         console.log(uniques.length);         
    }
}
var key ={'token':tokenc,'role':role};
key=JSON.stringify(key);
httpObj.open('GET','http://192.168.1.225:8082/EXPENSE/'+key,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send();

function getTotal(){
    var select= document.getElementById('sel1');
    var empid=select.options[select.selectedIndex].value;
    console.log("empid"+empid);
    var httpObj = new XMLHttpRequest();
    httpObj.onreadystatechange=function(){
    if(this.readyState == '4' && this.status == '200')
    {
        var result=this.responseText;
        result=JSON.parse(result);
        result.forEach(function(element){
            document.getElementById(element.category).innerHTML = element.category+":"+element.amount;
            amount=parseInt(element.amount);
            total =total+element.amount;
        });
        document.getElementById('name').innerHTML = 'EMPLOYEE NAME : '+result[0].empname;
        document.getElementById('sum').innerHTML = 'TOTAL : '+total;
       
    }
}
httpObj.open('GET','http://192.168.1.225:8082/TOTAL/'+empid+'/'+key,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send();

}
function logout(){
    localStorage.removeItem('token1');
    localStorage.removeItem('role');
    localStorage.clear();
    window.location.reload();
    window.location = 'index.html';
    
}
Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};
Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
};
 // tr:nth-of-type(10n){
 //    page-break-after: always;
 //    $("table > tbody > tr").hide().slice(0, 2).show();
 //    $(".show-all").on("click", function() {
 //        $("tbody > tr", $(this).prev()).show();
 //    });
$("table > tbody > tr").hide().slice(0, 2).show();
