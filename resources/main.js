
//get user location
var userLatitude;
var userLongitude;

function success (position) {
  var loc = position.coords;
  userLatitude = loc.latitude;
  userLongitude = loc.longitude;
  getWeather();
};


function error () {
	//doesn't look like it's supported
  console.log("doesn't look supported.")
}


//get weather
var weatherAPIUrl = "https://api.darksky.net/forecast/"; //https://api.darksky.net/forecast/[key]/[latitude],[longitude]
var myAPIKey = "a5873da77421eb5e70604462e2ac3e77";


$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(success, error);

});


function getWeather() {
  console.log(userLatitude);
  console.log(userLongitude);
  $.ajax({
    url : weatherAPIUrl + "/" + myAPIKey + "/" + userLatitude + "," + userLongitude ,
    // beforeSend: function(request) {
    //   request.setRequestHeader("Access-Control-Allow-Origin", "*");
    // },
    method : "GET",
    crossDomain : true,
    dataType: "jsonp",
    jsonp : "callback",
    success : function(data){
      alert(data.currently.summary);
    }

  });
}
