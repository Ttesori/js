/* 
Class to manage UI for Get Your Weather application
*/

class UI {
  constructor() {}

  /* 
  Get location value from form field
  */
  getLocation() {
    const txtLocation = document.querySelector('.we-txt-location').value;
    if (txtLocation !== '') {
      return txtLocation;
    } else {
      return -1;
    }
  }

  /* 
  Main method to output weather details
  */
  outputWeatherInfo(location, weather) {
    // Get results container
    const weatherEl = document.querySelector('.we-container-results');

    // Add header to main container
    this.outputWeatherInfoHeader(location, weatherEl);

    // Create details container
    const weatherDeetsEl = document.createElement('div');
    weatherDeetsEl.className = 'we-details card-body';

    // Construct each period, add to details container
    weather.forEach((period, index) => {
      this.outputWeatherInfoPeriod(period, index, location, weatherDeetsEl);
    });

    // Add load more button to details container
    this.outputWeatherLoadMore(weatherDeetsEl);

    // Append details container to main container
    weatherEl.appendChild(weatherDeetsEl);
  }
  /* 
  Helper method to output weather header
  */
  outputWeatherInfoHeader(location, weatherEl) {
    // Create Weather Header
    const weatherLocation = location.name;
    const locationHeaderEl = document.createElement('h3');
    locationHeaderEl.className = 'bg-primary text-light card-header';
    // Output location name
    locationHeaderEl.innerHTML = `<span class="we-results-location">${weatherLocation}</span>`;
    // Output save button
    locationHeaderEl.innerHTML += `<button type="button" class="we-btn-saveLocation btn btn-outline-light btn-sm float-right">Save Location <i class="fa fa-bookmark-o" aria-hidden="true"></i></button>`;
    weatherEl.appendChild(locationHeaderEl);
  }
  /* 
  Helper method to output weather period details
  */
  outputWeatherInfoPeriod(period, index, location, weatherDeetsEl) {
    // Create period container
    const weatherPeriodEl = document.createElement('li');
    weatherPeriodEl.className = 'we-forecast-period';
    // Initially hide period if > 6
    if (index > 6) {
      weatherPeriodEl.classList.add('d-none');
    }

    // Output date information
    const weatherDate = UI.getNiceDate(new Date(period.endTime));
    const weatherTime =
      new Date(period.endTime).getHours() > 12 ? 'Afternoon' : 'Morning';
    weatherPeriodEl.innerHTML += `
        <h4 class="we-forecast-date">${weatherDate.dayOfWeek} ${weatherTime}
        <span class="we-forecast-date-specific">${weatherDate.monthNum}/${
      weatherDate.dayOfMonth
    }</span></h4>`;

    // Output period forecast information
    weatherPeriodEl.innerHTML += `
        <div class="d-flex justify-content-between">
        <span class="we-forecast-temp align-self-center we-forecast-temp-${weatherTime.toLowerCase()}">${
      period.temperature
    }&deg;</span>
        <span class="we-forecast-forecast align-self-center flex-grow-1">
        ${period.detailedForecast}
        </span>
        <span class="we-forecast-icon"><a href="https://forecast.weather.gov/MapClick.php?lon=${
          location.location.lon
        }&lat=${location.location.lat}">
        <img src="${period.icon}">
        </a></span>
        </div>
        `;

    // Append to parent
    weatherDeetsEl.appendChild(weatherPeriodEl);
  }
  /* 
  Helper method to output load more button to details container
  */
  outputWeatherLoadMore(weatherDeetsEl) {
    // Add Load More Button
    const loadBtnEl = document.createElement('button');
    loadBtnEl.className = 'btn btn-outline-primary btn-block we-btn-load';
    loadBtnEl.innerHTML = 'Load More...';
    weatherDeetsEl.appendChild(loadBtnEl);
  }

  /* 
  Method to load more results into details contianer
  */
  loadMore() {
    const weatherPeriods = document.querySelectorAll(
      '.we-forecast-period.d-none'
    );
    weatherPeriods.forEach(period => {
      period.classList.remove('d-none');
    });
    document.querySelector('.we-btn-load').remove();
  }

  /* 
  Method to toggle loading state
  */
  toggleLoading() {
    const txtLocationEl = document.querySelector('.we-txt-location');
    const resultsEl = document.querySelector('.we-container-results');
    const formSubmitEl = document.querySelector('.we-btn-location');

    if (formSubmitEl.classList.contains('loading')) {
      // Finished loading/ready state
      formSubmitEl.classList.remove('loading');
      txtLocationEl.disabled = false;
      resultsEl.style.display = 'block';
      formSubmitEl.innerHTML = 'Load Weather';
      // Clear form field
      document.querySelector('.we-txt-location').value = '';
    } else {
      // Loading process
      txtLocationEl.disabled = true;
      resultsEl.style.display = 'none';
      formSubmitEl.classList.add('loading');
      formSubmitEl.innerHTML =
        '<i class="fa fa-refresh fa-spin" aria-hidden="true"></i> Loading...';
    }
  }
  /* 
  Method to manage elements for saving location
  */
  saveLocation() {
    const saveBtnEl = document.querySelector('.we-btn-saveLocation');
    saveBtnEl.innerHTML =
      'Location Saved! <i class="fa fa-check" aria-hidden="true"></i>';
    saveBtnEl.classList.add('we-btn-clear');
    setTimeout(() => {
      saveBtnEl.innerHTML =
        'Clear Saved Location <i class="fa fa-bookmark" aria-hidden="true"></i>';
    }, 3000);
  }
  /* 
  Method to manage elements for clearing saved location
  */
  clearLocation() {
    const clearBtnEl = document.querySelector('.we-btn-clear');
    clearBtnEl.innerHTML =
      'Location Cleared! <i class="fa fa-check" aria-hidden="true"></i>';
    setTimeout(() => {
      clearBtnEl.innerHTML =
        'Save Location <i class="fa fa-bookmark-o" aria-hidden="true"></i>';
      clearBtnEl.classList.remove('we-btn-clear');
    }, 3000);
  }
  /* 
  Method to show an alert on the location search form
  */
  showAlert(msg, type) {
    this.toggleLoading();
    if (type === 'danger') {
      document.querySelector('.we-container-results').innerHTML = '';
      document.querySelector('.we-container-results').style.display = 'none';
    }
    const formEl = document.querySelector('.we-card-form');
    const alertEl = document.createElement('div');
    alertEl.className = `alert alert-${type}`;
    alertEl.textContent = msg;
    formEl.appendChild(alertEl);
    setTimeout(() => {
      alertEl.remove();
    }, 4000);
  }
  /* 
  Static Method to output usable date information
  */
  static getNiceDate(date) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    // Get day of week
    const dayOfWeek = days[date.getDay()];
    // Get month
    const month = months[date.getMonth()];
    // Get month num
    const monthNum = date.getMonth() + 1;
    // get Date
    const dayofmonth = date.getDate();
    // Get year
    const year = date.getFullYear();
    return {
      dayOfWeek: dayOfWeek,
      month: month,
      monthNum: monthNum,
      dayOfMonth: dayofmonth,
      year: year
    };
  }
  /* 
  Static Method to output usable time of day information
  */
  static getNiceTime(time) {
    let hours = time.getHours();
    let am = hours > 11 ? 'PM' : 'AM';
    let minutes = time.getMinutes();
    if (hours > 12) {
      hours -= 12;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return `${hours}:${minutes} ${am}`;
  }
}
