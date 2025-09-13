import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Phone, FileText, Eye, Download, Clock, MapPin, Heart, Activity, Menu, ChevronDown } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function ConsultationHistory({ 
    activeSection = 'consultation-history',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [expandedConsultation, setExpandedConsultation] = useState(null);

    // Sample historical consultation data
    const [consultationHistory, setConsultationHistory] = useState([
        {
            id: 1,
            patientName: 'Rajesh Kumar',
            age: 45,
            phone: '+91 9876543210',
            consultationDate: '2024-01-15',
            consultationTime: '10:30 AM',
            duration: '45 min',
            complaint: 'Joint pain and stiffness in knees',
            diagnosis: 'Vata Dosha imbalance causing joint inflammation',
            treatment: 'Panchakarma therapy with herbal oils',
            prescription: 'Ashwagandha 500mg twice daily, Guggul tablets',
            followUpDate: '2024-01-29',
            outcome: 'Significant improvement in mobility',
            fees: '₹1,500',
            type: 'Follow-up'
        },
        {
            id: 2,
            patientName: 'Priya Sharma',
            age: 32,
            phone: '+91 9876543211',
            consultationDate: '2024-01-12',
            consultationTime: '02:15 PM',
            duration: '60 min',
            complaint: 'Chronic digestive issues and acidity',
            diagnosis: 'Pitta Dosha excess affecting digestive fire',
            treatment: 'Dietary modifications and cooling herbs',
            prescription: 'Triphala powder, Amla juice, Fennel tea',
            followUpDate: '2024-01-26',
            outcome: 'Digestive symptoms reduced by 70%',
            fees: '₹2,000',
            type: 'New Patient'
        },
        {
            id: 3,
            patientName: 'Amit Patel',
            age: 28,
            phone: '+91 9876543212',
            consultationDate: '2024-01-10',
            consultationTime: '11:00 AM',
            duration: '30 min',
            complaint: 'Stress, anxiety, and sleep disorders',
            diagnosis: 'Vata imbalance affecting nervous system',
            treatment: 'Meditation, Pranayama, and calming herbs',
            prescription: 'Brahmi tablets, Jatamansi powder, Shankhpushpi',
            followUpDate: '2024-01-24',
            outcome: 'Better sleep quality and reduced anxiety',
            fees: '₹1,200',
            type: 'Regular'
        },
        {
            id: 4,
            patientName: 'Sunita Devi',
            age: 55,
            phone: '+91 9876543213',
            consultationDate: '2024-01-08',
            consultationTime: '09:45 AM',
            duration: '50 min',
            complaint: 'Diabetes management and weight control',
            diagnosis: 'Kapha dosha excess with metabolic imbalance',
            treatment: 'Specialized diet plan and herbal support',
            prescription: 'Karela powder, Methi seeds, Vijaysar bark',
            followUpDate: '2024-01-22',
            outcome: 'Blood sugar levels stabilized',
            fees: '₹1,800',
            type: 'Follow-up'
        },
        {
            id: 5,
            patientName: 'Vikram Singh',
            age: 38,
            phone: '+91 9876543214',
            consultationDate: '2024-01-05',
            consultationTime: '03:30 PM',
            duration: '40 min',
            complaint: 'Skin allergies and recurring rashes',
            diagnosis: 'Pitta-Kapha imbalance causing skin inflammation',
            treatment: 'Detoxification and cooling therapy',
            prescription: 'Neem capsules, Turmeric paste, Aloe vera gel',
            followUpDate: '2024-01-19',
            outcome: 'Skin condition improved significantly',
            fees: '₹1,600',
            type: 'New Patient'
        },
        {
            id: 6,
            patientName: 'Meera Gupta',
            age: 42,
            phone: '+91 9876543215',
            consultationDate: '2024-01-03',
            consultationTime: '04:00 PM',
            duration: '35 min',
            complaint: 'Hormonal imbalance and irregular periods',
            diagnosis: 'Vata-Pitta imbalance affecting reproductive system',
            treatment: 'Hormone balancing herbs and lifestyle changes',
            prescription: 'Shatavari powder, Ashoka bark, Lodhra',
            followUpDate: '2024-01-17',
            outcome: 'Menstrual cycle regularized',
            fees: '₹1,400',
            type: 'Regular'
        }
    ]);

    const filteredConsultations = consultationHistory.filter(consultation => {
        const matchesSearch = consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            consultation.complaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            consultation.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
        
        const consultationDate = new Date(consultation.consultationDate);
        const now = new Date();
        let matchesDate = true;
        
        if (dateFilter === 'week') {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = consultationDate >= weekAgo;
        } else if (dateFilter === 'month') {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesDate = consultationDate >= monthAgo;
        } else if (dateFilter === '3months') {
            const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            matchesDate = consultationDate >= threeMonthsAgo;
        }
        
        return matchesSearch && matchesDate;
    });

    const toggleConsultationDetails = (id) => {
        setExpandedConsultation(expandedConsultation === id ? null : id);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getTotalRevenue = () => {
        return filteredConsultations.reduce((total, consultation) => {
            return total + parseInt(consultation.fees.replace('₹', '').replace(',', ''));
        }, 0).toLocaleString('en-IN');
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
                    <h1>Consultation History</h1>
                    <div className="header-actions">
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
                            <Download size={16} />
                            Export Report
                        </button>
                    </div>
                </header>
                
                <div className="consultation-history-content" style={{ padding: '1.5rem' }}>
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
                                placeholder="Search patients, complaints, or diagnosis..."
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
                            <Calendar size={20} style={{ color: '#6b7280' }} />
                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                style={{
                                    padding: '12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    minWidth: '140px'
                                }}
                            >
                                <option value="all">All Time</option>
                                <option value="week">Last Week</option>
                                <option value="month">Last Month</option>
                                <option value="3months">Last 3 Months</option>
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
                            background: '#f0f9ff', 
                            padding: '1.5rem', 
                            borderRadius: '12px', 
                            border: '1px solid #0ea5e9' 
                        }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#0c4a6e', fontSize: '14px', fontWeight: '600' }}>
                                Total Consultations
                            </h3>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0284c7' }}>
                                {filteredConsultations.length}
                            </p>
                        </div>
                        
                        <div className="stat-card" style={{ 
                            background: '#f0fdf4', 
                            padding: '1.5rem', 
                            borderRadius: '12px', 
                            border: '1px solid #22c55e' 
                        }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#166534', fontSize: '14px', fontWeight: '600' }}>
                                Total Revenue
                            </h3>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>
                                ₹{getTotalRevenue()}
                            </p>
                        </div>
                        
                        <div className="stat-card" style={{ 
                            background: '#fefce8', 
                            padding: '1.5rem', 
                            borderRadius: '12px', 
                            border: '1px solid #eab308' 
                        }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#a16207', fontSize: '14px', fontWeight: '600' }}>
                                Average Duration
                            </h3>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#ca8a04' }}>
                                {Math.round(filteredConsultations.reduce((sum, c) => sum + parseInt(c.duration), 0) / filteredConsultations.length || 0)} min
                            </p>
                        </div>
                        
                        <div className="stat-card" style={{ 
                            background: '#fdf2f8', 
                            padding: '1.5rem', 
                            borderRadius: '12px', 
                            border: '1px solid #ec4899' 
                        }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#be185d', fontSize: '14px', fontWeight: '600' }}>
                                Success Rate
                            </h3>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#db2777' }}>
                                95%
                            </p>
                        </div>
                    </div>

                    {/* Consultation History List */}
                    <div className="consultation-history-list">
                        <h2 style={{ marginBottom: '1rem', color: '#1e293b' }}>
                            Past Consultations ({filteredConsultations.length})
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
                                <Archive size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                <p>No consultation history found matching your criteria.</p>
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
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    background: '#3b82f6',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {consultation.patientName.charAt(0)}
                                                </div>
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
                                                <span style={{
                                                    background: '#dcfce7',
                                                    color: '#166534',
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '9999px',
                                                    fontSize: '12px',
                                                    fontWeight: '500'
                                                }}>
                                                    Completed
                                                </span>
                                                <button 
                                                    onClick={() => toggleConsultationDetails(consultation.id)}
                                                    style={{ 
                                                        background: 'none', 
                                                        border: 'none', 
                                                        cursor: 'pointer',
                                                        padding: '0.25rem',
                                                        borderRadius: '4px'
                                                    }}
                                                >
                                                    {expandedConsultation === consultation.id ? 
                                                        <ChevronUp size={16} /> : <ChevronDown size={16} />
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Calendar size={16} style={{ color: '#6b7280' }} />
                                                <span style={{ fontSize: '14px', color: '#374151' }}>
                                                    {formatDate(consultation.consultationDate)}
                                                </span>
                                            </div>
                                            
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Clock size={16} style={{ color: '#6b7280' }} />
                                                <span style={{ fontSize: '14px', color: '#374151' }}>
                                                    {consultation.consultationTime} ({consultation.duration})
                                                </span>
                                            </div>
                                            
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Phone size={16} style={{ color: '#6b7280' }} />
                                                <span style={{ fontSize: '14px', color: '#374151' }}>
                                                    {consultation.phone}
                                                </span>
                                            </div>
                                            
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{ fontSize: '14px', fontWeight: '600', color: '#16a34a' }}>
                                                    {consultation.fees}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div style={{ marginBottom: '1rem' }}>
                                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                                                Chief Complaint:
                                            </p>
                                            <p style={{ margin: 0, fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>
                                                {consultation.complaint}
                                            </p>
                                        </div>

                                        {expandedConsultation === consultation.id && (
                                            <div style={{ 
                                                background: '#f8fafc', 
                                                padding: '1rem', 
                                                borderRadius: '8px', 
                                                marginBottom: '1rem',
                                                border: '1px solid #e2e8f0'
                                            }}>
                                                <div style={{ display: 'grid', gap: '1rem' }}>
                                                    <div>
                                                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                                                            Diagnosis:
                                                        </h4>
                                                        <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
                                                            {consultation.diagnosis}
                                                        </p>
                                                    </div>
                                                    
                                                    <div>
                                                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                                                            Treatment Plan:
                                                        </h4>
                                                        <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
                                                            {consultation.treatment}
                                                        </p>
                                                    </div>
                                                    
                                                    <div>
                                                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                                                            Prescription:
                                                        </h4>
                                                        <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
                                                            {consultation.prescription}
                                                        </p>
                                                    </div>
                                                    
                                                    <div>
                                                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                                                            Outcome:
                                                        </h4>
                                                        <p style={{ margin: 0, fontSize: '14px', color: '#16a34a', fontWeight: '500' }}>
                                                            {consultation.outcome}
                                                        </p>
                                                    </div>
                                                    
                                                    <div>
                                                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                                                            Follow-up Date:
                                                        </h4>
                                                        <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
                                                            {formatDate(consultation.followUpDate)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            <button
                                                style={{
                                                    background: '#3b82f6',
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
                                                <Eye size={14} />
                                                View Full Details
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
                                                    fontWeight: '500',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}
                                            >
                                                <FileText size={14} />
                                                View Prescription
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
                                                Schedule Follow-up
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

export default ConsultationHistory;