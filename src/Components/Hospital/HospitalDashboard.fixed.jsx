import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Building2, 
  MessageSquare,
  AlertTriangle,
  Eye,
  Check,
  Shield,
  Download,
  ChevronRight,
  Clock,
  Search,
  Filter,
  ChevronDown,
  Plus
} from 'lucide-react';
import Navbar from './governNavbar';
import RegisteredHospitals from './registered-hospitals';
import RegistrationApprovals from './registration-approvals';
import PerformanceMonitoring from './performance-monitoring';
import '../../assets/css/HospitalDashboard.css';
import '../../assets/css/full-width-fix.css';

const HospitalDashboard = () => {
  const [currentTime] = useState(new Date().toLocaleTimeString());
  const [activeSection, setActiveSection] = useState('registered-hospitals');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  // Dummy data
  const stats = [
    { id: 1, title: 'Total Patients', value: '12,547', icon: Users, trend: '12.5%' },
    { id: 2, title: 'Active Doctors', value: '1,234', icon: UserCheck, trend: '5.2%' },
    { id: 3, title: 'Hospitals', value: '89', icon: Building2, trend: '8.7%' },
    { id: 4, title: 'Active Consultations', value: '3,456', icon: MessageSquare, trend: '2.3%' }
  ];

  const alertsData = [
    { id: 'A001', type: 'License Expiry', severity: 'High', date: '2024-09-12', hospital: 'City Hospital' },
    { id: 'A002', type: 'Data Compliance', severity: 'Medium', date: '2024-09-11', hospital: 'Metro Medical' },
    { id: 'A003', type: 'System Update', severity: 'Low', date: '2024-09-10', hospital: 'Care Center' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'high';
      case 'Medium': return 'medium';
      case 'Low': return 'low';
      default: return 'medium';
    }
  };

  return (
    <div className="dashboard-container" style={{ width: '100vw', overflowX: 'hidden' }}>
      <Navbar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        expandedMenus={expandedMenus}
        setExpandedMenus={setExpandedMenus}
      />
      
      <main className="main-content" style={{ width: 'calc(100vw - 280px)' }}>
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Government Admin Dashboard</h1>
            <p className="subtitle">Healthcare Management System</p>
            <div className="breadcrumb">
              <span>Dashboard</span>
              <ChevronRight size={14} />
              <span className="active">Overview</span>
            </div>
          </div>
          <div className="header-actions">
            <div className="datetime-display">
              <Clock size={16} />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="main-content-area">
          {activeSection === 'dashboard' && (
            <>
              <div className="dashboard-section">
                <h2 className="section-title">Key Metrics</h2>
                <div className="stats-grid">
                  {stats.map(stat => (
                    <div key={stat.id} className={`stat-card ${stat.title.toLowerCase().split(' ')[0]}`}>
                      <div className="stat-icon">
                        <stat.icon size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>{stat.value}</h3>
                        <p>{stat.title}</p>
                        <div className="trend-indicator">
                          <span className="trend-arrow">↑</span>
                          <span className="trend-value">{stat.trend}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Alerts Section */}
              <div className="dashboard-section">
                <div className="section-header">
                  <h2 className="section-title">
                    <AlertTriangle size={20} className="section-icon" />
                    System Alerts
                  </h2>
                  <div className="section-actions">
                    <div className="search-box">
                      <Search size={16} />
                      <input type="text" placeholder="Search alerts..." />
                    </div>
                    <button className="filter-btn">
                      <Filter size={16} />
                      <span>Filter</span>
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="table-responsive">
                  <table className="alerts-table">
                    <thead>
                      <tr>
                        <th>Alert ID</th>
                        <th>Type</th>
                        <th>Severity</th>
                        <th>Date</th>
                        <th>Hospital</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alertsData.map((alert) => (
                        <tr key={alert.id} className="alert-row">
                          <td className="alert-id">#{alert.id}</td>
                          <td>{alert.type}</td>
                          <td>
                            <span className={`alert-badge ${getSeverityColor(alert.severity)}`}>
                              {alert.severity}
                            </span>
                          </td>
                          <td className="alert-date">{alert.date}</td>
                          <td className="hospital-name">{alert.hospital}</td>
                          <td>
                            <button className="action-icon" title="View Details">
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="table-footer">
                  <div className="pagination">
                    <span>1-{alertsData.length} of {alertsData.length}</span>
                    <button className="pagination-btn" disabled>Previous</button>
                    <button className="pagination-btn">Next</button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="dashboard-section quick-actions-section">
                <h2 className="section-title">Quick Actions</h2>
                <div className="actions-grid">
                  <button 
                    className="action-card approve"
                    onClick={() => setActiveSection('registration-approvals')}
                  >
                    <div className="action-icon">
                      <Building2 size={24} />
                    </div>
                    <div className="action-content">
                      <h4>Approve New Hospital</h4>
                      <p>Review and approve new hospital registrations</p>
                    </div>
                    <ChevronRight size={20} className="action-arrow" />
                  </button>
                  
                  <button className="action-card verify">
                    <div className="action-icon">
                      <Shield size={24} />
                    </div>
                    <div className="action-content">
                      <h4>Verify Doctor License</h4>
                      <p>Validate and approve doctor credentials</p>
                    </div>
                    <ChevronRight size={20} className="action-arrow" />
                  </button>
                  
                  <button 
                    className="action-card export"
                    onClick={() => setActiveSection('performance-monitoring')}
                  >
                    <div className="action-icon">
                      <Download size={24} />
                    </div>
                    <div className="action-content">
                      <h4>View Reports</h4>
                      <p>View system reports and analytics</p>
                    </div>
                    <ChevronRight size={20} className="action-arrow" />
                  </button>
                </div>
              </div>
            </>
          )}
          
          {/* Conditional Rendering of Components */}
          {activeSection === 'registered-hospitals' && <RegisteredHospitals />}
          {activeSection === 'registration-approvals' && <RegistrationApprovals />}
          {activeSection === 'performance-monitoring' && <PerformanceMonitoring />}
        </div>
      </main>
    </div>
  );
};

export default HospitalDashboard;
