const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const DATABASE = process.env.DATABASE;

mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(`Error connecting to MongoDB: ${error}`));

app.use(cors());
app.use(express.json());

// Routes
const moviesRoutes = require('./routes/moviesRoutes');
app.use('/', moviesRoutes);
// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { mongoose };