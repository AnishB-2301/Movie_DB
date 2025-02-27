const express = require('express');
const axios = require('axios');
const { ObjectId } = require('mongodb');
const { client, MONGO_DB_NAME, MONGO_COLLECTION_NAME } = require('../index');

const router = express.Router();

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.VITE_TMDB_API_KEY;

app.get('/api/movies', async (req, res) => {
    const { query } = req.query;
  
    try {
      const endpoint = query 
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
  
      const response = await axios.get(endpoint, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        }
      });
  
      res.json(response.data);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      res.status(500).json({ error: 'Failed to fetch movies' });
    }
});

app.get('/api/movies/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const response = await axios.get(`${API_BASE_URL}/movie/${id}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        }
      });
  
      res.json(response.data);
    } catch (error) {
      console.error(`Error fetching movie details: ${error}`);
      res.status(500).json({ error: 'Failed to fetch movie details' });
    }
});

app.post('/updateSearchCount', async (req, res) => {
  const { searchTerm, film } = req.body;

  try {
    const db = client.db(MONGO_DB_NAME);
    const collection = db.collection(MONGO_COLLECTION_NAME);

    const result = await collection.findOne({ searchTerm });

    if (result) {
      await collection.updateOne(
        { _id: result._id },
        { $set: { count: result.count + 1 } }
      );
    } else {
      await collection.insertOne({
        searchTerm,
        count: 1,
        film_id: film.id,
        poster_url: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
      });
    }

    res.status(200).json({ message: 'Search count updated!' });
  } catch (error) {
    console.error(`Error updating search count: ${error}`);
    res.status(500).json({ error: 'Failed to update search count' });
  }
});

app.get('/trendingMovies', async (req, res) => {
  try {
    const db = client.db(MONGO_DB_NAME);
    const collection = db.collection(MONGO_COLLECTION_NAME);

    const result = await collection.find().sort({ count: -1 }).limit(5).toArray();

    res.json(result);
  } catch (error) {
    console.error(`Error fetching trending movies: ${error}`);
    res.status(500).json({ error: 'Failed to fetch trending movies' });
  }
});

module.exports = router;