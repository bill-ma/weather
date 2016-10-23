$(document).ready(function(){
	getTime();
	displayWeather();
});

function displayWeather(){
	var api = "http://api.openweathermap.org/data/2.5/weather?lat=";
	var apiKey = "&appid=ca10a89dc48be65d382494cf1655ead0";

//GET LOCATION
    $.getJSON("http://ipinfo.io/",function(result){
    	console.log(result);
    	var city = result.city; 	
    	var country = result.country;
    	var region = result.region;
//GET WEATHER
		var lat = result.loc.split(",")[0] //.toString();
    	var lon = result.loc.split(",")[1] //.toString();
    	var url = api + lat + "&lon=" + lon + apiKey;

    	console.log(url);

    	$.getJSON(url,function(result){
			var tempC = (JSON.stringify(result.main.temp) - 273.16).toFixed(2);
			var description = result.weather[0].description;
			var icon = result.weather[0].icon;
			var icon_url = "http://openweathermap.org/img/w/" + icon + ".png";
			console.log(icon_url);
			$("#city").html(city + ", " + region);
			$("#temp").html(tempC + " C");
			$("#description").html(description);
			$("#icon").attr("src",icon_url);

 //CHANGE FROM F TO C       
			var count = 0;
			var tempF = tempC * (9/5) + 32;
			tempF = tempF.toFixed(2);

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
			
    }).fail(function(){
    	console.log("error");
    	$("#city").html("could not retrieve weather, try refreshing");
	});
}

//http://www.w3schools.com/jsref/jsref_gethours.asp

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getTime() {
    var d = new Date();
    var x = document.getElementById("time");
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    x.innerHTML = h + ":" + m + ":" + s;
}