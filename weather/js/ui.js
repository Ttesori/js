class UI {
  constructor() {}

  getLocation() {
    const txtLocation = document.querySelector('.we-txt-location').value;
    if (txtLocation !== '') {
      return txtLocation;
    } else {
      return -1;
    }
  }

  outputWeatherInfo(location, weather) {
    const weatherEl = document.querySelector('.we-container-results');
    const weatherLocation = location.name;
    weatherEl.innerHTML = `
    <h3 class="bg-primary text-light card-header">
    <span class="we-results-location">${weatherLocation}</span>
    <button type="button" class="we-btn-saveLocation btn btn-outline-light btn-sm float-right">Save Location <i class="fa fa-bookmark-o" aria-hidden="true"></i></button>
    </h3>`;

    const weatherDeets = document.createElement('div');
    weatherDeets.className = 'we-details card-body';
    weather.forEach((period, index) => {
      const weatherPeriod = document.createElement('li');
      const weatherDate = UI.getNiceDate(new Date(period.endTime));
      const weatherTime =
        new Date(period.endTime).getHours() > 12 ? 'Afternoon' : 'Morning';

      weatherPeriod.className = 'we-forecast-period';
      if (index > 6) {
        weatherPeriod.classList.add('d-none');
      }

      weatherPeriod.innerHTML += `
      <h4 class="we-forecast-date">${weatherDate.dayOfWeek} ${weatherTime}
      <span class="we-forecast-date-specific">${weatherDate.monthNum}/${
        weatherDate.dayOfMonth
      }</span></h4>
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
      weatherDeets.appendChild(weatherPeriod);
    });
    // Add Load More Button
    const loadBtnEl = document.createElement('button');
    loadBtnEl.className = 'btn btn-outline-primary btn-block we-btn-load';
    loadBtnEl.innerHTML = 'Load More...';
    weatherDeets.appendChild(loadBtnEl);

    weatherEl.appendChild(weatherDeets);

    // Clear form field
    document.querySelector('.we-txt-location').value = '';
  }

  loadMore() {
    const weatherPeriods = document.querySelectorAll(
      '.we-forecast-period.d-none'
    );
    weatherPeriods.forEach(period => {
      period.classList.remove('d-none');
    });
    document.querySelector('.we-btn-load').remove();
    console.log(weatherPeriods);
  }

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
    } else {
      // Loading process
      txtLocationEl.disabled = true;
      resultsEl.style.display = 'none';
      formSubmitEl.classList.add('loading');
      formSubmitEl.innerHTML =
        '<i class="fa fa-refresh fa-spin" aria-hidden="true"></i> Loading...';
    }
  }

  saveLocation() {
    const saveBtnEl = document.querySelector('.we-btn-saveLocation');
    saveBtnEl.innerHTML =
      'Location Saved! <i class="fa fa-check" aria-hidden="true"></i>';
    setTimeout(() => {
      saveBtnEl.innerHTML =
        'Clear Saved Location <i class="fa fa-bookmark" aria-hidden="true"></i>';
      saveBtnEl.classList.add('we-btn-clear');
    }, 3000);
  }

  clearLocation() {
    const saveBtnEl = document.querySelector('.we-btn-saveLocation');
    saveBtnEl.innerHTML =
      'Save Location <i class="fa fa-bookmark-o" aria-hidden="true"></i>';
  }

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
