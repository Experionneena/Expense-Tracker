var tokenc = localStorage.getItem('token1');
var role = localStorage.getItem('role');
var name = localStorage.getItem('name');
var id = localStorage.getItem('id');
if (tokenc == null || role == null || role == "admin") {
    window.location = "index.html";
}     
var key = {'token':tokenc,'role':role};
key = JSON.stringify(key);
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
        content = "<tr>";

        var i = 1;
        result.forEach(function(element) {
           var x = element.expense_id;
           console.log(element.bill);
           content += `<td>${element.category}</td><td>${element.date}</td><td id='hidea'>${element.amount}</td><td><button type='button' class='buttonp' onclick='viewMore(${x})'>View more</button><td id='hide'><button type='button' class='buttond' onclick='deleteExpense(${x})'><span class='glyphicon glyphicon-trash'></span>  Delete</button></td></tr>`;
           i++;
        });
        document.getElementById('tbody').innerHTML = content;
        var name = localStorage.getItem('name');
        var welcome="Welcome"+"  "+name;
        console.log(welcome);
        var t = document.createTextNode(welcome);
        document.getElementById('welcome').appendChild(t);
           $('#etable').DataTable( {
            initComplete: function () {
                this.api().columns().every( function () {
                    var column = this;
                    var select = $('<select><option value=""></option></select>')
                        .appendTo( $(column.footer()).empty() )
                        .on( 'change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
                            column
                                .search( val ? '^'+val+'$' : '', true, false )
                                .draw();
                        } );
                        column.data().unique().sort().each( function ( d, j ) {
                        select.append( '<option value="'+d+'">'+d+'</option>' )
                    } );
                } );
            }
        } );
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
                content1 += `<tr><td>Employee Name</td><td>${element.empname}</td></tr><tr><td>Employee Id</td><td>${element.empid}</td></tr><tr><td>Date</td><td>${element.date}</td></tr><td>Category</td><td>${element.category}</td></tr><tr><td>Amount</td><td>${element.amount}</td></tr><tr><td id='bill'><button class='buttonp' onclick="viewImage('${element.bill}')">View bill</button></td><td id='show'><button type='button' class='buttond' onclick='deleteExpense(${x})'> <span class='glyphicon glyphicon-trash'></span>Delete</button></td></tr>`;
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
