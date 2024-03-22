const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// Create a new food item
router.post('/foods', async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res.status(201).send(food);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all food items
router.get('/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.send(foods);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a specific food item by ID
router.get('/foods/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).send({ error: 'Food not found' });
    }
    res.send(food);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a food item by ID
router.put('/foods/:id', async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!food) {
      return res.status(404).send({ error: 'Food not found' });
    }
    res.send(food);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a food item by ID
router.delete('/foods/:id', async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).send({ error: 'Food not found' });
    }
    res.send(food);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;