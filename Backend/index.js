const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const DATABASE = process.env.DATABASE;

const client = new mongoose(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

const moviesRoutes = require('./routes/moviesRoutes');
app.use('/api', moviesRoutes);
  
app.listen(PORT, async () => {
  try {
    await client.connect();
    console.log(`Connected to MongoDB and server is running on port ${PORT}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
});

module.exports = { client, MONGO_DB_NAME, MONGO_COLLECTION_NAME };