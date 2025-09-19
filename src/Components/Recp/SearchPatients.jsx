import React, { useState } from 'react';
import { Search, Eye, Edit, Trash2 } from 'lucide-react';
import '../../assets/css/searchpatients.css';

const SearchPatients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      abhaId: '12-3456-7890-1234',
      mobile: '+91 98765 43210',
      email: 'rajesh@example.com',
      age: 45,
      gender: 'Male',
      lastVisit: '2024-01-15'
    },
    {
      id: 2,
      name: 'Priya Singh',
      abhaId: '12-3456-7890-1235',
      mobile: '+91 98765 43211',
      email: 'priya@example.com',
      age: 32,
      gender: 'Female',
      lastVisit: '2024-01-10'
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      abhaId: '12-3456-7890-1236',
      mobile: '+91 98765 43212',
      email: 'mohammed@example.com',
      age: 28,
      gender: 'Male',
      lastVisit: '2024-01-08'
    }
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPatients = patients.filter(patient => {
    const query = searchQuery.toLowerCase();
    switch (searchType) {
      case 'name':
        return patient.name.toLowerCase().includes(query);
      case 'mobile':
        return patient.mobile.includes(query);
      case 'abhaId':
        return patient.abhaId.includes(query);
      default:
        return true;
    }
  });

  return (
    <div className="search-patients-container">
      <div className="search-card">
        <div className="search-controls">
          <div className="search-type-selector">
            <label>Search by:</label>
            <select 
              value={searchType} 
              onChange={(e) => setSearchType(e.target.value)}
              className="search-type-select"
            >
              <option value="name">Name</option>
              <option value="mobile">Mobile Number</option>
              <option value="abhaId">ABHA ID</option>
            </select>
          </div>
          
          <div className="search-input-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder={`Search by ${searchType}...`}
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>

        <div className="search-results">
          <div className="results-header">
            <h3>Search Results ({filteredPatients.length} found)</h3>
          </div>

          {filteredPatients.length > 0 ? (
            <div className="patients-grid">
              {filteredPatients.map(patient => (
                <div key={patient.id} className="patient-card">
                  <div className="patient-info">
                    <div className="patient-header">
                      <h4 className="patient-name">{patient.name}</h4>
                      <span className="patient-age">{patient.age} years, {patient.gender}</span>
                    </div>
                    
                    <div className="patient-details">
                      <div className="detail-item">
                        <span className="detail-label">ABHA ID:</span>
                        <span className="detail-value">{patient.abhaId}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Mobile:</span>
                        <span className="detail-value">{patient.mobile}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">{patient.email}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Last Visit:</span>
                        <span className="detail-value">{patient.lastVisit}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="patient-actions">
                    <button className="action-btn view" title="View Details">
                      <Eye size={16} />
                    </button>
                    <button className="action-btn edit" title="Edit Patient">
                      <Edit size={16} />
                    </button>
                    <button className="action-btn delete" title="Delete Patient">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">
                <Search size={48} />
              </div>
              <h3>No patients found</h3>
              <p>Try adjusting your search criteria or search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPatients;
