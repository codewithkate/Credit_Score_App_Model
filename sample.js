const express = require('express');
const sampleRouter = express.Router();
const Samples = require('../models/samplesModel');
// const isAuth = require('../utils/isAuth');

// Index Route

sampleRouter.get('/', async (req, res) => {
  try {
    if (req.user) {
      res.json(await Samples.find());
    } else {
      res.json(await Samples.find({ uid: null }));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Faild to get data' });
  }
});

// Create Route

sampleRouter.post('/', async (req, res) => {
  try {
    req.body.uid = req.user.uid;
    const newSample = await Samples.create(req.body);
    res.json(newSample);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Update Route

sampleRouter.put('/:id', async (req, res) => {
  try {
    const updatedSample = await Samples.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSample);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Delete Route

sampleRouter.delete('/:id', async (req, res) => {
  try {
    const deletedSample = await Samples.findByIdAndRemove(req.params.id);
    res.json(deletedSample);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Show Route

sampleRouter.get('/:id', async (req, res) => {
  try {
    const sample = await Samples.findById(req.params.id);
    res.json(sample);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = sampleRouter;
