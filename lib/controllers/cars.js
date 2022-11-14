const { Router } = require('express');
const { Car } = require('../models/Car');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Car.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
