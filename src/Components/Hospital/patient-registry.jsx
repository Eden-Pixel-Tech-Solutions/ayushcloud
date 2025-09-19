import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, Eye, Edit, Trash2, User, Phone, Mail, Calendar, MapPin, ChevronDown, ChevronUp, X, Users, UserCheck, PlusCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../assets/css/patient-registry.css';

const PatientRegistry = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
    location: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    newThisMonth: 0,
    pending: 0
  });

  // Mock data - In a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    const mockPatients = Array.from({ length: 25 }, (_, i) => ({
      id: `ABHA${1000 + i}`,
      name: `Patient ${i + 1}`,
      age: Math.floor(Math.random() * 50) + 18,
      gender: ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)],
      phone: `+91 ${Math.floor(9000000000 + Math.random() * 1000000000)}`,
      email: `patient${i + 1}@example.com`,
      location: ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai'][Math.floor(Math.random() * 5)],
      status: ['Active', 'Inactive', 'Pending'][Math.floor(Math.random() * 3)],
      lastVisit: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      abhaId: `ABHA${Math.floor(10000000000000 + Math.random() * 90000000000000)}`,
      abhaAddress: `patient${i + 1}@abdm`
    }));

    setPatients(mockPatients);
    
    // Calculate stats
    setStats({
      total: mockPatients.length,
      active: mockPatients.filter(p => p.status === 'Active').length,
      newThisMonth: Math.floor(Math.random() * 10) + 1,
      pending: mockPatients.filter(p => p.status === 'Pending').length
    });
    
    setLoading(false);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      dateRange: '',
      location: ''
    });
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = searchTerm === '' || 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.abhaId.includes(searchTerm) ||
      patient.phone.includes(searchTerm);
    
    const matchesFilters = 
      (filters.status === '' || patient.status === filters.status) &&
      (filters.location === '' || patient.location === filters.location);
    
    return matchesSearch && matchesFilters;
  });

  const exportToCSV = () => {
    // In a real app, this would generate and download a CSV file
    alert('Exporting patient data to CSV...');
  };

  if (loading) {
    return <div className="loading">Loading patient data...</div>;
  }

  return (
    <div className="patient-registry">
      <div className="page-header">
        <h1>Patient Registry (ABHA)</h1>
        <div className="header-actions">
          <Link to="/patient/register" className="btn btn-primary">
            <Plus size={16} /> Register New Patient
          </Link>
          <button className="btn btn-secondary" onClick={exportToCSV}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon total">
            <Users size={24} />
          </div>
          <div className="stat-details">
            <h3>{stats.total}</h3>
            <p>Total Patients</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">
            <UserCheck size={24} />
          </div>
          <div className="stat-details">
            <h3>{stats.active}</h3>
            <p>Active</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon new">
            <PlusCircle size={24} />
          </div>
          <div className="stat-details">
            <h3>{stats.newThisMonth}</h3>
            <p>New This Month</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">
            <Clock size={24} />
          </div>
          <div className="stat-details">
            <h3>{stats.pending}</h3>
            <p>Pending Verification</p>
          </div>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, ABHA ID, or phone..."
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
                <label>Status</label>
                <select name="status" value={filters.status} onChange={handleFilterChange}>
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Location</label>
                <select name="location" value={filters.location} onChange={handleFilterChange}>
                  <option value="">All Locations</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Last Visit</label>
                <select name="dateRange" value={filters.dateRange} onChange={handleFilterChange}>
                  <option value="">Any Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              
              <div className="filter-actions">
                <button className="btn btn-link" onClick={clearFilters}>
                  Clear All
                </button>
                <button className="btn btn-primary" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="patients-table-container">
        <table className="patients-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>ABHA ID</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Status</th>
              <th>Last Visit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map(patient => (
                <tr key={patient.id}>
                  <td>
                    <div className="patient-info">
                      <div className="patient-avatar">
                        {patient.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="patient-details">
                        <strong>{patient.name}</strong>
                        <span>{patient.gender}, {patient.age} years</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="abha-id">
                      <div>{patient.abhaId}</div>
                      <small className="text-muted">{patient.abhaAddress}</small>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div><Phone size={14} /> {patient.phone}</div>
                      <div><Mail size={14} /> {patient.email}</div>
                    </div>
                  </td>
                  <td>
                    <div className="location">
                      <MapPin size={14} /> {patient.location}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${patient.status.toLowerCase()}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td>{patient.lastVisit}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="btn-icon" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="btn-icon danger" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
                  No patients found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="btn btn-outline" disabled>Previous</button>
        <div className="page-numbers">
          <span className="active">1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>10</span>
        </div>
        <button className="btn btn-outline">Next</button>
      </div>
    </div>
  );
};

export default PatientRegistry;
