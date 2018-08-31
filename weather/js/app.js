/*
Title: Get Your Weather Application
Author: Toni Tesori
Dependencies: FindLocation, Weather, UI

TODOS:
() Refine styling...aka give it some non-default styling lol
*/

// Import dependencies
const findlocation = new FindLocation();
const ui = new UI();
const weather = new Weather();

// Event Handler for Loading Weather
document.querySelector('.we-form-search').addEventListener('submit', e => {
  e.preventDefault();
  const locationValue = ui.getLocation();
  if (locationValue !== -1) {
    beginLoadingWeather(locationValue);
  }
});

/* 
Use location from form to begin loading weather data
*/
function beginLoadingWeather(locationValue) {
  return new Promise(resolve => {
    // Add loading states to elements
    ui.toggleLoading();

    // Attempt to get coordinates from location field value
    findlocation
      .getLocationFromAddress(locationValue)
      .then(resp => {
        // If location retrieved successfully, pass info to next step
        const locationInfo = {
          name: resp.results[0].address.freeformAddress,
          location: resp.results[0].position
        };
        finishLoadingWeather(locationInfo).then(() => {
          resolve();
        });
      })
      .catch(() => {
        // If location not found, show error
        ui.showAlert(
          'Error: Location Not Found. Try entering a new location.',
          'danger'
        );
      });
  });
}

/* 
Once location is determined, fetch weather data from NWS and output data
*/
function finishLoadingWeather(locationInfo) {
  return new Promise(resolve => {
    // Attempt to retrieve weather from NWS
    weather
      .getWeatherFromNWS(locationInfo.location.lat, locationInfo.location.lon)
      .then(resp => {
        // If data is returned successfully, output to page
        ui.outputWeatherInfo(locationInfo, resp.properties.periods);

        // Add Event handler for Save Location button
        document.querySelector('.we-btn-save').addEventListener('click', () => {
          saveLocation();
          ui.saveLocation();
        });

        // Add event handler for load more
        document.querySelector('.we-btn-load').addEventListener('click', () => {
          ui.loadMore();
        });

        // Toggle loading back to ready state
        ui.toggleLoading();
        resolve();
      })
      .catch(err => {
        // If error loading data, show error
        ui.showAlert('Error: Cannot fetch data. Try again later.', 'danger');
        ui.toggleLoading();
      });
  });
}

/* 
Save user specified location into local storage
*/
function saveLocation() {
  // Save current location to local storage
  const location = document.querySelector('.we-results-location').textContent;
  localStorage.setItem('we-location', location);
  ui.saveLocation();

  // Add clear button event listener
  document
    .querySelector('.we-btn-saveLocation')
    .addEventListener('click', () => {
      clearLocation();
    });
}

/* 
Clear saved location from local storage
*/
function clearLocation() {
  localStorage.clear('we-location');
  ui.clearLocation();

  // Add save button event listener
  document
    .querySelector('.we-btn-saveLocation')
    .addEventListener('click', () => {
      saveLocation();
    });
}

/* 
Initialize application
*/
function init() {
  // If location saved in local storage, load weather
  const location = localStorage.getItem('we-location');
  if (location !== null) {
    beginLoadingWeather(location).then(() => {
      ui.saveLocation();
    });
  }
}

init();
