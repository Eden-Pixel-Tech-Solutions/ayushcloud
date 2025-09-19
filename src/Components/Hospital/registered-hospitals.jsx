import React from 'react';
import { Building2, Search, Filter, Download, Plus, MapPin, Phone, Mail, ExternalLink, Edit, MoreVertical } from 'lucide-react';
import PageHeader from '../Common/PageHeader';
import '../../assets/css/registered-hospitals.css';

const RegisteredHospitals = () => {
  // Sample data - in a real app, this would come from an API
  const hospitals = [
    {
      id: 'HSP-1001',
      name: 'City General Hospital',
      type: 'Government',
      beds: 450,
      location: 'Mumbai, MH',
      contact: '022-12345678',
      email: 'info@citygeneral.com',
      status: 'active',
      registrationDate: '2023-01-15'
    },
    {
      id: 'HSP-1002',
      name: 'Metro Health Center',
      type: 'Private',
      beds: 200,
      location: 'Delhi, DL',
      contact: '011-87654321',
      email: 'contact@metrohealth.com',
      status: 'active',
      registrationDate: '2023-03-22'
    },
    {
      id: 'HSP-1003',
      name: 'Greenfield Medical',
      type: 'Semi-Private',
      beds: 150,
      location: 'Bangalore, KA',
      contact: '080-12345678',
      email: 'info@greenfieldmed.com',
      status: 'inactive',
      registrationDate: '2023-02-10'
    }
  ];

  console.log('Rendering RegisteredHospitals component');
  
  return (
    <div className="registered-hospitals">
      <PageHeader
        title="Registered Hospitals"
        subtitle="View and manage all registered healthcare facilities"
        breadcrumbs={['Hospitals', 'Registered']}
        actions={[
          {
            label: 'Add Hospital',
            icon: Plus,
            primary: true,
            onClick: () => console.log('Add Hospital clicked')
          },
          {
            label: 'Export',
            icon: Download,
            primary: false,
            onClick: () => console.log('Export clicked')
          }
        ]}
      />

      <div className="filters">
        <div className="search-box">
          <Search size={16} />
          <input type="text" placeholder="Search hospitals..." />
        </div>
        <div className="filter-options">
          <select>
            <option>All Types</option>
            <option>Government</option>
            <option>Private</option>
          </select>
          <select>
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="hospitals-grid">
        {hospitals.map(hospital => (
          <div key={hospital.id} className="hospital-card">
            <div className="hospital-header">
              <h3>{hospital.name}</h3>
              <span className={`status-badge ${hospital.status}`}>
                {hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1)}
              </span>
            </div>
            
            <div className="hospital-details">
              <div className="detail">
                <Building2 size={16} />
                <span>{hospital.type} Hospital</span>
              </div>
              <div className="detail">
                <MapPin size={16} />
                <span>{hospital.location}</span>
              </div>
              <div className="detail">
                <Phone size={16} />
                <span>{hospital.contact}</span>
              </div>
              <div className="detail">
                <Mail size={16} />
                <span>{hospital.email}</span>
              </div>
            </div>

            <div className="hospital-footer">
              <span className="beds">{hospital.beds} Beds</span>
              <div className="actions">
                <button className="icon-btn" title="View Details">
                  <ExternalLink size={16} />
                </button>
                <button className="icon-btn" title="Edit">
                  <Edit size={16} />
                </button>
                <button className="icon-btn" title="More Options">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredHospitals;
