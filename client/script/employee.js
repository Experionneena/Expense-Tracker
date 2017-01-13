 var id = 503;

var httpObj=new XMLHttpRequest();
httpObj.onreadystatechange=function(){
    if(this.readyState=='4' && this.status=='200')
    {
        var result=this.responseText;
        result=JSON.parse(result);
        console.log(result);
        var table = document.getElementById('list1');
        content = "<div class='table-responsive'><table class='table-hover' id='etable'><thead><tr><th>No.</th><th>Category</th><th>Date</th><th>Amount</th><th></th><th></th></tr></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {
       
       console.log(element);
        content += "<tr><td>" + i + "</td><td>" + element.category + "</td><td>" + element.date + "</td><td>" + element.amount + "</td><td><button type='button' onclick='deleteExpense()'>DELETE</button></td><td><button type='button' onclick='editExpense()'>EDIT</button></td></tr>";
         // content += "<tr><td>" + i + "</td><td>" + element.empname + "</td><td>" + element.empid + "</td><td>" + element.date + "</td><td>" + element.category + "</td><td>" + element.amount + "</td><td><img src='images/20170103_160801.jpg'></td>";
        i++;
        });
        content += "</tbody><tfooter></tfooter></table> </div>";
        document.getElementById('list1').innerHTML = content;

   
    }
}
httpObj.open('GET','http://127.0.0.1:8088/EMPLOYEE/'+id,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
console.log(id);
httpObj.send();


function formValidation() {
    var date = document.getElementById('date').value;
    var amount = document.getElementById('amount').value;
     if (date == "") {
        alert("Please enter a date ");
        return false;
    }
    else if(amount == ""){
        alert("Please enter an amount");
        return false;
    }
     else{
        return true;
    }
  
}

$("form#empdata").submit(function(){
    formValidation();
    var formData = new FormData(this);
    $.ajax({
        url: 'http://127.0.0.1:8088/EMPLOYEE',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
            //alert(data)
        },
        cache: false,
        contentType: false,
        processData: false
    });

    return false;

});

function deleteExpense(){
    var httpObj=new XMLHttpRequest();
    httpObj.onreadystatechange=function(){
        if(this.readyState=='4' && this.status=='200'){
            var result=this.responseText;
            result=JSON.parse(result);
            console.log(result);  
        }
    }

httpObj.open('DELETE','http://127.0.0.1:8088/EMPLOYEE/'+id,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send();
}
function editExpense(){
    var httpObj=new XMLHttpRequest();
    httpObj.onreadystatechange=function(){
        if(this.readyState=='4' && this.status=='200'){
            var result=this.responseText;
            result=JSON.parse(result);
            console.log("haiiiiiiiiiiiiii");  
            content =  "<div class='table-responsive'><table class='table-hover' id='etable'></table></div>";
        }
    }

httpObj.open('PUT','http://127.0.0.1:8088/EMPLOYEE/'+id,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send();
}

$(document).ready(function(){
      var date_input=$('input[name="date"]'); ;
      var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
      var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
      };
      date_input.datepicker(options);
});



