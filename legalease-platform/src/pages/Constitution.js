import React, { useState, useEffect } from 'react';
import { getConstitution, downloadConstitution } from '../utilities/api';

const Constitution = () => {
  const [constitution, setConstitution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConstitution = async () => {
      try {
        const constitutionData = await getConstitution();
        setConstitution(constitutionData);
      } catch (error) {
        console.error('Error fetching constitution:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConstitution();
  }, []);

  const handleDownload = async () => {
    try {
      await downloadConstitution(constitution._id);
    } catch (error) {
      console.error('Error downloading constitution:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="constitution">
      <div className="container">
        <h1>Constitution</h1>
        
        {constitution ? (
          <div className="constitution-content">
            <div className="constitution-header">
              <h2>{constitution.title}</h2>
              <p>{constitution.description}</p>
              <p>
                Uploaded by {constitution.uploadedBy.name} on{' '}
                {new Date(constitution.uploadedAt).toLocaleDateString()}
              </p>
            </div>
            
            <div className="constitution-actions">
              <button onClick={handleDownload} className="btn btn-primary">
                Download Constitution
              </button>
            </div>
            
            <div className="constitution-preview">
              <p>Preview not available. Please download the document to view it.</p>
            </div>
          </div>
        ) : (
          <p>No constitution document available.</p>
        )}
      </div>
    </div>
  );
};

export default Constitution;