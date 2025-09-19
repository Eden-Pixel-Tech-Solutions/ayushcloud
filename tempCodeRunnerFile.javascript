import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  Hospital, 
  ClipboardList, 
  AlertCircle,
  Clock,
  TrendingUp,
  PieChart,
  BarChart2,
  Bell
} from 'lucide-react';
import Navbar from './governNavbar';
import '../../assets/css/HospitalDashboard.css';

// Remove onLogout from destructuring since it's not used
function HospitalDashboard({ user }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalHospitals: 0,
    activeConsultations: 0
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalPatients: 12453,
        totalDoctors: 876,
        totalHospitals: 243,
        activeConsultations: 567
      });
    }, 500);
  }, []);

  // Mock data for charts (will be used in future implementation)
  // const registrationData = [
  //   { month: 'Jan', count: 1200 },
  //   { month: 'Feb', count: 1900 },
  //   { month: 'Mar', count: 1500 },
  //   { month: 'Apr', count: 2800 },
  //   { month: 'May', count: 2200 },
  //   { month: 'Jun', count: 3000 }
  // ];

  // const hospitalDistribution = [
  //   { name: 'Public', value: 65 },
  //   { name: 'Private', value: 25 },
  //   { name: 'Trust', value: 10 }
  // ];

  const alerts = [
    { id: 1, type: 'Compliance', severity: 'high', message: '5 hospitals pending compliance verification', date: '2023-09-13' },
    { id: 2, type: 'System', severity: 'medium', message: 'Scheduled maintenance this weekend', date: '2023-09-14' },
    { id: 3, type: 'Security', severity: 'high', message: 'Unusual login attempt detected', date: '2023-09-15' }
  ];

  // StatCard component with proper prop usage
  const StatCard = (props) => (
    <div className="stat-card">
      <div className="stat-icon">
        {React.createElement(props.icon, { size: 24 })}
      </div>
      <div className="stat-content">
        <h3>{props.value.toLocaleString()}</h3>
        <p>{props.title}</p>
        {props.trend && (
          <span className={`trend ${props.trend > 0 ? 'up' : 'down'}`}>
            {props.trend > 0 ? '↑' : '↓'} {Math.abs(props.trend)}%
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        expandedMenus={expandedMenus}
        setExpandedMenus={setExpandedMenus}
      />
      
      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <button 
              className="menu-toggle" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1>Dashboard Overview</h1>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            <div className="user-profile">
              <span>{user?.name || 'Admin'}</span>
              <div className="avatar">
                {user?.name?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </header>

        <div className="stats-grid">
          <StatCard 
            icon={Users} 
            title="Total Patients" 
            value={stats.totalPatients} 
            trend={12.5} 
          />
          <StatCard 
            icon={Activity} 
            title="Active Doctors" 
            value={stats.totalDoctors} 
            trend={5.2} 
          />
          <StatCard 
            icon={Hospital} 
            title="Hospitals" 
            value={stats.totalHospitals} 
            trend={8.7} 
          />
          <StatCard 
            icon={ClipboardList} 
            title="Active Consultations" 
            value={stats.activeConsultations} 
            trend={-2.3} 
          />
        </div>

        <div className="charts-container">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Monthly Registrations</h3>
              <select className="time-filter">
                <option>Last 6 Months</option>
                <option>This Year</option>
                <option>All Time</option>
              </select>
            </div>
            <div className="chart-content">
              <div className="chart-placeholder">
                <BarChart2 size={48} />
                <p>Monthly registration chart will be displayed here</p>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Hospital Distribution</h3>
            </div>
            <div className="chart-content">
              <div className="chart-placeholder">
                <PieChart size={48} />
                <p>Hospital distribution chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="alerts-section">
          <div className="section-header">
            <h3>Recent Alerts</h3>
            <button className="view-all">View All</button>
          </div>
          <div className="alerts-grid">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.severity}`}>
                <div className="alert-icon">
                  <AlertCircle size={20} />
                </div>
                <div className="alert-content">
                  <div className="alert-header">
                    <span className="alert-type">{alert.type}</span>
                    <span className="alert-date">{alert.date}</span>
                  </div>
                  <p className="alert-message">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HospitalDashboard;
