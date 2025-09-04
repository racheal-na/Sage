import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getCase, getCaseDocuments, uploadDocument } from '../utilities/api';

const CaseDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [caseItem, setCaseItem] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [caseData, documentsData] = await Promise.all([
          getCase(id),
          getCaseDocuments(id),
        ]);
        setCaseItem(caseData);
        setDocuments(documentsData);
      } catch (error) {
        console.error('Error fetching case details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('caseId', id);

      const newDocument = await uploadDocument(formData);
      setDocuments([newDocument, ...documents]);
      setFile(null);
      e.target.reset();
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!caseItem) {
    return <div>Case not found</div>;
  }

  return (
    <div className="case-detail">
      <div className="container">
        <div className="case-header">
          <h1>{caseItem.title}</h1>
          <div className="case-meta">
            <span className={`status status-${caseItem.status}`}>
              {caseItem.status}
            </span>
            <span>Type: {caseItem.type}</span>
            <span>Created: {new Date(caseItem.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="case-content">
          <div className="case-info">
            <h2>Case Information</h2>
            <p>{caseItem.description || 'No description provided.'}</p>
            
            <div className="case-parties">
              <div>
                <h3>Client</h3>
                <p>{caseItem.client.name}</p>
                <p>{caseItem.client.email}</p>
                {caseItem.client.phone && <p>{caseItem.client.phone}</p>}
              </div>
              <div>
                <h3>Lawyer</h3>
                <p>{caseItem.lawyer.name}</p>
                <p>{caseItem.lawyer.email}</p>
              </div>
            </div>
          </div>

          <div className="case-documents">
            <h2>Documents</h2>
            
            {user?.role === 'user' && (
              <form onSubmit={handleFileUpload} className="upload-form">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
                <button type="submit" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload Document'}
                </button>
              </form>
            )}

            {documents.length > 0 ? (
              <div className="documents-list">
                {documents.map((document) => (
                  <div key={document._id} className="document-item">
                    <div className="document-info">
                      <h4>{document.originalName}</h4>
                      <p>
                        Uploaded by {document.uploadedBy.name} on{' '}
                        {new Date(document.uploadedAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="document-actions">
                      <a
                        href={`/api/documents/download/${document._id}`}
                        className="btn btn-sm"
                        download
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No documents found for this case.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;