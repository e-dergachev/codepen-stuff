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
  const height = 850, width = 1000
  const colors = {"Product Design":"#33cc33", "Tabletop Games":"#ff00ff", "Gaming Hardware":"#3366ff", "Video Games":"#33cccc", "Sound":"#ffff00", "Television":"#ff5050", "Narrative Film":"#993300", "Web":"#003399", "Hardware":"#339966", "Games":"#666633", "3D Printing":"#993366", "Technology":"#6600cc", "Wearables":"#ff9933", "Sculpture":"#0099ff", "Apparel":"#9966ff", "Food":"#ff3399", "Art":"#99ff33", "Gadgets":"#00ff99", "Drinks":"#ccffcc"} //it's just faster
  const svg = d3.select("#tree-map")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
  const root = d3.hierarchy(dataset).sum(d => d.value)
  d3.treemap()
    .size([width, height])
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
  svg.selectAll("text")
     .data(root.leaves())
     .enter()
     .append("text")
     .attr("x", d => d.x0+5)    
     .attr("y", d => d.y0+20)
     .text(d => d.data.name)
     .attr("font-size", "12px")
     //.attr("fill", "white")
})