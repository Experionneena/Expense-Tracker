// var value = sessionStorage.getItem(key);
//                 console.log(value);
var id = 503;
var httpObj=new XMLHttpRequest();
httpObj.onreadystatechange=function(){
    if(this.readyState=='4' && this.status=='200')
    {
        var result=this.responseText;
        result=JSON.parse(result);
        //console.log(result);
        var table = document.getElementById('list1');
        content = "<div class='table'><table class='table2' id='etable'><thead><tr class='tr'><th>No.</th><th>Category</th><th>Date</th><th>Amount</th><th></th></tr></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {
           var x = element.expense_id;
           console.log(element.expense_id);
           content += "<tr><td>" + i + "</td><td>" + element.category + "</td><td>" + element.date + "</td><td>" + element.amount + "</td><td><button type='button' class='buttonp' onclick='deleteExpense("+x+")'>DELETE</button></td></tr>";
           i++;
        });
        content += "</tbody><tfooter></tfooter></table> </div>";
        document.getElementById('list1').innerHTML = content;
    }
}
httpObj.open('GET','http://192.168.1.225:8082/EMPLOYEE/'+id,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
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
    var formData = new FormData(this);
    console.log(formData);
    formValidation();
    window.location.reload();
    $.ajax({
        url: 'http://192.168.1.225:8082/EXPENSE',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
        },
        cache: false,
        contentType: false,
        processData: false
    });


    return false;

});

function deleteExpense(expid){
    var httpObj=new XMLHttpRequest();
    httpObj.onreadystatechange=function(){
        if(this.readyState=='4' && this.status=='200'){
            var result=this.responseText;
            result=JSON.parse(result);
            console.log(result);  
            window.location.reload();
        }
    }
//var exid = document.getElementById('expenseid').value;
console.log(expid);
httpObj.open('DELETE','http://192.168.1.225:8082/EXPENSE/'+expid,true);
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
function logout(){
    window.location.reload();
    window.location.assign("index.html")
    
}



