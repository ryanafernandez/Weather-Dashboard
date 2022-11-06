var apiKey = "25eb352b4c90f492fe42536c88151915";

var searchFormEl = document.querySelector('#search-form');
var cityInputEl = document.querySelector('#city');
var iconEl = document.querySelector('#icon');

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getWeather(city);

        cityInputEl.value = '';
    } else {
        alert('Please enter a city to search');
    }
};

var owResponse, owData, fdResponse, fdData;
// Delete ^

var getWeather = function (searchTerm) {
    var openWeatherMapApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=imperial`;

    fetch(openWeatherMapApiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);

                    owResponse = response;
                    owData = data;

                    console.log("Current Weather Data -- ");
                    console.log("city name: ", data.name);
                    console.log("today's date: ", data.dt);
                    console.log("icon: ", data.weather[0].icon);
                    console.log("current temp: ", data.main.temp);
                    console.log("wind speed: ", data.wind.speed);
                    console.log("humidity: ", data.main.humidity); 

                    // update search history
                    // displayCurrentWeather(data);
                    request5Day(data.coord.lat, data.coord.lon); // make request to 5 Day Weather Forecast

                });
            } else {
                alert('Error: ' + response.statusText + ' when making request to Open Weather Map');
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Open Weather Map');
        });
}

var request5Day = function (lat, lon) {
    var fiveDayWeatherApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    console.log("coords: " + lat + ", " + lon);

    fetch(fiveDayWeatherApiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log("Data for 5 Day Forecast: ");
                    console.log(data);

                    fdResponse = response;
                    fdData = data;

                    // 5 Day Weather Forecast starts at tomorrow 00:00:00 and returns an array every 3 hours

                    // city name: data.city.name
                    // today's date: data.list.dt_txt for YYYY-MM-DD HH:MM;SS
                    // icon rep: 
                    // temp: 
                    // wind speed: 
                    // humidity: 

                    // displayFutureWeather()?
                    
                })
            } else {
                alert('Error: ' + response.statusText + ' when making request to 5 Day Weather Forecast');
            }
        })
        .catch(function (error) {
            alert('Unable to connect to 5 Day Weather Forecast');
        });

}

searchFormEl.addEventListener('submit', formSubmitHandler);