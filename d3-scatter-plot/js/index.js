document.addEventListener("DOMContentLoaded", async () => {
  let dataset
  if (localStorage.getItem('data-d3-scatter-plot-cyclists') === null) { //using localstorage to save fetching requests
    const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    const json = await response.json()
    localStorage.setItem('data-d3-scatter-plot-cyclists', JSON.stringify(json))
    dataset = json
  }
  else {
    dataset = JSON.parse(localStorage.getItem('data-d3-scatter-plot-cyclists'))
  }
  const height = 550, width = 900
  const xPadding = 70, yPadding  = 45
  let years = []
  dataset.forEach(el => years.push(el.Year)) //keys are case sensistive
  const maxYear = d3.max(years) + 1, minYear = d3.min(years) - 1
  let times = []
  dataset.forEach(el => times.push(new Date(el.Seconds * 1000)))
  const maxTime = new Date(d3.max(times).getTime()), 
        minTime = new Date(d3.min(times).getTime()) //need it to get a copy of the date, not a link to it
  maxTime.setSeconds(maxTime.getSeconds() + 5)
  minTime.setSeconds(minTime.getSeconds() - 5)
  const xScale = d3.scaleLinear()
                   .domain([minYear, maxYear])
                   .range([0, 800])
  const xAxis = d3.axisBottom(xScale)
                  .tickFormat(d3.format("d")) //removes thousands delimiter
  const yScale = d3.scaleTime()
                   .domain([minTime, maxTime])
                   .range([20, height - yPadding])
  const yAxis = d3.axisLeft(yScale)
                  .tickFormat(d3.timeFormat("%M:%S"))   
  const svg = d3.select("#scatter-plot")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
  const tooltip = d3.select("#scatter-plot")
                    .append("div")
                    .attr("id", "tooltip")  
  svg.append("g")
     .attr("transform", "translate(" + xPadding + "," + (height - yPadding) + ")")
     .call(xAxis)
     .attr('id', 'x-axis')
  svg.append("g")
     .attr("transform", "translate(" + xPadding + "," + 0 + ")")
     .call(yAxis)
     .attr('id', 'y-axis')
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -200)
    .attr('y', 20)
    .style('font-size', 18)
    .text('Time in Minutes');
  svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .attr("cx", (d, i) => xScale(years[i]))
       .attr("cy", (d, i) => yScale(times[i]))
       .attr("r", 7)
       .attr("transform", "translate(" + xPadding + "," + 0 + ")")
       .attr("class", "dot")
       .attr("fill", d => d.Doping === "" ? "#00cc00" : "#cc00ff")
       .attr("data-xvalue", (d, i) => years[i])
       .attr("data-yvalue", (d, i) => times[i])
       .on("mouseover", (d, i) => {
        tooltip.style("display", "flex")
               .html(d.Name +", " + d.Nationality + "<br> Year: " + d.Year + " Time: " + d.Time +
                     (d.Doping === "" ? "" : "<br><br>" + d.Doping))
               .attr('data-year', years[i])
               .style('left', d3.event.pageX + 15 + 'px')
               .style('top', d3.event.pageY + 0 + 'px')
        })       
       .on("mouseout", (d, i) => tooltip.style("display", "none"))
  const dopingX = 690, dopingY = 220, noDopingX = dopingX, noDopingY = dopingY + 30
  svg.append("rect")
     .attr("x", dopingX)
     .attr("y", dopingY)
     .attr("id", "legend") //need it to pass tests without using more complicated ways to add legends
     .attr("width", 15)
     .attr("height", 15)
     .style("fill", "#cc00ff")
  svg.append("text")
     .attr("x", dopingX + 22)
     .attr("y", dopingY + 13)
     .text("Doping allegations")
  svg.append("rect")
     .attr("x", noDopingX)
     .attr("y", noDopingY)
     .attr("width", 15)
     .attr("height", 15)
     .style("fill", "#00cc00")
  svg.append("text")
     .attr("x", noDopingX + 22)
     .attr("y", noDopingY + 13)
     .text("No doping allegations")
})