import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import './Browse.css';
import Sidebar from '../Home/Sidebar';

const Browse = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const apiKey = REACT_APP_API;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiUrl = searchQuery
          ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
          : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Filter out movies without posters or sufficient information
        const filteredMovies = data.results.filter(movie => movie.poster_path && movie.title);
        setMovies(filteredMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [apiKey, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="explore-container">
        <Sidebar/>

      <div className="explore-header">
        <h2>Explore</h2>
        <SearchComponent onSearch={handleSearch} />
      </div>
      <div className="movie-list">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="movie-poster-link"
          >
            <div className="movie-poster">
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              <div className="name">{movie.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Browse;
