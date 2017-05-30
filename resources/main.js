
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
  console.log("Can't get location. It doesn't look supported.")
}


//get weather
// var weatherAPIUrl = "https://api.darksky.net/forecast/"; //https://api.darksky.net/forecast/[key]/[latitude],[longitude]
// var myAPIKey = "a5873da77421eb5e70604462e2ac3e77";


// open weather API: https://openweathermap.org/current
var weatherAPIUrl = "api.openweathermap.org/data/2.5/weather?lat=41&lon=-87&APPID=7a93cab57a24c21b6ae714cc5e3635e1";
var myAPIKey = "7a93cab57a24c21b6ae714cc5e3635e1";


$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(success, error);

});


function getWeather() {
  console.log(userLatitude);
  console.log(userLongitude);
  $.ajax({
    url : weatherAPIUrl,
    // weatherAPIUrl +'lat=' + userLatitude + '&lon=' + userLongitude +'&APPID=' + myAPIKey,
    // beforeSend: function(request) {
    //   request.setRequestHeader(/*"Access-Control-Allow-Origin", "*"*/"Access-Control-Allow-Headers", "x-requested-with" );
    // },
    // data : {
    //   lat : userLatitude,
    //   lon : userLongitude
    // },
    method : 'GET',
    crossDomain : true,
    dataType: 'jsonp',
    success : function(data){
      console.log(data.main.temp);
      alert("It worked");
    }

  });
}
