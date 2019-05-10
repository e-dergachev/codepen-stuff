document.addEventListener("DOMContentLoaded", async () => {
   let dataset
   if (localStorage.getItem('data-d3-heat-map') === null) { //using localstorage to save fetching requests
     const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
     const json = await response.json()
     localStorage.setItem('data-d3-heat-map', JSON.stringify(json))
     dataset = json
   }
   else {
     dataset = JSON.parse(localStorage.getItem('data-d3-heat-map'))
   }
   const height = 650, width = 1200
   const xPadding = 75, yPadding  = 110
   let years = []
   dataset.monthlyVariance.forEach(el => years.push(el.year))
   years = years.filter((v, i, a) => a.indexOf(v) === i)
   const maxYear = d3.max(years), minYear = d3.min(years)
   const xScale = d3.scaleLinear()
                    .domain([minYear, maxYear + 1])
                    .range([0, 1070])
   const xAxis = d3.axisBottom(xScale)
                   .tickFormat(d3.format("d"))
   const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
   const yScale = d3.scaleBand()
                    .domain(months)
                    .range([height - yPadding, 20])
   const yAxis = d3.axisLeft(yScale)
                   .tickFormat(month => monthNames[month])
   const colors = ["#0040ff", "#3366ff", "#668cff", "#99b3ff", "#ccd9ff", 
                   "#ffd6cc", "#ffad99", "#ff8566", "#ff5c33", "#ff3300"]
   const variances = []
   dataset.monthlyVariance.forEach(el => variances.push(el.variance))
   const minVariance = d3.min(variances), maxVariance = d3.max(variances)
   const colorScale = d3.scaleQuantile()
                        .domain([8.66 + minVariance, 8.66 + maxVariance]) //8.66 is the base temperature
                        .range(colors)
   const svg = d3.select("#heat-map")
                 .append("svg")
                 .attr("width", width)
                 .attr("height", height)
   const tooltip = d3.select("#heat-map")
                     .append("div")
                     .attr("id", "tooltip")    
   svg.append("g")
      .attr("transform", "translate(" + xPadding + "," + (height - yPadding) + ")")
      .call(xAxis)
      .attr("id", "x-axis")
   svg.append("g")
      .attr("transform", "translate(" + xPadding + "," + 0 + ")")
      .call(yAxis)
      .attr("id", "y-axis")
   svg.selectAll("rect")
      .data(dataset.monthlyVariance)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("x", d => xScale(d.year))
      .attr("y", d => yScale(d.month - 1))
      .attr("width", 4)
      .attr("height", 43)
      .attr("fill", d => colorScale(d.variance + 8.66))
      .attr("transform", "translate(" + (xPadding + 1) + "," + 0 + ")")
      .attr("data-month", d => d.month - 1)
      .attr("data-year", d => d.year)
      .attr("data-temp", d => d.variance + 8.66)
      .on("mouseover", d => {
         tooltip.style("display", "flex")
                .html(d.year + " - " + monthNames[d.month - 1] + "<br>" + (d.variance + 8.66).toFixed(1) + 
                     "℃<br>" + d.variance.toFixed(1) + "℃")
                .attr('data-year', d.year)
                .style('left', d3.event.pageX + 15 + 'px')
                .style('top', d3.event.pageY + 0 + 'px')
         })       
      .on("mouseout", d => tooltip.style("display", "none"))
   const keys = [2.3, 3.5, 4.7, 6.0, 7.2, 8.4, 9.6, 10.8, 12.1, 13.3] //could use yet another scale but counted them manually
   const colorLegendScale = d3.scaleOrdinal()
                              .domain(keys)
                              .range(colors)
   const legend = svg.append("g")
                     .attr("id", "legend")
   legend.append("g")
         .selectAll("dots")
         .data(keys)
         .enter()
         .append("rect")
         .attr("x", (d, i) => 100 + i*30)
         .attr("y", 580)
         .attr("width", 30)
         .attr("height", 20)
         .style("fill", d => colorLegendScale(d))  
   const legendScale = d3.scaleBand()
                         .domain(keys)
                         .range([0, 300 - 1])
   const legendAxis = d3.axisBottom(legendScale)
   svg.append("g")
      .attr("transform", "translate(" + 100 + "," + 600 + ")")
      .call(legendAxis)
 })