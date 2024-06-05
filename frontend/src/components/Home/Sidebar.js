import React from 'react';
import { useSidebar } from '../../context/SidebarContext';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();

  return (
    <>
      <button onClick={toggleSidebar} className="hamburger-btn">
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <nav>
          <ul>
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/browse">Browse</Link></li>
            <li><Link to="/watchlist">Watchlist</Link></li>
            <li><Link to="/account">Account</Link></li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
