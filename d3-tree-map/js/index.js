document.addEventListener("DOMContentLoaded", async () => {
  let dataset
  if (localStorage.getItem("data-d3-tree-map") === null) { //using localstorage to save fetching requests
    const responseData = await fetch("https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json")
    const jsonData = await responseData.json()
    localStorage.setItem("data-d3-tree-map", JSON.stringify(jsonData))
    dataset = jsonData
  }
  else {
    dataset = JSON.parse(localStorage.getItem("data-d3-tree-map"))
  }
  const height = 1100, width = 1100, yPadding = 150
  let fullValue = 0
  for (let i = 0; i < dataset.children.length; i++) {
    for (let j = 0; j < dataset.children[i].children.length; j++) {
      fullValue += parseInt(dataset.children[i].children[j].value)
    }
  }
  const perCent = fullValue/100
  const categories = []
  dataset.children.forEach(el => categories.push(el.name))
  console.log(categories)
  const colors = {"Product Design":"#33cc33", "Tabletop Games":"#ff00ff", "Gaming Hardware":"#3366ff", "Video Games":"#33cccc", "Sound":"#ffff00", "Television":"#ff5050", "Narrative Film":"#993300", "Web":"#003399", "Hardware":"#339966", "Games":"#666633", "3D Printing":"#993366", "Technology":"#6600cc", "Wearables":"#ff9933", "Sculpture":"#0099ff", "Apparel":"#9966ff", "Food":"#ff3399", "Art":"#99ff33", "Gadgets":"#00ff99", "Drinks":"#ccffcc"} //it's just faster
  const legendColors = ["#33cc33", "#ff00ff", "#3366ff", "#33cccc", "#ffff00", "#ff5050", "#993300", "#003399", "#339966", "#666633", "#993366", "#6600cc", "#ff9933", "#0099ff", "#9966ff", "#ff3399", "#99ff33", "#00ff99", "#ccffcc"]
  const svg = d3.select("#tree-map")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
  const tooltip = d3.select("body")
                    .append("div")
                    .attr("id", "tooltip")
                    .style("opacity", 0)
  const root = d3.hierarchy(dataset).sum(d => d.value)
  d3.treemap()
    .size([width, height - yPadding])
    .padding(2)
    (root)
  svg.selectAll("rect")
     .data(root.leaves())
     .enter()
     .append("rect")
     .attr("class", "tile")
     .attr("data-name", d => d.data.name)
     .attr("data-category", d => d.data.category)
     .attr("data-value", d => d.value)
     .attr('x', d => d.x0)
     .attr('y', d => d.y0)
     .attr('width', d => d.x1 - d.x0)
     .attr('height', d => d.y1 - d.y0)
     .style("stroke", "black")
     .style("fill", d => colors[d.data.category])
     .on("mouseover", d => {
        tooltip.style("opacity", 0.8)
               .html("Name: " + d.data.name + "<br>Category: " + d.data.category + "<br>Value: " + d.value)
               .attr("data-value", d.value)
               .style('left', (d3.event.pageX + 15) + 'px')
               .style('top', (d3.event.pageY + 0) + 'px')
        })       
     .on("mouseout", d => tooltip.style("opacity", 0))
  svg.selectAll("text")
     .data(root.leaves())
     .enter()
     .append("text")
     .attr("x", d => d.x0+5)    
     .attr("y", d => d.y0+20)
     .text(d => (d.value/perCent).toFixed(1) + "%")
     .attr("class", "leaf-text")
     .attr("fill", "white")
  const legend = svg.append("g")
                    .attr("id", "legend")
  let j = 0, k = 0 //need it to place the legend's boxes properly
  legend.append("g")
        .selectAll("dots")
        .data(legendColors)
        .enter()
        .append("rect")
        .attr("class", "legend-item")
        .attr("x", (d, i) => {
          if (i % 5 === 0 && i !== 0) {
            j++
          }
          const xCoord = 15 + j*160
          return xCoord    
        })
        .attr("y", (d, i) => {
          if (i % 5 === 0) {
            k = 0
          }
          const yCoord = 955 + k*25
          k++
          return yCoord
        })
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", d => d)
        .style("stroke", "black")
  let l = 0, m = 0 //need it to place the legend's text properly  
  legend.append("g")
        .selectAll("text")
        .data(categories)
        .enter()
        .append("text")
        .attr("x", (d, i) => {
          if (i % 5 === 0 && i !== 0) {
            l++
          }
          const xCoord = 40 + l*160
          return xCoord    
        })
        .attr("y", (d, i) => {
          if (i % 5 === 0) {
            m = 0
          }
          const yCoord = 971 + m*25
          m++
          return yCoord
        })
        .text(d => d)
        .attr("font-size", "15px")
})