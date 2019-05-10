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
                   .domain([minYear, maxYear])
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
  const svg = d3.select("#heat-map")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
  svg.append("g")
     .attr("transform", "translate(" + xPadding + "," + (height - yPadding) + ")")
     .call(xAxis)
     .attr('id', 'x-axis')
  svg.append("g")
     .attr("transform", "translate(" + xPadding + "," + 0 + ")")
     .call(yAxis)
     .attr('id', 'y-axis')  
})