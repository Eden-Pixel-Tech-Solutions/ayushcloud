import React, { useState } from 'react';
import { Search, Filter, Clock, User, Phone, Calendar, MapPin, AlertCircle, CheckCircle, Play, Pause, Menu, MoreVertical, Circle } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function TodaysConsultant({ 
    activeSection = 'todays-consultations',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Sample consultation data
    const [consultations, setConsultations] = useState([
        {
            id: 1,
            patientName: 'Rajesh Kumar',
            age: 45,
            phone: '+91 9876543210',
            appointmentTime: '09:00 AM',
            duration: '30 min',
            status: 'pending',
            complaint: 'Joint pain and stiffness',
            type: 'Follow-up',
            lastVisit: '2024-01-05'
        },
        {
            id: 2,
            patientName: 'Priya Sharma',
            age: 32,
            phone: '+91 9876543211',
            appointmentTime: '09:30 AM',
            duration: '45 min',
            status: 'in-progress',
            complaint: 'Digestive issues and acidity',
            type: 'New Patient',
            lastVisit: null
        },
        {
            id: 3,
            patientName: 'Amit Patel',
            age: 28,
            phone: '+91 9876543212',
            appointmentTime: '10:15 AM',
            duration: '30 min',
            status: 'completed',
            complaint: 'Stress and anxiety management',
            type: 'Regular',
            lastVisit: '2024-01-10'
        },
        {
            id: 4,
            patientName: 'Sunita Devi',
            age: 55,
            phone: '+91 9876543213',
            appointmentTime: '11:00 AM',
            duration: '30 min',
            status: 'pending',
            complaint: 'Diabetes management consultation',
            type: 'Follow-up',
            lastVisit: '2024-01-08'
        },
        {
            id: 5,
            patientName: 'Vikram Singh',
            age: 38,
            phone: '+91 9876543214',
            appointmentTime: '11:30 AM',
            duration: '45 min',
            status: 'pending',
            complaint: 'Skin allergies and rashes',
            type: 'New Patient',
            lastVisit: null
        }
    ]);

    const updateConsultationStatus = (id, newStatus) => {
        setConsultations(prev => 
            prev.map(consultation => 
                consultation.id === id 
                    ? { ...consultation, status: newStatus }
                    : consultation
            )
        );
    };

    const filteredConsultations = consultations.filter(consultation => {
        const matchesSearch = consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            consultation.complaint.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle size={16} className="text-green-500" />;
            case 'in-progress':
                return <AlertCircle size={16} className="text-yellow-500" />;
            default:
                return <Circle size={16} className="text-gray-400" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'in-progress':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
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
                    <h1 className="page-title">
                        <Calendar className="title-icon" />
                        Today's Consultations
                    </h1>
                    <div className="header-actions">
                        <span className="date-display">
                            {new Date().toLocaleDateString('en-IN', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </span>
                    </div>
                </div>
                
                <div className="content-body">
                    {/* Search and Filter Section */}
                    <div className="search-filter-section" style={{ 
                        display: 'flex', 
                        gap: '1rem', 
                        marginBottom: '1.5rem',
                        flexWrap: 'wrap'
                    }}>
                        <div className="search-box" style={{ 
                            position: 'relative', 
                            flex: '1', 
                            minWidth: '300px' 
                        }}>
                            <Search size={20} style={{ 
                                position: 'absolute', 
                                left: '12px', 
                                top: '50%', 
                                transform: 'translateY(-50%)', 
                                color: '#6b7280' 
                            }} />
                            <input
                                type="text"
                                placeholder="Search patients or complaints..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                        
                        <div className="filter-section" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Filter size={20} style={{ color: '#6b7280' }} />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                style={{
                                    padding: '12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    minWidth: '120px'
                                }}
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="stats-grid" style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '1rem', 
                        marginBottom: '2rem' 
                    }}>
                        <div className="stat-card" style={{ 
                            background: '#f8fafc', 
                            padding: '1.5rem', 
                            borderRadius: '12px', 
                            border: '1px solid #e2e8f0' 
                        }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '14px', fontWeight: '600' }}>
                                Total Appointments
                            </h3>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>
                                {consultations.length}
                            </p>
                        </div>
                        
                        <div className="stat-card" style={{ 
                            background: '#fef3c7', 
                            padding: '1.5rem', 
                            borderRadius: '12px', 
                            border: '1px solid #fbbf24' 
                        }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#92400e', fontSize: '14px', fontWeight: '600' }}>
                                Pending
                            </h3>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#d97706' }}>
                                {consultations.filter(c => c.status === 'pending').length}
                            </p>
                        </div>
                        
                        <div className="stat-card" style={{ 
                            background: '#dcfce7', 
                            padding: '1.5rem', 
                            borderRadius: '12px', 
                            border: '1px solid #22c55e' 
                        }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#166534', fontSize: '14px', fontWeight: '600' }}>
                                Completed
                            </h3>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>
                                {consultations.filter(c => c.status === 'completed').length}
                            </p>
                        </div>
                        
                        <div className="stat-card" style={{ 
                            background: '#fef2f2', 
                            padding: '1.5rem', 
                            borderRadius: '12px', 
                            border: '1px solid #f87171' 
                        }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#991b1b', fontSize: '14px', fontWeight: '600' }}>
                                In Progress
                            </h3>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>
                                {consultations.filter(c => c.status === 'in-progress').length}
                            </p>
                        </div>
                    </div>

                    {/* Consultations List */}
                    <div className="consultations-list">
                        <h2 style={{ marginBottom: '1rem', color: '#1e293b' }}>
                            Appointments ({filteredConsultations.length})
                        </h2>
                        
                        {filteredConsultations.length === 0 ? (
                            <div style={{ 
                                textAlign: 'center', 
                                padding: '3rem', 
                                color: '#6b7280',
                                background: '#f9fafb',
                                borderRadius: '12px',
                                border: '1px solid #e5e7eb'
                            }}>
                                <Calendar size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                <p>No consultations found matching your criteria.</p>
                            </div>
                        ) : (
                            <div className="consultation-cards" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {filteredConsultations.map((consultation) => (
                                    <div 
                                        key={consultation.id} 
                                        className="consultation-card"
                                        style={{
                                            background: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '12px',
                                            padding: '1.5rem',
                                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                {getStatusIcon(consultation.status)}
                                                <div>
                                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>
                                                        {consultation.patientName}
                                                    </h3>
                                                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#6b7280' }}>
                                                        Age: {consultation.age} • {consultation.type}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span className={`status-badge ${getStatusColor(consultation.status)}`} style={{
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '9999px',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                    textTransform: 'capitalize'
                                                }}>
                                                    {consultation.status.replace('-', ' ')}
                                                </span>
                                                <button style={{ 
                                                    background: 'none', 
                                                    border: 'none', 
                                                    cursor: 'pointer',
                                                    padding: '0.25rem',
                                                    borderRadius: '4px'
                                                }}>
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Clock size={16} style={{ color: '#6b7280' }} />
                                                <span style={{ fontSize: '14px', color: '#374151' }}>
                                                    {consultation.appointmentTime} ({consultation.duration})
                                                </span>
                                            </div>
                                            
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Phone size={16} style={{ color: '#6b7280' }} />
                                                <span style={{ fontSize: '14px', color: '#374151' }}>
                                                    {consultation.phone}
                                                </span>
                                            </div>
                                            
                                            {consultation.lastVisit && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <User size={16} style={{ color: '#6b7280' }} />
                                                    <span style={{ fontSize: '14px', color: '#374151' }}>
                                                        Last visit: {consultation.lastVisit}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div style={{ marginBottom: '1rem' }}>
                                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                                                Chief Complaint:
                                            </p>
                                            <p style={{ margin: 0, fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>
                                                {consultation.complaint}
                                            </p>
                                        </div>
                                        
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            {consultation.status === 'pending' && (
                                                <button
                                                    onClick={() => updateConsultationStatus(consultation.id, 'in-progress')}
                                                    style={{
                                                        background: '#3b82f6',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: '6px',
                                                        fontSize: '14px',
                                                        cursor: 'pointer',
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    Start Consultation
                                                </button>
                                            )}
                                            
                                            {consultation.status === 'in-progress' && (
                                                <button
                                                    onClick={() => updateConsultationStatus(consultation.id, 'completed')}
                                                    style={{
                                                        background: '#16a34a',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: '6px',
                                                        fontSize: '14px',
                                                        cursor: 'pointer',
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    Complete Consultation
                                                </button>
                                            )}
                                            
                                            <button
                                                style={{
                                                    background: 'white',
                                                    color: '#374151',
                                                    border: '1px solid #d1d5db',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '6px',
                                                    fontSize: '14px',
                                                    cursor: 'pointer',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                View Details
                                            </button>
                                            
                                            <button
                                                style={{
                                                    background: 'white',
                                                    color: '#374151',
                                                    border: '1px solid #d1d5db',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '6px',
                                                    fontSize: '14px',
                                                    cursor: 'pointer',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Reschedule
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodaysConsultant;
