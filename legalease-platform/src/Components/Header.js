import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { logout } from '../utilities/auth';
import SearchBar from '../SearchBar';

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Legal Ease Lite
        </Link>
        <nav className="nav">
          {user ? (
            <>
              <Link to="/">Dashboard</Link>
              <Link to="/cases">Cases</Link>
              <Link to="/appointments">Appointments</Link>
              <Link to="/constitution">Constitution</Link>
              {user.role === 'admin' && (
                <Link to="/admin">Admin Panel</Link>
              )}
              <SearchBar />
              <div className="user-menu">
                <span>Hello, {user.name}</span>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;