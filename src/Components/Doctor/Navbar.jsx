import React from 'react';
import { 
  X,
  LogOut,
  Stethoscope,
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
      id: 'consultations',
      label: 'Consultations',
      section: 'main',
      submenu: [
        { id: 'todays-consultations', label: 'Today\'s Consultations' },
        { id: 'consultation-history', label: 'Consultation History' },
        { id: 'follow-ups', label: 'Follow-up Appointments' }
      ]
    },
    {
      id: 'patients',
      label: 'My Patients',
      section: 'main',
      submenu: [
        { id: 'patient-list', label: 'Patient List' },
        { id: 'patient-search', label: 'Search Patients' },
        { id: 'patient-records', label: 'Medical Records' }
      ]
    },
    {
      id: 'prescriptions',
      label: 'Prescriptions',
      section: 'main',
      submenu: [
        { id: 'create-prescription', label: 'Create Prescription' },
        { id: 'prescription-history', label: 'Prescription History' },
        { id: 'drug-interactions', label: 'Drug Interaction Check' }
      ]
    },
    {
      id: 'ayurveda',
      label: 'Ayurveda Tools',
      section: 'main',
      submenu: [
        { id: 'dosha-analysis', label: 'Dosha Analysis' },
        { id: 'herbal-remedies', label: 'Herbal Remedies' },
        { id: 'treatment-plans', label: 'Treatment Plans' },
        { id: 'ayurvedic-diet', label: 'Dietary Recommendations' }
      ]
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      section: 'main',
      submenu: [
        { id: 'patient-reports', label: 'Patient Reports' },
        { id: 'treatment-outcomes', label: 'Treatment Outcomes' },
        { id: 'monthly-summary', label: 'Monthly Summary' }
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
            <Stethoscope size={32} className="text-white" />
          </div>
          <div className="logo-text">
            <h2>AyushCloud</h2>
            <span>Doctor Portal</span>
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
