// src/redux/actions/watchlistActions.js
import { ADD_MOVIE, REMOVE_MOVIE, FETCH_WATCHLIST  } from './types';


// This is the new version of addMovie that includes a call to your backend
export const addMovie = movie => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Ensure this is saved during login
    if (!token) throw new Error("No token found");

    // Adjust '/api/movies' if your endpoint differs
    const response = await fetch('http://localhost:8000/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...movie,
        userId
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Could not add movie to watchlist");

    // Dispatch the ADD_MOVIE action with the movie data returned from your backend
    // This adds the movie to the Redux state
    dispatch({ type: ADD_MOVIE, payload: data });
  } catch (error) {
    console.error("Error adding movie to watchlist:", error);
  }
};

export const removeMovie = (movieObjectId) => async (dispatch) => {
  console.log("removeMovie action called with ID:", movieObjectId);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  try {
    const response = await fetch(`http://localhost:8000/api/movies/${movieObjectId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete movie");
    }

    console.log("Movie successfully deleted:", movieObjectId);
    dispatch({ type: 'REMOVE_MOVIE', payload: movieObjectId });
  } catch (error) {
    console.error("Error removing movie from watchlist:", error);
  }
};

export const fetchUserWatchlist = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:8000/api/movies', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch watchlist');
    }
    const watchlist = await response.json();
    dispatch({
      type: FETCH_WATCHLIST,
      payload: watchlist,
    });
  } catch (error) {
    console.error('Error fetching watchlist:', error);
  }
};