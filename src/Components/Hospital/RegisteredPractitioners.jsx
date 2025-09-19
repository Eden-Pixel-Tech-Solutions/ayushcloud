import React, { useState } from 'react';
import { 
  User, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Award,
  Star,
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import PageHeader from '../Common/PageHeader';
import '../../assets/css/registered-practitioners.css';

const RegisteredPractitioners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    specialization: 'all',
    status: 'all',
    experience: 'all'
  });

  // Sample data
  const practitioners = [
    {
      id: 'DOC-1001',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Cardiology',
      experience: 12,
      hospital: 'City General Hospital',
      location: 'Mumbai, MH',
      contact: '+91 9876543210',
      email: 'dr.rajesh@example.com',
      rating: 4.8,
      status: 'active',
      registrationDate: '2022-05-15',
      qualifications: ['MD', 'DM Cardiology'],
      availability: 'Mon-Fri, 9AM-5PM',
      consultationFee: '₹1500'
    },
    {
      id: 'DOC-1002',
      name: 'Dr. Priya Sharma',
      specialization: 'Neurology',
      experience: 8,
      hospital: 'Metro Health Center',
      location: 'Delhi, DL',
      contact: '+91 9876543211',
      email: 'dr.priya@example.com',
      rating: 4.9,
      status: 'active',
      registrationDate: '2023-01-10',
      qualifications: ['MD', 'DM Neurology'],
      availability: 'Mon-Sat, 10AM-7PM',
      consultationFee: '₹1800'
    },
    {
      id: 'DOC-1003',
      name: 'Dr. Amit Patel',
      specialization: 'Orthopedics',
      experience: 15,
      hospital: 'Greenfield Medical',
      location: 'Bangalore, KA',
      contact: '+91 9876543212',
      email: 'dr.amit@example.com',
      rating: 4.7,
      status: 'inactive',
      registrationDate: '2021-11-22',
      qualifications: ['MS', 'MCh Orthopedics'],
      availability: 'Mon-Sat, 9AM-6PM',
      consultationFee: '₹2000'
    }
  ];

  const specializations = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'Gastroenterology',
    'Oncology'
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  const filteredPractitioners = practitioners.filter(practitioner => {
    const matchesSearch = practitioner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practitioner.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practitioner.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = filters.specialization === 'all' || 
                                practitioner.specialization === filters.specialization;
    
    const matchesStatus = filters.status === 'all' || 
                         practitioner.status === filters.status;
    
    const matchesExperience = filters.experience === 'all' || 
                            (filters.experience === '0-5' && practitioner.experience <= 5) ||
                            (filters.experience === '5-10' && practitioner.experience > 5 && practitioner.experience <= 10) ||
                            (filters.experience === '10+' && practitioner.experience > 10);
    
    return matchesSearch && matchesSpecialization && matchesStatus && matchesExperience;
  });

  return (
    <div className="registered-practitioners">
      <PageHeader
        title="Registered Practitioners"
        subtitle="Manage and monitor all registered medical practitioners"
        breadcrumbs={['Doctor Management', 'Registered Practitioners']}
        actions={[
          {
            label: 'Add New Doctor',
            icon: Plus,
            primary: true,
            onClick: () => console.log('Add New Doctor clicked')
          },
          {
            label: 'Export Data',
            icon: Download,
            primary: false,
            onClick: () => console.log('Export Data clicked')
          }
        ]}
      />

      <div className="practitioners-container">
        <div className="filters-section">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search doctors by name, specialization, or hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <div className="filter-item">
              <label>Specialization</label>
              <select 
                value={filters.specialization}
                onChange={(e) => handleFilterChange('specialization', e.target.value)}
              >
                <option value="all">All Specializations</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
              <ChevronDown size={16} className="select-arrow" />
            </div>
            
            <div className="filter-item">
              <label>Status</label>
              <select 
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on-leave">On Leave</option>
              </select>
              <ChevronDown size={16} className="select-arrow" />
            </div>
            
            <div className="filter-item">
              <label>Experience</label>
              <select 
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
              >
                <option value="all">All Experience</option>
                <option value="0-5">0-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
              <ChevronDown size={16} className="select-arrow" />
            </div>
          </div>
        </div>

        <div className="practitioners-grid">
          {filteredPractitioners.length > 0 ? (
            filteredPractitioners.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-header">
                  <div className="doctor-avatar">
                    <User size={24} />
                  </div>
                  <div className="doctor-info">
                    <h3>{doctor.name}</h3>
                    <div className="specialization">
                      <Briefcase size={14} />
                      <span>{doctor.specialization}</span>
                    </div>
                    <div className="rating">
                      <Star size={14} fill="#FFD700" />
                      <span>{doctor.rating}</span>
                    </div>
                  </div>
                  <span className={`status-badge ${doctor.status}`}>
                    {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                  </span>
                </div>
                
                <div className="doctor-details">
                  <div className="detail-item">
                    <MapPin size={14} />
                    <span>{doctor.hospital}, {doctor.location}</span>
                  </div>
                  <div className="detail-item">
                    <Award size={14} />
                    <span>{doctor.qualifications.join(', ')}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Experience:</span>
                    <span>{doctor.experience} years</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Availability:</span>
                    <span>{doctor.availability}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Fee:</span>
                    <span className="fee">{doctor.consultationFee}</span>
                  </div>
                </div>
                
                <div className="doctor-actions">
                  <button className="action-btn primary">
                    <ExternalLink size={14} /> View Profile
                  </button>
                  <button className="action-btn secondary">
                    <Mail size={14} /> Contact
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No practitioners found matching your criteria.</p>
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

export default RegisteredPractitioners;
