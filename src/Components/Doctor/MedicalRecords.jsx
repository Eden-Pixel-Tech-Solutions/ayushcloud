import React, { useState } from 'react';
import { Search, Filter, FileText, Download, Eye, Edit, Calendar, User, Heart, Activity, Pill, AlertTriangle, Plus, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from './Navbar';

function MedicalRecords({ 
    activeSection = 'patient-records',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [patientFilter, setPatientFilter] = useState('all');
    const [recordTypeFilter, setRecordTypeFilter] = useState('all');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [expandedRecords, setExpandedRecords] = useState({});

    // Sample medical records data
    const [medicalRecords] = useState([
        {
            id: 1,
            patientId: 1,
            patientName: 'Rajesh Kumar',
            patientAge: 45,
            patientGender: 'Male',
            recordType: 'Consultation',
            date: '2024-01-10',
            diagnosis: 'Hypertension with Vata-Pitta imbalance',
            symptoms: ['High blood pressure', 'Headaches', 'Dizziness', 'Anxiety'],
            treatment: 'Ayurvedic medication with lifestyle modifications',
            prescriptions: [
                { medicine: 'Arjunarishta', dosage: '20ml twice daily', duration: '30 days' },
                { medicine: 'Saraswatarishta', dosage: '15ml once daily', duration: '30 days' },
                { medicine: 'Brahmi Ghrita', dosage: '1 tsp with warm milk', duration: '15 days' }
            ],
            vitals: {
                bloodPressure: '150/95 mmHg',
                pulse: '88 bpm',
                temperature: '98.6°F',
                weight: '75 kg'
            },
            followUpDate: '2024-01-20',
            notes: 'Patient advised to follow strict diet regimen and practice pranayama daily. Avoid spicy and oily foods.',
            attachments: ['blood_test_report.pdf', 'ecg_report.pdf']
        },
        {
            id: 2,
            patientId: 2,
            patientName: 'Priya Sharma',
            patientAge: 32,
            patientGender: 'Female',
            recordType: 'Lab Report',
            date: '2024-01-08',
            diagnosis: 'Digestive disorders with Pitta aggravation',
            symptoms: ['Acidity', 'Bloating', 'Irregular bowel movements', 'Loss of appetite'],
            treatment: 'Pitta pacifying herbs and dietary changes',
            prescriptions: [
                { medicine: 'Avipattikar Churna', dosage: '1 tsp with warm water', duration: '21 days' },
                { medicine: 'Dadimadi Ghrita', dosage: '1 tsp before meals', duration: '15 days' },
                { medicine: 'Hingvastak Churna', dosage: '1/2 tsp after meals', duration: '30 days' }
            ],
            vitals: {
                bloodPressure: '120/80 mmHg',
                pulse: '72 bpm',
                temperature: '98.4°F',
                weight: '58 kg'
            },
            followUpDate: '2024-01-18',
            notes: 'Patient should avoid citrus fruits, tomatoes, and fermented foods. Include cooling foods like cucumber and coconut water.',
            attachments: ['digestive_analysis.pdf', 'stool_test.pdf']
        },
        {
            id: 3,
            patientId: 3,
            patientName: 'Amit Patel',
            patientAge: 58,
            patientGender: 'Male',
            recordType: 'Treatment Plan',
            date: '2024-01-05',
            diagnosis: 'Osteoarthritis with Vata-Kapha dosha imbalance',
            symptoms: ['Joint pain', 'Morning stiffness', 'Reduced mobility', 'Swelling in knees'],
            treatment: 'Panchakarma therapy with herbal medications',
            prescriptions: [
                { medicine: 'Yogaraja Guggulu', dosage: '2 tablets twice daily', duration: '45 days' },
                { medicine: 'Dashamoola Kwath', dosage: '50ml twice daily', duration: '30 days' },
                { medicine: 'Mahanarayan Oil', dosage: 'External application', duration: 'As needed' }
            ],
            vitals: {
                bloodPressure: '140/90 mmHg',
                pulse: '76 bpm',
                temperature: '98.2°F',
                weight: '82 kg'
            },
            followUpDate: null,
            notes: 'Patient recommended for Abhyanga and Swedana therapy. Gentle yoga and walking advised.',
            attachments: ['xray_knees.pdf', 'arthritis_assessment.pdf']
        },
        {
            id: 4,
            patientId: 4,
            patientName: 'Sunita Reddy',
            patientAge: 28,
            patientGender: 'Female',
            recordType: 'Consultation',
            date: '2024-01-12',
            diagnosis: 'Chronic eczema with Pitta-Kapha imbalance',
            symptoms: ['Itchy skin', 'Red patches', 'Dry skin', 'Burning sensation'],
            treatment: 'Blood purification therapy with topical applications',
            prescriptions: [
                { medicine: 'Manjisthadi Kwath', dosage: '40ml twice daily', duration: '30 days' },
                { medicine: 'Khadirarishta', dosage: '20ml after meals', duration: '45 days' },
                { medicine: 'Nimba Oil', dosage: 'External application', duration: 'As needed' }
            ],
            vitals: {
                bloodPressure: '115/75 mmHg',
                pulse: '68 bpm',
                temperature: '98.1°F',
                weight: '52 kg'
            },
            followUpDate: '2024-01-22',
            notes: 'Patient advised to avoid dairy products, nuts, and processed foods. Use natural cotton clothing.',
            attachments: ['skin_biopsy.pdf', 'allergy_test.pdf']
        },
        {
            id: 5,
            patientId: 5,
            patientName: 'Vikram Singh',
            patientAge: 41,
            patientGender: 'Male',
            recordType: 'Lab Report',
            date: '2023-12-28',
            diagnosis: 'Type 2 Diabetes with Kapha-Pitta constitution',
            symptoms: ['Frequent urination', 'Excessive thirst', 'Fatigue', 'Blurred vision'],
            treatment: 'Diabetes management with Ayurvedic approach',
            prescriptions: [
                { medicine: 'Madhumehari Granules', dosage: '1 tsp twice daily', duration: '60 days' },
                { medicine: 'Karela Jamun Juice', dosage: '30ml empty stomach', duration: '90 days' },
                { medicine: 'Chandraprabha Vati', dosage: '2 tablets at bedtime', duration: '45 days' }
            ],
            vitals: {
                bloodPressure: '145/92 mmHg',
                pulse: '82 bpm',
                temperature: '98.5°F',
                weight: '78 kg',
                bloodSugar: '180 mg/dl (fasting)'
            },
            followUpDate: '2024-01-25',
            notes: 'Patient must follow strict diabetic diet. Regular exercise and stress management essential.',
            attachments: ['hba1c_report.pdf', 'lipid_profile.pdf', 'kidney_function.pdf']
        },
        {
            id: 6,
            patientId: 6,
            patientName: 'Meera Joshi',
            patientAge: 35,
            patientGender: 'Female',
            recordType: 'Mental Health',
            date: '2024-01-11',
            diagnosis: 'Anxiety disorder with Vata imbalance',
            symptoms: ['Restlessness', 'Sleep disturbances', 'Racing thoughts', 'Palpitations'],
            treatment: 'Medhya Rasayana therapy with counseling',
            prescriptions: [
                { medicine: 'Saraswatarishta', dosage: '20ml twice daily', duration: '45 days' },
                { medicine: 'Brahmi Vati', dosage: '2 tablets at bedtime', duration: '30 days' },
                { medicine: 'Jatamansi Churna', dosage: '1/2 tsp with honey', duration: '21 days' }
            ],
            vitals: {
                bloodPressure: '110/70 mmHg',
                pulse: '92 bpm',
                temperature: '98.3°F',
                weight: '55 kg'
            },
            followUpDate: '2024-01-19',
            notes: 'Patient advised meditation, pranayama, and regular sleep schedule. Avoid caffeine and stimulants.',
            attachments: ['psychological_assessment.pdf', 'stress_analysis.pdf']
        }
    ]);

    // Filter records based on search and filters
    const filteredRecords = medicalRecords.filter(record => {
        const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            record.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesPatient = patientFilter === 'all' || record.patientName === patientFilter;
        const matchesType = recordTypeFilter === 'all' || record.recordType === recordTypeFilter;
        
        const matchesDate = (!dateRange.start || new Date(record.date) >= new Date(dateRange.start)) &&
                          (!dateRange.end || new Date(record.date) <= new Date(dateRange.end));

        return matchesSearch && matchesPatient && matchesType && matchesDate;
    });

    // Get unique patients and record types for filters
    const uniquePatients = [...new Set(medicalRecords.map(record => record.patientName))];
    const uniqueRecordTypes = [...new Set(medicalRecords.map(record => record.recordType))];

    // Statistics
    const stats = {
        total: medicalRecords.length,
        consultations: medicalRecords.filter(r => r.recordType === 'Consultation').length,
        labReports: medicalRecords.filter(r => r.recordType === 'Lab Report').length,
        treatmentPlans: medicalRecords.filter(r => r.recordType === 'Treatment Plan').length
    };

    const toggleRecordExpansion = (recordId) => {
        setExpandedRecords(prev => ({
            ...prev,
            [recordId]: !prev[recordId]
        }));
    };

    const getRecordTypeColor = (type) => {
        switch (type) {
            case 'Consultation': return 'text-blue-600 bg-blue-100';
            case 'Lab Report': return 'text-green-600 bg-green-100';
            case 'Treatment Plan': return 'text-purple-600 bg-purple-100';
            case 'Mental Health': return 'text-orange-600 bg-orange-100';
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
                            Medical Records
                        </h1>
                        <button className="btn btn-primary">
                            <Plus size={20} />
                            Add New Record
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
                                <div className="stat-label">Total Records</div>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon consultation">
                                <User size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.consultations}</div>
                                <div className="stat-label">Consultations</div>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon lab">
                                <Activity size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.labReports}</div>
                                <div className="stat-label">Lab Reports</div>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon treatment">
                                <Heart size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.treatmentPlans}</div>
                                <div className="stat-label">Treatment Plans</div>
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
                                placeholder="Search by patient name, diagnosis, or symptoms..."
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
                            
                            <div className="filter-item">
                                <select 
                                    value={recordTypeFilter} 
                                    onChange={(e) => setRecordTypeFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Types</option>
                                    {uniqueRecordTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
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

                    {/* Medical Records List */}
                    <div className="medical-records-list">
                        {filteredRecords.map(record => (
                            <div key={record.id} className="medical-record-card">
                                <div className="record-header" onClick={() => toggleRecordExpansion(record.id)}>
                                    <div className="record-basic-info">
                                        <div className="record-patient">
                                            <div className="patient-avatar">
                                                {record.patientName.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="patient-details">
                                                <h3 className="patient-name">{record.patientName}</h3>
                                                <div className="patient-meta">
                                                    <span>{record.patientAge} years, {record.patientGender}</span>
                                                    <span className={`record-type-badge ${getRecordTypeColor(record.recordType)}`}>
                                                        {record.recordType}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="record-summary">
                                            <div className="record-date">
                                                <Calendar size={16} />
                                                {new Date(record.date).toLocaleDateString()}
                                            </div>
                                            <div className="record-diagnosis">{record.diagnosis}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="record-actions">
                                        <button className="action-btn view" title="View Full Record">
                                            <Eye size={16} />
                                        </button>
                                        <button className="action-btn edit" title="Edit Record">
                                            <Edit size={16} />
                                        </button>
                                        <button className="action-btn download" title="Download PDF">
                                            <Download size={16} />
                                        </button>
                                        <button className="expand-btn">
                                            {expandedRecords[record.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>
                                    </div>
                                </div>
                                
                                {expandedRecords[record.id] && (
                                    <div className="record-details">
                                        <div className="details-section">
                                            <h4>Symptoms</h4>
                                            <div className="symptoms-list">
                                                {record.symptoms.map((symptom, index) => (
                                                    <span key={index} className="symptom-tag">
                                                        {symptom}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="details-section">
                                            <h4>Treatment</h4>
                                            <p className="treatment-description">{record.treatment}</p>
                                        </div>
                                        
                                        <div className="details-section">
                                            <h4>Prescriptions</h4>
                                            <div className="prescriptions-list">
                                                {record.prescriptions.map((prescription, index) => (
                                                    <div key={index} className="prescription-item">
                                                        <div className="prescription-header">
                                                            <Pill size={16} />
                                                            <strong>{prescription.medicine}</strong>
                                                        </div>
                                                        <div className="prescription-details">
                                                            <span>Dosage: {prescription.dosage}</span>
                                                            <span>Duration: {prescription.duration}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="details-section">
                                            <h4>Vital Signs</h4>
                                            <div className="vitals-grid">
                                                {Object.entries(record.vitals).map(([key, value]) => (
                                                    <div key={key} className="vital-item">
                                                        <span className="vital-label">
                                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                                                        </span>
                                                        <span className="vital-value">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="details-section">
                                            <h4>Doctor's Notes</h4>
                                            <p className="doctor-notes">{record.notes}</p>
                                        </div>
                                        
                                        {record.attachments && record.attachments.length > 0 && (
                                            <div className="details-section">
                                                <h4>Attachments</h4>
                                                <div className="attachments-list">
                                                    {record.attachments.map((attachment, index) => (
                                                        <div key={index} className="attachment-item">
                                                            <FileText size={16} />
                                                            <span>{attachment}</span>
                                                            <button className="download-attachment">
                                                                <Download size={14} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {record.followUpDate && (
                                            <div className="follow-up-info">
                                                <Clock size={16} />
                                                <span>Follow-up scheduled for: {new Date(record.followUpDate).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {filteredRecords.length === 0 && (
                        <div className="empty-state">
                            <FileText size={48} className="empty-icon" />
                            <h3>No medical records found</h3>
                            <p>Try adjusting your search criteria or add a new medical record.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MedicalRecords;
