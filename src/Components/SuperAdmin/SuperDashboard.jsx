import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Users, Building2, Pill, Calendar, TrendingUp, Activity, UserCheck, MapPin, ChefHat, Leaf, X, Phone, Mail, Bed, Calendar as CalendarIcon } from 'lucide-react';
import Navbar from './superNavbar';
import '../../assets/css/SuperDashboard.css';

function SuperDashboard({ user }) {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState({});
    const [showHospitalModal, setShowHospitalModal] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState(null);

    // Mock data for statistics
    const stats = {
        totalPatients: 15847,
        totalHospitals: 142,
        totalDoctors: 892,
        totalPrescriptions: 34521,
        activeUsers: 2847,
        monthlyRevenue: 2458900,
        patientGrowth: 12.5,
        systemUptime: 99.8
    };

    const hospitalData = [
        { 
            name: 'Apollo Ayurveda', 
            patients: 2840, 
            doctors: 45, 
            status: 'Active',
            location: 'Chennai, Tamil Nadu',
            established: '1995',
            specialties: ['Panchakarma', 'Ayurvedic Medicine', 'Yoga Therapy'],
            contact: '+91-44-2829-0200',
            email: 'info@apolloayurveda.com',
            bedCapacity: 150,
            departments: 8
        },
        { 
            name: 'AIIMS Ayush Wing', 
            patients: 1920, 
            doctors: 38, 
            status: 'Active',
            location: 'New Delhi',
            established: '2003',
            specialties: ['Research', 'Traditional Medicine', 'Clinical Trials'],
            contact: '+91-11-2659-3333',
            email: 'ayush@aiims.edu',
            bedCapacity: 120,
            departments: 6
        },
        { 
            name: 'Patanjali Hospital', 
            patients: 1650, 
            doctors: 32, 
            status: 'Active',
            location: 'Haridwar, Uttarakhand',
            established: '2006',
            specialties: ['Naturopathy', 'Ayurveda', 'Yoga'],
            contact: '+91-1334-244-000',
            email: 'contact@patanjalihospital.com',
            bedCapacity: 100,
            departments: 5
        },
        { 
            name: 'Arya Vaidya Sala', 
            patients: 1280, 
            doctors: 28, 
            status: 'Active',
            location: 'Kottakkal, Kerala',
            established: '1902',
            specialties: ['Classical Ayurveda', 'Herbal Medicine', 'Panchakarma'],
            contact: '+91-483-274-2216',
            email: 'info@aryavaidyasala.com',
            bedCapacity: 80,
            departments: 4
        },
        { 
            name: 'Kottakkal Hospital', 
            patients: 980, 
            doctors: 24, 
            status: 'Pending',
            location: 'Malappuram, Kerala',
            established: '1985',
            specialties: ['Ayurvedic Treatment', 'Rehabilitation', 'Wellness'],
            contact: '+91-483-274-5555',
            email: 'admin@kottakkalhospital.com',
            bedCapacity: 60,
            departments: 3
        }
    ];

    const doshaDistribution = [
        { name: 'Vata', value: 35, color: '#3B82F6' },
        { name: 'Pitta', value: 40, color: '#10B981' },
        { name: 'Kapha', value: 25, color: '#F59E0B' }
    ];

    const monthlyPatients = [
        { month: 'Jan', patients: 1200 },
        { month: 'Feb', patients: 1350 },
        { month: 'Mar', patients: 1280 },
        { month: 'Apr', patients: 1450 },
        { month: 'May', users: 1580 },
        { month: 'Jun', patients: 1620 }
    ];

    const foodCategories = [
        { category: 'Grains', items: 245, recipes: 892 },
        { category: 'Vegetables', items: 186, recipes: 1240 },
        { category: 'Fruits', items: 124, recipes: 456 },
        { category: 'Spices', items: 89, recipes: 2100 },
        { category: 'Dairy', items: 45, recipes: 324 },
        { category: 'Legumes', items: 78, recipes: 567 }
    ];

    const handleViewDetails = (hospital) => {
        setSelectedHospital(hospital);
        setShowHospitalModal(true);
    };

    const closeModal = () => {
        setShowHospitalModal(false);
        setSelectedHospital(null);
    };

    const HospitalModal = () => {
        if (!showHospitalModal || !selectedHospital) return null;

        return (
            <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content-horizontal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>{selectedHospital.name}</h2>
                        <button className="modal-close" onClick={closeModal}>
                            <X size={24} />
                        </button>
                    </div>
                    
                    <div className="modal-body-horizontal">
                        {/* Left Column - Basic Info */}
                        <div className="modal-column">
                            <div className="column-header">
                                <h3>Basic Information</h3>
                            </div>
                            <div className="detail-card">
                                <div className="detail-icon">
                                    <MapPin size={20} />
                                </div>
                                <div className="detail-info">
                                    <h4>Location</h4>
                                    <p>{selectedHospital.location}</p>
                                </div>
                            </div>
                            <div className="detail-card">
                                <div className="detail-icon">
                                    <Calendar size={20} />
                                </div>
                                <div className="detail-info">
                                    <h4>Established</h4>
                                    <p>{selectedHospital.established}</p>
                                </div>
                            </div>
                            <div className="detail-card">
                                <div className="detail-icon">
                                    <Building2 size={20} />
                                </div>
                                <div className="detail-info">
                                    <h4>Departments</h4>
                                    <p>{selectedHospital.departments}</p>
                                </div>
                            </div>
                        </div>

                        {/* Middle Column - Statistics */}
                        <div className="modal-column">
                            <div className="column-header">
                                <h3>Statistics</h3>
                            </div>
                            <div className="detail-card">
                                <div className="detail-icon">
                                    <Users size={20} />
                                </div>
                                <div className="detail-info">
                                    <h4>Total Patients</h4>
                                    <p>{selectedHospital.patients.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="detail-card">
                                <div className="detail-icon">
                                    <UserCheck size={20} />
                                </div>
                                <div className="detail-info">
                                    <h4>Doctors</h4>
                                    <p>{selectedHospital.doctors}</p>
                                </div>
                            </div>
                            <div className="detail-card">
                                <div className="detail-icon">
                                    <Bed size={20} />
                                </div>
                                <div className="detail-info">
                                    <h4>Bed Capacity</h4>
                                    <p>{selectedHospital.bedCapacity}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Contact & Status */}
                        <div className="modal-column">
                            <div className="column-header">
                                <h3>Contact & Status</h3>
                            </div>
                            <div className="contact-section">
                                <div className="contact-details">
                                    <div className="contact-item">
                                        <Phone size={16} />
                                        <span>{selectedHospital.contact}</span>
                                    </div>
                                    <div className="contact-item">
                                        <Mail size={16} />
                                        <span>{selectedHospital.email}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="status-section">
                                <h4>Current Status</h4>
                                <span className={`status-badge ${selectedHospital.status === 'Active' ? 'status-active' : 'status-pending'}`}>
                                    {selectedHospital.status}
                                </span>
                            </div>
                            <div className="specialties-section">
                                <h4>Specialties</h4>
                                <div className="specialties-list">
                                    {selectedHospital.specialties.map((specialty, index) => (
                                        <span key={index} className="specialty-tag">
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const StatCard = ({ title, value, icon: Icon, trend, color = "blue" }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
                    {trend && (
                        <div className="flex items-center mt-2">
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-600">+{trend}% from last month</span>
                        </div>
                    )}

                    
                </div>
                <div className={`p-3 rounded-full bg-${color}-50`}>
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                </div>
            </div>
        </div>
    );

    const renderDashboard = () => (
        <div className="dashboard-content">
            {/* Header Section */}
            <div className="dashboard-header">
                <h1>Super Admin Dashboard</h1>
                <p>Welcome back, {user?.name || 'Super Admin'}! Here's your system overview.</p>
                <div className="header-status">
                    <div className="status-item">
                        <Activity className="w-5 h-5 mr-2" />
                        <span>System Status: Operational</span>
                    </div>
                    <div className="status-item">
                        <div className="status-dot"></div>
                        <span>Uptime: {stats.systemUptime}%</span>
                    </div>
                </div>
            </div>

            {/* Key Statistics */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-card-content">
                        <div className="stat-info">
                            <h3>Total Patients</h3>
                            <div className="stat-value">{stats.totalPatients.toLocaleString()}</div>
                            <div className="stat-trend">↗ +{stats.patientGrowth}% from last month</div>
                        </div>
                        <div className="stat-icon">
                            <Users />
                        </div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-content">
                        <div className="stat-info">
                            <h3>Registered Hospitals</h3>
                            <div className="stat-value">{stats.totalHospitals}</div>
                            <div className="stat-trend">↗ +8% from last month</div>
                        </div>
                        <div className="stat-icon">
                            <Building2 />
                        </div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-content">
                        <div className="stat-info">
                            <h3>Active Doctors</h3>
                            <div className="stat-value">{stats.totalDoctors}</div>
                            <div className="stat-trend">↗ +5% from last month</div>
                        </div>
                        <div className="stat-icon">
                            <UserCheck />
                        </div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-content">
                        <div className="stat-info">
                            <h3>Total Prescriptions</h3>
                            <div className="stat-value">{stats.totalPrescriptions.toLocaleString()}</div>
                            <div className="stat-trend">↗ +15% from last month</div>
                        </div>
                        <div className="stat-icon">
                            <Pill />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="charts-grid">
                {/* Dosha Distribution */}
                <div className="chart-container">
                    <div className="chart-header">
                        <Leaf />
                        <h3>Patient Dosha Distribution</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={doshaDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {doshaDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="dosha-legend">
                        {doshaDistribution.map((item, index) => (
                            <div key={index} className="legend-item">
                                <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                                <span className="legend-text">{item.name} ({item.value}%)</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Monthly Patient Growth */}
                <div className="chart-container">
                    <div className="chart-header">
                        <TrendingUp />
                        <h3>Monthly Patient Registration</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={monthlyPatients}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
                                formatter={(value) => [value, 'Patients']}
                            />
                            <Line type="monotone" dataKey="patients" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Hospital Management Overview */}
            <div className="hospital-overview">
                <div className="chart-header">
                    <Building2 />
                    <h3>Top Hospitals Overview</h3>
                </div>
                <div className="table-container">
                    <table className="hospital-table">
                        <thead>
                            <tr>
                                <th>Hospital Name</th>
                                <th>Total Patients</th>
                                <th>Doctors</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hospitalData.map((hospital, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="hospital-name">
                                            <MapPin />
                                            <span>{hospital.name}</span>
                                        </div>
                                    </td>
                                    <td>{hospital.patients.toLocaleString()}</td>
                                    <td>{hospital.doctors}</td>
                                    <td>
                                        <span className={`status-badge ${hospital.status === 'Active' ? 'status-active' : 'status-pending'}`}>
                                            {hospital.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            className="view-details-btn"
                                            onClick={() => handleViewDetails(hospital)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Food Database Statistics */}
            <div className="food-database">
                <div className="chart-header">
                    <ChefHat />
                    <h3>Food Database Overview</h3>
                </div>
                <div className="food-grid">
                    {foodCategories.map((category, index) => (
                        <div key={index} className="food-category-card">
                            <h4>{category.category}</h4>
                            <div className="food-stats">
                                <div className="food-stat-item">
                                    <span className="food-stat-label">Food Items:</span>
                                    <span className="food-stat-value items">{category.items}</span>
                                </div>
                                <div className="food-stat-item">
                                    <span className="food-stat-label">Recipes:</span>
                                    <span className="food-stat-value recipes">{category.recipes}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="bottom-grid">
                <div className="activity-panel">
                    <div className="chart-header">
                        <Activity />
                        <h3>Recent System Activities</h3>
                    </div>
                    <div className="activity-list">
                        <div className="activity-item info">
                            <div className="activity-dot info"></div>
                            <div className="activity-content">
                                <h4>New hospital registration</h4>
                                <p>Ayush Medical Center registered - 2 hours ago</p>
                            </div>
                        </div>
                        <div className="activity-item success">
                            <div className="activity-dot success"></div>
                            <div className="activity-content">
                                <h4>System update completed</h4>
                                <p>Version 2.1.4 deployed successfully - 6 hours ago</p>
                            </div>
                        </div>
                        <div className="activity-item warning">
                            <div className="activity-dot warning"></div>
                            <div className="activity-content">
                                <h4>High traffic alert</h4>
                                <p>Peak usage detected at 14:30 - 1 day ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="quick-actions-panel">
                    <div className="chart-header">
                        <Activity />
                        <h3>Quick Actions</h3>
                    </div>
                    <div className="actions-grid">
                        <button className="quick-action-btn users">
                            <Users />
                            <span>Manage Users</span>
                        </button>
                        <button className="quick-action-btn hospitals">
                            <Building2 />
                            <span>Add Hospital</span>
                        </button>
                        <button className="quick-action-btn reports">
                            <Activity />
                            <span>View Reports</span>
                        </button>
                        <button className="quick-action-btn food">
                            <ChefHat />
                            <span>Food Database</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return renderDashboard();
            case 'patient-management':
            case 'register-patient':
            case 'view-patients':
            case 'search-patients':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Management</h2>
                        <p className="text-gray-600">Patient management features will be implemented here.</p>
                    </div>
                );
            case 'appointments':
            case 'book-appointment':
            case 'todays-appointments':
            case 'reschedule':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Appointments</h2>
                        <p className="text-gray-600">Appointment management features will be implemented here.</p>
                    </div>
                );
            case 'billing':
            case 'generate-bills':
            case 'transaction-history':
            case 'pending-payments':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Billing & Payments</h2>
                        <p className="text-gray-600">Billing and payment features will be implemented here.</p>
                    </div>
                );
            case 'profile':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile & Settings</h2>
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 mb-6">
                            <h3 className="text-xl font-semibold text-blue-800 mb-4">User Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <span className="text-blue-600 font-medium w-20">Name:</span>
                                    <span className="text-gray-800">{user?.name || 'Super Admin'}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-blue-600 font-medium w-20">Email:</span>
                                    <span className="text-gray-800">{user?.email || 'admin@ayurveda.gov.in'}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-blue-600 font-medium w-20">Role:</span>
                                    <span className="text-gray-800">Super Administrator</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return renderDashboard();
        }
    };

    return (
        <div className="super-dashboard">
            <Navbar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                expandedMenus={expandedMenus}
                setExpandedMenus={setExpandedMenus}
            />
            
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div 
                    style={{ 
                        position: 'fixed', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                        zIndex: 999,
                        display: window.innerWidth <= 768 ? 'block' : 'none'
                    }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content area - scrollable */}
            <main className="main-content">
                {/* Mobile menu button */}
                <div style={{ 
                    display: window.innerWidth <= 768 ? 'block' : 'none',
                    padding: '1rem',
                    backgroundColor: 'white',
                    borderBottom: '1px solid #e2e8f0'
                }}>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '500'
                        }}
                    >
                        ☰ Menu
                    </button>
                </div>

                {renderContent()}
            </main>
            
            <HospitalModal />
        </div>
    );
}

export default SuperDashboard;