import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Watchlist.css'; // Make sure this path is 
import Sidebar from '../Home/Sidebar';
import { baseUrl } from '../../url';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`${baseUrl}/api/movies`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch watchlist, status: ${response.status}`);
        }

        const data = await response.json();
        setWatchlist(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Import statements and useEffect hook remain unchanged

  return (
    <div className="watchlist-container">
        <Sidebar/>

      <h2>My Watchlist</h2>
      {watchlist.length > 0 ? (
        <div className="watchlist-grid">
          {watchlist.map((movie) => (
            <div
              key={movie._id}
              className="watchlist-card"
              style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})` }} // Adjusted for better quality
              onClick={() => navigate(`/movie/${movie.movieId}`)}
            >
              <div className="card-overlay">
                <h3 className="card-title">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your watchlist is empty.</p>
      )}
    </div>
  );

    }
export default Watchlist;
