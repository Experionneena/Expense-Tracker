var tokenc = localStorage.getItem('token1');
var role = localStorage.getItem('role');
var name = localStorage.getItem('name');
var id = localStorage.getItem('id');
if (tokenc == null || role == null || role == "admin") {
    window.location = "index.html";
}     
var key = {'token':tokenc,'role':role};
key = JSON.stringify(key);
document.getElementById('employeeid').value = id;
var httpObj = new XMLHttpRequest();
httpObj.onreadystatechange = function() {
    if(this.readyState == '4' && this.status == '200')
    {
        var result=this.responseText;
        result=JSON.parse(result);
        console.log(result);
        if(result == ""){
           bootbox.alert("You have no previous expenses")
        }
        var table = document.getElementById('list1');
        content = "<div class='table table-responsive'><table class='table2 table-responsive' id='etable'><thead><tr class='tr'><th>Category</th><th>Date</th><th>View more</th><th id='hide'></th><th id='hide'></th></tr></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {
           var x = element.expense_id;
           console.log(element.bill);
           content += `<tr><td>${element.category}</td><td>${element.date}</td><td><button type='button' class='buttonp' onclick='viewMore(${x})'>View more</button><td id='hide'><button type='button' class='buttonp' onclick='deleteExpense(${x})'>Delete</button></td></tr>`;
           i++;
        });
        content += "</tbody><tfooter></tfooter></table> </div>";
        document.getElementById('list1').innerHTML = content;
        var name = localStorage.getItem('name');
        var welcome="Welcome"+"  "+name;
        console.log(welcome);
        var t = document.createTextNode(welcome);
        document.getElementById('welcome').appendChild(t);
    }
}
httpObj.open('GET','http://192.168.1.225:8082/EXPENSE/'+id,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.setRequestHeader("Authorization", key);
httpObj.send();

function viewMore(exid){
    var id=exid;
    var httpObj = new XMLHttpRequest();
    httpObj.onreadystatechange = function() {
        if(this.readyState == '4' && this.status == '200')
        {
            var result=this.responseText;
            result=JSON.parse(result);
            console.log(result);
            var table = document.getElementById('list1');
            content1 = "<div class='table-responsive'><table class='table table-hover' id='tablemodal'><tbody>";
            var i = 1;
            result.forEach(function(element) {
                var d = new Date(element.date);
                var x = element.expense_id;
                content1 += `<tr><td>Employee Name</td><td>${element.empname}</td></tr><tr><td>Employee Id</td><td>${element.empid}</td></tr><tr><td>Date</td><td>${element.date}</td></tr><td>Category</td><td>${element.category}</td></tr><tr><td>Amount</td><td>${element.amount}</td></tr><tr><td id='bill'><button class='buttonp' onclick="viewImage('${element.bill}')">View bill</button></td><td id='show'><button type='button' class='buttonp' onclick='deleteExpense(${x})'>Delete</button></td></tr>`;
                i++;
            });
            content1 += "</tbody> </table> </div>";
            document.getElementById('mbody').innerHTML = content1;
            console.log(mbody);
            $('#myModal').modal('show');
        }
    }
    httpObj.open('GET','http://192.168.1.225:8082/USEREXPENSE/'+id,true);
    httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
    httpObj.setRequestHeader("Authorization", key);
    httpObj.send();
}

function deleteExpense(expid) {
    var httpObj = new XMLHttpRequest();
    bootbox.confirm({ 
       size: "small",
       message: "Do you want to delete this item ?", 
       callback: function(res) { 
            if (res == true) {
                var httpObj = new XMLHttpRequest();
                httpObj.onreadystatechange = function() {
                    if(this.readyState == '4' && this.status == '200') {
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

function viewImage(bill) {
    if(bill == ""){
        bootbox.alert({ 
            size: "small",
            title: "Alert",
            message: "No bills are uploaded for this expense...", 
            callback: function(){ }
            })
    }
    else{
        window.location = bill;
    }
}

function logout() {
   bootbox.confirm({ 
       size: "small",
       message: "Do you want to logout ?", 
       callback: function(result) { 
            if (result == true) {
                localStorage.setItem('token1',null);
                localStorage.setItem('role',null);
                localStorage.clear();
                window.location.reload();
                window.location = 'index.html';
            }
            else {
                bootbox.alert({ 
                    size: "small",
                    title: "Alert",
                    message: "you pressed cancel!!", 
                    callback: function() {}
                })
            }
        }
    });
}


