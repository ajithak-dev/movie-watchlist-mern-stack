// src/redux/reducers/watchlistReducer.js
import { ADD_MOVIE, REMOVE_MOVIE, FETCH_WATCHLIST } from '../actions/types';

const initialState = {
  movies: [],
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case REMOVE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter(movie => movie._id !== action.payload),
      };
    case FETCH_WATCHLIST: // Handle fetching the watchlist
      return {
        ...state,
        movies: action.payload,
      };
    default:
      return state;
  }
};

export default watchlistReducer;
