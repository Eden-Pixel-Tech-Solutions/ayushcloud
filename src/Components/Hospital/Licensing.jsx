import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Filter, 
  Download, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  FileText,
  User,
  Calendar,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Mail,
  Phone
} from 'lucide-react';
import PageHeader from '../Common/PageHeader';
import '../../assets/css/licensing.css';

const Licensing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [expandedCard, setExpandedCard] = useState(null);

  // Sample data
  const licenseApplications = [
    {
      id: 'LIC-1001',
      doctorId: 'DOC-1001',
      doctorName: 'Dr. Rajesh Kumar',
      specialization: 'Cardiology',
      currentLicense: 'MHMC/2020/12345',
      newLicenseType: 'Renewal',
      submissionDate: '2024-09-01',
      status: 'pending',
      statusMessage: 'Under Review',
      documents: [
        { name: 'Medical Degree.pdf', type: 'degree', uploaded: '2024-08-28' },
        { name: 'ID Proof.pdf', type: 'id', uploaded: '2024-08-28' },
        { name: 'Experience Certificate.pdf', type: 'experience', uploaded: '2024-08-28' }
      ],
      contact: {
        email: 'dr.rajesh@example.com',
        phone: '+91 9876543210'
      },
      reviewNotes: ''
    },
    {
      id: 'LIC-1002',
      doctorId: 'DOC-1002',
      doctorName: 'Dr. Priya Sharma',
      specialization: 'Neurology',
      currentLicense: 'DMC/2021/54321',
      newLicenseType: 'New Registration',
      submissionDate: '2024-09-05',
      status: 'pending',
      statusMessage: 'Document Verification',
      documents: [
        { name: 'MBBS Certificate.pdf', type: 'degree', uploaded: '2024-09-01' },
        { name: 'MD Certificate.pdf', type: 'degree', uploaded: '2024-09-01' },
        { name: 'Aadhar Card.pdf', type: 'id', uploaded: '2024-09-01' },
        { name: 'Experience Letter.pdf', type: 'experience', uploaded: '2024-09-02' }
      ],
      contact: {
        email: 'dr.priya@example.com',
        phone: '+91 9876543211'
      },
      reviewNotes: 'Additional experience certificate required.'
    },
    {
      id: 'LIC-1003',
      doctorId: 'DOC-1003',
      doctorName: 'Dr. Amit Patel',
      specialization: 'Orthopedics',
      currentLicense: 'KMC/2019/98765',
      newLicenseType: 'Upgrade',
      submissionDate: '2024-08-20',
      status: 'approved',
      statusMessage: 'License Issued',
      documents: [
        { name: 'MBBS Degree.pdf', type: 'degree', uploaded: '2024-08-15' },
        { name: 'MS Orthopedics.pdf', type: 'degree', uploaded: '2024-08-15' },
        { name: 'PAN Card.pdf', type: 'id', uploaded: '2024-08-15' },
        { name: 'Experience Certificate.pdf', type: 'experience', uploaded: '2024-08-15' },
        { name: 'Publication 1.pdf', type: 'publication', uploaded: '2024-08-16' }
      ],
      contact: {
        email: 'dr.amit@example.com',
        phone: '+91 9876543212'
      },
      reviewNotes: 'All documents verified. Eligible for upgrade.'
    },
    {
      id: 'LIC-1004',
      doctorId: 'DOC-1004',
      doctorName: 'Dr. Neha Gupta',
      specialization: 'Pediatrics',
      currentLicense: 'NMC/2022/45678',
      newLicenseType: 'Renewal',
      submissionDate: '2024-08-10',
      status: 'rejected',
      statusMessage: 'Documents Incomplete',
      documents: [
        { name: 'MBBS Certificate.pdf', type: 'degree', uploaded: '2024-08-05' },
        { name: 'Voter ID.pdf', type: 'id', uploaded: '2024-08-05' }
      ],
      contact: {
        email: 'dr.neha@example.com',
        phone: '+91 9876543213'
      },
      reviewNotes: 'Missing experience certificate and continuing medical education proof.'
    }
  ];

  // Filter applications based on search term and active tab
  const filteredApplications = licenseApplications.filter(application => {
    const matchesSearch = application.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.currentLicense.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'pending' && application.status === 'pending') ||
                      (activeTab === 'approved' && application.status === 'approved') ||
                      (activeTab === 'rejected' && application.status === 'rejected');
    
    return matchesSearch && matchesTab;
  });

  // Toggle card expansion
  const toggleExpand = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  // Handle application status update
  const updateApplicationStatus = (id, status, notes = '') => {
    console.log(`Updating application ${id} to status: ${status}`, { notes });
    // In a real app, this would be an API call
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      case 'pending':
      default:
        return 'status-pending';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} />;
      case 'rejected':
        return <XCircle size={16} />;
      case 'pending':
      default:
        return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="licensing-container">
      <PageHeader
        title="Doctor Licensing & Approvals"
        subtitle="Manage doctor license applications and renewals"
        breadcrumbs={['Doctor Management', 'Approvals & Licensing']}
        actions={[
          {
            label: 'Export Reports',
            icon: Download,
            primary: false,
            onClick: () => console.log('Export Reports clicked')
          }
        ]}
      />

      <div className="licensing-content">
        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by doctor name or license number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Applications
            </button>
            <button 
              className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Review
              <span className="badge">
                {licenseApplications.filter(app => app.status === 'pending').length}
              </span>
            </button>
            <button 
              className={`tab ${activeTab === 'approved' ? 'active' : ''}`}
              onClick={() => setActiveTab('approved')}
            >
              Approved
            </button>
            <button 
              className={`tab ${activeTab === 'rejected' ? 'active' : ''}`}
              onClick={() => setActiveTab('rejected')}
            >
              Rejected
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="applications-list">
          {filteredApplications.length > 0 ? (
            filteredApplications.map(application => (
              <div 
                key={application.id} 
                className={`application-card ${expandedCard === application.id ? 'expanded' : ''}`}
              >
                <div 
                  className="card-header"
                  onClick={() => toggleExpand(application.id)}
                >
                  <div className="doctor-info">
                    <div className="avatar">
                      <User size={20} />
                    </div>
                    <div>
                      <h3>{application.doctorName}</h3>
                      <div className="meta">
                        <span className="license">{application.currentLicense}</span>
                        <span className="specialization">{application.specialization}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="application-meta">
                    <div className={`status ${getStatusBadgeClass(application.status)}`}>
                      {getStatusIcon(application.status)}
                      <span>{application.statusMessage}</span>
                    </div>
                    <div className="submission-date">
                      <Calendar size={14} />
                      <span>Submitted: {application.submissionDate}</span>
                    </div>
                    <div className="license-type">
                      <FileText size={14} />
                      <span>{application.newLicenseType}</span>
                    </div>
                    <ChevronRight 
                      size={18} 
                      className={`expand-icon ${expandedCard === application.id ? 'expanded' : ''}`} 
                    />
                  </div>
                </div>
                
                {expandedCard === application.id && (
                  <div className="card-details">
                    <div className="details-section">
                      <h4>Application Details</h4>
                      <div className="details-grid">
                        <div className="detail-item">
                          <span className="label">Application ID:</span>
                          <span className="value">{application.id}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Doctor ID:</span>
                          <span className="value">{application.doctorId}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Current License:</span>
                          <span className="value">{application.currentLicense}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Request Type:</span>
                          <span className="value">{application.newLicenseType}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Submission Date:</span>
                          <span className="value">{application.submissionDate}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Status:</span>
                          <span className={`value ${getStatusBadgeClass(application.status)}`}>
                            {application.statusMessage}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="documents-section">
                      <h4>Submitted Documents</h4>
                      <div className="documents-grid">
                        {application.documents.map((doc, index) => (
                          <div key={index} className="document-item">
                            <FileText size={18} className="document-icon" />
                            <div className="document-info">
                              <div className="document-name">{doc.name}</div>
                              <div className="document-meta">
                                <span className="document-type">{doc.type}</span>
                                <span className="document-date">Uploaded: {doc.uploaded}</span>
                              </div>
                            </div>
                            <button className="view-document">
                              <ExternalLink size={16} />
                              <span>View</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="contact-section">
                      <h4>Contact Information</h4>
                      <div className="contact-details">
                        <div className="contact-item">
                          <Mail size={16} />
                          <span>{application.contact.email}</span>
                        </div>
                        <div className="contact-item">
                          <Phone size={16} />
                          <span>{application.contact.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    {application.reviewNotes && (
                      <div className="notes-section">
                        <h4>Review Notes</h4>
                        <div className="notes-content">
                          {application.reviewNotes}
                        </div>
                      </div>
                    )}
                    
                    {application.status === 'pending' && (
                      <div className="action-buttons">
                        <button 
                          className="btn approve"
                          onClick={() => updateApplicationStatus(application.id, 'approved')}
                        >
                          <CheckCircle size={16} />
                          Approve Application
                        </button>
                        <button 
                          className="btn request-info"
                          onClick={() => {
                            const notes = prompt('Enter additional information required:');
                            if (notes) {
                              updateApplicationStatus(application.id, 'pending', notes);
                            }
                          }}
                        >
                          <AlertCircle size={16} />
                          Request Information
                        </button>
                        <button 
                          className="btn reject"
                          onClick={() => {
                            const reason = prompt('Enter reason for rejection:');
                            if (reason) {
                              updateApplicationStatus(application.id, 'rejected', reason);
                            }
                          }}
                        >
                          <XCircle size={16} />
                          Reject Application
                        </button>
                      </div>
                    )}
                    
                    {(application.status === 'approved' || application.status === 'rejected') && (
                      <div className="action-buttons">
                        <button 
                          className="btn view-details"
                          onClick={() => console.log(`Viewing details for ${application.id}`)}
                        >
                          <ExternalLink size={16} />
                          View Full Application
                        </button>
                        {application.status === 'approved' && (
                          <button 
                            className="btn download-license"
                            onClick={() => console.log(`Downloading license for ${application.id}`)}
                          >
                            <Download size={16} />
                            Download License
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No applications found matching your criteria.</p>
            </div>
          )}
        </div>
        
        <div className="pagination">
          <button disabled>Previous</button>
          <span>Page 1 of 1</span>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Licensing;
