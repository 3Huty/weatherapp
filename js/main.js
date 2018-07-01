
function getWeather(){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
        loadWeather(position.coords.latitude + ',' + position.coords.longitude, "");
        },
        function(error) {
            loadWeather("Kolkata, IN", "");
        }
    );
    } else {
        loadWeather("Kolkata, IN", "");  
    }
}

$(document).ready(function() {
    setInterval(getWeather, 10000);  
});

function loadWeather(location, woeid) {  
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: "c",
        success: function(weather) {
            city = weather.city;
            temp = weather.temp + "&deg";
            wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg" />';
            wind = "<p>" + weather.wind.speed + "</p><p>" + weather.units.speed + "</p>";
            humidity = weather.humidity + " %";
            
            $(".location").text(city);
            $(".temperature").html(temp);
            $(".climate_bg").html(wcode);
            $(".windspeed").html(wind);
            $(".humidity").text(humidity);
        },
        
        error: function(error) {
            console.log("Error: " + error);
        }
    });
}

$(document).ready(function() {
    getWeather();
    window.setInterval(getWeather, 10000);
});

