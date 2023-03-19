const apiKey = 'a80e4a931f6c57023477a68e872c37b2';

const searchForm = document.getElementById('search');
const searchInput = document.getElementById('search-input');
const weatherArticle = document.querySelector('.weather');
const forecastArticle = document.querySelector('.forecast');

// form submission
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const searchTerm = searchInput.value.trim(); 
  if (searchTerm.length === 0) return; 
  searchWeather(searchTerm); 
});

// searches for weather data using the OpenWeatherMap API
function searchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // displays the weather info
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      weatherArticle.innerHTML = `<p>Temperature: ${temperature}°F</p><p>Description: ${description}</p>`;
      searchForecast(city);
    })
    .catch((error) => {
      console.error(error);
      weatherArticle.innerHTML = '<p>Unable to retrieve weather data</p>';
      forecastArticle.innerHTML = '';
    });
}

// searches for forecast data using the OpenWeatherMap API
function searchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // displays the forecast information
      const forecastList = data.list;
      let forecastHTML = '';
      for (let i = 0; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];
        const date = new Date(forecast.dt_txt);
        const temperature = forecast.main.temp;
        const description = forecast.weather[0].description;
        forecastHTML += `<p>${date.toLocaleDateString()}: ${temperature}°F, ${description}</p>`;
      }
      forecastArticle.innerHTML = forecastHTML;
    })
    .catch((error) => {
      console.error(error);
      forecastArticle.innerHTML = '<p>Unable to retrieve forecast data</p>';
    });
}
