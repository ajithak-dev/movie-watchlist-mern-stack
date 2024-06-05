import axios from 'axios';
import { baseUrl } from '../../url';

const API_URL = process.env.REACT_APP_BACKEND_URL || `${baseUrl}/api`;

export const getMovies = async (token) => {
  return axios.get(`${API_URL}/movies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addMovie = async (movieData, token) => {
  return axios.post(`${API_URL}/movies`, movieData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateMovie = async (id, movieData, token) => {
  return axios.put(`${API_URL}/movies/${id}`, movieData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMovie = async (id, token) => {
  return axios.delete(`${API_URL}/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSingleMovie = async (id, token) => {
    try {
      const response = await axios.get(`${API_URL}/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching movie:", error);
      throw error;
    }
  };

