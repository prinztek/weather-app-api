const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/handleProfileGet");
const city = require("./controllers/handleCity");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "test",
    database: "weather_app",
  },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", (req, res) => {
  // dependecy injection --> injecting whatever dependency handleSignin needs
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  // dependecy injection --> injecting whatever dependency handleRegister needs
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  // dependecy injection --> injecting whatever dependency handleProfileGet needs
  profile.handleProfileGet(req, res, db);
});

app.put("/city", (req, res) => {
  // dependecy injection --> injecting whatever dependency handleCity needs
  city.handleCity(req, res, db);
});

app.post("/cityurl", (req, res) => {
  city.handleApiCall(req, res);
});

app.post("/cityurlweather", (req, res) => {
  city.handleApiCallWeather(req, res);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
