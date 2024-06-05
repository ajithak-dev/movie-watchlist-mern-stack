import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import Watchlist from '../Watchlist/Watchlist';
import Sidebar from './Sidebar';


const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [isAutoScrolled, setIsAutoScrolled] = useState(false);
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [autoScrollTimer, setAutoScrollTimer] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API; // Replace with your actual API key
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 3000); // Change the delay (in milliseconds) as needed
    setAutoScrollTimer(timer);

    return () => {
      clearInterval(timer);
    };
  }, [movies.length]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="trendingLabel">Trending</div>
      <section className="page1">
        <div className="movieCards">
          {movies.map((movie, index) => (
            <div
              className={`movieCard ${index === selectedMovieIndex ? 'active' : ''}`}
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="poster"
              />
            </div>
          ))}
        </div>
        {movies[selectedMovieIndex] && (
          <div className="movieBackdrop">
            <img
              src={`https://image.tmdb.org/t/p/original${movies[selectedMovieIndex].backdrop_path}`}
              alt={movies[selectedMovieIndex].title}
              className="backdropImage"
            />
          </div>
        )}
      </section>
      <section className="page3">
        <Watchlist className="homewatchlist" />
      </section>
    </div>
  );
};

export default Home;