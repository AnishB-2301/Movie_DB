const express = require('express');
const Movies = require('../modules/movieCount');
const router = express.Router();

// Get all movies or search by title
router.get('/api/movies', async (req, res) => {
    const { query } = req.query;
  
    try {
        let movies;
        if (query) {
            // Search movies by title using case-insensitive regex
            movies = await Movies.find({
                title: { $regex: query, $options: 'i' }
            });

            res.json({
                results: movies,
                Response: movies.length > 0 ? "True" : "False",
                Error: movies.length === 0 ? "Movie not found!" : null
            });
        } else {
            // Get all movies sorted by creation date
            movies = await Movies.find().sort({ createdAt: -1 });
            res.json({
                results: movies,
                Response: "True"
            });
        }
    } catch (error) {
        console.error(`Error fetching movies: ${error}`);
        res.status(500).json({ 
            Response: "False",
            Error: 'Failed to fetch movies' 
        });
    }
});

router.get('/api/movies/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
        const movie = await Movies.findById(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
      console.error(`Error fetching movie details: ${error}`);
      res.status(500).json({ error: 'Failed to fetch movie details' });
    }
});

// Add new movie
router.post('/api/movies', async (req, res) => {
    try {
        const newMovie = new Movies(req.body);
        await newMovie.save();
        res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ error: 'Failed to add movie' });
    }
});

router.get('/trendingMovies', async (req, res) => {
    try {
        const movies = await Movies.find()
            .sort({ createdAt: -1 })
            .limit(5);
        res.json(movies);
    } catch (error) {
        console.error(`Error fetching trending movies: ${error}`);
        res.status(500).json({ error: 'Failed to fetch trending movies' });
    }
});

// Delete movie
router.delete('/api/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMovie = await Movies.findByIdAndDelete(id);
        
        if (!deletedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ error: 'Failed to delete movie' });
    }
});

// Update movie
router.put('/api/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMovie = await Movies.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        
        if (!updatedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        
        res.json(updatedMovie);
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ error: 'Failed to update movie' });
    }
});

module.exports = router;