//plain javascript async fetching, no jquery, could fetch with d3 itself i guess
document.addEventListener("DOMContentLoaded", async () => {
  let dataset
  if (localStorage.getItem('data-json') === null) { //using localstorage to save fetching requests
    const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    const json = await response.json()
    localStorage.setItem('data-json', JSON.stringify(json))
    dataset = json.data
  }
  else {
    const json = JSON.parse(localStorage.getItem('data-json'))
    dataset = json.data
  }
  let formattedDate = []
  dataset.forEach(date => {
      switch(date[0].slice(5)) {
          case "01-01":
              formattedDate.push(date[0].slice(0, 4) + " Q1")
              break
          case "04-01":
              formattedDate.push(date[0].slice(0, 4) + " Q2")
              break
          case "07-01":
              formattedDate.push(date[0].slice(0, 4) + " Q3")
              break
          case "10-01":
              formattedDate.push(date[0].slice(0, 4) + " Q4")
              break
      }
  })
  const height = 550, width = 900
  const maxGDP = d3.max(dataset, d => d[1])
  const minYear = parseInt(dataset[0][0].slice(0, 4)), 
        maxYear = parseInt(dataset[dataset.length - 1][0].slice(0, 4))
  const yScale = d3.scaleLinear()
                   .domain([0, maxGDP])
                   .range([0, height])
  const yAxisScale = d3.scaleLinear() //need it to invert the axis
                       .domain([0, maxGDP])
                       .range([height, 0])
  const xScale = d3.scaleLinear()
                   .domain([minYear, maxYear])
                   .range([0, dataset.length * 3 - 1])  
  const yAxis = d3.axisLeft(yAxisScale)
  const xAxis = d3.axisBottom(xScale)
                  .tickFormat(d3.format("d")) //to remove comma delimeter for thousands
  const svg = d3.select("#bar-chart")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
  const tooltip = d3.select("#bar-chart")
                    .append("div")
                    .attr("id", "tooltip")  
  svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("x", (d, i) => i * 3)
       .attr("y", (d, i) => height - yScale(d[1])) //to invert y = heightOfSVG - heightOfBar
       .attr("width", 2)
       .attr("height", (d, i) => yScale(d[1]))
       .attr("fill", "navy")
       .attr("class", "bar")
       .attr('data-date', (d, i) => d[0]) //needs this stuff for testing
       .attr('data-gdp', (d, i) => d[1])
       .on("mouseover", (d, i) => {
        tooltip.style("display", "flex")
               .html(formattedDate[i] + '<br>' + '$' + d[1] + ' bln')
               .attr('data-date', d[0])
               .style('left', (i * 3) + 30 + 'px')
               .style('top', height - 100 + 'px')
        })
       .on("mouseout", (d, i) => tooltip.style("display", "none"))
  svg.append("g")
     .attr("transform", "translate(40, 0)")
     .call(yAxis)
     .attr('id', 'y-axis')
  svg.append("g")
     .attr("transform", "translate(0, 500)")
     .call(xAxis)
     .attr('id', 'x-axis')
})