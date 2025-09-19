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
  User,
  Apple,
  Soup,
  ListRestart,
  FileSearch,
  UserCheck,
  Download,
  Globe,
  HelpCircle,
  Phone,
  MessageCircle,
  LineChart,
  HeartPulse,
  FileSpreadsheet,
  FilePieChart
} from 'lucide-react';


// Import hospital management components
import RegisteredHospitals from './registered-hospitals';
import RegistrationApprovals from './registration-approvals';
import PerformanceMonitoring from './performance-monitoring';
import RegisteredPractitioners from './RegisteredPractitioners';
import Licensing from './Licensing';
import DoctorAnalytics from './DoctorAnalytics';
import PatientRegistry from './patient-registry';
import UsageStatistics from './usage-statistics';

// Import report components
import UsageReports from './Reports/usage-reports';
import HealthTrends from './Reports/health-trends';
import ExportReports from './Reports/export-reports';
import SecurityLogs from './security-logs';

// Import diet and nutrition components
import FoodDatabase from './food-database';
import DietTemplates from './diet-templates';
import TermMapper from './term-mapper';

// Import compliance & security components
import DataPrivacy from './ComplianceSecurity/DataPrivacy';
import AuditLogs from './ComplianceSecurity/AuditLogs';
import AccessControls from './ComplianceSecurity/AccessControls';

const Navbar = ({ 
  activeSection, 
  setActiveSection, 
  sidebarOpen, 
  setSidebarOpen, 
  expandedMenus, 
  setExpandedMenus
}) => {
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('currentUser');
    // Redirect to login page
    window.location.href = '/login';
  };

  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      section: 'main',
      
    },
    {
      id: 'hospital-management',
      label: 'Hospital Management',
      icon: Building2,
      section: 'main',
      component: RegisteredHospitals, // Default component
      submenu: [
        { 
          id: 'registered-hospitals', 
          label: 'List of Registered Hospitals/Clinics', 
          icon: Building2,
          component: RegisteredHospitals
        },
        { 
          id: 'registration-approvals', 
          label: 'Approve / Reject Registrations', 
          icon: UserCheck,
          component: RegistrationApprovals
        },
        { 
          id: 'performance-monitoring', 
          label: 'Monitor Hospital Performance', 
          icon: Activity,
          component: PerformanceMonitoring
        }
      ]
    },
    {
      id: 'doctor-management',
      label: 'Doctor Management',
      icon: UserCheck,
      section: 'main',
      component: RegisteredPractitioners, // Default component
      submenu: [
        { 
          id: 'registered-practitioners', 
          label: 'Registered Practitioners', 
          icon: Users,
          component: RegisteredPractitioners
        },
        { 
          id: 'licensing', 
          label: 'Approvals & Licensing', 
          icon: Shield,
          component: Licensing
        },
        { 
          id: 'doctor-analytics', 
          label: 'Performance Analytics', 
          icon: Activity,
          component: DoctorAnalytics
        }
      ]
    },
    {
      id: 'patient-management',
      label: 'Patient Management',
      icon: Users,
      section: 'main',
      component: PatientRegistry,
      submenu: [
        { 
          id: 'patient-registry', 
          label: 'Patient Registry (ABHA)', 
          icon: Database,
          component: PatientRegistry
        },
        { 
          id: 'usage-statistics', 
          label: 'Usage Statistics', 
          icon: BarChart3,
          component: UsageStatistics
        },
        { 
          id: 'security-logs', 
          label: 'Data Privacy & Security Logs', 
          icon: Shield,
          component: SecurityLogs
        }
      ]
    },
    {
      id: 'reports-analytics',
      label: 'Reports & Analytics',
      icon: FileBarChart,
      section: 'main',
      component: UsageReports,
      submenu: [
        { 
          id: 'usage-reports', 
          label: 'Usage Reports', 
          icon: Activity, 
          component: UsageReports
        },
        { 
          id: 'health-trends', 
          label: 'Health Trends', 
          icon: LineChart, 
          component: HealthTrends
        },
        { 
          id: 'export-reports', 
          label: 'Export Reports', 
          icon: FileSpreadsheet, 
          component: ExportReports
        }
      ]
    },
    {
      id: 'diet-nutrition',
      label: 'Diet & Nutrition Data',
      icon: Utensils,
      section: 'main',
      component: null,
      submenu: [
        { 
          id: 'food-database', 
          label: 'National Food Database', 
          icon: Database, 
          component: FoodDatabase 
        },
        { 
          id: 'diet-templates', 
          label: 'Standardized Diet Templates', 
          icon: FileText, 
          component: DietTemplates 
        },
        { 
          id: 'term-mapper', 
          label: 'ICD ↔ AYUSH Term Mapper', 
          icon: Code, 
          component: TermMapper 
        }
      ]
    },
    
    {
      id: 'compliance-security',
      label: 'Compliance & Security',
      icon: Shield,
      section: 'main',
      component: DataPrivacy,
      submenu: [
        { 
          id: 'data-privacy', 
          label: 'Data Privacy', 
          icon: Shield,
          component: DataPrivacy
        },
        { 
          id: 'audit-logs', 
          label: 'Access Logs & Audit Trails', 
          icon: FileText,
          component: AuditLogs
        },
        { 
          id: 'access-controls', 
          label: 'Role-Based Access Controls', 
          icon: UserCog,
          component: AccessControls
        }
      ]
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: Code,
      section: 'main',
      submenu: [
        { id: 'abha-integration', label: 'ABHA / Ayushman Bharat APIs', icon: Code },
        { id: 'ehr-integration', label: 'HIS / EHR Integrations', icon: Database },
        { id: 'api-monitoring', label: 'Third-party API Monitoring', icon: Activity }
      ]
    },
    {
      id: 'billing-finance',
      label: 'Billing & Finance',
      icon: CreditCard,
      section: 'main',
      submenu: [
        { id: 'subscription-plans', label: 'Subscription Plans', icon: CreditCard },
        { id: 'payment-records', label: 'Payment Records', icon: FileText },
        { id: 'financial-reports', label: 'Financial Reports', icon: FileBarChart }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      section: 'bottom',
      submenu: [
        { id: 'admin-profile', label: 'Govt. Admin Profile', icon: User },
        { id: 'role-management', label: 'Role Management', icon: UserCog },
        { id: 'language-settings', label: 'Language & Regional Settings', icon: Globe }
      ]
    },
    {
      id: 'help-support',
      label: 'Help / Support',
      icon: HelpCircle,
      section: 'bottom',
      submenu: [
        { id: 'documentation', label: 'Documentation & Policies', icon: FileText },
        { id: 'contact-support', label: 'Contact Support', icon: Phone },
        { id: 'feedback', label: 'Feedback System', icon: MessageCircle }
      ]
    }
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <Activity size={32} className="text-white" />
          </div>
          <div className="logo-text">
            <h2>HospitalCare</h2>
            <span>Government Portal</span>
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
          
          <button 
            className="nav-item logout"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
