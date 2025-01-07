const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { 
    type: String, required: true },
  image: { 
    type: String, 
    required: true 
  },
});

const Event = mongoose.model('MentalHealth', EventSchema);
module.exports = Event;
