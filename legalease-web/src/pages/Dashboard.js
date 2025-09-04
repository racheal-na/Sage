import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name} ({user.userType})</p>
      <p>Email: {user.email}</p>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Quick Actions</h2>
        <button onClick={() => navigate('/cases')}>View Cases</button>
        <button onClick={() => navigate('/appointments')}>View Appointments</button>
        <button onClick={() => navigate('/constitution')}>View Constitution</button>
      </div>
      
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;