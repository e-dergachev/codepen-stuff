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
  const xPadding = 45, yPadding  = 45
  let years = []
  dataset.forEach(el => years.push(el.Year)) //keys are case sensistive
  const maxYear = d3.max(years)+1, minYear = d3.min(years)-1
  const xScale = d3.scaleLinear()
                   .domain([minYear, maxYear])
                   .range([0, 825])
  const xAxis = d3.axisBottom(xScale)
                  .tickFormat(d3.format("d")) //removes thousands delimiter
  const svg = d3.select("#scatter-plot")
                .append("svg")
                .attr("width", width)
                .attr("height", height)   
  svg.append("g")
     .attr("transform", "translate(" + xPadding + "," + (height - yPadding) + ")")
     .call(xAxis)
     .attr('id', 'x-axis')
  
  
  
  
  
})