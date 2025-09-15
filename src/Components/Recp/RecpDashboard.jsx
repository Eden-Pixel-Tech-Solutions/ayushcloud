import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  User,
  Plus,
  Search,
  Edit,
  Menu,
  Bell,
  TrendingUp,
  Phone,
  FileText
} from 'lucide-react';
import Navbar from './Navbar';
import RegisterPatient from './RegisterPatient';
import SearchPatients from './SearchPatients';
import BookAppointment from './BookAppointment';
import ViewAppointments from './ViewAppointments';
import AllAppointments from './AllAppointments';
import GenerateBills from './GenerateBills';
import TransactionHistory from './TransactionHistory';
import ProfileSettings from './ProfileSettings';
import '../../assets/css/RecpDashboard.css';

const ReceptionistDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expandedMenus, setExpandedMenus] = useState({});

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'register-patient':
        return 'Register New Patient';
      case 'search-patients':
        return 'Search Patients';
      case 'book-appointment':
        return 'Book Appointment';
      case 'view-appointments':
        return 'View Appointments';
      case 'reschedule-cancel':
        return 'Reschedule/Cancel';
      case 'generate-bills':
        return 'Generate Bills';
      case 'transaction-history':
        return 'Transaction History';
      case 'profile-settings':
        return 'Profile Settings';
      default:
        return 'Dashboard';
    }
  };

  const handleMenuToggle = (menuKey) => {
    setExpandedMenus((prevExpandedMenus) => ({
      ...prevExpandedMenus,
      [menuKey]: !prevExpandedMenus[menuKey],
    }));
  };

  const quickStats = [
    {
      title: "Today's Patients",
      value: "127",
      change: "+12%",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      trend: "up"
    },
    {
      title: "Upcoming Appointments",
      value: "24",
      change: "+5%",
      icon: Calendar,
      color: "from-emerald-500 to-emerald-600",
      trend: "up"
    },
    {
      title: "Pending Bills",
      value: "₹18,450",
      change: "-8%",
      icon: CreditCard,
      color: "from-amber-500 to-amber-600",
      trend: "down"
    },
    {
      title: "Revenue Today",
      value: "₹45,280",
      change: "+15%",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      trend: "up"
    }
  ];

  const recentAppointments = [
    { id: 1, patient: "Rajesh Kumar", doctor: "Dr. Sharma", time: "10:00 AM", status: "confirmed", phone: "+91 98765 43210", abhaId: "12-3456-7890-1234" },
    { id: 2, patient: "Priya Singh", doctor: "Dr. Patel", time: "10:30 AM", status: "pending", phone: "+91 98765 43211", abhaId: "12-3456-7890-1235" },
    { id: 3, patient: "Mohammed Ali", doctor: "Dr. Kumar", time: "11:00 AM", status: "confirmed", phone: "+91 98765 43212", abhaId: "12-3456-7890-1236" },
    { id: 4, patient: "Sunita Devi", doctor: "Dr. Gupta", time: "11:30 AM", status: "rescheduled", phone: "+91 98765 43213", abhaId: "12-3456-7890-1237" }
  ];


  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rescheduled': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderDashboardContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            {/* Header */}
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">Welcome back, Reception Staff! 👋</h1>
                <p className="dashboard-subtitle">Here's the latest updates for the last 7 days, check now</p>
              </div>
              <div className="header-actions">
                <div className="time-display">
                  {currentTime.toLocaleString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <button className="export-btn">
                  <FileText size={16} />
                  Export
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="stats-grid">
              {quickStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className={`stat-card bg-gradient-to-r ${stat.color}`}>
                    <div className="stat-content">
                      <div className="stat-header">
                        <IconComponent className="stat-icon" size={24} />
                        <span className={`stat-change ${stat.trend === 'up' ? 'positive' : 'negative'}`}>
                          {stat.change}
                        </span>
                      </div>
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-title">{stat.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main Content Grid */}
            <div className="main-grid">
              {/* Today's Appointments */}
              <div className="appointments-card">
                <div className="card-header">
                  <h3 className="card-title">Today's Appointments</h3>
                  <button 
                    className="view-all-btn"
                    onClick={() => setActiveSection('view-appointments')}
                  >
                    View All
                  </button>
                </div>
                <div className="appointments-list">
                  {recentAppointments.map((appointment) => (
                    <div key={appointment.id} className="appointment-item">
                      <div className="appointment-info">
                        <div className="patient-details">
                          <h4 className="patient-name">{appointment.patient}</h4>
                          <p className="doctor-name">{appointment.doctor}</p>
                          <p className="abha-id">ABHA: {appointment.abhaId}</p>
                        </div>
                        <div className="appointment-meta">
                          <span className="appointment-time">{appointment.time}</span>
                          <span className={`appointment-status ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                      <div className="appointment-actions">
                        <button className="action-btn primary">
                          <Phone size={16} />
                        </button>
                        <button className="action-btn secondary">
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions-card">
                <h3 className="card-title">Quick Actions</h3>
                <div className="quick-actions-grid">
                  <button 
                    className="quick-action-btn register"
                    onClick={() => setActiveSection('register-patient')}
                  >
                    <Plus size={24} />
                    <span>Register New Patient</span>
                  </button>
                  <button 
                    className="quick-action-btn appointment"
                    onClick={() => setActiveSection('book-appointment')}
                  >
                    <Calendar size={24} />
                    <span>Book Appointment</span>
                  </button>
                  <button 
                    className="quick-action-btn billing"
                    onClick={() => setActiveSection('generate-bills')}
                  >
                    <CreditCard size={24} />
                    <span>Generate Bill</span>
                  </button>
                  <button 
                    className="quick-action-btn search"
                    onClick={() => setActiveSection('search-patients')}
                  >
                    <Search size={24} />
                    <span>Search Patient</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'register-patient':
        return <RegisterPatient showHeader={false} />;

      case 'search-patients':
        return <SearchPatients />;

      case 'book-appointment':
        return <BookAppointment />;

      case 'view-appointments':
        return <ViewAppointments />;

      case 'reschedule':
        return <AllAppointments />;

      case 'generate-bills':
        return <GenerateBills />;

      case 'transaction-history':
        return <TransactionHistory />;


      case 'profile-settings':
        return <ProfileSettings />;

      default:
        return (
          <div className="page-content">
            <div className="page-header">
              <h2 className="page-title">Coming Soon</h2>
              <p className="page-subtitle">This feature is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {/* Navbar/Sidebar */}
      <Navbar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        expandedMenus={expandedMenus}
        setExpandedMenus={setExpandedMenus}
      />

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="top-bar-left">
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1>{getSectionTitle()}</h1>
            <div className="search-bar">
              <Search size={20} />
              <input 
                type="text" 
                placeholder="Search patients, appointments, bills..."
              />
            </div>
          </div>
          
          <div className="top-bar-right">
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            
            <div className="user-profile">
              <div className="user-avatar">
                <User size={20} />
              </div>
              <div className="user-info">
                <span className="user-name">Dr. Priya</span>
                <span className="user-role">Receptionist</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-container">
          {renderDashboardContent()}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ReceptionistDashboard;