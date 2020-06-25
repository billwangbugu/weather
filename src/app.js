const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const getWeather = require("./utils/weather");

const app = express();
const port = process.env.PORT || 3000;

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicDirectoryPath));

//use handle bars
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Bill Wang",
    text: "search cities' weather ",
  });
});

app.get("/about", (rep, res) => {
  res.render("about", {
    title: "About me",
    name: "Bill Wang",
  });
});

app.get("/help", (rep, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Bill Wang",
  });
});

// weather page
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "no address provided",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return console.log(error);
      }
      getWeather(
        latitude,
        longitude,
        (error, { temperature, weather_descriptions, feelslike }) => {
          if (error) {
            return res.send({ error: "got error" });
          }
          res.send({
            forcast: `It is currently ${temperature} C degrees out, ${weather_descriptions}, feels like ${feelslike} C degree. `,
            location,
            address: req.query.address,
          });
        }
      );
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "error",
    text: "Help article not found.",
    name: "Bill",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "error",
    text: "Error 404: page not found.",
    name: "Bill",
  });
});

//port
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
