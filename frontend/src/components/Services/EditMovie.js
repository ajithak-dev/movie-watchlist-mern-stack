import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleMovie, updateMovie } from '../Services/movieService';

const EditMovie = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getSingleMovie(id, token);
        setMovie({
          title: response.data.title,
          description: response.data.description
        });
      } catch (error) {
        console.error("Failed to fetch movie:", error);
        navigate('/browse'); // Redirect if the movie is not found or on error
      }
    };

    fetchMovie();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMovie(id, movie, token);
      navigate('/browse'); // Redirect to the movies list or details page after successful update
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Movie</h2>
      <div>
        <label>
          Title:
          <input
            name="title"
            type="text"
            value={movie.title}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={movie.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit">Update Movie</button>
    </form>
  );
};

export default EditMovie;
