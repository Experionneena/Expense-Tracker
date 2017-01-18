var tokenc = localStorage.getItem('token1');
var role = localStorage.getItem('role');
if(tokenc==null && role==null){
    window.location = "index.html";
}     
  console.log(role);        
var httpObj=new	XMLHttpRequest();
 //verify(); 
httpObj.onreadystatechange=function(){
	if(this.readyState=='4' && this.status=='200')
	{

		var result=this.responseText;
		result=JSON.parse(result);
        // var role = result.user_type;
        console.log(role);
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
var tokenc = localStorage.getItem('token1');
var role = localStorage.getItem('role');
var key ={'token':tokenc,'role':role};
console.log(key);
//key=JSON.parse(key);
key=JSON.stringify(key);
    //var auth=key;
console.log(key);
httpObj.open('GET','http://192.168.1.225:8082/EXPENSE/'+key,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
//console.log(tokenc);       
httpObj.send();
// function verify (){
//     var httpObj=new XMLHttpRequest();

//     httpObj.onreadystatechange=function(){
//     if(this.readyState=='4' && this.status=='200')
//     {

//         var result=this.responseText;
//         result=JSON.parse(result);
//         // var role = result.user_type;
//        console.log(result);
//        if(result.message == "valid user"){

//        }
//        else{
//         window.location = "index.html";
//        }
        
//     }
// }
//     var tokenc = localStorage.getItem('token1');
//     var role = localStorage.getItem('role');
//     console.log("aaaaaaaaaaaa");
//     httpObj.open('POST','http://192.168.1.225:8082/verify',true);
//     httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
//     console.log(tokenc,role);       
//     httpObj.send('id='+tokenc+'&role='+role);
// //  return;
// }


function logout(){
    localStorage.setItem('token1',null);
                
    localStorage.setItem('role',null);
    window.location.reload();
    window.location = 'index.html';
    
}