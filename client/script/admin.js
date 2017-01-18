var tokenc = localStorage.getItem('token1');
var role = localStorage.getItem('role');
if(tokenc==null && role==null){
    window.location = "index.html";
}     
  console.log(role);   
  var empidarr=[];     
var httpObj=new	XMLHttpRequest();
httpObj.onreadystatechange=function(){
	if(this.readyState=='4' && this.status=='200')
	{
        var result=this.responseText;
		result=JSON.parse(result);
        // var role = result.user_type;
        console.log(role);
        var empidarr=[];
		var table = document.getElementById('tablebody');
		content = "<div class='table-responsive'><table class='table table-hover'><thead><tr><th>No.</th><th></th><th>Name</th><th></th><th>Employee id</th><th></th><th>Date</th><th></th><th>Category</th><th></th><th>Amount</th><th></th><th>Bill</th></tr></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {

            var d = new Date(element.date);
            content += "<tr><td>" + i + "</td><td></td><td>" + element.empname + "</td><td></td><td>" + element.empid + "</td><td></td><td>" + element.date + "</td><td></td><td>" + element.category + "</td><td></td><td>" + element.amount + "</td><td></td><td id='imagetd'><img src='http://192.168.1.225:8082/" +element.bill +"' alt='No biils are available'></td></tr>";
            empidarr[i-1]= element.empid;
            i++;
            
            //empidarr[i]= element.empid;
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
    console.log("hai");
    var select= document.getElementById('sel1');
    var empid=select.options[select.selectedIndex].value;
console.log("empid"+empid);
    var httpObj = new XMLHttpRequest();
httpObj.onreadystatechange=function(){
    if(this.readyState == '4' && this.status == '200')
    {
        var result=this.responseText;
        result=JSON.parse(result);
        console.log(result);
        // var t = document.createTextNode(result.sum);
        //  console.log(t);
        document.getElementById('sum').innerHTML = 'TOTAL : '+result[0].amount;
        document.getElementById('name').innerHTML = 'EMPLOYEE NAME : '+result[0].empname;
    }
}
httpObj.open('GET','http://192.168.1.225:8082/TOTAL/'+empid+'/'+key,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send();

}

function logout(){
    localStorage.setItem('token1',null);
    localStorage.setItem('role',null);
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