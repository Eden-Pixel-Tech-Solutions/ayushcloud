import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Eye, Edit, Download, FileText, Pill, Clock, Phone, Mail } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function PrescriptionHistory({ 
    activeSection = 'prescription-history',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [patientFilter, setPatientFilter] = useState('all');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [expandedPrescriptions, setExpandedPrescriptions] = useState({});

    // Sample prescription history data
    const [prescriptionHistory] = useState([
        {
            id: 1,
            prescriptionNumber: 'RX-2024-001',
            patientName: 'Rajesh Kumar',
            patientAge: 45,
            patientPhone: '+91 98765 43210',
            date: '2024-01-10',
            diagnosis: 'Hypertension with Vata-Pitta imbalance',
            symptoms: 'High blood pressure, headaches, anxiety',
            medications: [
                {
                    name: 'Arjunarishta',
                    dosage: '20ml',
                    frequency: 'Twice daily',
                    duration: '30 days',
                    instructions: 'After meals'
                },
                {
                    name: 'Saraswatarishta',
                    dosage: '15ml',
                    frequency: 'Once daily',
                    duration: '30 days',
                    instructions: 'At bedtime'
                },
                {
                    name: 'Brahmi Ghrita',
                    dosage: '1 tsp',
                    frequency: 'Once daily',
                    duration: '15 days',
                    instructions: 'With warm milk'
                }
            ],
            instructions: 'Follow strict diet regimen. Avoid spicy and oily foods. Practice pranayama daily.',
            followUpDate: '2024-02-10',
            prescribedBy: 'Dr. Priya Sharma',
            status: 'Active'
        },
        {
            id: 2,
            prescriptionNumber: 'RX-2024-002',
            patientName: 'Priya Sharma',
            patientAge: 32,
            patientPhone: '+91 87654 32109',
            date: '2024-01-08',
            diagnosis: 'Digestive disorders with Pitta aggravation',
            symptoms: 'Acidity, bloating, irregular bowel movements',
            medications: [
                {
                    name: 'Avipattikar Churna',
                    dosage: '1 tsp',
                    frequency: 'Twice daily',
                    duration: '21 days',
                    instructions: 'With warm water'
                },
                {
                    name: 'Dadimadi Ghrita',
                    dosage: '1 tsp',
                    frequency: 'Three times daily',
                    duration: '15 days',
                    instructions: 'Before meals'
                }
            ],
            instructions: 'Avoid citrus fruits, tomatoes, and fermented foods. Include cooling foods like cucumber.',
            followUpDate: '2024-02-08',
            prescribedBy: 'Dr. Priya Sharma',
            status: 'Completed'
        },
        {
            id: 3,
            prescriptionNumber: 'RX-2024-003',
            patientName: 'Amit Patel',
            patientAge: 58,
            patientPhone: '+91 76543 21098',
            date: '2024-01-05',
            diagnosis: 'Osteoarthritis with Vata-Kapha imbalance',
            symptoms: 'Joint pain, morning stiffness, reduced mobility',
            medications: [
                {
                    name: 'Yogaraja Guggulu',
                    dosage: '2 tablets',
                    frequency: 'Twice daily',
                    duration: '45 days',
                    instructions: 'After meals'
                },
                {
                    name: 'Dashamoola Kwath',
                    dosage: '50ml',
                    frequency: 'Twice daily',
                    duration: '30 days',
                    instructions: 'Before meals'
                },
                {
                    name: 'Mahanarayan Oil',
                    dosage: 'As needed',
                    frequency: 'Twice daily',
                    duration: '60 days',
                    instructions: 'External application'
                }
            ],
            instructions: 'Gentle yoga and walking advised. Apply oil massage daily.',
            followUpDate: '2024-02-05',
            prescribedBy: 'Dr. Priya Sharma',
            status: 'Active'
        },
        {
            id: 4,
            prescriptionNumber: 'RX-2024-004',
            patientName: 'Sunita Reddy',
            patientAge: 28,
            patientPhone: '+91 65432 10987',
            date: '2024-01-12',
            diagnosis: 'Chronic eczema with Pitta-Kapha imbalance',
            symptoms: 'Itchy skin, red patches, burning sensation',
            medications: [
                {
                    name: 'Manjisthadi Kwath',
                    dosage: '40ml',
                    frequency: 'Twice daily',
                    duration: '30 days',
                    instructions: 'After meals'
                },
                {
                    name: 'Khadirarishta',
                    dosage: '20ml',
                    frequency: 'Twice daily',
                    duration: '45 days',
                    instructions: 'After meals'
                },
                {
                    name: 'Nimba Oil',
                    dosage: 'As needed',
                    frequency: 'Twice daily',
                    duration: '30 days',
                    instructions: 'External application'
                }
            ],
            instructions: 'Avoid dairy products, nuts, and processed foods. Use natural cotton clothing.',
            followUpDate: '2024-02-12',
            prescribedBy: 'Dr. Priya Sharma',
            status: 'Active'
        },
        {
            id: 5,
            prescriptionNumber: 'RX-2023-089',
            patientName: 'Vikram Singh',
            patientAge: 41,
            patientPhone: '+91 54321 09876',
            date: '2023-12-28',
            diagnosis: 'Type 2 Diabetes with Kapha-Pitta constitution',
            symptoms: 'Frequent urination, excessive thirst, fatigue',
            medications: [
                {
                    name: 'Madhumehari Granules',
                    dosage: '1 tsp',
                    frequency: 'Twice daily',
                    duration: '60 days',
                    instructions: 'Before meals'
                },
                {
                    name: 'Karela Jamun Juice',
                    dosage: '30ml',
                    frequency: 'Once daily',
                    duration: '90 days',
                    instructions: 'Empty stomach'
                },
                {
                    name: 'Chandraprabha Vati',
                    dosage: '2 tablets',
                    frequency: 'Once daily',
                    duration: '45 days',
                    instructions: 'At bedtime'
                }
            ],
            instructions: 'Follow strict diabetic diet. Regular exercise and stress management essential.',
            followUpDate: '2024-01-28',
            prescribedBy: 'Dr. Priya Sharma',
            status: 'Completed'
        }
    ]);

    // Filter prescriptions based on search and filters
    const filteredPrescriptions = prescriptionHistory.filter(prescription => {
        const matchesSearch = prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            prescription.prescriptionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            prescription.medications.some(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesPatient = patientFilter === 'all' || prescription.patientName === patientFilter;
        
        const matchesDate = (!dateRange.start || new Date(prescription.date) >= new Date(dateRange.start)) &&
                          (!dateRange.end || new Date(prescription.date) <= new Date(dateRange.end));

        return matchesSearch && matchesPatient && matchesDate;
    });

    // Get unique patients for filter
    const uniquePatients = [...new Set(prescriptionHistory.map(prescription => prescription.patientName))];

    // Statistics
    const stats = {
        total: prescriptionHistory.length,
        active: prescriptionHistory.filter(p => p.status === 'Active').length,
        completed: prescriptionHistory.filter(p => p.status === 'Completed').length,
        thisMonth: prescriptionHistory.filter(p => {
            const prescDate = new Date(p.date);
            const now = new Date();
            return prescDate.getMonth() === now.getMonth() && prescDate.getFullYear() === now.getFullYear();
        }).length
    };

    const togglePrescriptionExpansion = (prescriptionId) => {
        setExpandedPrescriptions(prev => ({
            ...prev,
            [prescriptionId]: !prev[prescriptionId]
        }));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'text-green-600 bg-green-100';
            case 'Completed': return 'text-blue-600 bg-blue-100';
            default: return 'text-gray-600 bg-gray-100';
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
                    <div className="header-top">
                        <h1 className="page-title">
                            <FileText className="title-icon" />
                            Prescription History
                        </h1>
                        <button className="btn btn-primary">
                            <Download size={20} />
                            Export Report
                        </button>
                    </div>
                    
                    {/* Statistics Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon total">
                                <FileText size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.total}</div>
                                <div className="stat-label">Total Prescriptions</div>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon active">
                                <Pill size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.active}</div>
                                <div className="stat-label">Active Prescriptions</div>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon inactive">
                                <Clock size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.completed}</div>
                                <div className="stat-label">Completed</div>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon new">
                                <Calendar size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.thisMonth}</div>
                                <div className="stat-label">This Month</div>
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
                                placeholder="Search by patient name, prescription number, diagnosis, or medication..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        
                        <div className="filter-group">
                            <div className="filter-item">
                                <Filter size={16} />
                                <select 
                                    value={patientFilter} 
                                    onChange={(e) => setPatientFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Patients</option>
                                    {uniquePatients.map(patient => (
                                        <option key={patient} value={patient}>{patient}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="date-range-filter">
                                <input
                                    type="date"
                                    value={dateRange.start}
                                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                                    className="date-input"
                                />
                                <span>to</span>
                                <input
                                    type="date"
                                    value={dateRange.end}
                                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                                    className="date-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Prescription History List */}
                    <div className="prescription-history-list">
                        {filteredPrescriptions.map(prescription => (
                            <div key={prescription.id} className="prescription-card">
                                <div className="prescription-header" onClick={() => togglePrescriptionExpansion(prescription.id)}>
                                    <div className="prescription-basic-info">
                                        <div className="patient-avatar">
                                            {prescription.patientName.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="prescription-details">
                                            <h3 className="prescription-number">{prescription.prescriptionNumber}</h3>
                                            <div className="prescription-meta">
                                                <span className="patient-name">{prescription.patientName}</span>
                                                <span className="patient-age">{prescription.patientAge} years</span>
                                                <span className={`status-badge ${getStatusColor(prescription.status)}`}>
                                                    {prescription.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="prescription-summary">
                                        <div className="prescription-date">
                                            <Calendar size={16} />
                                            {new Date(prescription.date).toLocaleDateString()}
                                        </div>
                                        <div className="prescription-diagnosis">{prescription.diagnosis}</div>
                                        <div className="medication-count">{prescription.medications.length} medications</div>
                                    </div>
                                    
                                    <div className="prescription-actions">
                                        <button className="action-btn view" title="View Details">
                                            <Eye size={16} />
                                        </button>
                                        <button className="action-btn edit" title="Edit Prescription">
                                            <Edit size={16} />
                                        </button>
                                        <button className="action-btn download" title="Download PDF">
                                            <Download size={16} />
                                        </button>
                                        <button className="action-btn contact" title="Call Patient">
                                            <Phone size={16} />
                                        </button>
                                    </div>
                                </div>
                                
                                {expandedPrescriptions[prescription.id] && (
                                    <div className="prescription-details-expanded">
                                        <div className="patient-contact-info">
                                            <div className="contact-item">
                                                <Phone size={16} />
                                                <span>{prescription.patientPhone}</span>
                                            </div>
                                            <div className="contact-item">
                                                <User size={16} />
                                                <span>Prescribed by: {prescription.prescribedBy}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="diagnosis-symptoms">
                                            <div className="detail-section">
                                                <h4>Diagnosis</h4>
                                                <p>{prescription.diagnosis}</p>
                                            </div>
                                            <div className="detail-section">
                                                <h4>Symptoms</h4>
                                                <p>{prescription.symptoms}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="medications-section">
                                            <h4>Prescribed Medications</h4>
                                            <div className="medications-grid">
                                                {prescription.medications.map((medication, index) => (
                                                    <div key={index} className="medication-card">
                                                        <div className="medication-header">
                                                            <Pill size={16} />
                                                            <strong>{medication.name}</strong>
                                                        </div>
                                                        <div className="medication-details">
                                                            <div className="detail-row">
                                                                <span className="label">Dosage:</span>
                                                                <span>{medication.dosage}</span>
                                                            </div>
                                                            <div className="detail-row">
                                                                <span className="label">Frequency:</span>
                                                                <span>{medication.frequency}</span>
                                                            </div>
                                                            <div className="detail-row">
                                                                <span className="label">Duration:</span>
                                                                <span>{medication.duration}</span>
                                                            </div>
                                                            <div className="detail-row">
                                                                <span className="label">Instructions:</span>
                                                                <span>{medication.instructions}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="instructions-section">
                                            <h4>General Instructions</h4>
                                            <p>{prescription.instructions}</p>
                                        </div>
                                        
                                        <div className="prescription-footer">
                                            <div className="follow-up-info">
                                                <Clock size={16} />
                                                <span>Follow-up: {new Date(prescription.followUpDate).toLocaleDateString()}</span>
                                            </div>
                                            <button className="btn btn-outline">
                                                Renew Prescription
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {filteredPrescriptions.length === 0 && (
                        <div className="empty-state">
                            <FileText size={48} className="empty-icon" />
                            <h3>No prescriptions found</h3>
                            <p>Try adjusting your search criteria or create a new prescription.</p>
                        </div>
                    )}
                </div>
            </div>
            
            <style jsx>{`
                .prescription-history-list {
                    display: grid;
                    gap: 1.5rem;
                }
                
                .prescription-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e2e8f0;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .prescription-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .prescription-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    cursor: pointer;
                }
                
                .prescription-basic-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    flex: 1;
                }
                
                .prescription-details {
                    flex: 1;
                }
                
                .prescription-number {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: #1e293b;
                    margin: 0 0 0.25rem 0;
                }
                
                .prescription-meta {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    flex-wrap: wrap;
                }
                
                .patient-name {
                    font-weight: 500;
                    color: #374151;
                }
                
                .patient-age {
                    font-size: 0.875rem;
                    color: #64748b;
                }
                
                .prescription-summary {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin: 0 1rem;
                    text-align: right;
                }
                
                .prescription-date {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    font-size: 0.875rem;
                    color: #64748b;
                }
                
                .prescription-diagnosis {
                    font-size: 0.875rem;
                    color: #374151;
                    font-weight: 500;
                }
                
                .medication-count {
                    font-size: 0.75rem;
                    color: #10b981;
                    font-weight: 500;
                }
                
                .prescription-actions {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }
                
                .prescription-details-expanded {
                    margin-top: 1.5rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid #e2e8f0;
                }
                
                .patient-contact-info {
                    display: flex;
                    gap: 2rem;
                    margin-bottom: 1.5rem;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 8px;
                }
                
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                    color: #64748b;
                }
                
                .diagnosis-symptoms {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    margin-bottom: 1.5rem;
                }
                
                .detail-section h4 {
                    color: #1e293b;
                    font-size: 1rem;
                    font-weight: 600;
                    margin: 0 0 0.5rem 0;
                }
                
                .detail-section p {
                    color: #64748b;
                    margin: 0;
                    line-height: 1.5;
                }
                
                .medications-section {
                    margin-bottom: 1.5rem;
                }
                
                .medications-section h4 {
                    color: #1e293b;
                    font-size: 1rem;
                    font-weight: 600;
                    margin: 0 0 1rem 0;
                }
                
                .medications-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1rem;
                }
                
                .medication-card {
                    background: #f8fafc;
                    border-radius: 8px;
                    padding: 1rem;
                    border-left: 4px solid #3b82f6;
                }
                
                .medication-header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.75rem;
                    color: #1e293b;
                }
                
                .medication-details {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.875rem;
                }
                
                .detail-row .label {
                    color: #64748b;
                    font-weight: 500;
                }
                
                .detail-row span:last-child {
                    color: #1e293b;
                }
                
                .instructions-section {
                    margin-bottom: 1.5rem;
                }
                
                .instructions-section h4 {
                    color: #1e293b;
                    font-size: 1rem;
                    font-weight: 600;
                    margin: 0 0 0.5rem 0;
                }
                
                .instructions-section p {
                    color: #64748b;
                    margin: 0;
                    line-height: 1.6;
                    font-style: italic;
                }
                
                .prescription-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1rem;
                    border-top: 1px solid #e2e8f0;
                }
                
                .follow-up-info {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #10b981;
                    font-size: 0.875rem;
                    font-weight: 500;
                }
                
                @media (max-width: 768px) {
                    .prescription-header {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .prescription-summary {
                        text-align: left;
                        margin: 0;
                    }
                    
                    .diagnosis-symptoms {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }
                    
                    .medications-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .patient-contact-info {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .prescription-footer {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: stretch;
                    }
                }
            `}</style>
        </div>
    );
}

export default PrescriptionHistory;
