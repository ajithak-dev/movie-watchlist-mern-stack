import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Account.css'
import Sidebar from '../Home/Sidebar';
import { baseUrl } from '../../url';

const Account = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const userId = localStorage.getItem('userId'); 
    if (userId) {
      fetch(`${baseUrl}/api/users/${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setUserDetails(data);
        })
        .catch(error => {
          console.error("Failed to fetch user details", error);
          setError('Failed to fetch user details. Please try again later.');
        });
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/login'); 
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!userDetails) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="account-container">
        <Sidebar/>
            <h2 className="account-title">User Details</h2>
            <p className="user-detail">Name: {userDetails?.name}</p>
            <p className="user-detail">Email: {userDetails?.email}</p>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>

  );
};

export default Account;
