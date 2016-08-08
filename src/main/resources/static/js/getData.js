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
                        hospSelected = hospital;

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
                    getGraph(fieldSelected);
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
            $("#title").text(hospital +"- " + field +": " +text);
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

    var svgContainer = d3.select("body").append("svg")
        .attr("width", 1000)
        .attr("height", 1000)
        ;


    function lineGraph(field, data){

        var json = JSON.parse(data);
        var hospNames = json.names;
        var dataList = json.d;
        var dataInf = [];
        var dataScaled = [];
        var jsonScaled = {};
        var maximum = json.max;
        var margin = {top: 20, right: 10, bottom: 20, left: 10};
        var width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x1 = d3.scale.ordinal()
            .domain([0,100,200,300,400,500])
            .range([0,100,200,300,400,500]);

        var y1 = d3.scale.linear()
            .domain([maximum,0])
            .range([500,0]);

        var xAxis = d3.svg.axis()
            .scale(x1)
            .orient("bottom")
            .tickValues(["", "UCL", "Leeds", "Sheffield", "Newcastle", "Gloucestershire"]);

        var yAxis = d3.svg.axis()
            .scale(y1)
            .orient("right");

        for (i=0; i<json.d.length; i++) {
            json.d[i].y = y1(json.d[i].y);
        }

        var linefunction = d3.svg.line().x(function(d) {return d.x})
            .y(function(d) {return d.y})
            .interpolate("Linear");

        var xAxisGroup = svgContainer
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("transform", "rotate(-65)" );

        var yAxisGroup = svgContainer.append("g")
            .call(yAxis);



        var lineGraph = svgContainer.selectAll("path")
                .data(dataList)
                .enter()
                .append("path")
                .attr("class", "x-axis")
                .attr("class", "y-axis")
                .attr("fill", "none")
                .attr("d", linefunction(dataList))
                .attr("stroke", "blue")
                .attr("stroke-width", 2)
            ;

        update(dataList);
        function update(dataList) {
            var text = svgContainer.selectAll("path").data(dataList);
            text.exit().attr("class", "exit").remove();
            svgContainer.attr("class", "update")
                .selectAll("path")
                .data(dataList)
                .append("path")
                .attr("class", "x-axis")
                .attr("class", "y-axis")
                .attr("fill", "none")
                .attr("d", linefunction(dataList))
                .attr("stroke", "blue")
                .attr("stroke-width", 2)
            ;
        }


    }

});
