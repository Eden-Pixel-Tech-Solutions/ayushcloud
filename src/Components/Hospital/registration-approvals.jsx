import React, { useState } from 'react';
import { UserCheck, Download, Clock, Check, X, Search, User, Mail, Phone, MapPin, ExternalLink, FileText } from 'lucide-react';
import PageHeader from '../Common/PageHeader';
import '../../assets/css/registration-approvals.css';

const RegistrationApprovals = () => {
  const [selectedTab, setSelectedTab] = useState('pending');
  
  // Sample data
  const pendingRegistrations = [
    {
      id: 'REG-1001',
      name: 'Sunrise Medical Center',
      type: 'Private',
      contactPerson: 'Dr. Anil Sharma',
      email: 'contact@sunrisemedical.com',
      phone: '+91 9876543210',
      location: 'Bangalore, KA',
      registrationDate: '2024-09-10',
      documents: 5,
      status: 'pending'
    },
    // Add more sample data as needed
  ];

  const handleApprove = (id) => {
    // Handle approval logic
    console.log(`Approved registration: ${id}`);
  };

  const handleReject = (id) => {
    // Handle rejection logic
    console.log(`Rejected registration: ${id}`);
  };

  return (
    <div className="registration-approvals">
      <PageHeader
        title="Registration Approvals"
        subtitle="Review and manage hospital registration requests"
        breadcrumbs={['Approvals', 'Registrations']}
        actions={[
          {
            label: 'Export',
            icon: Download,
            primary: false,
            onClick: () => console.log('Export clicked')
          }
        ]}
      />

      <div className="tabs">
        <button 
          className={`tab ${selectedTab === 'pending' ? 'active' : ''}`}
          onClick={() => setSelectedTab('pending')}
        >
          <Clock size={16} /> Pending Review
          <span className="badge">{pendingRegistrations.length}</span>
        </button>
        <button 
          className={`tab ${selectedTab === 'approved' ? 'active' : ''}`}
          onClick={() => setSelectedTab('approved')}
        >
          <Check size={16} /> Approved
        </button>
        <button 
          className={`tab ${selectedTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setSelectedTab('rejected')}
        >
          <X size={16} /> Rejected
        </button>
      </div>

      <div className="filters">
        <div className="search-box">
          <Search size={16} />
          <input type="text" placeholder="Search registrations..." />
        </div>
        <div className="filter-options">
          <select>
            <option>All Types</option>
            <option>Government</option>
            <option>Private</option>
          </select>
          <select>
            <option>Sort by Newest</option>
            <option>Sort by Oldest</option>
          </select>
        </div>
      </div>

      <div className="registrations-list">
        {pendingRegistrations.map(registration => (
          <div key={registration.id} className="registration-card">
            <div className="registration-header">
              <h3>{registration.name}</h3>
              <span className={`status-badge ${registration.status}`}>
                {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
              </span>
            </div>
            
            <div className="registration-details">
              <div className="detail">
                <User size={16} />
                <span>{registration.contactPerson}</span>
              </div>
              <div className="detail">
                <Mail size={16} />
                <span>{registration.email}</span>
              </div>
              <div className="detail">
                <Phone size={16} />
                <span>{registration.phone}</span>
              </div>
              <div className="detail">
                <MapPin size={16} />
                <span>{registration.location}</span>
              </div>
              <div className="detail">
                <span className="label">Registration Date:</span>
                <span>{registration.registrationDate}</span>
              </div>
              <div className="detail">
                <span className="label">Documents:</span>
                <span>{registration.documents} files</span>
              </div>
            </div>

            <div className="registration-actions">
              <button 
                className="btn primary"
                onClick={() => handleApprove(registration.id)}
              >
                <Check size={16} /> Approve
              </button>
              <button 
                className="btn danger"
                onClick={() => handleReject(registration.id)}
              >
                <X size={16} /> Reject
              </button>
              <button className="btn secondary">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationApprovals;
