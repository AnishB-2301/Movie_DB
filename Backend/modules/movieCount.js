const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    searchTerm: String,
    count: Number,
    film_id: Number,
    poster_url: String
}, {strict: false});

const Movies = mongoose.model('Movies', moviesSchema);

module.exports = Movies;