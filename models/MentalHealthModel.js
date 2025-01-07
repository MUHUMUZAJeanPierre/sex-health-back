const mongoose = require('mongoose');

const MentalHealthSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { 
    type: String, required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
});

// Use the existing model if it already exists, otherwise create a new one
const MentalHealth = mongoose.models.MentalHealth || mongoose.model('MentalHealth', MentalHealthSchema);

module.exports = MentalHealth;
