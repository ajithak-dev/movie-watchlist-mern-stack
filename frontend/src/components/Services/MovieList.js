import React, { useEffect, useState } from 'react';
import { getMovies, deleteMovie } from '../Services/movieService';

const MovieList = ({ token }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies(token);
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id, token);
      setMovies(movies.filter(movie => movie._id !== id));
    } catch (error) {
      console.error("Failed to delete movie:", error);
    }
  };

  return (
    <div>
      {movies.map(movie => (
        <div key={movie._id}>
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
          <button onClick={() => handleDelete(movie._id)}>Delete</button>
          {/* Add an Update button here that navigates to an update form or opens a modal */}
        </div>
      ))}
    </div>
  );
};

export default MovieList;
