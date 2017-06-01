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
var weatherAPIUrl = "https://api.openweathermap.org/data/2.5/weather";
var myAPIKey = "cce820a8ced713406cddcbdbc688eec5";

$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(success, error);
});

var tempInImperial;
var currentCondition;
var currentConditionIcon;
var yourCity;
function getWeather() {
  $.ajax({
    url : weatherAPIUrl,
    data : {
      lat : userLatitude,
      lon : userLongitude,
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
      showCurrentWeather();
      changeBackgroundImage()
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

var backgroundPicture = {
"01d" :	"01d.jpg",
"02d" :	"02d.jpg",
"03d"	: "03d.jpg",
"04d"	: "04d.jpg",
"09d"	: "09d.jpg",
"10d"	: "10d.jpg",
"11d"	: "11d.jpg",
"13d"	: "13d.jpg",
"50d"	: "50d.jpg",
"01n"	: "01n.jpg",
"02n"	: "02n.jpg",
"03n"	: "03n.jpg",
"04n"	: "04n.jpg",
"09n"	: "09n.jpg",
"10n"	: "10n.jpg",
"11n"	: "11n.jpg",
"13n"	: "13n.jpg",
"50n"	: "50n.jpg"
}
// Change background image based on icon value.
function changeBackgroundImage(){
  if(backgroundPicture.hasOwnProperty(currentConditionIcon)) {
    var imageURL = "../images/" + backgroundPicture[currentConditionIcon];
    $(".weather-background").css({
      'background-image': 'url('+ imageURL +')'
    });
  }
}
