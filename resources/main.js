
//get user location
var userLatitude;
var userLongitude;

function success (position) {
	// position as an object
	var loc = position.coords;
  console.log("latitude: " + loc.latitude);
	console.log("longitude: " + loc.longitude);
}

function error () {
	//doesn't look like it's supported
  console.log("doesn't look supported.")
}
navigator.geolocation.getCurrentPosition(success, error);

//get weather
var weatherAPIUrl = "https://api.darksky.net/forecast/"; //https://api.darksky.net/forecast/[key]/[latitude],[longitude]
var myAPIKey = "a5873da77421eb5e70604462e2ac3e77";


$(document).ready(function(){
  getWeather();
});


function getWeather() {
  $.ajax({
    url : weatherAPIUrl + "/" + myAPIKey + "/" + userLatitude + "," + userLongitude,
    method : "GET",
    crossDomain : true,
    dataType: "jsonp",
    success : function(data){
      console.log(data.currently.summary);
      console.log(data.currently.temperature);
    }

  });
}
