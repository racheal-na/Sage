import React, { useContext, useState, useEffect } from 'react';
import { getUsers, getUserDetails, updateUser, deleteUser, getAdminStats } from '../utilities/api';
import AuthContext from '../context/AuthContext';

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchUsers();
      fetchStats();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await getAdminStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleUserSelect = async (userId) => {
    try {
      const userDetails = await getUserDetails(userId);
      setSelectedUser(userDetails);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        role: formData.get('role'),
        phone: formData.get('phone')
      };
      
      await updateUser(selectedUser.user._id, userData);
      setSelectedUser(null);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleUserDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        fetchUsers(); // Refresh the list
      } catch (error) {
        console.error('Error deleting user:', error);
        alert(error.response?.data?.message || 'Error deleting user');
      }
    }
  };

  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-panel">
      <div className="container">
        <h1>Admin Panel</h1>
        
        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Users</h3>
              <p className="stat-number">{stats.users}</p>
            </div>
            <div className="stat-card">
              <h3>Admins</h3>
              <p className="stat-number">{stats.admins}</p>
            </div>
            <div className="stat-card">
              <h3>Clients</h3>
              <p className="stat-number">{stats.clients}</p>
            </div>
            <div className="stat-card">
              <h3>Cases</h3>
              <p className="stat-number">{stats.cases}</p>
            </div>
            <div className="stat-card">
              <h3>Appointments</h3>
              <p className="stat-number">{stats.appointments}</p>
            </div>
          </div>
        )}
        
        <div className="admin-content">
          <div className="users-list">
            <h2>Users</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                 <td>{user.email}</td>
                    <td>
                      <span className={`role role-${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleUserSelect(user._id)}
                        className="btn btn-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleUserDelete(user._id)}
                        className="btn btn-sm btn-danger"
                        disabled={user._id === user?.user?._id} // Can't delete yourself
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {selectedUser && (
            <div className="user-details">
              <h2>Edit User</h2>
              <form onSubmit={handleUserUpdate}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedUser.user.name}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={selectedUser.user.email}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select name="role" defaultValue={selectedUser.user.role}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={selectedUser.user.phone || ''}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Update User
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSelectedUser(null)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              
              <div className="user-related-data">
                <h3>User Cases</h3>
                {selectedUser.cases.length > 0 ? (
                  <ul>
                    {selectedUser.cases.map(caseItem => (
                      <li key={caseItem._id}>
                        {caseItem.title} - {caseItem.status}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No cases found</p>
                )}
                
                <h3>User Appointments</h3>
                {selectedUser.appointments.length > 0 ? (
                  <ul>
                    {selectedUser.appointments.map(appt => (
                      <li key={appt._id}>
                        {appt.title} - {new Date(appt.date).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No appointments found</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;