import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MovieForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get movie ID if editing
  const isEditing = Boolean(id); // Check if we're in edit mode

  const [movieData, setMovieData] = useState({
    title: '',
    rating: '',
    releaseDate: '',
    language: '',
    description: '',
    posterUrl: ''
  });

  // Fetch movie data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchMovie = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/movies/${id}`);
          if (!response.ok) {
            throw new Error('Movie not found');
          }
          const data = await response.json();
          // Format the date to YYYY-MM-DD for the input
          const formattedDate = new Date(data.releaseDate).toISOString().split('T')[0];
          setMovieData({ ...data, releaseDate: formattedDate });
        } catch (error) {
          console.error('Error fetching movie:', error);
          alert('Failed to fetch movie details');
          navigate('/');
        }
      };

      fetchMovie();
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing ? `http://localhost:5000/api/movies/${id}` : 'http://localhost:5000/api/movies';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...movieData,
          releaseDate: new Date(movieData.releaseDate).toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error(isEditing ? 'Failed to update movie' : 'Failed to add movie');
      }

      alert(isEditing ? 'Movie updated successfully!' : 'Movie added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isEditing ? 'Edit Movie' : 'Add New Movie'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={movieData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <select
              name="rating"
              value={movieData.rating}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select Rating</option>
              <option value="U">U</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
              <option value="A">A</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Release Date</label>
            <input
              type="date"
              name="releaseDate"
              value={movieData.releaseDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <select
              name="language"
              value={movieData.language}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Hindi">Hindi</option>
              <option value="French">French</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean">Korean</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={movieData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Poster URL</label>
            <input
              type="url"
              name="posterUrl"
              value={movieData.posterUrl}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isEditing ? 'Update Movie' : 'Add Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm; 