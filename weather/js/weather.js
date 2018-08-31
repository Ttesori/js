/* 
Class to retrieve weather from NWS API with a given set of coordinates
*/

class Weather {
  constructor() {}

  /*
  Retrieve weather data from NWS API using given latitude and longitude coordinates
  */
  getWeatherFromNWS(lat, long) {
    const nwsurl = `https://api.weather.gov/points/${lat},${long}/forecast/`;

    return fetch(nwsurl).then(resp => resp.json());
  }

  /*
  Static method to convert Celsius to Fahrenheit where needed
  */
  static convertCtoF(temp) {
    return Math.round(temp * (9 / 5) + 32);
  }
}
