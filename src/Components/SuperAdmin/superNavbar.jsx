import React from 'react';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  Settings, 
  Plus,
  Search,
  Clock,
  AlertCircle,
  X,
  LogOut,
  BarChart3,
  Activity,
  Eye,
  ChevronDown,
  ChevronRight,
  Shield,
  Building2,
  Utensils,
  FileText,
  TrendingUp,
  UserCog,
  Database,
  MapPin,
  Leaf,
  Code,
  FileBarChart,
  PieChart,
  User
} from 'lucide-react';

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
      icon: BarChart3,
      section: 'main'
    },
    {
      id: 'user-role-management',
      label: 'User Management',
      icon: UserCog,
      section: 'main',
      submenu: [
        { id: 'manage-users', label: 'Manage Users', icon: Users },
        { id: 'role-permissions', label: 'Role Permissions', icon: Shield }
      ]
    },
    {
      id: 'hospital-department-management',
      label: 'Hospital Management',
      icon: Building2,
      section: 'main',
      submenu: [
        { id: 'hospitals', label: 'Hospitals', icon: Building2 },
        { id: 'departments', label: 'Departments', icon: MapPin },
        { id: 'assign-admins', label: 'Assign Admins', icon: UserCog }
      ]
    },
    {
      id: 'food-diet-database',
      label: 'Food & Diet Database',
      icon: Utensils,
      section: 'main',
      submenu: [
        { id: 'food-items', label: 'Food Items', icon: Utensils },
        { id: 'diet-templates', label: 'Diet Templates', icon: FileText },
        { id: 'ayurvedic-properties', label: 'Ayurvedic Properties', icon: Leaf }
      ]
    },
    {
      id: 'disease-coding-management',
      label: 'Disease Coding Management',
      icon: Code,
      section: 'main',
      submenu: [
        { id: 'namaste-codes', label: 'NAMASTE Codes', icon: Database },
        { id: 'icd11-codes', label: 'ICD-11 Codes', icon: FileText },
        { id: 'code-mapping', label: 'Code Mapping', icon: MapPin }
      ]
    },
    {
      id: 'reports-analytics',
      label: 'Reports & Analytics',
      icon: TrendingUp,
      section: 'main',
      submenu: [
        { id: 'diet-reports', label: 'Diet Reports', icon: FileBarChart },
        { id: 'coding-reports', label: 'Coding Reports', icon: PieChart },
        { id: 'usage-statistics', label: 'Usage Statistics', icon: BarChart3 }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      section: 'bottom',
      submenu: [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'system-config', label: 'System Config', icon: Settings }
      ]
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
            <span>Super Admin Portal</span>
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
            const IconComponent = item.icon;
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
                  <IconComponent size={20} />
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
            const IconComponent = item.icon;
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
                <IconComponent size={20} />
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
