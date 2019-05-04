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
  const svg = d3.select("#bar-chart")
                .append("svg")
                .attr("width", 900)
                .attr("height", 600)
  const tooltip = d3.select("#bar-chart")
                    .append("div")
                    .attr("id", "tooltip")  
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
       .on("mouseover", (d, i) => {
        tooltip.style("display", "flex")
               .html(formattedDate[i] + '<br>' + '$' + d[1] + ' bln')
               .attr('data-date', d[0])
               .style('left', (i * 3) + 30 + 'px')
               .style('top', 500 + 'px')
        })
       .on("mouseout", (d, i) => tooltip.style("display", "none"))

})