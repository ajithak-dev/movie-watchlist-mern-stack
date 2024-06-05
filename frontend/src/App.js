import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Landing from './components/Landing/Landing';
import Browse from './components/Browse/Browse';
import MovieDetailsComponent from './components/Browse/MovieDetailsComponent';
import AddMovie from './components/Services/AddMovie';
import EditMovie from './components/Services/EditMovie'; // Assuming you have this component
import { useAuth } from './components/Security/AuthContex';
import Watchlist from './components/Watchlist/Watchlist';
import { SidebarProvider } from './context/SidebarContext';
import Sidebar from './components/Home/Sidebar';
import Account from './components/Account/Account';


function App() {
  const isAuthenticated = useAuth();

  return (
    <SidebarProvider>
    <Router>
      <div className="App">
        <div className="main-content">

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/home" 
            element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/browse" 
            element={isAuthenticated ? <Browse /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/movie/add" // Route for adding a movie
            element={isAuthenticated ? <AddMovie /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/movie/edit/:id" // Route for editing a movie
            element={isAuthenticated ? <EditMovie /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/movie/:id" 
            element={isAuthenticated ? <MovieDetailsComponent /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/watchlist" 
            element={isAuthenticated ? <Watchlist /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/account" 
            element={isAuthenticated ? <Account /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </div>
      </div>
    </Router>
    </SidebarProvider>
  );
}

export default App;
