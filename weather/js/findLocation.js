/* 
Class to find geographic coordinates from ZIP or address info using TomTom API
*/

class FindLocation {
  constructor() {}

  /*
  Method to get coordinates from an address
  */
  getLocationFromAddress(address) {
    const apikey = '6Ob9Iptz54raJcxXgY4xLtsgPNp5eTsg';
    const locationAPI = `https://api.tomtom.com/search/2/geocode/${address}.json?key=${apikey}&countrySet=US`;

    return fetch(locationAPI).then(resp => {
      return resp.json();
    });
  }
}
