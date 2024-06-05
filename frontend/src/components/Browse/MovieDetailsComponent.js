import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, removeMovie, fetchUserWatchlist } from '../../redux/actions/watchlistActions';
import './MovieDetailsComponent.css';

const MovieDetailsComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const watchlist = useSelector(state => state.watchlist.movies);
  const [movie, setMovie] = useState(null);
  const apiKey = process.env.REACT_APP_API; // Replace with your actual API key
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    fetchMovieDetails();
    // Assuming fetchUserWatchlist is an action that updates the Redux state with the user's watchlist
    dispatch(fetchUserWatchlist()); 
  }, [id]); // Dependency on id ensures these operations rerun when navigating to a new movie

  useEffect(() => {
    checkIfMovieIsInWatchlist();
  }, [watchlist]); // Dependency on watchlist ensures this check reruns whenever the watchlist updates

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation: ", error);
    }
  };

  const checkIfMovieIsInWatchlist = () => {
    // Ensure movieId comparison is consistent; adjust according to your data
    const isMovieInWatchlist = watchlist.some(movie => movie.movieId.toString() === id);
    setIsInWatchlist(isMovieInWatchlist);
  };

  const handleWatchlistToggle = () => {
    if (!movie) return;

    if (isInWatchlist) {
      // Remove from watchlist
      const movieToDelete = watchlist.find(movie => movie.movieId.toString() === id);
      if (movieToDelete) {
        dispatch(removeMovie(movieToDelete._id)); // Assuming removeMovie needs the _id
      }
    } else {
      // Add to watchlist
      const movieData = {
        movieId: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        // Include other relevant data as necessary
      };
      dispatch(addMovie(movieData));
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details-full-page">
      <button className="close-btn" onClick={() => navigate(-1)}>X</button>
      <div className="movie-details-content">
        <div className="movie-poster">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>Rating: {movie.vote_average}</p>
          <p>Runtime: {movie.runtime} minutes</p>
          <p>Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
          <button onClick={handleWatchlistToggle} className="watchlist-btn">
            {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsComponent;
