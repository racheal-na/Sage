import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock authentication - replace with real API call later
    setTimeout(() => {
      // For demo purposes, accept any email/password
      // In a real app, you would validate against your backend
      if (credentials.email && credentials.password) {
        // Store user data in localStorage (mock)
        const userData = {
          id: 1,
          name: 'John Doe',
          email: credentials.email,
          userType: credentials.email.includes('lawyer') ? 'lawyer' : 'client',
          token: 'mock-jwt-token-' + Date.now()
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError('Please enter both email and password');
      }
      setLoading(false);
    }, 1000); // Simulate network delay
  };

  return (
    <div className="login-container">
      {/* Background Image Section */}
      <div className="login-background">
        <div className="background-overlay"></div>
        <div className="welcome-content">
          <h1>Legal Ease Lite</h1>
          <p>Streamlining legal practice management for modern law firms</p>
          <div className="features">
            <div className="feature">
              <span className="feature-icon">📁</span>
              <span>Case Management</span>
            </div>
            <div className="feature">
              <span className="feature-icon">📅</span>
              <span>Appointment Scheduling</span>
            </div>
            <div className="feature">
              <span className="feature-icon">📂</span>
              <span>Document Storage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="login-form-section">
        <div className="login-card">
          <div className="logo">
            <span className="logo-icon">⚖️</span>
            <h2>Legal Ease Lite</h2>
          </div>
          <h3>Welcome Back</h3>
          <p>Please sign in to access your account</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" disabled={loading} className="login-button">
              {loading ? 'Logging in...' : 'Sign In'}
              </button>
            
            <div className="divider">
              <span>Or</span>
            </div>
            
            <div className="demo-notes">
              <p>For demo purposes, any email/password will work.</p>
              <p>Try:</p>
              <ul>
                <li>Email: <code>lawyer@example.com</code> (for lawyer view)</li>
                <li>Email: <code>client@example.com</code> (for client view)</li>
                <li>Any password</li>
              </ul>
            </div>
          </form>
          
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
        
        <div className="footer">
          <p>© 2025 Legal Ease Lite. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
