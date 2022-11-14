const { Router } = require('express');
const { Country } = require('../models/Country');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const countryDetail = await Country.getById(req.params.id);
    res.json(countryDetail);
  })
  .get('/', async (req, res) => {
    const countries = await Country.getAll();
    res.json(countries);
  });
