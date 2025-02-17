import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);

        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(`Error fetching movie details: ${error}`);
        setErrorMessage('Error fetching movie details. Please try again later.');
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-detail">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : "/no-Poster.png"
        }
        alt={movie.title}
      />
      <h1>{movie.title}</h1>
      <p>Rating: {movie.vote_average}</p>
      <p>Language: {movie.original_language}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>{movie.overview}</p>
    </div>
  );
};

export default MovieDetails;