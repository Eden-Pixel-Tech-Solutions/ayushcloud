import React, { useState } from 'react';
import { Search, RefreshCw, Check, X, ArrowRight, Filter, Download, Upload, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import '../../assets/css/term-mapper.css';

// Mock data for ICD terms
const mockICDTerms = [
  { code: 'E11.65', description: 'Type 2 diabetes mellitus with hyperglycemia', category: 'Endocrine' },
  { code: 'I10', description: 'Essential (primary) hypertension', category: 'Cardiovascular' },
  { code: 'J18.9', description: 'Pneumonia, unspecified', category: 'Respiratory' },
  { code: 'M54.5', description: 'Low back pain', category: 'Musculoskeletal' },
  { code: 'F32.9', description: 'Major depressive disorder, unspecified', category: 'Mental Health' },
  { code: 'K21.9', description: 'Gastro-esophageal reflux disease without esophagitis', category: 'Gastrointestinal' },
  { code: 'E78.5', description: 'Hyperlipidemia, unspecified', category: 'Metabolic' },
  { code: 'M17.9', description: 'Osteoarthritis of knee, unspecified', category: 'Musculoskeletal' },
];

// Mock data for AYUSH terms
const mockAYUSHTerms = [
  { id: 'AYU001', name: 'Prameha', description: 'A condition characterized by excessive urination, correlated with diabetes', category: 'Metabolic' },
  { id: 'AYU002', name: 'Rakta Gata Vata', description: 'A condition of vitiated Vata affecting blood, similar to hypertension', category: 'Cardiovascular' },
  { id: 'AYU003', name: 'Rajayakshma', description: 'A wasting disease, correlated with tuberculosis', category: 'Respiratory' },
  { id: 'AYU004', name: 'Katishoola', description: 'Pain in the lumbar region, similar to low back pain', category: 'Musculoskeletal' },
  { id: 'AYU005', name: 'Vishada', description: 'A condition of mental depression', category: 'Mental Health' },
  { id: 'AYU006', name: 'Amlapitta', description: 'Acidity disorder, similar to GERD', category: 'Gastrointestinal' },
  { id: 'AYU007', name: 'Medoroga', description: 'Disorder of fat metabolism, similar to hyperlipidemia', category: 'Metabolic' },
  { id: 'AYU008', name: 'Sandhivata', description: 'Degenerative joint disease, similar to osteoarthritis', category: 'Musculoskeletal' },
];

// Mock mapped terms
const mockMappedTerms = [
  { 
    id: 'M001', 
    icdCode: 'E11.65', 
    icdDescription: 'Type 2 diabetes mellitus with hyperglycemia',
    ayushId: 'AYU001',
    ayushName: 'Prameha',
    confidence: 'High',
    lastUpdated: '2023-10-15',
    status: 'Approved'
  },
  { 
    id: 'M002', 
    icdCode: 'I10', 
    icdDescription: 'Essential (primary) hypertension',
    ayushId: 'AYU002',
    ayushName: 'Rakta Gata Vata',
    confidence: 'High',
    lastUpdated: '2023-10-10',
    status: 'Approved'
  },
  { 
    id: 'M003', 
    icdCode: 'M54.5', 
    icdDescription: 'Low back pain',
    ayushId: 'AYU004',
    ayushName: 'Katishoola',
    confidence: 'Medium',
    lastUpdated: '2023-09-28',
    status: 'Pending Review'
  },
];

// Categories for filtering
const categories = ['All', 'Cardiovascular', 'Respiratory', 'Gastrointestinal', 'Musculoskeletal', 'Endocrine', 'Metabolic', 'Mental Health'];

const TermMapper = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  // State for mapping interface
  const [selectedICDTerm, setSelectedICDTerm] = useState(null);
  const [selectedAYUSHTerm, setSelectedAYUSHTerm] = useState(null);
  const [mappedTerms, setMappedTerms] = useState(mockMappedTerms);
  const [activeTab, setActiveTab] = useState('mapped');
  
  // Filter ICD terms
  const filteredICDTerms = mockICDTerms.filter(term => 
    (term.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
     term.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'All' || term.category === selectedCategory)
  );
  
  // Filter AYUSH terms
  const filteredAYUSHTerms = mockAYUSHTerms.filter(term => 
    (term.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     term.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     term.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'All' || term.category === selectedCategory)
  );
  
  // Filter mapped terms
  const filteredMappedTerms = mappedTerms.filter(term => {
    const matchesSearch = 
      term.icdCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.icdDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.ayushId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.ayushName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' || 
      mockICDTerms.find(t => t.code === term.icdCode)?.category === selectedCategory;
    
    const matchesStatus = 
      selectedStatus === 'All' || 
      term.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Handle mapping terms
  const handleMapTerms = () => {
    if (!selectedICDTerm || !selectedAYUSHTerm) return;
    
    const newMappedTerm = {
      id: `M${String(mappedTerms.length + 1).padStart(3, '0')}`,
      icdCode: selectedICDTerm.code,
      icdDescription: selectedICDTerm.description,
      ayushId: selectedAYUSHTerm.id,
      ayushName: selectedAYUSHTerm.name,
      confidence: 'Pending Review',
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'Pending Review'
    };
    
    setMappedTerms([...mappedTerms, newMappedTerm]);
    setSelectedICDTerm(null);
    setSelectedAYUSHTerm(null);
    setActiveTab('mapped');
  };
  
  // Handle status update
  const handleUpdateStatus = (id, status) => {
    setMappedTerms(mappedTerms.map(term => 
      term.id === id ? { ...term, status } : term
    ));
  };
  
  // Handle delete mapping
  const handleDeleteMapping = (id) => {
    if (window.confirm('Are you sure you want to delete this mapping?')) {
      setMappedTerms(mappedTerms.filter(term => term.id !== id));
    }
  };
  
  // Export mappings to CSV
  const exportToCSV = () => {
    const headers = ['ICD Code', 'ICD Description', 'AYUSH ID', 'AYUSH Name', 'Status', 'Last Updated'];
    const csvContent = [
      headers.join(','),
      ...filteredMappedTerms.map(term => 
        [
          `"${term.icdCode}"`,
          `"${term.icdDescription}"`,
          term.ayushId,
          `"${term.ayushName}"`,
          term.status,
          term.lastUpdated
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'icd_ayush_mappings.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="term-mapper">
      <div className="page-header">
        <h1>ICD ↔ AYUSH Term Mapper</h1>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={exportToCSV}>
            <Download size={16} /> Export Mappings
          </button>
          <button className="btn btn-outline">
            <Upload size={16} /> Import Mappings
          </button>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder={`Search ${activeTab === 'mapped' ? 'mappings' : 'terms'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className="filter-section">
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showFilters && (
            <div className="filters-dropdown">
              <div className="filter-group">
                <label>Category</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              {activeTab === 'mapped' && (
                <div className="filter-group">
                  <label>Status</label>
                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="view-tabs">
        <button 
          className={`tab ${activeTab === 'mapped' ? 'active' : ''}`}
          onClick={() => setActiveTab('mapped')}
        >
          Mapped Terms
          <span className="badge">{mappedTerms.length}</span>
        </button>
        <button 
          className={`tab ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          Map New Terms
        </button>
      </div>

      {activeTab === 'mapped' ? (
        <div className="mapped-terms-container">
          <div className="table-responsive">
            <table className="mapped-terms-table">
              <thead>
                <tr>
                  <th>ICD Code</th>
                  <th>ICD Description</th>
                  <th>AYUSH ID</th>
                  <th>AYUSH Name</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMappedTerms.length > 0 ? (
                  filteredMappedTerms.map(term => (
                    <tr key={term.id}>
                      <td className="code-cell">{term.icdCode}</td>
                      <td>{term.icdDescription}</td>
                      <td className="code-cell">{term.ayushId}</td>
                      <td>{term.ayushName}</td>
                      <td>
                        <span className={`status-badge ${term.status.toLowerCase().replace(' ', '-')}`}>
                          {term.status}
                        </span>
                      </td>
                      <td>{term.lastUpdated}</td>
                      <td className="actions">
                        {term.status === 'Pending Review' && (
                          <>
                            <button 
                              className="icon-btn success" 
                              title="Approve"
                              onClick={() => handleUpdateStatus(term.id, 'Approved')}
                            >
                              <Check size={16} />
                            </button>
                            <button 
                              className="icon-btn danger" 
                              title="Reject"
                              onClick={() => handleUpdateStatus(term.id, 'Rejected')}
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                        <button 
                          className="icon-btn" 
                          title="Delete"
                          onClick={() => handleDeleteMapping(term.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-results">
                      No mapped terms found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mapping-interface">
          <div className="mapping-container">
            <div className="term-selector">
              <h3>Select ICD Term</h3>
              <div className="term-list">
                {filteredICDTerms.map(term => (
                  <div 
                    key={term.code}
                    className={`term-card ${selectedICDTerm?.code === term.code ? 'selected' : ''}`}
                    onClick={() => setSelectedICDTerm(term)}
                  >
                    <div className="term-code">{term.code}</div>
                    <div className="term-description">{term.description}</div>
                    <div className="term-category">{term.category}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mapping-actions">
              <button 
                className="btn btn-primary"
                disabled={!selectedICDTerm || !selectedAYUSHTerm}
                onClick={handleMapTerms}
              >
                <ArrowRight size={18} />
                Map Terms
              </button>
              <div className="mapping-hint">
                {!selectedICDTerm && 'Select an ICD term'}
                {selectedICDTerm && !selectedAYUSHTerm && 'Now select an AYUSH term'}
                {selectedICDTerm && selectedAYUSHTerm && 'Click to map these terms'}
              </div>
            </div>
            
            <div className="term-selector">
              <h3>Select AYUSH Term</h3>
              <div className="term-list">
                {filteredAYUSHTerms.map(term => (
                  <div 
                    key={term.id}
                    className={`term-card ${selectedAYUSHTerm?.id === term.id ? 'selected' : ''}`}
                    onClick={() => setSelectedAYUSHTerm(term)}
                  >
                    <div className="term-code">{term.id}</div>
                    <div className="term-name">{term.name}</div>
                    <div className="term-description">{term.description}</div>
                    <div className="term-category">{term.category}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {selectedICDTerm && selectedAYUSHTerm && (
            <div className="mapping-preview">
              <h3>Mapping Preview</h3>
              <div className="preview-card">
                <div className="preview-icd">
                  <div className="preview-header">ICD Term</div>
                  <div className="preview-code">{selectedICDTerm.code}</div>
                  <div className="preview-description">{selectedICDTerm.description}</div>
                </div>
                <div className="preview-arrow">
                  <ArrowRight size={24} />
                </div>
                <div className="preview-ayush">
                  <div className="preview-header">AYUSH Term</div>
                  <div className="preview-code">{selectedAYUSHTerm.id}</div>
                  <div className="preview-name">{selectedAYUSHTerm.name}</div>
                  <div className="preview-description">{selectedAYUSHTerm.description}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TermMapper;
