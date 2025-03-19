const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    rating: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    language: { type: String, required: true },
    description: { type: String, required: true },
    posterUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Movies = mongoose.model('Movies', moviesSchema);

module.exports = Movies;