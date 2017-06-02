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
  console.log("Can't get location. It doesn't look supported.");
}

//********************** weather API Url for darksky
var weatherAPIUrl = "https://api.darksky.net/forecast/";
var myAPIKey = "a5873da77421eb5e70604462e2ac3e77";

$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(success, error);
});

var tempInImperial;
var currentCondition;
var currentConditionIcon;
var yourCity;

function getWeather() {
  $.ajax({
    url : weatherAPIUrl + myAPIKey + "/"+ userLatitude + "," + userLongitude,
    data : {
      units : "us"
    },
    method : "GET",
    crossDomain : true,
    dataType: "jsonp",
    success : function(data) {
      tempInImperial = Math.round(data.currently.temperature);
      currentCondition = data.currently.summary;
      currentConditionIcon = data.currently.icon;
      yourCity = data.timezone;
      console.log(tempInImperial, currentCondition, currentConditionIcon, yourCity);
      showCurrentWeather();
      changeBackgroundImage();
    }
  });
}

// convert metric to imperial and vice versa on user click
$("#imperial-metric-button").on("click", function() {
  changeButtonToMetricImperial();
  changTempToMetricImperial();
});

function changeButtonToMetricImperial() {
  var $imperialMetric = $(".f-or-c").text();
  $(".f-or-c").text(function(){
    return $imperialMetric == "Celsius"? "Farenheit" : "Celsius";
  });
}

function changTempToMetricImperial() {
  var $imperialMetric = $(".f-or-c").text();
  if($imperialMetric == "Celsius") {
    $("#temperature").text(tempInImperial);
  } else {
    var tempInMetric = Math.round((tempInImperial-32)*(5/9));
    $("#temperature").text(tempInMetric);
  }
}

// put information on page
function showCurrentWeather() {
  if(tempInImperial) {
    $("#temperature").text(tempInImperial);
    $("#current-condition-desc").text(currentCondition);
    $("#user-location").text(yourCity);
  }
}

var backgroundPicture = {
  "clear-day" : "clear-day.jpg",
  "clear-night" : "clear-night.jpg",
  "rain" : "rain.jpg",
  "snow" : "snow.jpg",
  "sleet" : "sleet.jpg",
  "wind" : "wind.jpg",
  "fog" : "fog.jpg",
  "cloudy" : "cloudy.jpg",
  "partly-cloudy-day" : "partly-cloudy-day.jpg",
  "partly-cloudy-night" : "partly-cloudy-night.jpg"
}

// Change background image based on icon value.
function changeBackgroundImage() {
  if(backgroundPicture.hasOwnProperty(currentConditionIcon)) {
    var imageURL = "../images/" + backgroundPicture[currentConditionIcon];
    $(".weather-background").css({
      'background-image': 'url('+ imageURL +')'
    });
  }
}
