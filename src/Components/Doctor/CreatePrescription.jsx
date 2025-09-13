import React, { useState } from 'react';
import { Search, Plus, Trash2, Save, FileText, User, Calendar, Clock, Pill, AlertTriangle, CheckCircle } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function CreatePrescription({ 
    activeSection = 'create-prescription',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientSearch, setPatientSearch] = useState('');
    const [prescriptionData, setPrescriptionData] = useState({
        diagnosis: '',
        symptoms: '',
        duration: '',
        instructions: '',
        followUpDate: '',
        notes: ''
    });
    const [medications, setMedications] = useState([]);
    const [medicationSearch, setMedicationSearch] = useState('');

    // Sample patients data
    const patients = [
        { id: 1, name: 'Rajesh Kumar', age: 45, phone: '+91 98765 43210', lastVisit: '2024-01-10' },
        { id: 2, name: 'Priya Sharma', age: 32, phone: '+91 87654 32109', lastVisit: '2024-01-08' },
        { id: 3, name: 'Amit Patel', age: 58, phone: '+91 76543 21098', lastVisit: '2024-01-05' },
        { id: 4, name: 'Sunita Reddy', age: 28, phone: '+91 65432 10987', lastVisit: '2024-01-12' },
        { id: 5, name: 'Vikram Singh', age: 41, phone: '+91 54321 09876', lastVisit: '2023-12-28' }
    ];

    // Ayurvedic medicines database
    const ayurvedicMedicines = [
        {
            id: 1,
            name: 'Triphala Churna',
            category: 'Digestive',
            form: 'Powder',
            commonDosage: '1-2 tsp with warm water',
            indications: ['Constipation', 'Digestive disorders', 'Detoxification'],
            contraindications: ['Pregnancy', 'Diarrhea']
        },
        {
            id: 2,
            name: 'Ashwagandha Capsules',
            category: 'Nervine Tonic',
            form: 'Capsule',
            commonDosage: '1-2 capsules twice daily',
            indications: ['Stress', 'Anxiety', 'Weakness', 'Insomnia'],
            contraindications: ['Hyperthyroidism', 'Pregnancy']
        },
        {
            id: 3,
            name: 'Arjunarishta',
            category: 'Cardiac Tonic',
            form: 'Liquid',
            commonDosage: '15-30ml twice daily after meals',
            indications: ['Heart problems', 'High blood pressure', 'Chest pain'],
            contraindications: ['Diabetes (contains sugar)', 'Liver disorders']
        },
        {
            id: 4,
            name: 'Brahmi Ghrita',
            category: 'Brain Tonic',
            form: 'Ghee',
            commonDosage: '1 tsp with warm milk',
            indications: ['Memory loss', 'Mental fatigue', 'Anxiety', 'Insomnia'],
            contraindications: ['High cholesterol', 'Obesity']
        },
        {
            id: 5,
            name: 'Chandraprabha Vati',
            category: 'Urinary',
            form: 'Tablet',
            commonDosage: '1-2 tablets twice daily',
            indications: ['Urinary disorders', 'Diabetes', 'Kidney stones'],
            contraindications: ['Pregnancy', 'Severe kidney disease']
        },
        {
            id: 6,
            name: 'Dashamoola Kwath',
            category: 'Anti-inflammatory',
            form: 'Decoction',
            commonDosage: '40-80ml twice daily',
            indications: ['Joint pain', 'Inflammation', 'Fever', 'Respiratory issues'],
            contraindications: ['Pregnancy', 'Hypertension']
        },
        {
            id: 7,
            name: 'Saraswatarishta',
            category: 'Nervine Tonic',
            form: 'Liquid',
            commonDosage: '15-30ml twice daily',
            indications: ['Memory enhancement', 'Mental clarity', 'Speech disorders'],
            contraindications: ['Diabetes', 'Liver problems']
        },
        {
            id: 8,
            name: 'Yogaraja Guggulu',
            category: 'Anti-rheumatic',
            form: 'Tablet',
            commonDosage: '1-2 tablets twice daily',
            indications: ['Arthritis', 'Joint pain', 'Rheumatism', 'Sciatica'],
            contraindications: ['Pregnancy', 'Kidney disease']
        }
    ];

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
        patient.phone.includes(patientSearch)
    );

    const filteredMedicines = ayurvedicMedicines.filter(medicine =>
        medicine.name.toLowerCase().includes(medicationSearch.toLowerCase()) ||
        medicine.category.toLowerCase().includes(medicationSearch.toLowerCase()) ||
        medicine.indications.some(indication => 
            indication.toLowerCase().includes(medicationSearch.toLowerCase())
        )
    );

    const addMedication = (medicine) => {
        const newMedication = {
            id: Date.now(),
            medicineId: medicine.id,
            name: medicine.name,
            category: medicine.category,
            form: medicine.form,
            dosage: medicine.commonDosage,
            frequency: 'Twice daily',
            duration: '7 days',
            instructions: 'After meals',
            quantity: '1'
        };
        setMedications([...medications, newMedication]);
        setMedicationSearch('');
    };

    const updateMedication = (id, field, value) => {
        setMedications(medications.map(med => 
            med.id === id ? { ...med, [field]: value } : med
        ));
    };

    const removeMedication = (id) => {
        setMedications(medications.filter(med => med.id !== id));
    };

    const handlePrescriptionChange = (field, value) => {
        setPrescriptionData(prev => ({ ...prev, [field]: value }));
    };

    const savePrescription = () => {
        if (!selectedPatient || medications.length === 0) {
            alert('Please select a patient and add at least one medication.');
            return;
        }
        
        const prescription = {
            patient: selectedPatient,
            medications,
            ...prescriptionData,
            date: new Date().toISOString().split('T')[0],
            prescribedBy: 'Dr. Priya Sharma'
        };
        
        console.log('Prescription saved:', prescription);
        alert('Prescription saved successfully!');
        
        // Reset form
        setSelectedPatient(null);
        setMedications([]);
        setPrescriptionData({
            diagnosis: '',
            symptoms: '',
            duration: '',
            instructions: '',
            followUpDate: '',
            notes: ''
        });
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
                            Create Prescription
                        </h1>
                        <button className="btn btn-success" onClick={savePrescription}>
                            <Save size={20} />
                            Save Prescription
                        </button>
                    </div>
                </div>

                <div className="content-body">
                    <div className="prescription-form">
                        {/* Patient Selection */}
                        <div className="form-section">
                            <h3>Patient Information</h3>
                            <div className="patient-search-section">
                                <div className="search-box">
                                    <Search className="search-icon" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search patient by name or phone..."
                                        value={patientSearch}
                                        onChange={(e) => setPatientSearch(e.target.value)}
                                        className="search-input"
                                    />
                                </div>
                                
                                {patientSearch && !selectedPatient && (
                                    <div className="patient-suggestions">
                                        {filteredPatients.map(patient => (
                                            <div 
                                                key={patient.id} 
                                                className="patient-suggestion"
                                                onClick={() => {
                                                    setSelectedPatient(patient);
                                                    setPatientSearch('');
                                                }}
                                            >
                                                <div className="patient-avatar">
                                                    {patient.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="patient-info">
                                                    <div className="patient-name">{patient.name}</div>
                                                    <div className="patient-details">
                                                        {patient.age} years • {patient.phone}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                {selectedPatient && (
                                    <div className="selected-patient">
                                        <div className="patient-card">
                                            <div className="patient-avatar">
                                                {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="patient-info">
                                                <h4>{selectedPatient.name}</h4>
                                                <p>{selectedPatient.age} years • {selectedPatient.phone}</p>
                                                <p>Last visit: {new Date(selectedPatient.lastVisit).toLocaleDateString()}</p>
                                            </div>
                                            <button 
                                                className="btn btn-outline"
                                                onClick={() => setSelectedPatient(null)}
                                            >
                                                Change Patient
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Prescription Details */}
                        <div className="form-section">
                            <h3>Prescription Details</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Diagnosis</label>
                                    <input
                                        type="text"
                                        value={prescriptionData.diagnosis}
                                        onChange={(e) => handlePrescriptionChange('diagnosis', e.target.value)}
                                        className="form-input"
                                        placeholder="Primary diagnosis"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Symptoms</label>
                                    <input
                                        type="text"
                                        value={prescriptionData.symptoms}
                                        onChange={(e) => handlePrescriptionChange('symptoms', e.target.value)}
                                        className="form-input"
                                        placeholder="Patient symptoms"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Treatment Duration</label>
                                    <select
                                        value={prescriptionData.duration}
                                        onChange={(e) => handlePrescriptionChange('duration', e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">Select duration</option>
                                        <option value="3 days">3 days</option>
                                        <option value="7 days">7 days</option>
                                        <option value="15 days">15 days</option>
                                        <option value="30 days">30 days</option>
                                        <option value="60 days">60 days</option>
                                        <option value="90 days">90 days</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Follow-up Date</label>
                                    <input
                                        type="date"
                                        value={prescriptionData.followUpDate}
                                        onChange={(e) => handlePrescriptionChange('followUpDate', e.target.value)}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>General Instructions</label>
                                <textarea
                                    value={prescriptionData.instructions}
                                    onChange={(e) => handlePrescriptionChange('instructions', e.target.value)}
                                    className="form-textarea"
                                    placeholder="General instructions for the patient"
                                    rows="3"
                                />
                            </div>
                        </div>

                        {/* Medication Selection */}
                        <div className="form-section">
                            <h3>Add Medications</h3>
                            <div className="medication-search">
                                <div className="search-box">
                                    <Search className="search-icon" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search Ayurvedic medicines..."
                                        value={medicationSearch}
                                        onChange={(e) => setMedicationSearch(e.target.value)}
                                        className="search-input"
                                    />
                                </div>
                                
                                {medicationSearch && (
                                    <div className="medicine-suggestions">
                                        {filteredMedicines.slice(0, 5).map(medicine => (
                                            <div 
                                                key={medicine.id} 
                                                className="medicine-suggestion"
                                                onClick={() => addMedication(medicine)}
                                            >
                                                <div className="medicine-info">
                                                    <div className="medicine-name">{medicine.name}</div>
                                                    <div className="medicine-details">
                                                        {medicine.category} • {medicine.form} • {medicine.commonDosage}
                                                    </div>
                                                    <div className="medicine-indications">
                                                        {medicine.indications.slice(0, 3).join(', ')}
                                                    </div>
                                                </div>
                                                <button className="add-medicine-btn">
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Selected Medications */}
                        {medications.length > 0 && (
                            <div className="form-section">
                                <h3>Prescribed Medications ({medications.length})</h3>
                                <div className="medications-list">
                                    {medications.map((medication, index) => (
                                        <div key={medication.id} className="medication-item">
                                            <div className="medication-header">
                                                <div className="medication-info">
                                                    <h4>{medication.name}</h4>
                                                    <span className="medication-category">{medication.category} • {medication.form}</span>
                                                </div>
                                                <button 
                                                    className="remove-btn"
                                                    onClick={() => removeMedication(medication.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            
                                            <div className="medication-details-grid">
                                                <div className="detail-group">
                                                    <label>Dosage</label>
                                                    <input
                                                        type="text"
                                                        value={medication.dosage}
                                                        onChange={(e) => updateMedication(medication.id, 'dosage', e.target.value)}
                                                        className="detail-input"
                                                    />
                                                </div>
                                                <div className="detail-group">
                                                    <label>Frequency</label>
                                                    <select
                                                        value={medication.frequency}
                                                        onChange={(e) => updateMedication(medication.id, 'frequency', e.target.value)}
                                                        className="detail-select"
                                                    >
                                                        <option value="Once daily">Once daily</option>
                                                        <option value="Twice daily">Twice daily</option>
                                                        <option value="Three times daily">Three times daily</option>
                                                        <option value="Four times daily">Four times daily</option>
                                                        <option value="As needed">As needed</option>
                                                    </select>
                                                </div>
                                                <div className="detail-group">
                                                    <label>Duration</label>
                                                    <select
                                                        value={medication.duration}
                                                        onChange={(e) => updateMedication(medication.id, 'duration', e.target.value)}
                                                        className="detail-select"
                                                    >
                                                        <option value="3 days">3 days</option>
                                                        <option value="7 days">7 days</option>
                                                        <option value="15 days">15 days</option>
                                                        <option value="30 days">30 days</option>
                                                        <option value="60 days">60 days</option>
                                                        <option value="90 days">90 days</option>
                                                    </select>
                                                </div>
                                                <div className="detail-group">
                                                    <label>Instructions</label>
                                                    <select
                                                        value={medication.instructions}
                                                        onChange={(e) => updateMedication(medication.id, 'instructions', e.target.value)}
                                                        className="detail-select"
                                                    >
                                                        <option value="Before meals">Before meals</option>
                                                        <option value="After meals">After meals</option>
                                                        <option value="With meals">With meals</option>
                                                        <option value="Empty stomach">Empty stomach</option>
                                                        <option value="At bedtime">At bedtime</option>
                                                        <option value="With warm water">With warm water</option>
                                                        <option value="With warm milk">With warm milk</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Additional Notes */}
                        <div className="form-section">
                            <h3>Additional Notes</h3>
                            <textarea
                                value={prescriptionData.notes}
                                onChange={(e) => handlePrescriptionChange('notes', e.target.value)}
                                className="form-textarea"
                                placeholder="Any additional notes, precautions, or dietary recommendations..."
                                rows="4"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .prescription-form {
                    max-width: 1000px;
                    margin: 0 auto;
                }
                
                .form-section {
                    background: white;
                    border-radius: 12px;
                    padding: 2rem;
                    margin-bottom: 2rem;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e2e8f0;
                }
                
                .form-section h3 {
                    margin: 0 0 1.5rem 0;
                    color: #1e293b;
                    font-size: 1.25rem;
                    font-weight: 600;
                }
                
                .patient-suggestions, .medicine-suggestions {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    max-height: 300px;
                    overflow-y: auto;
                    z-index: 10;
                }
                
                .patient-suggestion, .medicine-suggestion {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    cursor: pointer;
                    border-bottom: 1px solid #f1f5f9;
                    transition: background-color 0.2s;
                }
                
                .patient-suggestion:hover, .medicine-suggestion:hover {
                    background: #f8fafc;
                }
                
                .patient-suggestion:last-child, .medicine-suggestion:last-child {
                    border-bottom: none;
                }
                
                .patient-search-section, .medication-search {
                    position: relative;
                }
                
                .selected-patient {
                    margin-top: 1rem;
                }
                
                .patient-card {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.5rem;
                    background: #f8fafc;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                }
                
                .patient-card .patient-info {
                    flex: 1;
                }
                
                .patient-card h4 {
                    margin: 0 0 0.25rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .patient-card p {
                    margin: 0;
                    color: #64748b;
                    font-size: 0.875rem;
                }
                
                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                }
                
                .form-textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    resize: vertical;
                    font-family: inherit;
                }
                
                .medicine-info {
                    flex: 1;
                }
                
                .medicine-name {
                    font-weight: 600;
                    color: #1e293b;
                    margin-bottom: 0.25rem;
                }
                
                .medicine-details {
                    font-size: 0.875rem;
                    color: #64748b;
                    margin-bottom: 0.25rem;
                }
                
                .medicine-indications {
                    font-size: 0.75rem;
                    color: #10b981;
                }
                
                .add-medicine-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 6px;
                    border: none;
                    background: #3b82f6;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.2s;
                }
                
                .add-medicine-btn:hover {
                    background: #1d4ed8;
                }
                
                .medications-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .medication-item {
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 1rem;
                    background: #f8fafc;
                }
                
                .medication-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }
                
                .medication-info h4 {
                    margin: 0 0 0.25rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .medication-category {
                    font-size: 0.875rem;
                    color: #64748b;
                }
                
                .remove-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 6px;
                    border: none;
                    background: #ef4444;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.2s;
                }
                
                .remove-btn:hover {
                    background: #dc2626;
                }
                
                .medication-details-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                }
                
                .detail-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .detail-group label {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #374151;
                }
                
                .detail-input, .detail-select {
                    padding: 0.5rem;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    font-size: 0.875rem;
                }
                
                .detail-input:focus, .detail-select:focus {
                    outline: none;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }
                
                @media (max-width: 768px) {
                    .form-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .medication-details-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .patient-card {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default CreatePrescription;
