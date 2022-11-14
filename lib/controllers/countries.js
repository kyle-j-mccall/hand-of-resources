const { Router } = require('express');
const { Country } = require('../models/Country');

module.exports = Router().get('/', async (req, res) => {
  const countries = await Country.getAll();
  res.json(countries);
});
