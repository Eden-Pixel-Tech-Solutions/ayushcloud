import React, { useState } from 'react';
import { Search } from 'lucide-react';
import '../../assets/css/registerpatient.css';

const RegisterPatient = ({ title = "Register New Patient", searchPlaceholder = "Search patients...", showHeader = true }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    abhaId: '',
    mobile: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyContact: '',
    bloodGroup: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Patient Registration Data:', formData);
    // Handle form submission logic here
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      abhaId: '',
      mobile: '',
      email: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      emergencyContact: '',
      bloodGroup: ''
    });
  };

  return (
    <div className="register-patient-container">
      {showHeader && (
        <header className="top-bar">
          <div className="top-bar-left">
            <h1>{title}</h1>
            <div className="search-bar">
              <Search size={20} />
              <input 
                type="text" 
                placeholder={searchPlaceholder}
              />
            </div>
          </div>
        </header>
      )}
      
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter patient's full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="abhaId">ABHA ID</label>
              <input
                type="text"
                id="abhaId"
                name="abhaId"
                value={formData.abhaId}
                onChange={handleInputChange}
                placeholder="12-3456-7890-1234"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number *</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="patient@example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="emergencyContact">Emergency Contact</label>
              <input
                type="tel"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
              />
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter complete address"
                rows="2"
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              Register Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPatient;
