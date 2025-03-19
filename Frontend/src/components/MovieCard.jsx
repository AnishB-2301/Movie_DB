/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ film }) => {
  return (
    <li>
      <Link to={`/movies/${film._id}`}>
        <img src={film.posterUrl} alt={film.title} />
        <div>
          <h3>{film.title}</h3>
          <p>{film.rating}</p>
          <p>{new Date(film.releaseDate).getFullYear()}</p>
          <p>{film.language}</p>
        </div>
      </Link>
    </li>
  );
};

export default MovieCard;