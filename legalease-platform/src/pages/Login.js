import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { login, register } from '../utilities/api';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await login(email, password);
      setUser(userData);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={styles.container}>
      <div className="auth-form" style={styles.form}>
        <h2>Login to Your Account</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={styles.linkText}>
          Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

// Register Component with similar styling
export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { name, email, password, confirmPassword, phone, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const userData = await register({ name, email, password, phone, role });
      setUser(userData);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={styles.container}>
      <div className="auth-form" style={styles.form}>
        <h2>Create Your Account</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Account Type</label>
            <select name="role" value={role} onChange={onChange}>
              <option value="user">Client</option>
              <option value="admin">Lawyer/Admin</option>
            </select>
          </div>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <p style={styles.linkText}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

// Styles for the components
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: '2.5rem',
    borderRadius: '10px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    width: '100%',
    maxWidth: '450px',
    margin: '1rem',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  linkText: {
    textAlign: 'center',
    marginTop: '1.5rem',
    color: '#555',
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: '600',
  }
};

export default Login;