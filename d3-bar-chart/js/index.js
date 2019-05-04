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
  const svg = d3.select("#bar-chart")
                .append("svg")
                .attr("width", 900)
                .attr("height", 600)
  svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("x", (d, i) => i * 3)
       .attr("y", (d, i) => 600 - 0.03 * d[1]) //to invert y = heightOfSVG - heightOfBar
       .attr("width", 2)
       .attr("height", (d, i) => 0.03 * d[1])
       .attr("fill", "navy")
       .attr("class", "bar")
       .attr('data-date', (d, i) => d[0]) //needs this stuff for testing
       .attr('data-gdp', (d, i) => d[1])
       .append("title") //this way it doesn't pass need a proper tooltip
       .text(d => d)
})