var tokenc = localStorage.getItem('token1');
var role = localStorage.getItem('role');
if(tokenc == null || role == null || role == "user"){
    window.location = "index.html";
}     
console.log(role);   
var empidarr = [];   
var total = 0; 
total=parseInt(total);
console.log(total); 
var httpObj = new	XMLHttpRequest();
httpObj.onreadystatechange = function(){
	if(this.readyState == '4' && this.status == '200')
	{
        var result = this.responseText;
		result = JSON.parse(result);
        var empidarr = [];
		var table = document.getElementById('tablebody');
		content = "<div class='table-responsive'><table class='table table-hover' id='table'><thead><tr><th>No.</th><th></th><th>Name</th><th></th><th>Employee id</th><th></th><th>Date</th><th></th><th>Category</th><th></th><th>Amount</th><th></th><th>Bill</th></tr></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {
            var d = new Date(element.date);
            content += `<tr><td>${i}</td><td></td><td>${element.empname}</td><td></td><td>${element.empid}</td><td></td><td>${element.date}</td><td></td><td>${element.category}</td><td></td><td>${element.amount}</td><td></td><td id='bill'><button class='buttonp' onclick="viewImage('${element.bill}')">View bill</button></td></tr>`;
            empidarr[i-1] = element.empid;
            i++;
        });
        content += "</tbody> </table> </div>";
        document.getElementById('list').innerHTML = content;
        $('#table').DataTable();
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
              option1.innerHTML = item;
              li.appendChild(option1); 
        }
        console.log(uniques.length);         
    }
}
var key = {'token':tokenc,'role':role};
key = JSON.stringify(key);
httpObj.open('GET','http://192.168.1.225:8082/EXPENSE/'+key,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send();

function getTotal(){
    document.getElementById('Accomodation').innerHTML = "0.00";
    document.getElementById('Food').innerHTML = "0.00";
    document.getElementById('Fuel').innerHTML = "0.00";
    document.getElementById('Health').innerHTML = "0.00";
    document.getElementById('Travel').innerHTML = "0.00";
    document.getElementById('Others').innerHTML = "0.00";
    document.getElementById('sum').innerHTML = "0.00";
    var select = document.getElementById('sel1');
    var empid = select.options[select.selectedIndex].value;
    console.log("empid"+empid);
    var obj =  {};
    var httpObj = new XMLHttpRequest();
    httpObj.onreadystatechange=function(){
    if(this.readyState == '4' && this.status == '200')
    {
        var result = this.responseText;
        result = JSON.parse(result);
        total = 0;
        result.forEach(function(element){
            document.getElementById(element.category).innerHTML = element.amount;
            amount = parseInt(element.amount);
            total = total + element.amount;
        });
        document.getElementById('name').innerHTML = 'EMPLOYEE NAME : '+result[0].empname;
        document.getElementById('sum').innerHTML = total;
    }
}
httpObj.open('GET','http://192.168.1.225:8082/TOTAL/'+empid+'/'+key,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send();
}

function logout(){
   bootbox.confirm({ 
       size: "small",
       message: "Do you want to logout ?", 
       callback: function(result){ /* result is a boolean; true = OK, false = Cancel*/ 
            if (result == true) {
                localStorage.setItem('token1',null);
                localStorage.setItem('role',null);
                localStorage.clear();
                window.location.reload();
                window.location = 'index.html';
            }
            else{
                // bootbox.alert("you pressed cancel!!");
                bootbox.alert({ 
                    size: "small",
                    title: "Alert",
                    message: "you pressed cancel!!", 
                    callback: function(){}
                })
            }
        }
    });
}

function viewImage(bill)  {
    console.log("haiii");
    if(bill == ""){
        // bootbox.alert("No bills are available");
        bootbox.alert({ 
            size: "small",
            title: "Alert",
            message: "No bills are available for this expense...", 
            callback: function(){ /* your callback code */ }
        })
    }
    else{
        window.location = bill;
    }
}

function validateForm() {
    var id = document.forms["validation"]["id"].value;
    var name = document.forms["validation"]["name1"].value;
    var email = document.getElementById('mailid').value;
    var regex = /^[a-zA-Z ]{2,30}$/;
    var matching = email.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
    var reg = /^\d+$/;
    if (id == "") {
        bootbox.alert("Please enter employee id");
        return false;
    }
    else if(id == ""){
        bootbox.alert("Please enter user id");
        return false;
    }
    else if(name == ""){
        bootbox.alert("Please enter name of employee");
        return false;
    }
     else if(email == ""){
        bootbox.alert("Please enter email of employee");
        return false;
    }
    else if(id.search(reg) == -1)
     {
         bootbox.alert("invalid employee id");
        return false;
    }
    else if (!regex.test(name)) {
        bootbox.alert("invalid employee name");
        return false;
    }
     
    else if(matching == null)
    {
      bootbox.alert("invalid email format");
      return false;
    }
    
    else{
          addEmployee();
    }
}

function addEmployee(){
    var id = document.getElementById('id').value;
    var name = document.getElementById('name1').value;
    var email = document.getElementById('mailid').value;
    console.log(id,name,email);
    httpObj.onreadystatechange = function(){
    if(this.readyState == '4' && this.status == '200')
    {
        var result = this.responseText;
        result = JSON.parse(result);
        console.log(result);
        if(result.message == "success"){
            alert("Added a new employee successfully");
            window.location.reload();
        }
        else if(result.message == "failed"){
            alert("Employee is already added");
            window.location.reload();
        }
    }
}
httpObj.open('POST','http://192.168.1.225:8082/EMPLOYEE/'+key,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send('id='+id+'&name='+name+'&email='+email);

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

$('#addp').click(function () {
    $('.viewform').toggle();
      
});

$('#adde').click(function () {
    $('.addform').toggle();
});
$('#totalp').click(function () {
    $('#viewe').show();
});

var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

$('#cmd').click(function () {
   var doc = new jsPDF();          
var elementHandler = {
  '#ignorePDF': function (element, renderer) {
    return true;
  }
};
var source = window.document.getElementById("viewe");
doc.fromHTML(
    source,
    15,
    15,
    {
      'width': 180,'elementHandlers': elementHandler
    });

var o = doc.output("dataurlnewwindow");
});