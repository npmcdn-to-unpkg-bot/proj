var lineGraph = svgContainer
    .selectAll("path")
    .data(dataList)
    .enter()
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