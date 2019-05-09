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
  console.log(dataset)
})