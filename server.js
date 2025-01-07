require('dotenv').config(); 
const express = require('express');
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/userRoutes'); 
const cors = require('cors'); 
const router = require('./routes/quickActionRoutes');
const EventRouter = require('./routes/EventRoute');
const MentalHealthRouter = require('./routes/MentalHealthRoute');

const app = express();

app.use(express.json()); 
app.use(cors()); 

connectDB();

// Routes
app.use('', userRoutes);
app.use('', router)
app.use('', EventRouter)
app.use('', MentalHealthRouter)

app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
