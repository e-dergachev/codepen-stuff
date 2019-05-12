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
  const colors = {"Product Design":"#33cc33", "Tabletop Games":"#ff00ff", "Gaming Hardware":"#3366ff", "Video Games":"#33cccc", "Sound":"#ffff00", "Television":"#ff5050", "Narrative Film":"#993300", "Web":"#003399", "Hardware":"#339966", "Games":"#666633", "3D Printing":"#993366", "Technology":"#6600cc", "Wearables":"#ff9933", "Sculpture":"#0099ff", "Apparel":"#9966ff", "Food":"#ff3399", "Art":"#99ff33", "Gadgets":"#00ff99", "Drinks":"#ccffcc"} //it's just faster
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

})