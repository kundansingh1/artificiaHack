$(document).ready(function () {
    $.ajax({
        url: "http://aditechsolutions.com/nitesh/artifacia/GetSearchFields.php",
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
        }
    });
});