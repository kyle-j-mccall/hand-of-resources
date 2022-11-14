const { Router } = require('express');
const { Book } = require('../models/Book');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Book.getById(req.params.id);
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
      const data = await Book.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Book.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Book.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
