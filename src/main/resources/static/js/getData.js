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
}


    function getGraph(field) {
        $.ajax({
            types:"GET",
            url: '/getGraph',
            datatype : "json",
            data: {"Field" : field},
            success: function(json2){
                lineGraph(field, json2);
                /*alert(text);*/
            }
        })
    }


    function lineGraph(field, data){


        var json = JSON.parse(data);

        var dataList = json.d;

        var dataInf = [];
        var dataScaled = []

        var jsonScaled = {};


        var svgContainer = d3.select("body").append("svg")
            .attr("width", 500)
            .attr("height", 500);

        var x1 = d3.scale.linear()
            .domain([0,6000])
            .range([0,500]);

        var y1 = d3.scale.linear()
            .domain([6000,0])
            .range([500,0]);


        var xAxis = d3.svg.axis()
            .scale(x1);

        var yAxis = d3.svg.axis()
            .scale(y1)
            .orient("right");

        for (i=0; i<json.d.length; i++) {
            json.d[i].y = y1(json.d[i].y);
        }

        var linefunction = d3.svg.line().x(function(d) {return d.x})
            .y(function(d) {return d.y})
            .interpolate("Linear");

        var xAxisGroup = svgContainer.append("g")
            .call(xAxis);

        var yAxisGroup = svgContainer.append("g")
            .call(yAxis);

        var lineGraph = svgContainer
            .append("path")
            .attr("class", "x-axis")
            .attr("class", "y-axis")
            .attr("d", linefunction(dataList))
            .attr("stroke","blue")
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .call(xAxis)
            .call(yAxis)
            .append("g");



    }

});
