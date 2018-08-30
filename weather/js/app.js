/*
TODOS:
() Check error handling
() Comment code
() Clear log statements
() Build out footer
*/

const findlocation = new FindLocation();
const ui = new UI();
const weather = new Weather();

// Event Handler for Load Weather
document.querySelector('.we-form-search').addEventListener('submit', e => {
  e.preventDefault();
  const locationValue = ui.getLocation();
  if (locationValue !== -1) {
    loadWeather(locationValue);
  }
});

function getWeatherInfo(locationInfo) {
  weather
    .getWeatherFromNWS(locationInfo.location.lat, locationInfo.location.lon)
    .then(resp => {
      ui.outputWeatherInfo(locationInfo, resp.properties.periods);
      // Add Event handler for Save Location
      document
        .querySelector('.we-btn-saveLocation')
        .addEventListener('click', () => {
          saveLocation();
          ui.saveLocation();
        });
      // Add event handler for load more
      document.querySelector('.we-btn-load').addEventListener('click', () => {
        ui.loadMore();
      });
      ui.toggleLoading();
    });
}

function loadWeather(locationValue) {
  // Add loading message
  ui.toggleLoading();
  findlocation
    .getLocationFromAddress(locationValue)
    .then(resp => {
      const locationInfo = {
        name: resp.results[0].address.freeformAddress,
        location: resp.results[0].position
      };
      getWeatherInfo(locationInfo);
    })
    .catch(err => console.log(err));
}

function saveLocation() {
  const location = document.querySelector('.we-results-location').textContent;
  localStorage.setItem('we-location', location);
  console.log('location saved');
}

function clearLocation() {
  localStorage.clear('we-location');
  ui.clearLocation();
}

function loadLocation() {
  const location = localStorage.getItem('we-location');
  if (location !== null) {
    loadWeather(location);
  }
}

loadLocation();
