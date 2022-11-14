const { Router } = require('express');
const { Country } = require('../models/Country');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const countryDetail = await Country.getById(req.params.id);
      res.json(countryDetail);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const countries = await Country.getAll();
      res.json(countries);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Country.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
