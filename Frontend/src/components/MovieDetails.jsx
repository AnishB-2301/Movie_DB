import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from './Spinner';

const MovieDetails = () => {
  const { id } = useParams();
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

  if (isLoading) return <Spinner />;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div className="movie-details">
      <img src={movie.posterUrl} alt={movie.title} />
      <div className="info">
        <h1>{movie.title}</h1>
        <p className="rating">Rating: {movie.rating}</p>
        <p className="release-date">
          Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
        </p>
        <p className="language">Language: {movie.language}</p>
        <p className="description">{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieDetails;