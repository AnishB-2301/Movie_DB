import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from './Spinner';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/movies/${id}`);
        if (!response.ok) {
          throw new Error('Movie not found');
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete movie');
        }

        alert('Movie deleted successfully');
        navigate('/');
      } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Failed to delete movie');
      }
    }
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Spinner />
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
  
  if (!movie) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Movie Not Found</h2>
        <p className="text-gray-700">The movie you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="mb-8 flex items-center text-blue-400 hover:text-blue-300 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Movies
        </button>
        
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Movie poster */}
            <div className="md:flex-shrink-0 bg-gradient-to-br from-blue-100 to-blue-50 p-4 md:w-1/3">
              <img 
                src={movie.posterUrl} 
                alt={movie.title}
                className="w-full h-full object-cover rounded-lg shadow-lg" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/500x750?text=No+Image+Available";
                }}
              />
            </div>
            
            {/* Movie details */}
            <div className="p-8 md:w-2/3">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {movie.language} • {movie.rating}
              </div>
              <h1 className="mt-2 text-4xl font-bold text-gray-900 leading-tight">
                {movie.title}
              </h1>
              
              <div className="mt-4 flex items-center">
                <span className="text-yellow-500 mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
                <span className="text-gray-700">{movie.rating}</span>
              </div>
              
              <div className="mt-2 text-gray-600">
                Release Date: {new Date(movie.releaseDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800">Description</h2>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {movie.description}
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate(`/edit-movie/${movie._id}`)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition"
                >
                  Edit Movie
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition"
                >
                  Delete Movie
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;