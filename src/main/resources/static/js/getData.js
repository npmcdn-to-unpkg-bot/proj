/**
 * Created by 310247318 on 02/08/2016.
 */
$( document ).ready(function() {

    var hospSelected = "Leeds Teaching Hospitals NHS Trust"
    var fieldSelected = "Total Patients WITH Radiotherapy"

    $("#Hospital")
        .change(function () {
            $("select option:selected").each(function () {
                var hospital = $("#Hospital").find(":selected").text();
                var field = $("#PatientFields").find(":selected").text();
                if (hospSelected !== hospital) {
                    hospSelected = hospital
                    submitHospitalandField(hospSelected, fieldSelected);
                }
            })
        });



    $("#PatientFields")
        .change(function () {
            $("select option:selected").each(function () {
                var field = $("#PatientFields").find(":selected").text();
                if (fieldSelected !== field) {
                    fieldSelected = field
                    submitHospitalandField(hospSelected, fieldSelected);
                }
            })
        });



    function submitHospitalandField(hospital, field) {
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



});
