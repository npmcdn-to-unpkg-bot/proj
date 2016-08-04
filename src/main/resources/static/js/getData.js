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
                if (hospital != "All hospitals") {
                    if (hospSelected !== hospital) {
                        hospSelected = hospital

                        submitHospitalandField(hospSelected, fieldSelected);
                    }
                }
                /*else {
                    alert("hello")
                    var x= document.getElementById("Hospital");

                    for(i=0; i<x.options.length;i++){
                        alert(x.options[i].toString())

                        console.log(x.options[i].value);
                        }
                        }*/

            })
        });



$("#PatientFields")
    .change(function () {
        $("select option:selected").each(function () {
            var field = $("#PatientFields").find(":selected").text();
            if (field != "All fields") {
                if (fieldSelected !== field) {
                    fieldSelected = field;
                    submitHospitalandField(hospSelected, fieldSelected);
                    getGraph(fieldSelected)
                }
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


    function getGraph(field) {
        $.ajax({
            types:"GET",
            url: '/getGraph',
            dataType: "text",
            data: {"Field" : field, JSON : json},
            success: function(text){
                lineGraph(field, json)
                /*alert(text);*/
            }
        })
    };


    function lineGraph(field, data){

        var svgContainer = d3.select("body").append("svg")
            .attr("width", 200)
            .attr("height", 200);

        var linefunction = d3.svg.line().x(function(d) {return d.x})
            .y(function(d) {return d.y})
            .interpolate("Linear")

        var lineGraph = svgContainer.append("path")
            .attr("d", linefunction(data))
            .attr("stroke","blue")
            .attr("stroke-width", 2)
            .attr("fill", "none")
    }

});
