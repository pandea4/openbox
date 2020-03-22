const request = require("request");

const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicGFuZGVhNCIsImEiOiJjazd0eWxvZmowY2V3M2ttODV5Y2hmZWhmIn0.QJtanWuzAUl7Zx4SDH2-vw&limit=1";
  
    request({ url: url, json: true }, (error, response) => {
      if (error) {
        callback("Website not Up . Please visit again later..", undefined);
      } else if (response.body.features.length === 0) {
        callback("Unable to find the Location...", undefined);
      } else {
          callback(undefined,{
              longitude:response.body.features[0].center[0],
              latitude:response.body.features[0].center[1],
              location:response.body.features[0].place_name
  
          })
      }
    })
  }
  
module.exports = geocode