const mongoose = require('mongoose');

const QuickActionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String, required: false },
});

const Featured = mongoose.model('QuickAction', QuickActionSchema);
module.exports = Featured;
