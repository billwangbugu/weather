const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "http://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYmlsbHdhbmdidWd1IiwiYSI6ImNrYnNiNXU1cTAxdjQyeG83aWJjZTgxNGQifQ.3_nSgrZch2m-VPCAg3HIxg&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location. Try another search", undefined);
    } else {
      const feature = body.features[0].geometry;

      callback(undefined, {
        latitude: feature.coordinates[1],
        longitude: feature.coordinates[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
