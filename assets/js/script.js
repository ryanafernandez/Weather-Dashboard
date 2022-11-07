var apiKey = "25eb352b4c90f492fe42536c88151915";

var searchFormEl = document.querySelector('#search-form');
var cityInputEl = document.querySelector('#city');

var cityDateEl = document.querySelector('#city-date');
var iconEl = document.querySelector('#current-icon');
var tempEl = document.querySelector('#current-temp');
var windEl = document.querySelector('#current-wind');
var humidityEl = document.querySelector('#current-humidity');
var futureConditionsEl = document.querySelector('#future-conditions');


var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getCurrentWeather(city);

        cityInputEl.value = '';
    } else {
        alert('Please enter a city to search');
    }
};

var owResponse, owData, fdResponse, fdData, owDate,datadt;
// Delete ^

var getCurrentWeather = function (searchTerm) {
    var openWeatherMapApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=imperial`;

    fetch(openWeatherMapApiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);

                    var iconImgEl = document.createElement('img');
                    iconImgEl.setAttribute("src", `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
                    var date = new Date(data.dt*1000);
                    date = date.toLocaleDateString();

                    cityDateEl.textContent = `${data.name} (${date})`;
                    cityDateEl.appendChild(iconImgEl);
                    tempEl.textContent = `Temp: ${data.main.temp} F`;
                    windEl.textContent = `Wind: ${data.wind.speed} MPH`;
                    humidityEl.textContent = `Humidity: ${data.main.humidity} %`;

                    // update search history
                    updateSearchHistory(searchTerm);
                    // displayCurrentWeather(data);
                    get5DayWeather(data.coord.lat, data.coord.lon); // make request to 5 Day Weather Forecast

                });
            } else {
                alert('Error: ' + response.statusText + ' when making request to Open Weather Map');
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Open Weather Map');
        });
}

var theDate;
var timeIndices = [8,16,24,32,39];
var get5DayWeather = function (lat, lon) {
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

                    var dateTime, time;
                    timeIndices.forEach(function(i) {
                    //     console.log(i);
                    // })
                    // for (var i = 0; i < data.list.length; i += 8) {
                        dateTime = data.list[i].dt_txt;
                        time = dateTime.split(' ')[1];
                        time = time.split(':')[0];
                        
                        
                        // if (time == 12) {
                            var weatherContainer = document.createElement('div');
                            var dateEl = document.createElement('h4');
                            var iconEl = document.createElement('img');
                            var dataListEl = document.createElement('ul');
                            var tempEl = document.createElement('li');
                            var windEl = document.createElement('li');
                            var humidityEl = document.createElement('li');

                            var date = new Date(data.list[i].dt*1000);
                            console.log("Using data for list index:", i);
                            console.log("Date Time:", date);
                            console.log("Day:", date.getDay());
                            date = date.toLocaleDateString();

                            // date = dateTime.split(' ')[0];
                            // [yr,mo,da] = date.split('-');
                            // if (da[0] == 0) {
                            //     da = da[1];
                            // }
                            
                            iconEl.setAttribute("src", `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`);

                            dateEl.textContent = `${date}`;
                            dateEl.appendChild(iconEl);
                            tempEl.textContent = `Temp: ${data.list[i].main.temp} F`;
                            windEl.textContent = `Wind: ${data.list[i].wind.speed} MPH`;
                            humidityEl.textContent = `Humidity: ${data.list[i].main.humidity} %`;

                            weatherContainer.appendChild(dateEl);
                            dataListEl.appendChild(tempEl);
                            dataListEl.appendChild(windEl);
                            dataListEl.appendChild(humidityEl);
                            weatherContainer.appendChild(dataListEl);
                            futureConditionsEl.appendChild(weatherContainer);
                            
                            
                            // console.log("date:", date);
                            // console.log("icon:", data.list[i].weather[0].icon);
                            // console.log("temp:", data.list[i].main.temp);
                            // console.log("speed:", data.list[i].wind.speed);
                            // console.log("humidity:",data.list[i].main.humidity);
                        // }
                    })
                    // today's date: data.list[i].dt_txt for YYYY-MM-DD HH:MM;SS
                    // icon rep: data.list[i].weather.icon
                    // temp: data.list[i].main.temp
                    // wind speed: data.list[i].wind.speed
                    // humidity: data.list[i].main.humidity

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

var updateSearchHistory = function (searchTerm) {
    
}

searchFormEl.addEventListener('submit', formSubmitHandler);