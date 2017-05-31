
//get user location
var userLatitude;
var userLongitude;

function success(position) {
  var loc = position.coords;
  userLatitude = loc.latitude;
  userLongitude = loc.longitude;
  getWeather();
};

function error() {
  console.log("Can't get location. It doesn't look supported.")
}

// weather API Url
var weatherAPIUrl = "http://api.openweathermap.org/data/2.5/weather";
var myAPIKey = "7a93cab57a24c21b6ae714cc5e3635e1";


$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(success, error);
});


function getWeather() {
  console.log(userLatitude);
  console.log(userLongitude);
  $.ajax({
    url : weatherAPIUrl,
    data : {
      lat : userLatitude,
      lon : userLongitude,
      units : `imperial`,
      "APPID" : myAPIKey
    },
    method : 'GET',
    crossDomain : true,
    dataType: 'jsonp',
    success : function(data){
      console.log(data.main.temp);
      // convert metric to imperial

    }
  });
}

// convert metrics to imperial and vice versa
function convertToImperial() {

}

function convertToMetric() {

}
