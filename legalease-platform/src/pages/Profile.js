import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update profile logic here
    alert('Profile updated! (This would be connected to an API in a real app)');
  };

  return (
    <div className="profile">
      <div className="container">
        <h1>Profile</h1>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;