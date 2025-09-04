import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getCases } from '../utilities/api';

const Cases = () => {
  const { user } = useContext(AuthContext);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const casesData = await getCases();
        setCases(casesData);
      } catch (error) {
        console.error('Error fetching cases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cases">
      <div className="container">
        <div className="page-header">
          <h1>Cases</h1>
          {user?.role === 'admin' && (
            <Link to="/cases/new" className="btn btn-primary">
              Create New Case
            </Link>
          )}
        </div>

        <div className="cases-list">
          {cases.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((caseItem) => (
                  <tr key={caseItem._id}>
                    <td>{caseItem.title}</td>
                    <td>{caseItem.type}</td>
                    <td>
                      <span className={`status status-${caseItem.status}`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td>{new Date(caseItem.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/cases/${caseItem._id}`} className="btn btn-sm">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No cases found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cases;