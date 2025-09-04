import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getCases, getAppointments } from '../utilities/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [cases, setCases] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [casesData, appointmentsData] = await Promise.all([
          getCases(),
          getAppointments(),
        ]);
        setCases(casesData.slice(0, 5));
        setAppointments(appointmentsData.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <h1>Welcome, {user?.name}</h1>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Recent Cases</h2>
            {cases.length > 0 ? (
              <ul>
                {cases.map((caseItem) => (
                  <li key={caseItem._id}>
                    <Link to={`/cases/${caseItem._id}`}>
                      {caseItem.title} - {caseItem.status}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No cases found</p>
            )}
            <Link to="/cases" className="view-all">
              View All Cases
            </Link>
          </div>

          <div className="dashboard-card">
            <h2>Upcoming Appointments</h2>
            {appointments.length > 0 ? (
              <ul>
                {appointments.map((appointment) => (
                  <li key={appointment._id}>
                    <div>
                      <strong>{appointment.title}</strong>
                      <br />
                      {new Date(appointment.date).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No upcoming appointments</p>
            )}
            <Link to="/appointments" className="view-all">
              View All Appointments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;