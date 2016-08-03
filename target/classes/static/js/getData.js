/**
 * Created by 310247318 on 02/08/2016.
 */
$( document ).ready(function() {


    $('#Chemotherapy').click(function (){
        submitHospitalandField($('#Hospital').val(), $('#Field').val());
    });

    $('#Radiotherapy').click(function (){
        submitHospitalandField($('#Hospital').val(), $('#Field').val());
    });

function submitHospitalandField(hospital, field) {
    //var hospital =  $('#Hospital').val();
    $.ajax({
        types:"GET",
        url: '/getData',
        data: {"Hospital" : hospital , "Field" : field},
        success: function(text){
            $("#title").text(hospital);
            /*alert(text);*/
        }
    })
};

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {

            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }



});
