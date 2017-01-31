var tokenc = localStorage.getItem('token1');
var role = localStorage.getItem('role');
if (tokenc == null || role == null || role == "user"){
    window.location = "index.html";
}     
var empidarr = [];   
var total = 0; 
total=parseInt(total);
var httpObj = new  XMLHttpRequest();
httpObj.onreadystatechange = function() {
    if(this.readyState == '4' && this.status == '200') {
        var result = this.responseText;
        result = JSON.parse(result);
        var empidarr = [];
        var table = document.getElementById('tablebody');
        content = "<div class='table-responsive'><table class='table table-hover' id='table'><thead><tr><th>Employee Name</th><th>Date</th><th id='hide'>Category</th><th>View Details</th></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {
            var d = new Date(element.date);
            var x = element.expense_id;
            content += `<tr><td>${element.empname}</td><td>${element.date}</td><td id='hide'>${element.category}</td><td><button class='buttonp' onclick="viewMore(${x})">View More</button></td></tr>`;
            empidarr[i-1] = element.empid;
            i++;
        });
        content += "</tbody> </table> </div>";
        document.getElementById('list').innerHTML = content;
        $('#table').DataTable();
        var li = document.getElementById("sel1");
    }
}
var key = {'token':tokenc,'role':role};
key = JSON.stringify(key);
httpObj.open('GET','http://192.168.1.225:8082/EXPENSE',true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.setRequestHeader("Authorization", key);
httpObj.send();   

function viewMore(exid){
    var id=exid;
    console.log(id);
    var httpObj = new  XMLHttpRequest();
    httpObj.onreadystatechange = function() {
        if(this.readyState == '4' && this.status == '200') {
            var result = this.responseText;
            result = JSON.parse(result);
            console.log(result);
            content1 = "<div class='table-responsive'><table class='table table-hover' id='tablemodal'><tbody>";
            var i = 1;
            result.forEach(function(element) {
                var d = new Date(element.date);
                content1 += `<tr><td>Employee Name</td><td>${element.empname}</td></tr><tr><td>Employee Id</td><td>${element.empid}</td></tr><tr><td>Date</td><td>${element.date}</td></tr><td>Category</td><td>${element.category}</td></tr><tr><td>Amount</td><td>${element.amount}</td></tr><tr><td id='bill'><button class='buttonp' onclick="viewImage('${element.bill}')">View bill</button></td></tr>`;
                empidarr[i-1] = element.empid;
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
                    callback: function(){}
                })
            }
        }
    });
}

function viewImage(bill) {
    console.log("haiii");
    if (bill == "") {
        bootbox.alert({ 
            size: "small",
            title: "Alert",
            message: "No bills are available for this expense...", 
            callback: function() {}
        })
    }
    else {
        window.location = bill;
    }
}


