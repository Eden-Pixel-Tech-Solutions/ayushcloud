import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Phone, Mail, Clock, AlertTriangle, CheckCircle, Bell, MessageCircle, RotateCcw, Menu, CalendarClock, MessageSquare } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function FollowUpAppointments({ 
    activeSection = 'follow-ups',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Sample follow-up appointments data
    const [followUps, setFollowUps] = useState([
        {
            id: 1,
            patientName: 'Rajesh Kumar',
            age: 45,
            phone: '+91 9876543210',
            lastConsultation: '2024-01-15',
            followUpDate: '2024-01-29',
            followUpTime: '10:30 AM',
            priority: 'high',
            status: 'scheduled',
            condition: 'Joint pain and stiffness',
            treatment: 'Panchakarma therapy',
            notes: 'Patient showed significant improvement. Need to assess mobility progress.',
            daysOverdue: 0,
            reminderSent: true
        },
        {
            id: 2,
            patientName: 'Priya Sharma',
            age: 32,
            phone: '+91 9876543211',
            lastConsultation: '2024-01-12',
            followUpDate: '2024-01-26',
            followUpTime: '02:15 PM',
            priority: 'medium',
            status: 'overdue',
            condition: 'Digestive issues',
            treatment: 'Dietary modifications and herbs',
            notes: 'Monitor digestive symptoms improvement. Adjust diet plan if needed.',
            daysOverdue: 3,
            reminderSent: false
        },
        {
            id: 3,
            patientName: 'Sunita Devi',
            age: 55,
            phone: '+91 9876543213',
            lastConsultation: '2024-01-08',
            followUpDate: '2024-01-22',
            followUpTime: '09:45 AM',
            priority: 'high',
            status: 'overdue',
            condition: 'Diabetes management',
            treatment: 'Herbal support and diet',
            notes: 'Critical follow-up for blood sugar monitoring. Check medication effectiveness.',
            daysOverdue: 7,
            reminderSent: true
        },
        {
            id: 4,
            patientName: 'Vikram Singh',
            age: 38,
            phone: '+91 9876543214',
            lastConsultation: '2024-01-05',
            followUpDate: '2024-02-02',
            followUpTime: '03:30 PM',
            priority: 'low',
            status: 'scheduled',
            condition: 'Skin allergies',
            treatment: 'Detoxification therapy',
            notes: 'Check skin condition improvement. Assess need for continued treatment.',
            daysOverdue: 0,
            reminderSent: false
        },
        {
            id: 5,
            patientName: 'Meera Gupta',
            age: 42,
            phone: '+91 9876543215',
            lastConsultation: '2024-01-03',
            followUpDate: '2024-01-31',
            followUpTime: '11:00 AM',
            priority: 'medium',
            status: 'scheduled',
            condition: 'Hormonal imbalance',
            treatment: 'Hormone balancing herbs',
            notes: 'Monitor menstrual cycle regularity. Adjust herbal dosage if required.',
            daysOverdue: 0,
            reminderSent: true
        },
        {
            id: 6,
            patientName: 'Amit Patel',
            age: 28,
            phone: '+91 9876543212',
            lastConsultation: '2024-01-10',
            followUpDate: '2024-01-24',
            followUpTime: '11:00 AM',
            priority: 'medium',
            status: 'completed',
            condition: 'Stress and anxiety',
            treatment: 'Meditation and herbs',
            notes: 'Follow-up completed. Patient showing excellent progress in stress management.',
            daysOverdue: 0,
            reminderSent: false
        }
    ]);

    const filteredFollowUps = followUps.filter(followUp => {
        const matchesSearch = followUp.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            followUp.condition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPriority = priorityFilter === 'all' || followUp.priority === priorityFilter;
        const matchesStatus = statusFilter === 'all' || followUp.status === statusFilter;
        return matchesSearch && matchesPriority && matchesStatus;
    });

    const updateFollowUpStatus = (id, newStatus) => {
        setFollowUps(prev => 
            prev.map(followUp => 
                followUp.id === id 
                    ? { ...followUp, status: newStatus }
                    : followUp
            )
        );
    };

    const sendReminder = (id) => {
        setFollowUps(prev => 
            prev.map(followUp => 
                followUp.id === id 
                    ? { ...followUp, reminderSent: true }
                    : followUp
            )
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'overdue':
                return 'bg-red-100 text-red-800';
            case 'scheduled':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle size={16} className="text-green-500" />;
            case 'overdue':
                return <AlertTriangle size={16} className="text-red-500" />;
            case 'scheduled':
                return <CalendarClock size={16} className="text-blue-500" />;
            default:
                return <Calendar size={16} className="text-gray-400" />;
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
            
            <div className="main-content">
                <header className="dashboard-header">
                    <button 
                        className="menu-toggle"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                    <h1>Follow-up Appointments</h1>
                    <div className="header-actions">
                        <button style={{
                            background: '#f59e0b',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginRight: '0.5rem'
                        }}>
                            <Bell size={16} />
                            Send Reminders
                        </button>
                        <button style={{
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <Calendar size={16} />
                            Schedule New
                        </button>
                    </div>
                </header>
                
                <div className="follow-ups-content" style={{ padding: '1.5rem' }}>
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
                                placeholder="Search patients or conditions..."
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
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                style={{
                                    padding: '12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    minWidth: '120px'
                                }}
                            >
                                <option value="all">All Priority</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            
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
                                <option value="scheduled">Scheduled</option>
                                <option value="overdue">Overdue</option>
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
                            background: '#fef2f2', 
                            padding: '1.5rem', 
                            borderRadius: '12px', 
                            border: '1px solid #fecaca' 
                        }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#991b1b', fontSize: '14px', fontWeight: '600' }}>
                                Overdue
                            </h3>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>
                                {followUps.filter(f => f.status === 'overdue').length}
                            </p>
                        </div>
                        
                        <div className="stat-card" style={{ 
                            background: '#eff6ff', 
                            padding: '1.5rem', 
                            borderRadius: '12px', 
                            border: '1px solid #93c5fd' 
                        }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e40af', fontSize: '14px', fontWeight: '600' }}>
                                Scheduled
                            </h3>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
                                {followUps.filter(f => f.status === 'scheduled').length}
                            </p>
                        </div>
                        
                        <div className="stat-card" style={{ 
                            background: '#f0fdf4', 
                            padding: '1.5rem', 
                            borderRadius: '12px', 
                            border: '1px solid #bbf7d0' 
                        }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#166534', fontSize: '14px', fontWeight: '600' }}>
                                Completed
                            </h3>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>
                                {followUps.filter(f => f.status === 'completed').length}
                            </p>
                        </div>
                        
                        <div className="stat-card" style={{ 
                            background: '#fefce8', 
                            padding: '1.5rem', 
                            borderRadius: '12px', 
                            border: '1px solid #fde047' 
                        }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#a16207', fontSize: '14px', fontWeight: '600' }}>
                                High Priority
                            </h3>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#ca8a04' }}>
                                {followUps.filter(f => f.priority === 'high').length}
                            </p>
                        </div>
                    </div>

                    {/* Follow-ups List */}
                    <div className="follow-ups-list">
                        <h2 style={{ marginBottom: '1rem', color: '#1e293b' }}>
                            Follow-up Appointments ({filteredFollowUps.length})
                        </h2>
                        
                        {filteredFollowUps.length === 0 ? (
                            <div style={{ 
                                textAlign: 'center', 
                                padding: '3rem', 
                                color: '#6b7280',
                                background: '#f9fafb',
                                borderRadius: '12px',
                                border: '1px solid #e5e7eb'
                            }}>
                                <CalendarClock size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                <p>No follow-up appointments found matching your criteria.</p>
                            </div>
                        ) : (
                            <div className="follow-up-cards" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {filteredFollowUps.map((followUp) => (
                                    <div 
                                        key={followUp.id} 
                                        className="follow-up-card"
                                        style={{
                                            background: 'white',
                                            border: followUp.status === 'overdue' ? '2px solid #ef4444' : '1px solid #e5e7eb',
                                            borderRadius: '12px',
                                            padding: '1.5rem',
                                            boxShadow: followUp.status === 'overdue' ? '0 4px 6px rgba(239, 68, 68, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                {getStatusIcon(followUp.status)}
                                                <div>
                                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>
                                                        {followUp.patientName}
                                                    </h3>
                                                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#6b7280' }}>
                                                        Age: {followUp.age} • {followUp.condition}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span className={`priority-badge ${getPriorityColor(followUp.priority)}`} style={{
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '9999px',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                    textTransform: 'capitalize',
                                                    border: '1px solid'
                                                }}>
                                                    {followUp.priority}
                                                </span>
                                                <span className={`status-badge ${getStatusColor(followUp.status)}`} style={{
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '9999px',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                    textTransform: 'capitalize'
                                                }}>
                                                    {followUp.status}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Calendar size={16} style={{ color: '#6b7280' }} />
                                                <span style={{ fontSize: '14px', color: '#374151' }}>
                                                    Follow-up: {formatDate(followUp.followUpDate)}
                                                </span>
                                            </div>
                                            
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Clock size={16} style={{ color: '#6b7280' }} />
                                                <span style={{ fontSize: '14px', color: '#374151' }}>
                                                    {followUp.followUpTime}
                                                </span>
                                            </div>
                                            
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Phone size={16} style={{ color: '#6b7280' }} />
                                                <span style={{ fontSize: '14px', color: '#374151' }}>
                                                    {followUp.phone}
                                                </span>
                                            </div>
                                            
                                            {followUp.daysOverdue > 0 && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <AlertTriangle size={16} style={{ color: '#ef4444' }} />
                                                    <span style={{ fontSize: '14px', color: '#ef4444', fontWeight: '600' }}>
                                                        {followUp.daysOverdue} days overdue
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div style={{ marginBottom: '1rem' }}>
                                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                                                Treatment: {followUp.treatment}
                                            </p>
                                            <p style={{ margin: 0, fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>
                                                {followUp.notes}
                                            </p>
                                        </div>
                                        
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            {followUp.status === 'scheduled' && (
                                                <button
                                                    onClick={() => updateFollowUpStatus(followUp.id, 'completed')}
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
                                                    Mark Completed
                                                </button>
                                            )}
                                            
                                            {(followUp.status === 'overdue' || followUp.status === 'scheduled') && !followUp.reminderSent && (
                                                <button
                                                    onClick={() => sendReminder(followUp.id)}
                                                    style={{
                                                        background: '#f59e0b',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: '6px',
                                                        fontSize: '14px',
                                                        cursor: 'pointer',
                                                        fontWeight: '500',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }}
                                                >
                                                    <Bell size={14} />
                                                    Send Reminder
                                                </button>
                                            )}
                                            
                                            {followUp.reminderSent && (
                                                <span style={{
                                                    background: '#f3f4f6',
                                                    color: '#6b7280',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '6px',
                                                    fontSize: '14px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}>
                                                    <CheckCircle size={14} />
                                                    Reminder Sent
                                                </span>
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
                                                    fontWeight: '500',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}
                                            >
                                                <MessageSquare size={14} />
                                                Contact Patient
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

export default FollowUpAppointments;
