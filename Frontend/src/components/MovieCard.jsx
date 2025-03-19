/* eslint-disable react/prop-types */
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MovieCard = ({ film }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/movies/${film._id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete movie');
        }

        // Refresh the page
        window.location.reload();
      } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Failed to delete movie');
      }
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit-movie/${film._id}`);
  };

  // Format release date
  const releaseYear = film.releaseDate ? new Date(film.releaseDate).getFullYear() : '';

  return (
    <li className="group relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl bg-white">
      <Link to={`/movies/${film._id}`} className="block h-full">
        {/* Image container with overlay gradient */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={film.posterUrl} 
            alt={film.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 truncate">{film.title}</h3>
          
          <div className="mt-2 flex items-center text-sm text-gray-500">
            {film.rating && (
              <div className="flex items-center mr-4">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{film.rating}</span>
              </div>
            )}
            {releaseYear && <span>{releaseYear}</span>}
          </div>
          
          {film.language && (
            <div className="mt-2">
              <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {film.language}
              </span>
            </div>
          )}
        </div>
      </Link>
      
      {/* Action buttons - only visible on hover */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleEdit}
          className="bg-white text-blue-600 p-2 rounded-full shadow hover:bg-blue-50 transition-colors"
          aria-label="Edit movie"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="bg-white text-red-600 p-2 rounded-full shadow hover:bg-red-50 transition-colors"
          aria-label="Delete movie"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default MovieCard;