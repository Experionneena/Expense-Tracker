 var tokenc = localStorage.getItem('token1');
var role = localStorage.getItem('role');
if (tokenc == null || role == null || role == "user"){
    window.location = "index.html";
}     
console.log("empid");
var key = {'token':tokenc,'role':role};
key = JSON.stringify(key);
var empidarr = [];   
var total = 0; 
total=parseInt(total);
var httpObj = new  XMLHttpRequest();
httpObj.onreadystatechange = function() {
    if(this.readyState == '4' && this.status == '200') {
        var result = this.responseText;
        result = JSON.parse(result);
        console.log(result);
        var empidarr = [];
        var table = document.getElementById('tablebody');
        var i = 1;
        result.forEach(function(element) {
            empidarr[i-1] = element.empname+' ( Employee Id: '+element.empid+' )';
            i++;
        });
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
httpObj.open('GET','http://192.168.1.225:8082/EXPENSE',true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.setRequestHeader("Authorization", key);
httpObj.send();   

function getTotal() {
    document.getElementById('Accomodation').innerHTML = "0.00";
    document.getElementById('Food').innerHTML = "0.00";
    document.getElementById('Fuel').innerHTML = "0.00";
    document.getElementById('Health').innerHTML = "0.00";
    document.getElementById('Travel').innerHTML = "0.00";
    document.getElementById('Others').innerHTML = "0.00";
    document.getElementById('sum').innerHTML = "0.00";
    var select = document.getElementById('sel1');
    var emid = select.options[select.selectedIndex].value;
    document.getElementById('hide2').innerHTML = emid;
    var array = emid.split(" ");
    empid = array[4];
    console.log("empid"+empid);
    var obj =  {};
    var httpObj = new XMLHttpRequest();
    httpObj.onreadystatechange=function() {
    if (this.readyState == '4' && this.status == '200') {
            var result = this.responseText;
            result = JSON.parse(result);
            total = 0;
            result.forEach( function(element) {
                document.getElementById(element.category).innerHTML = element.amount;
                amount = parseInt(element.amount);
                total = total + element.amount;
                console.log(element.amount);
            });
            // document.getElementById('name').innerHTML = 'Employee Name : '+result[0].empname;
            document.getElementById('sum').innerHTML = total;
        }
    }
httpObj.open('GET','http://192.168.1.225:8082/TOTAL/'+empid,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.setRequestHeader("Authorization", key);
httpObj.send();
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
    doc.fromHTML($('#viewe').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    window.location.reload();
    doc.save("sample.pdf");
})
function printDiv() {
      doc.fromHTML($('#viewe').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    window.location.reload();
    doc.output("dataurlnewwindow");

}
