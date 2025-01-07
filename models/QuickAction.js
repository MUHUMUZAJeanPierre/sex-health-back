const mongoose = require('mongoose');

const QuickActionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { 
    type: String, required: true },
  image: { 
    type: String, 
    required: true 
  },
});

const Featured = mongoose.model('QuickAction', QuickActionSchema);
module.exports = Featured;
