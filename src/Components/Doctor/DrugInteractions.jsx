import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, Info, Shield, Zap, X, Plus } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function DrugInteractions({ 
    activeSection = 'drug-interactions',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [selectedMedicines, setSelectedMedicines] = useState([]);
    const [medicineSearch, setMedicineSearch] = useState('');
    const [interactions, setInteractions] = useState([]);
    const [hasChecked, setHasChecked] = useState(false);

    // Ayurvedic medicines database with interaction data
    const ayurvedicMedicines = [
        {
            id: 1,
            name: 'Triphala Churna',
            category: 'Digestive',
            activeCompounds: ['Tannins', 'Vitamin C', 'Gallic acid'],
            contraindications: ['Pregnancy', 'Diarrhea', 'Dehydration'],
            interactions: [
                { with: 'Warfarin', severity: 'moderate', description: 'May increase bleeding risk due to vitamin C content' },
                { with: 'Iron supplements', severity: 'mild', description: 'Tannins may reduce iron absorption' }
            ]
        },
        {
            id: 2,
            name: 'Ashwagandha',
            category: 'Adaptogen',
            activeCompounds: ['Withanolides', 'Alkaloids'],
            contraindications: ['Hyperthyroidism', 'Pregnancy', 'Autoimmune disorders'],
            interactions: [
                { with: 'Thyroid medications', severity: 'high', description: 'May increase thyroid hormone levels' },
                { with: 'Immunosuppressants', severity: 'moderate', description: 'May counteract immunosuppressive effects' },
                { with: 'Sedatives', severity: 'moderate', description: 'May enhance sedative effects' }
            ]
        },
        {
            id: 3,
            name: 'Arjunarishta',
            category: 'Cardiac',
            activeCompounds: ['Arjunolic acid', 'Tannins', 'Saponins'],
            contraindications: ['Hypotension', 'Pregnancy'],
            interactions: [
                { with: 'ACE inhibitors', severity: 'moderate', description: 'May enhance hypotensive effects' },
                { with: 'Beta blockers', severity: 'moderate', description: 'Additive cardiac effects' },
                { with: 'Digoxin', severity: 'high', description: 'May increase digoxin toxicity' }
            ]
        },
        {
            id: 4,
            name: 'Brahmi',
            category: 'Nootropic',
            activeCompounds: ['Bacosides', 'Alkaloids'],
            contraindications: ['Bradycardia', 'Ulcers'],
            interactions: [
                { with: 'Anticholinesterase drugs', severity: 'moderate', description: 'May enhance cholinergic effects' },
                { with: 'Thyroid medications', severity: 'mild', description: 'May affect thyroid function' }
            ]
        },
        {
            id: 5,
            name: 'Guggulu',
            category: 'Anti-inflammatory',
            activeCompounds: ['Guggulsterones', 'Essential oils'],
            contraindications: ['Pregnancy', 'Kidney disease', 'Liver disease'],
            interactions: [
                { with: 'Thyroid medications', severity: 'high', description: 'May significantly increase thyroid hormone levels' },
                { with: 'Blood thinners', severity: 'moderate', description: 'May increase bleeding risk' },
                { with: 'Propranolol', severity: 'moderate', description: 'May reduce propranolol effectiveness' }
            ]
        },
        {
            id: 6,
            name: 'Shankhpushpi',
            category: 'Nervine',
            activeCompounds: ['Alkaloids', 'Glycosides'],
            contraindications: ['Hypotension', 'Pregnancy'],
            interactions: [
                { with: 'Phenytoin', severity: 'high', description: 'May reduce phenytoin levels significantly' },
                { with: 'Antihypertensives', severity: 'moderate', description: 'May enhance hypotensive effects' }
            ]
        },
        {
            id: 7,
            name: 'Shatavari',
            category: 'Reproductive tonic',
            activeCompounds: ['Saponins', 'Alkaloids'],
            contraindications: ['Estrogen-sensitive conditions', 'Kidney stones'],
            interactions: [
                { with: 'Hormone therapy', severity: 'moderate', description: 'May have estrogenic effects' },
                { with: 'Diuretics', severity: 'mild', description: 'May enhance diuretic effects' }
            ]
        },
        {
            id: 8,
            name: 'Tulsi',
            category: 'Respiratory',
            activeCompounds: ['Eugenol', 'Ursolic acid'],
            contraindications: ['Blood clotting disorders', 'Surgery (2 weeks prior)'],
            interactions: [
                { with: 'Blood thinners', severity: 'moderate', description: 'May increase bleeding risk' },
                { with: 'Diabetes medications', severity: 'mild', description: 'May lower blood sugar' }
            ]
        }
    ];

    const filteredMedicines = ayurvedicMedicines.filter(medicine =>
        medicine.name.toLowerCase().includes(medicineSearch.toLowerCase()) ||
        medicine.category.toLowerCase().includes(medicineSearch.toLowerCase())
    ).filter(medicine => 
        !selectedMedicines.find(selected => selected.id === medicine.id)
    );

    const addMedicine = (medicine) => {
        setSelectedMedicines([...selectedMedicines, medicine]);
        setMedicineSearch('');
        setHasChecked(false);
    };

    const removeMedicine = (medicineId) => {
        setSelectedMedicines(selectedMedicines.filter(med => med.id !== medicineId));
        setHasChecked(false);
    };

    const checkInteractions = () => {
        const foundInteractions = [];
        
        // Check interactions between selected medicines
        for (let i = 0; i < selectedMedicines.length; i++) {
            for (let j = i + 1; j < selectedMedicines.length; j++) {
                const med1 = selectedMedicines[i];
                const med2 = selectedMedicines[j];
                
                // Check if med1 has interactions with med2
                const interaction1 = med1.interactions?.find(int => 
                    int.with.toLowerCase().includes(med2.name.toLowerCase()) ||
                    med2.name.toLowerCase().includes(int.with.toLowerCase())
                );
                
                if (interaction1) {
                    foundInteractions.push({
                        medicine1: med1.name,
                        medicine2: med2.name,
                        severity: interaction1.severity,
                        description: interaction1.description,
                        type: 'ayurvedic-ayurvedic'
                    });
                }
                
                // Check contraindications overlap
                const commonContraindications = med1.contraindications.filter(contra =>
                    med2.contraindications.includes(contra)
                );
                
                if (commonContraindications.length > 0) {
                    foundInteractions.push({
                        medicine1: med1.name,
                        medicine2: med2.name,
                        severity: 'mild',
                        description: `Both medicines contraindicated in: ${commonContraindications.join(', ')}`,
                        type: 'contraindication-overlap'
                    });
                }
            }
            
            // Add individual medicine interactions with common drugs
            selectedMedicines[i].interactions?.forEach(interaction => {
                foundInteractions.push({
                    medicine1: selectedMedicines[i].name,
                    medicine2: interaction.with,
                    severity: interaction.severity,
                    description: interaction.description,
                    type: 'ayurvedic-conventional'
                });
            });
        }
        
        setInteractions(foundInteractions);
        setHasChecked(true);
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return 'text-red-600 bg-red-100 border-red-200';
            case 'moderate': return 'text-orange-600 bg-orange-100 border-orange-200';
            case 'mild': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
            default: return 'text-gray-600 bg-gray-100 border-gray-200';
        }
    };

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 'high': return <AlertTriangle size={16} />;
            case 'moderate': return <Zap size={16} />;
            case 'mild': return <Info size={16} />;
            default: return <Shield size={16} />;
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
                            <Shield className="title-icon" />
                            Drug Interaction Checker
                        </h1>
                        <button 
                            className="btn btn-primary"
                            onClick={checkInteractions}
                            disabled={selectedMedicines.length < 1}
                        >
                            <Search size={20} />
                            Check Interactions
                        </button>
                    </div>
                    
                    <div className="interaction-info">
                        <div className="info-card">
                            <AlertTriangle className="info-icon high" />
                            <div>
                                <h4>High Risk</h4>
                                <p>Serious interactions requiring immediate attention</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <Zap className="info-icon moderate" />
                            <div>
                                <h4>Moderate Risk</h4>
                                <p>Monitor closely and adjust dosages if needed</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <Info className="info-icon mild" />
                            <div>
                                <h4>Mild Risk</h4>
                                <p>Minor interactions with minimal clinical significance</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-body">
                    {/* Medicine Selection */}
                    <div className="form-section">
                        <h3>Select Medicines to Check</h3>
                        <div className="medicine-search">
                            <div className="search-box">
                                <Search className="search-icon" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search Ayurvedic medicines..."
                                    value={medicineSearch}
                                    onChange={(e) => setMedicineSearch(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            
                            {medicineSearch && (
                                <div className="medicine-suggestions">
                                    {filteredMedicines.slice(0, 5).map(medicine => (
                                        <div 
                                            key={medicine.id} 
                                            className="medicine-suggestion"
                                            onClick={() => addMedicine(medicine)}
                                        >
                                            <div className="medicine-info">
                                                <div className="medicine-name">{medicine.name}</div>
                                                <div className="medicine-category">{medicine.category}</div>
                                            </div>
                                            <button className="add-medicine-btn">
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        {/* Selected Medicines */}
                        {selectedMedicines.length > 0 && (
                            <div className="selected-medicines">
                                <h4>Selected Medicines ({selectedMedicines.length})</h4>
                                <div className="medicines-grid">
                                    {selectedMedicines.map(medicine => (
                                        <div key={medicine.id} className="selected-medicine-card">
                                            <div className="medicine-header">
                                                <div>
                                                    <h5>{medicine.name}</h5>
                                                    <span className="medicine-category">{medicine.category}</span>
                                                </div>
                                                <button 
                                                    className="remove-btn"
                                                    onClick={() => removeMedicine(medicine.id)}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                            <div className="medicine-compounds">
                                                <strong>Active compounds:</strong>
                                                <div className="compounds-list">
                                                    {medicine.activeCompounds.map((compound, index) => (
                                                        <span key={index} className="compound-tag">
                                                            {compound}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="medicine-contraindications">
                                                <strong>Contraindications:</strong>
                                                <p>{medicine.contraindications.join(', ')}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Interaction Results */}
                    {hasChecked && (
                        <div className="form-section">
                            <h3>Interaction Analysis Results</h3>
                            
                            {interactions.length === 0 ? (
                                <div className="no-interactions">
                                    <CheckCircle className="success-icon" size={48} />
                                    <h4>No Significant Interactions Found</h4>
                                    <p>The selected medicines appear to be safe to use together based on available data.</p>
                                    <div className="safety-note">
                                        <Info size={16} />
                                        <span>Always consult with a healthcare provider before combining medications.</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="interactions-list">
                                    <div className="interactions-summary">
                                        <div className="summary-stats">
                                            <div className="stat-item high">
                                                <AlertTriangle size={20} />
                                                <span>{interactions.filter(i => i.severity === 'high').length} High Risk</span>
                                            </div>
                                            <div className="stat-item moderate">
                                                <Zap size={20} />
                                                <span>{interactions.filter(i => i.severity === 'moderate').length} Moderate Risk</span>
                                            </div>
                                            <div className="stat-item mild">
                                                <Info size={20} />
                                                <span>{interactions.filter(i => i.severity === 'mild').length} Mild Risk</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {interactions.map((interaction, index) => (
                                        <div key={index} className={`interaction-card ${interaction.severity}`}>
                                            <div className="interaction-header">
                                                <div className={`severity-badge ${getSeverityColor(interaction.severity)}`}>
                                                    {getSeverityIcon(interaction.severity)}
                                                    <span>{interaction.severity.toUpperCase()} RISK</span>
                                                </div>
                                                <div className="interaction-type">
                                                    {interaction.type === 'ayurvedic-ayurvedic' && 'Ayurvedic-Ayurvedic'}
                                                    {interaction.type === 'ayurvedic-conventional' && 'Ayurvedic-Conventional'}
                                                    {interaction.type === 'contraindication-overlap' && 'Contraindication Overlap'}
                                                </div>
                                            </div>
                                            
                                            <div className="interaction-details">
                                                <div className="medicine-pair">
                                                    <span className="medicine-name">{interaction.medicine1}</span>
                                                    <span className="interaction-symbol">⚡</span>
                                                    <span className="medicine-name">{interaction.medicine2}</span>
                                                </div>
                                                <p className="interaction-description">{interaction.description}</p>
                                            </div>
                                            
                                            <div className="interaction-recommendations">
                                                {interaction.severity === 'high' && (
                                                    <div className="recommendation high">
                                                        <AlertTriangle size={16} />
                                                        <span>Avoid combination or use with extreme caution under medical supervision</span>
                                                    </div>
                                                )}
                                                {interaction.severity === 'moderate' && (
                                                    <div className="recommendation moderate">
                                                        <Zap size={16} />
                                                        <span>Monitor closely and consider dose adjustments</span>
                                                    </div>
                                                )}
                                                {interaction.severity === 'mild' && (
                                                    <div className="recommendation mild">
                                                        <Info size={16} />
                                                        <span>Monitor for any unusual effects</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            <style jsx>{`
                .interaction-info {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1rem;
                    margin-top: 1.5rem;
                }
                
                .info-card {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: white;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                }
                
                .info-icon {
                    flex-shrink: 0;
                }
                
                .info-icon.high { color: #ef4444; }
                .info-icon.moderate { color: #f59e0b; }
                .info-icon.mild { color: #3b82f6; }
                
                .info-card h4 {
                    margin: 0 0 0.25rem 0;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #1e293b;
                }
                
                .info-card p {
                    margin: 0;
                    font-size: 0.75rem;
                    color: #64748b;
                }
                
                .form-section {
                    background: white;
                    border-radius: 12px;
                    padding: 2rem;
                    margin-bottom: 2rem;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e2e8f0;
                }
                
                .medicine-search {
                    position: relative;
                    margin-bottom: 2rem;
                }
                
                .medicine-suggestions {
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
                
                .medicine-suggestion {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    cursor: pointer;
                    border-bottom: 1px solid #f1f5f9;
                    transition: background-color 0.2s;
                }
                
                .medicine-suggestion:hover {
                    background: #f8fafc;
                }
                
                .medicine-suggestion:last-child {
                    border-bottom: none;
                }
                
                .medicine-info {
                    flex: 1;
                }
                
                .medicine-name {
                    font-weight: 600;
                    color: #1e293b;
                    margin-bottom: 0.25rem;
                }
                
                .medicine-category {
                    font-size: 0.875rem;
                    color: #64748b;
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
                
                .selected-medicines h4 {
                    margin: 0 0 1rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .medicines-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1rem;
                }
                
                .selected-medicine-card {
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 1rem;
                    background: #f8fafc;
                }
                
                .medicine-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }
                
                .medicine-header h5 {
                    margin: 0 0 0.25rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .remove-btn {
                    width: 24px;
                    height: 24px;
                    border-radius: 4px;
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
                
                .medicine-compounds, .medicine-contraindications {
                    margin-bottom: 0.75rem;
                    font-size: 0.875rem;
                }
                
                .medicine-compounds strong, .medicine-contraindications strong {
                    color: #374151;
                    display: block;
                    margin-bottom: 0.25rem;
                }
                
                .compounds-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.25rem;
                }
                
                .compound-tag {
                    background: #dbeafe;
                    color: #1d4ed8;
                    padding: 0.125rem 0.5rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .medicine-contraindications p {
                    margin: 0;
                    color: #64748b;
                }
                
                .no-interactions {
                    text-align: center;
                    padding: 3rem 2rem;
                }
                
                .success-icon {
                    color: #10b981;
                    margin-bottom: 1rem;
                }
                
                .no-interactions h4 {
                    color: #1e293b;
                    margin: 0 0 0.5rem 0;
                    font-size: 1.25rem;
                    font-weight: 600;
                }
                
                .no-interactions p {
                    color: #64748b;
                    margin: 0 0 1.5rem 0;
                }
                
                .safety-note {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    justify-content: center;
                    padding: 1rem;
                    background: #f0f9ff;
                    border-radius: 8px;
                    color: #0369a1;
                    font-size: 0.875rem;
                }
                
                .interactions-summary {
                    margin-bottom: 2rem;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 8px;
                }
                
                .summary-stats {
                    display: flex;
                    gap: 2rem;
                    justify-content: center;
                }
                
                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 600;
                }
                
                .stat-item.high { color: #ef4444; }
                .stat-item.moderate { color: #f59e0b; }
                .stat-item.mild { color: #3b82f6; }
                
                .interactions-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .interaction-card {
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 1.5rem;
                    background: white;
                }
                
                .interaction-card.high {
                    border-left: 4px solid #ef4444;
                    background: #fef2f2;
                }
                
                .interaction-card.moderate {
                    border-left: 4px solid #f59e0b;
                    background: #fffbeb;
                }
                
                .interaction-card.mild {
                    border-left: 4px solid #3b82f6;
                    background: #eff6ff;
                }
                
                .interaction-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                
                .severity-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border: 1px solid;
                }
                
                .interaction-type {
                    font-size: 0.75rem;
                    color: #64748b;
                    font-weight: 500;
                }
                
                .medicine-pair {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 0.75rem;
                    font-weight: 600;
                    color: #1e293b;
                }
                
                .interaction-symbol {
                    color: #f59e0b;
                    font-size: 1.25rem;
                }
                
                .interaction-description {
                    color: #64748b;
                    margin: 0 0 1rem 0;
                    line-height: 1.5;
                }
                
                .recommendation {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem;
                    border-radius: 6px;
                    font-size: 0.875rem;
                    font-weight: 500;
                }
                
                .recommendation.high {
                    background: #fef2f2;
                    color: #dc2626;
                    border: 1px solid #fecaca;
                }
                
                .recommendation.moderate {
                    background: #fffbeb;
                    color: #d97706;
                    border: 1px solid #fed7aa;
                }
                
                .recommendation.mild {
                    background: #eff6ff;
                    color: #2563eb;
                    border: 1px solid #bfdbfe;
                }
                
                @media (max-width: 768px) {
                    .interaction-info {
                        grid-template-columns: 1fr;
                    }
                    
                    .medicines-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .summary-stats {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .interaction-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.5rem;
                    }
                    
                    .medicine-pair {
                        flex-direction: column;
                        gap: 0.5rem;
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    );
}

export default DrugInteractions;
