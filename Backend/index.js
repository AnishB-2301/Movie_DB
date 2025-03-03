const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const DATABASE = process.env.DATABASE;

mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(`Error connecting to MongoDB: ${error}`));

app.use(cors());
app.use(express.json());

const moviesRoutes = require('./routes/moviesRoutes');
app.use('/api', moviesRoutes);
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { mongoose };