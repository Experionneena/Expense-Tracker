var tokenc = localStorage.getItem('token1');
var role = localStorage.getItem('role');
var name = localStorage.getItem('name');
var id = localStorage.getItem('id');
if(tokenc == null || role == null || role == "admin"){
    window.location = "index.html";
}     
var key = {'token':tokenc,'role':role};
key = JSON.stringify(key);
document.getElementById('employeeid').value = id;
var httpObj = new XMLHttpRequest();
httpObj.onreadystatechange = function(){
    if(this.readyState == '4' && this.status == '200')
    {
        var result=this.responseText;
        result=JSON.parse(result);
        console.log(result);
        var table = document.getElementById('list1');
        content = "<div class='table table-responsive'><table class='table2 table-responsive' id='etable'><thead><tr class='tr'><th>No.</th><th>Category</th><th>Date</th><th>Amount</th><th>bill</th><th></th><th></th></tr></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {
           var x = element.expense_id;
           console.log(element.bill);
           content += `<tr><td>${i}</td><td>${element.category}</td><td>${element.date}</td><td>${element.amount}</td><td><button class='buttonp' onclick="viewImage('${element.bill}')">View bill</button></td><td></td><td><button type='button' class='buttonp' onclick='deleteExpense(${x})'>DELETE</button></td></tr>`;
           i++;
        });
        content += "</tbody><tfooter></tfooter></table> </div>";
        document.getElementById('list1').innerHTML = content;
        var name = localStorage.getItem('name');
        name = name.toUpperCase(); 
        var welcome="WELCOME"+"  "+name;
        console.log(welcome);
        var t = document.createTextNode(welcome);
        document.getElementById('welcome').appendChild(t);
    }
}
httpObj.open('GET','http://192.168.1.225:8082/EXPENSE/'+id,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.setRequestHeader("Authorization", key);
httpObj.send();

function formValidation() {
    var date = document.getElementById('date').value;
    var amount = document.getElementById('amount').value;
    var category = document.getElementById('sel1').value;
    var regamt = /^[1-9]\d*(\.\d+)?$/;
    var regdate =  /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
    var fup = document.getElementById('image');
    var fileName = fup.value;
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (date == "") {
       bootbox.alert("Please enter a date ");
       return false;
    }
    else if(category == ""){
        bootbox.alert("Please enter an category");
        return false;
    }
    else if(amount == ""){
        bootbox.alert("Please enter an amount");
        return false;
    }
    else if (date.search(regdate) == -1) {
       bootbox.alert("Please enter a date in mm/dd/yyyy format");
       return false;
    }
    else if(amount.search(regamt) == -1){
        bootbox.alert("Please enter valid amount");
        return false;
    }
    else if(fileName != ""){
        if(!(ext == "gif" || ext == "GIF" || ext == "JPEG" || ext == "jpeg" || ext == "jpg" || ext == "JPG" || ext == "doc")){
            bootbox.alert("Upload Gif or Jpg images only");
            fup.focus();
            return false;
        }
    } 
     else{
        return true;
    }
  
}

$("form#empdata").submit(function(){
    var formData = new FormData(this);
    console.log(formData);
   if( formValidation()){
        window.location.reload();
        $.ajax({
            url: 'http://192.168.1.225:8082/EXPENSE/'+key,
            type: 'POST',
            data: formData,
            async: false,
            success: function (data) {
            },
            cache: false,
            contentType: false,
            processData: false
        });
    }
    
        return false; 
    
   
});

function deleteExpense(expid){
    var httpObj = new XMLHttpRequest();
    bootbox.confirm({ 
       size: "small",
       message: "Do you want to delete this item ?", 
       callback: function(res){ /* result is a boolean; true = OK, false = Cancel*/ 
            if (res == true) {
                var httpObj = new XMLHttpRequest();
                httpObj.onreadystatechange = function(){
                    if(this.readyState == '4' && this.status == '200'){
                        var result = this.responseText;
                        result = JSON.parse(result);
                        console.log(result);  
                    }
                }
                window.location.reload();
            }
            else {
                bootbox.alert("you pressed cancel!!")
            }
        }
    })
httpObj.open('DELETE','http://192.168.1.225:8082/EXPENSE/'+expid,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.setRequestHeader("Authorization", key);
httpObj.send();
}

$(document).ready(function(){
      var date_input = $('input[name="date"]'); ;
      var container = $('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
      var options = {
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
      };
      date_input.datepicker(options);
});

function viewImage(bill)  {
    console.log("haiii");
    if(bill == ""){
        // bootbox.alert("No bills are available");
        bootbox.alert({ 
            size: "small",
            title: "Alert",
            message: "No bills are available for this expense...", 
            callback: function(){ }
            })
    }
    else{
        window.location = bill;
    }
}

function logout(){
    //var r = confirm("Do you want to logout!");
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


function resetPassword(){
    console.log("haii");
    var current = document.getElementById('current').value;
    var newp = document.getElementById('new').value;
    var confirm = document.getElementById('confirm').value;
    console.log(current,newp,confirm);
    if (current == "") {
        bootbox.alert("Please enter current password");
    }
    else if(newp == ""){
        bootbox.alert("Please enter new password");
    }
    else if(confirm == ""){
        bootbox.alert("Please confirm your password");
    }
    else if(confirm != newp ){
        bootbox.alert("Wrong password");
    }
    else{
        current = (Crypto.MD5(current)).toString();
        newp = (Crypto.MD5(newp)).toString();
        var httpObj=new XMLHttpRequest();
        httpObj.onreadystatechange=function(){
            if(this.readyState=='4' && this.status=='200'){
                var result=this.responseText;
                result=JSON.parse(result);
                console.log(result.message); 
                if(result.message=="wrong password") {
                   // window.alert("wrong password");
                    bootbox.alert({ 
                      size: "small",
                      title: "Alert",
                      message: "wrong password", 
                      callback: function(){
                            window.location.reload();
                       }
                    })
                }
                else if(result.message=="success"){
                 //bootbox.alert("password is successfully changed");
                 bootbox.alert({ 
                      size: "small",
                      title: "Alert",
                      message: "password is successfully changed", 
                      callback: function(){
                            window.location.reload();
                       }
                    })
                }

            }
        }
    }
httpObj.open('PUT','http://192.168.1.225:8082/PASSWORD',true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.setRequestHeader("Authorization", key);
httpObj.send('id='+id+'&current='+current+'&new1='+newp);
}

$('#reset').click(function () {
    $('.confirm').toggle();
});


