import React, { useState } from 'react';
import { addMovie as addMovieService } from '../Services/movieService';

const AddMovie = ({ token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // Additional state and logic here

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to call addMovieService with the movie details
    try {
      const movieData = { title, description };
      await addMovieService(movieData, token);
      // Handle success (e.g., show success message, redirect)
    } catch (error) {
      // Handle error (e.g., show error message)
    }
  };

  // JSX for the AddMovie component
  return (
    <div>
      {/* Form for adding a movie */}
      <form onSubmit={handleSubmit}>
        {/* Input fields for title and description */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        {/* Submit button */}
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
