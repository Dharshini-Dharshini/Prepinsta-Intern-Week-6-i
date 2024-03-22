const express = require('express');
const mongoose = require('mongoose');
const foodRoutes = require('./routes/foodRoutes');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/foodDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use('/api', foodRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});