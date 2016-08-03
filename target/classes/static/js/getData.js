/**
 * Created by 310247318 on 02/08/2016.
 */
$( document ).ready(function() {

    console.log("hello");

    $('#Chemotherapy').click(function (){
        $('#Chemotherapy').text('hello')
    });

$(function () {
    data = $.ajax({
        types:"GET",
        url: 'hospitalData.csv',
        dataType: "text/csv",
        success: function(text){
            $data.text()

        }
    })
});



});
