var tokenc = localStorage.getItem('token1');
var role = localStorage.getItem('role');

if (tokenc == null || role == null || role == "user"){
    window.location = "index.html";
}

console.log("haii");
var empidarr = [];   
var total = 0; 
total=parseInt(total);
var key = {'token':tokenc,'role':role};
key = JSON.stringify(key);
var httpObj = new  XMLHttpRequest();
httpObj.onreadystatechange = function() {
    if(this.readyState == '4' && this.status == '200') {
        var result = this.responseText;
        result = JSON.parse(result);
        console.log(result);
        var empidarr = [];
        var table = document.getElementById('tablebody');
        content = "<div class='table-responsive'><table class='table table-hover' id='table'><thead><tr><th id='th'>Employee Id</th><th id='th'>Employee Name</th><th id='th'>Email Id</th><th id='th'></th></thead><tfoot id='hidefoot'><tr><th>Employee Id</th><th>Employee Name</th><th>Email Id</th></tr></tfoot><tbody>";
        var i = 1;
        result.forEach(function(element) {
            var d = new Date(element.date);
            var x = element.empid;
            content += `<tr><td>${element.empid}</td><td>${element.empname}</td><td id>${element.email}</td><td><button type='button' class='buttond' onclick='deleteEmployee(${x})'><span class='glyphicon glyphicon-trash'></span>  Delete</button></td></tr>`;
            empidarr[i-1] = element.empid;
            i++;
        });
        content += "</tbody> </table> </div>";
        document.getElementById('list').innerHTML = content;
        // $('#table').DataTable();
         $('#table').DataTable( {
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

        var li = document.getElementById("sel1");
    }
}
var key = {'token':tokenc,'role':role};
key = JSON.stringify(key);
console.log(key);
httpObj.open('GET','http://192.168.1.225:8082/EMPLOYEE',true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.setRequestHeader("Authorization", key);
httpObj.send(); 

function deleteEmployee(empid) {
    var httpObj = new XMLHttpRequest();
    bootbox.confirm({ 
       size: "small",
       message: "Do you want to delete Employee ?", 
       callback: function(res) { 
            if (res == true) {
                httpObj.onreadystatechange = function() {
                    if(this.readyState == '4' && this.status == '200') {
                        var result = this.responseText;
                        result = JSON.parse(result);
                        console.log(result.message);  
                        if (result.message == "success") {
                            bootbox.alert({ 
                              size: "small",
                              title: "",
                              message: "Employee deletion success", 
                              callback: function(){
                               window.location.reload(); }
                            })
                        }
                        else if (result.message == "failed") {
                            bootbox.alert({ 
                              size: "small",
                              title: "",
                              message: "Employee deletion failed", 
                              callback: function(){
                               window.location.reload(); }
                            })
                        }
                    }
                } 
                httpObj.open('DELETE','http://192.168.1.225:8082/EMPLOYEE/'+empid,true);
                httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
                httpObj.setRequestHeader("Authorization", key);
                httpObj.send();  
            }
            else {
                bootbox.alert("you pressed cancel!!")
            }
        }
    })

}
