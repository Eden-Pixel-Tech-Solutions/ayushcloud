import React, { useState } from 'react';
import { Search, Filter, UserPlus, Eye, Edit, Phone, Mail, Calendar, MapPin, User, Heart, Clock, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';

function PatientList({ 
    activeSection = 'patient-list',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [ageFilter, setAgeFilter] = useState('all');
    const [genderFilter, setGenderFilter] = useState('all');

    // Sample patient data
    const [patients] = useState([
        {
            id: 1,
            name: 'Rajesh Kumar',
            age: 45,
            gender: 'Male',
            phone: '+91 98765 43210',
            email: 'rajesh.kumar@email.com',
            address: 'Mumbai, Maharashtra',
            lastVisit: '2024-01-10',
            nextAppointment: '2024-01-20',
            status: 'Active',
            primaryCondition: 'Hypertension',
            dosha: 'Vata-Pitta',
            registrationDate: '2023-06-15',
            totalVisits: 12,
            emergencyContact: '+91 98765 43211'
        },
        {
            id: 2,
            name: 'Priya Sharma',
            age: 32,
            gender: 'Female',
            phone: '+91 87654 32109',
            email: 'priya.sharma@email.com',
            address: 'Delhi, Delhi',
            lastVisit: '2024-01-08',
            nextAppointment: '2024-01-18',
            status: 'Active',
            primaryCondition: 'Digestive Issues',
            dosha: 'Pitta-Kapha',
            registrationDate: '2023-08-20',
            totalVisits: 8,
            emergencyContact: '+91 87654 32110'
        },
        {
            id: 3,
            name: 'Amit Patel',
            age: 58,
            gender: 'Male',
            phone: '+91 76543 21098',
            email: 'amit.patel@email.com',
            address: 'Ahmedabad, Gujarat',
            lastVisit: '2024-01-05',
            nextAppointment: null,
            status: 'Inactive',
            primaryCondition: 'Arthritis',
            dosha: 'Vata-Kapha',
            registrationDate: '2023-03-10',
            totalVisits: 15,
            emergencyContact: '+91 76543 21099'
        },
        {
            id: 4,
            name: 'Sunita Reddy',
            age: 28,
            gender: 'Female',
            phone: '+91 65432 10987',
            email: 'sunita.reddy@email.com',
            address: 'Hyderabad, Telangana',
            lastVisit: '2024-01-12',
            nextAppointment: '2024-01-22',
            status: 'Active',
            primaryCondition: 'Skin Allergies',
            dosha: 'Pitta',
            registrationDate: '2023-11-05',
            totalVisits: 4,
            emergencyContact: '+91 65432 10988'
        },
        {
            id: 5,
            name: 'Vikram Singh',
            age: 41,
            gender: 'Male',
            phone: '+91 54321 09876',
            email: 'vikram.singh@email.com',
            address: 'Jaipur, Rajasthan',
            lastVisit: '2023-12-28',
            nextAppointment: '2024-01-25',
            status: 'Active',
            primaryCondition: 'Diabetes',
            dosha: 'Kapha-Pitta',
            registrationDate: '2023-01-15',
            totalVisits: 18,
            emergencyContact: '+91 54321 09877'
        },
        {
            id: 6,
            name: 'Meera Joshi',
            age: 35,
            gender: 'Female',
            phone: '+91 43210 98765',
            email: 'meera.joshi@email.com',
            address: 'Pune, Maharashtra',
            lastVisit: '2024-01-11',
            nextAppointment: '2024-01-19',
            status: 'Active',
            primaryCondition: 'Anxiety & Stress',
            dosha: 'Vata',
            registrationDate: '2023-09-12',
            totalVisits: 6,
            emergencyContact: '+91 43210 98766'
        }
    ]);

    // Filter patients based on search and filters
    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            patient.phone.includes(searchTerm) ||
                            patient.primaryCondition.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || patient.status.toLowerCase() === statusFilter;
        const matchesAge = ageFilter === 'all' || 
                          (ageFilter === 'young' && patient.age < 30) ||
                          (ageFilter === 'middle' && patient.age >= 30 && patient.age < 50) ||
                          (ageFilter === 'senior' && patient.age >= 50);
        const matchesGender = genderFilter === 'all' || patient.gender.toLowerCase() === genderFilter;

        return matchesSearch && matchesStatus && matchesAge && matchesGender;
    });

    // Statistics
    const stats = {
        total: patients.length,
        active: patients.filter(p => p.status === 'Active').length,
        inactive: patients.filter(p => p.status === 'Inactive').length,
        newThisMonth: patients.filter(p => {
            const regDate = new Date(p.registrationDate);
            const now = new Date();
            return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear();
        }).length
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'text-green-600 bg-green-100';
            case 'Inactive': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getDoshaColor = (dosha) => {
        if (dosha.includes('Vata')) return 'text-blue-600 bg-blue-100';
        if (dosha.includes('Pitta')) return 'text-red-600 bg-red-100';
        if (dosha.includes('Kapha')) return 'text-green-600 bg-green-100';
        return 'text-gray-600 bg-gray-100';
    };

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
            
            <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="content-header">
                    <div className="header-top">
                        <h1 className="page-title">
                            <User className="title-icon" />
                            Patient List
                        </h1>
                        <button className="btn btn-primary">
                            <UserPlus size={20} />
                            Add New Patient
                        </button>
                    </div>
                    
                    {/* Statistics Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon total">
                                <User size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.total}</div>
                                <div className="stat-label">Total Patients</div>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon active">
                                <Heart size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.active}</div>
                                <div className="stat-label">Active Patients</div>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon inactive">
                                <AlertCircle size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.inactive}</div>
                                <div className="stat-label">Inactive Patients</div>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon new">
                                <UserPlus size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.newThisMonth}</div>
                                <div className="stat-label">New This Month</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-body">
                    {/* Search and Filters */}
                    <div className="search-filter-section">
                        <div className="search-box">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, phone, or condition..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        
                        <div className="filter-group">
                            <div className="filter-item">
                                <Filter size={16} />
                                <select 
                                    value={statusFilter} 
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            
                            <div className="filter-item">
                                <select 
                                    value={ageFilter} 
                                    onChange={(e) => setAgeFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Ages</option>
                                    <option value="young">Under 30</option>
                                    <option value="middle">30-50</option>
                                    <option value="senior">50+</option>
                                </select>
                            </div>
                            
                            <div className="filter-item">
                                <select 
                                    value={genderFilter} 
                                    onChange={(e) => setGenderFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Genders</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Patient List */}
                    <div className="patient-list">
                        {filteredPatients.map(patient => (
                            <div key={patient.id} className="patient-card">
                                <div className="patient-header">
                                    <div className="patient-basic-info">
                                        <div className="patient-avatar">
                                            {patient.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="patient-details">
                                            <h3 className="patient-name">{patient.name}</h3>
                                            <div className="patient-meta">
                                                <span className="patient-age">{patient.age} years</span>
                                                <span className="patient-gender">{patient.gender}</span>
                                                <span className={`status-badge ${getStatusColor(patient.status)}`}>
                                                    {patient.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="patient-actions">
                                        <button className="action-btn view" title="View Details">
                                            <Eye size={16} />
                                        </button>
                                        <button className="action-btn edit" title="Edit Patient">
                                            <Edit size={16} />
                                        </button>
                                        <button className="action-btn contact" title="Call Patient">
                                            <Phone size={16} />
                                        </button>
                                        <button className="action-btn email" title="Send Email">
                                            <Mail size={16} />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="patient-info-grid">
                                    <div className="info-item">
                                        <Phone size={16} className="info-icon" />
                                        <span>{patient.phone}</span>
                                    </div>
                                    <div className="info-item">
                                        <Mail size={16} className="info-icon" />
                                        <span>{patient.email}</span>
                                    </div>
                                    <div className="info-item">
                                        <MapPin size={16} className="info-icon" />
                                        <span>{patient.address}</span>
                                    </div>
                                    <div className="info-item">
                                        <Heart size={16} className="info-icon" />
                                        <span>{patient.primaryCondition}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className={`dosha-badge ${getDoshaColor(patient.dosha)}`}>
                                            {patient.dosha}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <Clock size={16} className="info-icon" />
                                        <span>Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                
                                <div className="patient-footer">
                                    <div className="visit-info">
                                        <span className="visit-count">Total Visits: {patient.totalVisits}</span>
                                        {patient.nextAppointment && (
                                            <span className="next-appointment">
                                                <Calendar size={14} />
                                                Next: {new Date(patient.nextAppointment).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <button className="btn btn-outline">
                                        Schedule Appointment
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {filteredPatients.length === 0 && (
                        <div className="empty-state">
                            <User size={48} className="empty-icon" />
                            <h3>No patients found</h3>
                            <p>Try adjusting your search criteria or add a new patient.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PatientList;
