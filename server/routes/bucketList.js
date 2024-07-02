// backend/routes/bucketList.js
const express = require('express');
const router = express.Router();
const BucketListItem = require('../models/BucketListItem');
const mongoose = require('mongoose');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await BucketListItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new item
router.post('/', async (req, res) => {
  const item = new BucketListItem({
    text: req.body.text,
    completed: req.body.completed,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an item
router.patch('/:id', async (req, res) => {
  try {
    const item = await BucketListItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (req.body.text != null) {
      item.text = req.body.text;
    }
    if (req.body.completed != null) {
      item.completed = req.body.completed;
    }

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const item = await BucketListItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    await item.deleteOne();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
