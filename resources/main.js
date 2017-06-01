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
var myAPIKey = "cce820a8ced713406cddcbdbc688eec5";

$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(success, error);
});

var tempInImperial;
var currentCondition;
var currentConditionIcon;
var yourCity;
function getWeather() {
  console.log(userLatitude);
  console.log(userLongitude);
  $.ajax({
    url : weatherAPIUrl,
    data : {
      lat : userLatitude, //41
      lon : userLongitude, //-82
      units : "imperial",
      APPID : myAPIKey
    },
    method : "GET",
    crossDomain : true,
    dataType: "jsonp",
    success : function(data){
      tempInImperial = Math.round(data.main.temp);
      currentCondition = data.weather[0].main;
      currentConditionIcon = data.weather[0].icon;
      yourCity = data.name;
      console.log(tempInImperial);
      console.log(currentCondition);
      showCurrentWeather();
    }
  });
}

// convert metric to imperial and vice versa on user click
$("#imperial-metric-button").on("click", function(){
  changeButtonToMetricImperial();
  changTempToMetricImperial();
});

function changeButtonToMetricImperial() {
  var $imperialMetric = $(".f-or-c").text();
  $(".f-or-c").text(function(){
    return $imperialMetric == "Farenheit"? "Celsius" : "Farenheit";
  });
}

function changTempToMetricImperial(){
  var $imperialMetric = $(".f-or-c").text();
  if($imperialMetric == "Farenheit"){
    $("#temperature").text(tempInImperial);
  } else{
    var tempInMetric = Math.round((tempInImperial-32)*(5/9));
    $("#temperature").text(tempInMetric);
  }
}

// put information on page
function showCurrentWeather(){
  if(tempInImperial){
    $("#temperature").text(tempInImperial);
    $("#current-condition-desc").text(currentCondition);
    var $imageURL = "http://openweathermap.org/img/w/";
    //example icon url `http://openweathermap.org/img/w/10d.png`
    $("#current-condition-image").prepend("<img src=\""+$imageURL+ currentConditionIcon +".png\" alt=\""+ currentCondition + "\">");
    $("#user-location").text(yourCity);
  }
}
