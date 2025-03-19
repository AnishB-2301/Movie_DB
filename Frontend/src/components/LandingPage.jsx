/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import Search from "./Search.jsx";
import Spinner from "./Spinner.jsx";
import MovieCard from "./MovieCard.jsx";
import { useDebounce } from "react-use";
// import { getTrendingMovies, updateSearchCount } from "../appwrite.js";

const LandingPage = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [trendingMovies, setTrendingMovies] = useState([]);

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`http://localhost:5000/api/movies?query=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "No movies found");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const response = await fetch('http://localhost:5000/trendingMovies');

      if (!response.ok) {
        throw new Error("Failed to fetch trending movies");
      }

      const data = await response.json();
      setTrendingMovies(data);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Hero Banner" />
          <h1>Find Movies You&apos;ll Enjoy Without the Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button 
            onClick={() => window.location.href='/add-movie'} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Add New Movie
          </button>
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((film, index) => (
                <li key={film.$id}>
                  <p>{index + 1}</p>
                  <img src={film.posterUrl} alt={film.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((film) => (
                <MovieCard key={film.id} film={film} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default LandingPage;