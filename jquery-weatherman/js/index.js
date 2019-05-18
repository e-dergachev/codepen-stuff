var tempUnit = "C";
var temp;

$(document).ready(function() {
  
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {

    var link = "https://fcc-weather-api.glitch.me/api/current?lon=" + position.coords.longitude.toFixed(1) + "&lat=" + position.coords.latitude.toFixed(1);
    $.getJSON (link, function(json) {
     var icoChart = {Clouds: "wi-cloudy", Rain: "wi-rain", Thunderstorm: "wi-thunderstorm", Drizzle: "wi-sprinkle", Snow: "wi-snow", Clear: "wi-night-clear"};
     if (json.dt > json.sys.sunrise && json.dt < json.sys.sunset){
        icoChart["Clear"] = "wi-day-sunny";    
     }
     var icoHTML = "<i class=\"wi " + icoChart[json.weather[0].main] + "\" style=\"font-size: 150%; margin-left: 14px;\"></i>";
     temp = json.main.temp;
     $("#temperature").html(temp.toFixed(0) + " <i class=\"wi wi-celsius\" style=\"font-size: 150%;\"></i>" + "<div class=\"row\"><div class=\"col-12 text-center\" style=\"font-size: 60%;\">(Click to convert to Fahrenheit)</div></div>");
      if (icoChart[json.weather[0].main] !== undefined) {
        $("#weather").html(json.weather[0].main + icoHTML);
      }
      else {
        $("#weather").html(json.weather[0].main);
      }
      if (json.name !== undefined && json.sys.country !== undefined) {
        $("#location").html(json.name + ", " + json.sys.country);
      }
      else {
        $("#location").html("Sea or wilderness.");         
      }
    })
    .fail(function() { 
      $("#location").html("Weather information is unavailable.");
    }); 
  },
  function(error) {
    switch(error.code) {
    case error.PERMISSION_DENIED:
      $("#location").html("User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
      $("#location").html("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      $("#location").html("The request to get user location timed out.")
      break;
    default:
      $("#location").html("An unknown error occurred.")
      break;
  }
  });
  }
  else {
    ("#location").html("Geolocation is not supported by your browser.");                
  }
  
  $("#temperature").click(function() {
    if (tempUnit === "C") {
      tempUnit = "F";
      $("#temperature").html((temp * 1.8 + 32).toFixed(0) + " <i class=\"wi wi-fahrenheit\" style=\"font-size: 150%;\"></i>" + "<div class=\"row\"><div class=\"col-12 text-center\" style=\"font-size: 60%;\">(Click to convert to Celsius)</div></div>");
    }
    else {
      tempUnit = "C";
      $("#temperature").html(temp.toFixed(0) + " <i class=\"wi wi-celsius\" style=\"font-size: 150%;\"></i>" + "<div class=\"row\"><div class=\"col-12 text-center\" style=\"font-size: 60%;\">(Click to convert to Fahrenheit)</div></div>");
    }
  });
  
});