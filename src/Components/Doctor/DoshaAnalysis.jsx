import React, { useState } from 'react';
import { Search, User, BarChart3, TrendingUp, Eye, Calendar, Filter, Download, RefreshCw } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function DoshaAnalysis({ 
    activeSection = 'dosha-analysis',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [analysisFilter, setAnalysisFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');

    // Sample dosha analysis data
    const doshaAnalyses = [
        {
            id: 1,
            patientId: 'P001',
            patientName: 'Rajesh Kumar',
            age: 45,
            gender: 'Male',
            analysisDate: '2024-01-15',
            primaryDosha: 'Vata',
            secondaryDosha: 'Pitta',
            doshaPercentages: { vata: 55, pitta: 30, kapha: 15 },
            constitution: 'Vata-Pitta',
            currentImbalance: 'Vata Excess',
            symptoms: ['Anxiety', 'Insomnia', 'Dry skin', 'Irregular digestion'],
            recommendations: [
                'Warm, cooked foods',
                'Regular sleep schedule',
                'Oil massage (Abhyanga)',
                'Meditation and pranayama'
            ],
            lifestyle: {
                diet: 'Irregular eating patterns',
                exercise: 'Moderate',
                stress: 'High',
                sleep: 'Poor quality'
            },
            treatmentPlan: 'Vata pacifying therapy',
            nextReview: '2024-02-15'
        },
        {
            id: 2,
            patientId: 'P002',
            patientName: 'Priya Sharma',
            age: 32,
            gender: 'Female',
            analysisDate: '2024-01-12',
            primaryDosha: 'Pitta',
            secondaryDosha: 'Kapha',
            doshaPercentages: { vata: 20, pitta: 50, kapha: 30 },
            constitution: 'Pitta-Kapha',
            currentImbalance: 'Pitta Aggravation',
            symptoms: ['Acidity', 'Skin inflammation', 'Irritability', 'Heat intolerance'],
            recommendations: [
                'Cool, sweet foods',
                'Avoid spicy and sour foods',
                'Cooling herbs like Aloe Vera',
                'Gentle yoga and swimming'
            ],
            lifestyle: {
                diet: 'Spicy food preference',
                exercise: 'Regular',
                stress: 'Moderate',
                sleep: 'Good'
            },
            treatmentPlan: 'Pitta cooling protocol',
            nextReview: '2024-02-12'
        },
        {
            id: 3,
            patientId: 'P003',
            patientName: 'Amit Patel',
            age: 38,
            gender: 'Male',
            analysisDate: '2024-01-10',
            primaryDosha: 'Kapha',
            secondaryDosha: 'Vata',
            doshaPercentages: { vata: 25, pitta: 20, kapha: 55 },
            constitution: 'Kapha-Vata',
            currentImbalance: 'Kapha Stagnation',
            symptoms: ['Weight gain', 'Lethargy', 'Congestion', 'Slow metabolism'],
            recommendations: [
                'Light, warm, spicy foods',
                'Regular vigorous exercise',
                'Dry brushing',
                'Energizing pranayama'
            ],
            lifestyle: {
                diet: 'Heavy, sweet foods',
                exercise: 'Sedentary',
                stress: 'Low',
                sleep: 'Excessive'
            },
            treatmentPlan: 'Kapha reduction therapy',
            nextReview: '2024-02-10'
        },
        {
            id: 4,
            patientId: 'P004',
            patientName: 'Sunita Reddy',
            age: 28,
            gender: 'Female',
            analysisDate: '2024-01-08',
            primaryDosha: 'Vata',
            secondaryDosha: 'Kapha',
            doshaPercentages: { vata: 45, pitta: 20, kapha: 35 },
            constitution: 'Vata-Kapha',
            currentImbalance: 'Balanced',
            symptoms: ['Occasional fatigue', 'Mild anxiety'],
            recommendations: [
                'Maintain current routine',
                'Seasonal adjustments',
                'Regular oil massage',
                'Consistent meal times'
            ],
            lifestyle: {
                diet: 'Balanced',
                exercise: 'Regular',
                stress: 'Low',
                sleep: 'Good'
            },
            treatmentPlan: 'Maintenance protocol',
            nextReview: '2024-03-08'
        }
    ];

    const filteredAnalyses = doshaAnalyses.filter(analysis => {
        const matchesSearch = analysis.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            analysis.patientId.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = analysisFilter === 'all' || 
                            analysis.primaryDosha.toLowerCase() === analysisFilter.toLowerCase() ||
                            analysis.currentImbalance.toLowerCase().includes(analysisFilter.toLowerCase());
        
        return matchesSearch && matchesFilter;
    });

    const getDoshaColor = (dosha) => {
        switch (dosha.toLowerCase()) {
            case 'vata': return '#8B5CF6';
            case 'pitta': return '#EF4444';
            case 'kapha': return '#10B981';
            default: return '#6B7280';
        }
    };

    const getImbalanceStatus = (imbalance) => {
        if (imbalance === 'Balanced') return 'balanced';
        if (imbalance.includes('Excess') || imbalance.includes('Aggravation')) return 'imbalanced';
        return 'moderate';
    };

    const doshaStats = {
        total: doshaAnalyses.length,
        vata: doshaAnalyses.filter(a => a.primaryDosha === 'Vata').length,
        pitta: doshaAnalyses.filter(a => a.primaryDosha === 'Pitta').length,
        kapha: doshaAnalyses.filter(a => a.primaryDosha === 'Kapha').length,
        balanced: doshaAnalyses.filter(a => a.currentImbalance === 'Balanced').length,
        imbalanced: doshaAnalyses.filter(a => a.currentImbalance !== 'Balanced').length
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
                            <BarChart3 className="title-icon" />
                            Dosha Analysis Dashboard
                        </h1>
                        <div className="header-actions">
                            <button className="btn btn-secondary">
                                <Download size={20} />
                                Export Report
                            </button>
                            <button className="btn btn-primary">
                                <RefreshCw size={20} />
                                Refresh Data
                            </button>
                        </div>
                    </div>
                    
                    <div className="dosha-stats">
                        <div className="stat-card">
                            <div className="stat-icon total">
                                <User size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{doshaStats.total}</h3>
                                <p>Total Analyses</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon vata">
                                <TrendingUp size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{doshaStats.vata}</h3>
                                <p>Vata Dominant</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon pitta">
                                <TrendingUp size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{doshaStats.pitta}</h3>
                                <p>Pitta Dominant</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon kapha">
                                <TrendingUp size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{doshaStats.kapha}</h3>
                                <p>Kapha Dominant</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon balanced">
                                <BarChart3 size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{doshaStats.balanced}</h3>
                                <p>Balanced</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-body">
                    <div className="filters-section">
                        <div className="search-filter-row">
                            <div className="search-box">
                                <Search className="search-icon" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search patients..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            
                            <div className="filter-group">
                                <select 
                                    value={analysisFilter} 
                                    onChange={(e) => setAnalysisFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Analyses</option>
                                    <option value="vata">Vata Dominant</option>
                                    <option value="pitta">Pitta Dominant</option>
                                    <option value="kapha">Kapha Dominant</option>
                                    <option value="balanced">Balanced</option>
                                    <option value="imbalanced">Imbalanced</option>
                                </select>
                                
                                <div className="view-toggle">
                                    <button 
                                        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                        onClick={() => setViewMode('grid')}
                                    >
                                        <BarChart3 size={16} />
                                    </button>
                                    <button 
                                        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                        onClick={() => setViewMode('list')}
                                    >
                                        <Filter size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`analyses-container ${viewMode}`}>
                        {filteredAnalyses.map(analysis => (
                            <div key={analysis.id} className="analysis-card">
                                <div className="analysis-header">
                                    <div className="patient-info">
                                        <h3>{analysis.patientName}</h3>
                                        <span className="patient-id">ID: {analysis.patientId}</span>
                                        <div className="patient-details">
                                            <span>{analysis.age}Y, {analysis.gender}</span>
                                            <span className="analysis-date">
                                                <Calendar size={14} />
                                                {new Date(analysis.analysisDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="dosha-constitution">
                                        <div className="constitution-badge">
                                            {analysis.constitution}
                                        </div>
                                        <div className={`imbalance-status ${getImbalanceStatus(analysis.currentImbalance)}`}>
                                            {analysis.currentImbalance}
                                        </div>
                                    </div>
                                </div>

                                <div className="dosha-breakdown">
                                    <h4>Dosha Distribution</h4>
                                    <div className="dosha-bars">
                                        <div className="dosha-bar">
                                            <div className="dosha-label">
                                                <span>Vata</span>
                                                <span>{analysis.doshaPercentages.vata}%</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress-fill vata"
                                                    style={{ width: `${analysis.doshaPercentages.vata}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="dosha-bar">
                                            <div className="dosha-label">
                                                <span>Pitta</span>
                                                <span>{analysis.doshaPercentages.pitta}%</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress-fill pitta"
                                                    style={{ width: `${analysis.doshaPercentages.pitta}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="dosha-bar">
                                            <div className="dosha-label">
                                                <span>Kapha</span>
                                                <span>{analysis.doshaPercentages.kapha}%</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress-fill kapha"
                                                    style={{ width: `${analysis.doshaPercentages.kapha}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="analysis-details">
                                    <div className="symptoms-section">
                                        <h5>Current Symptoms</h5>
                                        <div className="symptoms-list">
                                            {analysis.symptoms.map((symptom, index) => (
                                                <span key={index} className="symptom-tag">
                                                    {symptom}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="lifestyle-section">
                                        <h5>Lifestyle Assessment</h5>
                                        <div className="lifestyle-grid">
                                            <div className="lifestyle-item">
                                                <span className="lifestyle-label">Diet:</span>
                                                <span className="lifestyle-value">{analysis.lifestyle.diet}</span>
                                            </div>
                                            <div className="lifestyle-item">
                                                <span className="lifestyle-label">Exercise:</span>
                                                <span className="lifestyle-value">{analysis.lifestyle.exercise}</span>
                                            </div>
                                            <div className="lifestyle-item">
                                                <span className="lifestyle-label">Stress:</span>
                                                <span className="lifestyle-value">{analysis.lifestyle.stress}</span>
                                            </div>
                                            <div className="lifestyle-item">
                                                <span className="lifestyle-label">Sleep:</span>
                                                <span className="lifestyle-value">{analysis.lifestyle.sleep}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="recommendations-section">
                                        <h5>Recommendations</h5>
                                        <ul className="recommendations-list">
                                            {analysis.recommendations.map((rec, index) => (
                                                <li key={index}>{rec}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="analysis-footer">
                                    <div className="treatment-plan">
                                        <strong>Treatment Plan:</strong> {analysis.treatmentPlan}
                                    </div>
                                    <div className="next-review">
                                        <strong>Next Review:</strong> {new Date(analysis.nextReview).toLocaleDateString()}
                                    </div>
                                    <button className="btn btn-primary btn-sm">
                                        <Eye size={16} />
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredAnalyses.length === 0 && (
                        <div className="no-results">
                            <BarChart3 size={48} />
                            <h3>No analyses found</h3>
                            <p>Try adjusting your search criteria or filters.</p>
                        </div>
                    )}
                </div>
            </div>
            
            <style jsx>{`
                .dosha-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-top: 1.5rem;
                }
                
                .stat-card {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.5rem;
                    background: white;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }
                
                .stat-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }
                
                .stat-icon.total { background: #3b82f6; }
                .stat-icon.vata { background: #8b5cf6; }
                .stat-icon.pitta { background: #ef4444; }
                .stat-icon.kapha { background: #10b981; }
                .stat-icon.balanced { background: #f59e0b; }
                
                .stat-info h3 {
                    margin: 0 0 0.25rem 0;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1e293b;
                }
                
                .stat-info p {
                    margin: 0;
                    color: #64748b;
                    font-size: 0.875rem;
                }
                
                .filters-section {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    border: 1px solid #e2e8f0;
                }
                
                .search-filter-row {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    flex-wrap: wrap;
                }
                
                .search-box {
                    flex: 1;
                    min-width: 300px;
                }
                
                .filter-group {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }
                
                .filter-select {
                    padding: 0.5rem 1rem;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    background: white;
                    color: #374151;
                    font-size: 0.875rem;
                }
                
                .view-toggle {
                    display: flex;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    overflow: hidden;
                }
                
                .view-btn {
                    padding: 0.5rem;
                    border: none;
                    background: white;
                    color: #6b7280;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .view-btn.active {
                    background: #3b82f6;
                    color: white;
                }
                
                .analyses-container.grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 1.5rem;
                }
                
                .analyses-container.list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .analysis-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .analysis-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .analysis-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #f1f5f9;
                }
                
                .patient-info h3 {
                    margin: 0 0 0.25rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .patient-id {
                    font-size: 0.875rem;
                    color: #64748b;
                    font-weight: 500;
                }
                
                .patient-details {
                    display: flex;
                    gap: 1rem;
                    margin-top: 0.5rem;
                    font-size: 0.875rem;
                    color: #64748b;
                }
                
                .analysis-date {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }
                
                .dosha-constitution {
                    text-align: right;
                }
                
                .constitution-badge {
                    background: #f0f9ff;
                    color: #0369a1;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }
                
                .imbalance-status {
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                
                .imbalance-status.balanced {
                    background: #f0fdf4;
                    color: #166534;
                }
                
                .imbalance-status.imbalanced {
                    background: #fef2f2;
                    color: #dc2626;
                }
                
                .imbalance-status.moderate {
                    background: #fffbeb;
                    color: #d97706;
                }
                
                .dosha-breakdown h4 {
                    margin: 0 0 1rem 0;
                    color: #1e293b;
                    font-size: 1rem;
                    font-weight: 600;
                }
                
                .dosha-bars {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .dosha-bar {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }
                
                .dosha-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #374151;
                }
                
                .progress-bar {
                    height: 8px;
                    background: #f1f5f9;
                    border-radius: 4px;
                    overflow: hidden;
                }
                
                .progress-fill {
                    height: 100%;
                    transition: width 0.3s ease;
                }
                
                .progress-fill.vata { background: #8b5cf6; }
                .progress-fill.pitta { background: #ef4444; }
                .progress-fill.kapha { background: #10b981; }
                
                .analysis-details {
                    margin: 1.5rem 0;
                }
                
                .symptoms-section, .lifestyle-section, .recommendations-section {
                    margin-bottom: 1.5rem;
                }
                
                .symptoms-section h5, .lifestyle-section h5, .recommendations-section h5 {
                    margin: 0 0 0.75rem 0;
                    color: #1e293b;
                    font-size: 0.875rem;
                    font-weight: 600;
                }
                
                .symptoms-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                
                .symptom-tag {
                    background: #fef3c7;
                    color: #92400e;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .lifestyle-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 0.5rem;
                }
                
                .lifestyle-item {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.875rem;
                }
                
                .lifestyle-label {
                    color: #64748b;
                    font-weight: 500;
                }
                
                .lifestyle-value {
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .recommendations-list {
                    margin: 0;
                    padding-left: 1.25rem;
                }
                
                .recommendations-list li {
                    margin-bottom: 0.25rem;
                    font-size: 0.875rem;
                    color: #374151;
                    line-height: 1.4;
                }
                
                .analysis-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1rem;
                    border-top: 1px solid #f1f5f9;
                    font-size: 0.875rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                
                .treatment-plan, .next-review {
                    color: #64748b;
                }
                
                .treatment-plan strong, .next-review strong {
                    color: #1e293b;
                }
                
                .no-results {
                    text-align: center;
                    padding: 3rem 2rem;
                    color: #64748b;
                }
                
                .no-results h3 {
                    margin: 1rem 0 0.5rem 0;
                    color: #1e293b;
                }
                
                @media (max-width: 768px) {
                    .dosha-stats {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .search-filter-row {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    
                    .search-box {
                        min-width: auto;
                    }
                    
                    .filter-group {
                        justify-content: space-between;
                    }
                    
                    .analyses-container.grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .analysis-header {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .dosha-constitution {
                        text-align: left;
                    }
                    
                    .lifestyle-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .analysis-footer {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }
            `}</style>
        </div>
    );
}

export default DoshaAnalysis;
