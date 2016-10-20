$(document).ready(function(){
	displayWeather();
});

function displayWeather(){
	var api = "http://api.openweathermap.org/data/2.5/weather?";
	var apiKey = "&appid=ca10a89dc48be65d382494cf1655ead0";

//GET LOCATION
    $.getJSON("http://ip-api.com/json",function(result){
    	var lat = JSON.stringify(result.lat);
    	var long = JSON.stringify(result.lon);
    	var city = JSON.stringify(result.city).slice(1,-1);   	

//GET WEATHER
    	var url = api + "lat=" + lat + "&lon=" + long + apiKey;
    	$.getJSON(url,function(result){
			var tempC = (JSON.stringify(result.main.temp) - 273.16).toFixed(2);
			var description = JSON.stringify(result.weather[0].description);

			$("#city").html(city);
			$("#temp").html(tempC + " C");
			$("#description").html(description);

			var count = 0;
			var tempF = tempC * (9/5) + 32;

			$("#button").click(function(){
				count++;
				if(count%2 === 0){
					$("#temp").html(tempC + " C");
				}
				else{
					$("#temp").html(tempF + " F");
				}
			});
		});	
    });
}