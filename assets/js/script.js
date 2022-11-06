var apiKey = "25eb352b4c90f492fe42536c88151915";

var searchFormEl = document.querySelector('#search-form');
var cityInputEl = document.querySelector('#city');

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

var getWeather = function (searchTerm) {
    var apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + apiKey;

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    // displayWeather()
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
}

searchFormEl.addEventListener('submit', formSubmitHandler);