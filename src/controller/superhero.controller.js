const express = require('express');
const superheroService = require('../services/superhero.service');

const router = express.Router();

// Get all superheroes
router.get('/', async (req, res) => {
  try {
    const heroes = await superheroService.getAll();
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch superheroes.' });
  }
});

// Get a superhero by id
router.get('/:id', async (req, res) => {
  try {
    const hero = await superheroService.getById(req.params.id);
    if (!hero) {
      return res.status(404).json({ message: 'Superhero not found.' });
    }
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch superhero.' });
  }
});

// Create a new superhero
router.post('/', async (req, res) => {
  try {
    const newHero = await superheroService.create(req.body);
    res.status(201).json(newHero);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create superhero.' });
  }
});

// Update an existing superhero
router.put('/:id', async (req, res) => {
  try {
    const updatedHero = await superheroService.update(req.params.id, req.body);
    if (!updatedHero) {
      return res.status(404).json({ message: 'Superhero not found.' });
    }
    res.json(updatedHero);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update superhero.' });
  }
});

// Delete a superhero
router.delete('/:id', async (req, res) => {
  try {
    const deletedHero = await superheroService.remove(req.params.id);
    if (!deletedHero) {
      return res.status(404).json({ message: 'Superhero not found.' });
    }
    res.json({ message: 'Superhero deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete superhero.' });
  }
});

module.exports = router;