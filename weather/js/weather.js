class Weather {
  constructor() {}
  getWeatherFromNWS(lat, long) {
    console.log('Getting weather NWS for ', lat, long);
    const nwsurl = `https://api.weather.gov/points/${lat},${long}/forecast/`;

    return fetch(nwsurl)
      .then(resp => resp.json())
      .catch(err => console.log(err));
  }

  static convertCtoF(temp) {
    return Math.round(temp * (9 / 5) + 32);
  }
}
