const request = require("postman-request");

const getWeather = (latitude, logitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=25f08b640566f5ca6ce448e35535d408&query=${latitude},${logitude}`;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      const weather = body.current;
      callback(undefined, weather);
    }
  });
};

module.exports = getWeather;
