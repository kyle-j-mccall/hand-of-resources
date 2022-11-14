const { Router } = require('express');
const { Dog } = require('../models/Dog');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Dog.getById(req.params.id);
    res.json(data);
  })

  .get('/', async (req, res) => {
    const data = await Dog.getAll();
    res.json(data);
  })

  .post('/', async (req, res) => {
    const data = await Dog.insert(req.body);
    res.json(data);
  });
