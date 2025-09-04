import React, { useState } from 'react';
import { search } from './utilities/api';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true); 
    try {
      const searchResults = await search(query);
      setResults(searchResults);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (!e.target.value) {
      setShowResults(false);
    }
  };

  const closeResults = () => {
    setShowResults(false);
    setQuery('');
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search cases, documents, appointments..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="search-button"
          >
            {loading ? '🔍' : '🔍'}
          </button>
        </div>
      </form>
      
      {showResults && results && (
        <div className="search-results">
          <div className="search-results-header">
            <h3>Search Results</h3>
            <button onClick={closeResults} className="close-results">×</button>
          </div>
          
          {results.cases && results.cases.length > 0 && (
            <div className="result-section">
              <h4>Cases</h4>
              {results.cases.map(caseItem => (
                <div key={caseItem._id} className="result-item">
                  <a href={`/cases/${caseItem._id}`} className="result-link">
                    {caseItem.title}
                  </a>
                  <div className="result-details">
                    <span className="result-type">{caseItem.type}</span>
                    <span className={`status status-${caseItem.status}`}>
                      {caseItem.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {results.documents && results.documents.length > 0 && (
            <div className="result-section">
              <h4>Documents</h4>
              {results.documents.map(doc => (
                <div key={doc._id} className="result-item">
                  <a 
                    href={`/api/documents/download/${doc._id}`} 
                    className="result-link"
                    download
                  >
                    {doc.originalName}
                  </a>
                  <div className="result-details">
                    <span className="result-description">
                      Case: {doc.case.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {results.appointments && results.appointments.length > 0 && (
            <div className="result-section">
              <h4>Appointments</h4>
              {results.appointments.map(appt => (
                <div key={appt._id} className="result-item">
                  <a href={`/appointments`} className="result-link">
                    {appt.title}
                  </a>
                  <div className="result-details">
                    <span className="result-description">
                      {new Date(appt.date).toLocaleString()}
                    </span>
                    <span className={`status status-${appt.status}`}>
                      {appt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {(!results.cases || results.cases.length === 0) &&
           (!results.documents || results.documents.length === 0) &&
           (!results.appointments || results.appointments.length === 0) && (
            <div className="no-results">
              <p>No results found for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;