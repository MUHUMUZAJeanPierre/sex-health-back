const express = require('express');
const QuickAction = require('../models/QuickAction'); 
const router = express.Router();

// Create a new QuickAction
router.post('/action', async (req, res) => {
  try {
    const quickAction = new QuickAction(req.body);
    const savedAction = await quickAction.save();
    res.status(201).json({data: savedAction, message: 'Quick action created successfully'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all QuickActions
router.get('/action', async (req, res) => {
  try {
    const actions = await QuickAction.find();
    res.status(200).json({data: actions, message:' quick action found successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single QuickAction by ID
router.get('/action/:id', async (req, res) => {
  try {
    const action = await QuickAction.findById(req.params.id);
    if (!action) return res.status(404).json({ message: 'QuickAction not found' });
    res.status(200).json({data: action, mesaage: " Quick action found"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a QuickAction by ID
router.put('/action/:id', async (req, res) => {
  try {
    const updatedAction = await QuickAction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAction) return res.status(404).json({ message: 'QuickAction not found' });
    res.status(200).json(updatedAction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a QuickAction by ID
router.delete('/action/:id', async (req, res) => {
  try {
    const deletedAction = await QuickAction.findByIdAndDelete(req.params.id);
    if (!deletedAction) return res.status(404).json({ message: 'QuickAction not found' });
    res.status(200).json({ message: 'QuickAction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
