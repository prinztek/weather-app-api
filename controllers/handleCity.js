// My Open Weather APIkey9
const APIkey = `6e5468592524eebac657d98f2c8f11e6`;
// Tranferring Open Weather API call from front-end to back-end server

const handleApiCall = (req, res) => {
  const { input } = req.body; // { input: 'Manila' }
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${APIkey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Invalid form submission"));
};

const handleApiCallWeather = (req, res) => {
  const { lat, lon } = req.body;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Invalid form submission"));
};

const handleCity = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleCity: handleCity,
  handleApiCall: handleApiCall,
  handleApiCallWeather: handleApiCallWeather,
};
