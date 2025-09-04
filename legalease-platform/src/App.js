// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './global.css'; // Import the global styles

// Import your components
import Header from './Components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import CaseDetail from './pages/CaseDetail';
import Appointments from './pages/Appointment';
import Constitution from './pages/Constitution';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';

import AuthContext from './context/AuthContext';
import { getProfile } from './utilities/api';
import { initSocket } from './utils/socket';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const profile = await getProfile();
          setUser(profile);
          initSocket(token, profile._id);
        } catch (error) {
          console.error('Authentication error:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="auth-container">
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div className="loading-spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/cases/:id" element={<CaseDetail />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/constitution" element={<Constitution />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
          <ToastContainer position="bottom-right" />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;