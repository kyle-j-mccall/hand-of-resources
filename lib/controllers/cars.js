const { Router } = require('express');
const { Car } = require('../models/Car');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Car.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Car.getAll();
      res.json(data);
      if (!data) {
        return null;
      }
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Car.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Car.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Car.deleteCar(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
