import React from "react";
import { useParams } from "react-router-dom";

const MovieDetails = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find((film) => film.id === parseInt(id));

  if (!movie) {
    return <div>Movie not found</div>;
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