import React from 'react';
import { 
  X,
  LogOut,
  Activity,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import '../../assets/css/navbar.css';

const Navbar = ({ 
  activeSection, 
  setActiveSection, 
  sidebarOpen, 
  setSidebarOpen, 
  expandedMenus, 
  setExpandedMenus 
}) => {
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      section: 'main'
    },
    {
      id: 'patient-management',
      label: 'Patient Management',
      section: 'main',
      submenu: [
        { id: 'register-patient', label: 'Register New Patient' },
        { id: 'view-patients', label: 'View/Edit Patient Details' },
        { id: 'search-patients', label: 'Search Patients' }
      ]
    },
    {
      id: 'appointments',
      label: 'Appointments',
      section: 'main',
      submenu: [
        { id: 'book-appointment', label: 'Book Appointment' },
        { id: 'todays-appointments', label: 'View Today\'s Appointments' },
        { id: 'reschedule', label: 'Reschedule/Cancel' }
      ]
    },
    {
      id: 'billing',
      label: 'Billing & Payments',
      section: 'main',
      submenu: [
        { id: 'generate-bills', label: 'Generate Bills' },
        { id: 'transaction-history', label: 'View Transaction History' },
        { id: 'pending-payments', label: 'Pending Payments' }
      ]
    },
    {
      id: 'profile',
      label: 'Profile & Settings',
      section: 'bottom'
    }
  ];

  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <Activity size={32} className="text-white" />
          </div>
          <div className="logo-text">
            <h2>HospitalCare</h2>
            <span>Receptionist Portal</span>
          </div>
        </div>
        <button 
          className="sidebar-close"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          {navigationItems.filter(item => item.section === 'main').map((item) => {
            const isActive = activeSection === item.id;
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isExpanded = expandedMenus[item.id];

            return (
              <div key={item.id} className="nav-item-container">
                <button
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    if (hasSubmenu) {
                      toggleSubmenu(item.id);
                    } else {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <span>{item.label}</span>
                  {hasSubmenu && (
                    <div className="submenu-arrow">
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>
                  )}
                </button>
                
                {hasSubmenu && isExpanded && (
                  <div className="submenu">
                    {item.submenu.map((subItem) => (
                      <button
                        key={subItem.id}
                        className={`submenu-item ${activeSection === subItem.id ? 'active' : ''}`}
                        onClick={() => {
                          setActiveSection(subItem.id);
                          setSidebarOpen(false);
                        }}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="nav-section bottom">
          {navigationItems.filter(item => item.section === 'bottom').map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <button className="nav-item logout">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
