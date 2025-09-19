import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Building2, 
  Activity, 
  Clock,
  Calendar,
  Plus,
  Search,
  Filter,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import '../../assets/css/hospitalmanagement.css';

const HospitalManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('hospitals');
  
  // Dummy data
  const stats = [
    { 
      id: 1, 
      title: 'Total Hospitals', 
      value: '1,248', 
      icon: Building2, 
      trend: '+5.2% from last month',
      color: '#4299e1'
    },
    { 
      id: 2, 
      title: 'Active Doctors', 
      value: '8,756', 
      icon: UserCheck, 
      trend: '+12.1% from last month',
      color: '#48bb78'
    },
    { 
      id: 3, 
      title: 'Pending Approvals', 
      value: '42', 
      icon: Clock, 
      trend: '3 awaiting review',
      color: '#ecc94b'
    },
    { 
      id: 4, 
      title: 'Total Patients', 
      value: '124,892', 
      icon: Users, 
      trend: '+8.4% from last month',
      color: '#9f7aea'
    }
  ];

  const hospitals = [
    {
      id: 'HSP-1001',
      name: 'City General Hospital',
      type: 'Government',
      beds: 450,
      location: 'Mumbai, MH',
      status: 'active',
      lastUpdated: '2024-09-10'
    },
    {
      id: 'HSP-1002',
      name: 'Metro Health Center',
      type: 'Private',
      beds: 120,
      location: 'Delhi, DL',
      status: 'pending',
      lastUpdated: '2024-09-12'
    },
    {
      id: 'HSP-1003',
      name: 'Rural Medical Center',
      type: 'Government',
      beds: 80,
      location: 'Pune, MH',
      status: 'active',
      lastUpdated: '2024-09-11'
    },
    {
      id: 'HSP-1004',
      name: 'Sunshine Hospital',
      type: 'Private',
      beds: 200,
      location: 'Bangalore, KA',
      status: 'inactive',
      lastUpdated: '2024-09-05'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New hospital registered',
      entity: 'Sunrise Medical Center',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      action: 'Doctor license approved',
      entity: 'Dr. Rajesh Kumar',
      time: '5 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      action: 'Hospital details updated',
      entity: 'City General Hospital',
      time: '1 day ago',
      status: 'completed'
    },
    {
      id: 4,
      action: 'New equipment request',
      entity: 'Metro Health Center',
      time: '2 days ago',
      status: 'pending'
    }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="status-badge status-approved">Active</span>;
      case 'pending':
        return <span className="status-badge status-pending">Pending</span>;
      case 'inactive':
        return <span className="status-badge status-rejected">Inactive</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  return (
    <div className="hospital-management">
      <h1>Hospital Management</h1>
      
      {/* Quick Stats */}
      <div className="quick-stats">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
                <small style={{ color: '#718096' }}>{stat.trend}</small>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'hospitals' ? 'active' : ''}`}
          onClick={() => setActiveTab('hospitals')}
        >
          Hospitals
        </div>
        <div 
          className={`tab ${activeTab === 'doctors' ? 'active' : ''}`}
          onClick={() => setActiveTab('doctors')}
        >
          Doctors
        </div>
        <div 
          className={`tab ${activeTab === 'equipment' ? 'active' : ''}`}
          onClick={() => setActiveTab('equipment')}
        >
          Equipment
        </div>
        <div 
          className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content active">
        <div className="content-grid">
          {/* Hospitals Table */}
          <div className="table-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>
                <Building2 size={20} style={{ marginRight: '8px' }} />
                Registered Hospitals
              </h3>
              <div>
                <button className="action-btn" title="Add Hospital">
                  <Plus size={18} />
                </button>
                <button className="action-btn" title="Filter">
                  <Filter size={18} />
                </button>
                <button className="action-btn" title="Export">
                  <Download size={18} />
                </button>
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
                <input 
                  type="text" 
                  placeholder="Search hospitals..." 
                  style={{
                    width: '100%',
                    padding: '0.5rem 1rem 0.5rem 2rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Hospital Name</th>
                  <th>Type</th>
                  <th>Beds</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map(hospital => (
                  <tr key={hospital.id}>
                    <td>{hospital.id}</td>
                    <td style={{ fontWeight: 500 }}>{hospital.name}</td>
                    <td>{hospital.type}</td>
                    <td>{hospital.beds}</td>
                    <td>{hospital.location}</td>
                    <td>{getStatusBadge(hospital.status)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="action-btn" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button className="action-btn" title="Delete">
                          <Trash2 size={16} color="#e53e3e" />
                        </button>
                        {hospital.status === 'pending' && (
                          <>
                            <button className="action-btn" title="Approve">
                              <CheckCircle size={16} color="#38a169" />
                            </button>
                            <button className="action-btn" title="Reject">
                              <XCircle size={16} color="#e53e3e" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Activities */}
          <div className="table-container">
            <h3>
              <Activity size={20} style={{ marginRight: '8px' }} />
              Recent Activities
            </h3>
            <div style={{ marginTop: '1rem' }}>
              {recentActivities.map(activity => (
                <div key={activity.id} style={{ 
                  padding: '0.75rem 0',
                  borderBottom: '1px solid #edf2f7',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: activity.status === 'completed' ? '#e6fffa' : '#fffaf0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {activity.status === 'completed' ? 
                      <CheckCircle size={16} color="#38b2ac" /> : 
                      <Clock size={16} color="#d69e2e" />
                    }
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, color: '#2d3748' }}>{activity.action}</div>
                    <div style={{ fontSize: '0.875rem', color: '#718096' }}>{activity.entity}</div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#a0aec0' }}>
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalManagement;