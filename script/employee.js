$("form#empdata").submit(function(){
    var formData = new FormData(this);
    $.ajax({
        url: 'http://127.0.0.1:8082/upload',
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


