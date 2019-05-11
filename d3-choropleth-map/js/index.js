document.addEventListener("DOMContentLoaded", async () => {
  let dataset
  if (localStorage.getItem("data-d3-choropleth-map") === null) { //using localstorage to save fetching requests
    const responseData = await fetch("https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json")
    const jsonData = await responseData.json()
    localStorage.setItem("data-d3-choropleth-map", JSON.stringify(jsonData))
    dataset = jsonData
  }
  else {
    dataset = JSON.parse(localStorage.getItem("data-d3-choropleth-map"))
  }
  let counties
  if (localStorage.getItem("counties-d3-choropleth-map") === null) {
    const responseCounties = await fetch("https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json")
    const jsonCounties = await responseCounties.json()
    localStorage.setItem("counties-d3-choropleth-map", JSON.stringify(jsonCounties))
    counties = jsonCounties
  }
  else {
    counties = JSON.parse(localStorage.getItem("counties-d3-choropleth-map"))
  }
  const height = 750, width = 970
  const colors = ["#f2ccff", "#ecb3ff", "#e699ff", "#df80ff", "#d966ff", 
                  "#d24dff", "#cc33ff", "#c61aff", "#bf00ff", "#ac00e6"]
  const educations = []
  dataset.forEach(el => educations.push(el.bachelorsOrHigher))
  const maxEd = d3.max(educations), minEd = d3.min(educations)
  const colorScale = d3.scaleQuantile()
                       .domain([minEd, maxEd])
                       .range(colors)
  const svg = d3.select("#choropleth-map")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
  const tooltip = d3.select("body")
                    .append("div")
                    .attr("id", "tooltip")
                    .style("opacity", 0) //with opacity instead of display: none
  const path = d3.geoPath()
  /*svg.append("path")
     .datum(topojson.feature(counties, counties.objects.counties))
     .attr("d", path)
     .style("fill", "grey")
     .style("stroke", "black")*/
  svg.append("g")
     .selectAll("path")
     .data(topojson.feature(counties, counties.objects.counties).features)
     .enter()
     .append("path")
     .attr("d", path)
     .attr("class", "county")
     .attr("data-fips", d => d.id)
     .attr("data-education", d => dataset.filter(el => el.fips === d.id)[0].bachelorsOrHigher)
     .style("fill", d => colorScale(dataset.filter(el => el.fips === d.id)[0].bachelorsOrHigher))
     .style("stroke", "black")
     .on("mouseover", d => {
        const i = dataset.indexOf(dataset.filter(el => el.fips === d.id)[0])
        tooltip.style("opacity", 0.8)
               .html(dataset[i].area_name + ", " + dataset[i].state + ": " + dataset[i].bachelorsOrHigher + "%")
               .attr("data-education", d => dataset[i].bachelorsOrHigher)
               .style('left', (d3.event.pageX + 15) + 'px')
               .style('top', (d3.event.pageY + 0) + 'px')
        })       
     .on("mouseout", d => tooltip.style("opacity", 0))
  const legend = svg.append("g")
                    .attr("id", "legend")
  legend.append("g")
        .selectAll("dots")
        .data(colors)
        .enter()
        .append("rect")
        .attr("x", (d, i) => 550 + i*40)
        .attr("y", 650)
        .attr("width", 40)
        .attr("height", 20)
        .style("fill", d => d)
  const keys = [2.6, 9.85, 17.1, 24.35, 31.6, 38.85, 46.1, 53.35, 60.6, 67.85, 75.1]
  const legendScale = d3.scaleLinear()
                        .domain([2.6, 75.1])
                        .range([0, 400 - 1])
  const legendAxis = d3.axisBottom(legendScale)
                       .tickValues([2.6, 9.9, 17.1, 24.4, 31.6, 38.9, 46.1, 53.4, 60.6, 67.9, 75.1])
                       .tickFormat(d => d + "%")
  svg.append("g")
     .attr("transform", "translate(" + 550 + "," + 670 + ")")
     .call(legendAxis)  
})