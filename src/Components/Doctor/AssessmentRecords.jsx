import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Eye, Edit, Download, FileText, Heart, Brain, Zap, TrendingUp, BarChart3 } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function AssessmentRecords({ 
    activeSection = 'assessment-records',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [doshaFilter, setDoshaFilter] = useState('all');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [expandedRecords, setExpandedRecords] = useState({});

    // Sample assessment records data
    const [assessmentRecords] = useState([
        {
            id: 1,
            patientName: 'Rajesh Kumar',
            patientAge: 45,
            patientGender: 'Male',
            assessmentDate: '2024-01-10',
            dominantDosha: 'Vata',
            doshaPercentages: { vata: 55, pitta: 30, kapha: 15 },
            constitution: 'Vata-Pitta',
            symptoms: ['Joint stiffness', 'Anxiety', 'Irregular digestion', 'Dry skin'],
            recommendations: {
                diet: 'Warm, cooked foods with healthy fats',
                lifestyle: 'Regular sleep schedule, stress management',
                exercise: 'Gentle yoga, walking',
                herbs: ['Ashwagandha', 'Brahmi', 'Triphala']
            },
            followUpDate: '2024-02-10',
            assessedBy: 'Dr. Priya Sharma',
            notes: 'Patient shows classic Vata imbalance with secondary Pitta aggravation. Recommended lifestyle modifications and herbal support.'
        },
        {
            id: 2,
            patientName: 'Sunita Reddy',
            patientAge: 32,
            patientGender: 'Female',
            assessmentDate: '2024-01-08',
            dominantDosha: 'Pitta',
            doshaPercentages: { vata: 20, pitta: 60, kapha: 20 },
            constitution: 'Pitta',
            symptoms: ['Acidity', 'Skin irritation', 'Anger issues', 'Heat intolerance'],
            recommendations: {
                diet: 'Cool, sweet foods, avoid spicy and sour',
                lifestyle: 'Cooling practices, meditation',
                exercise: 'Swimming, evening walks',
                herbs: ['Amalaki', 'Shatavari', 'Guduchi']
            },
            followUpDate: '2024-02-08',
            assessedBy: 'Dr. Priya Sharma',
            notes: 'Strong Pitta constitution with current aggravation. Focus on cooling therapies and stress reduction.'
        },
        {
            id: 3,
            patientName: 'Amit Patel',
            patientAge: 28,
            patientGender: 'Male',
            assessmentDate: '2024-01-05',
            dominantDosha: 'Kapha',
            doshaPercentages: { vata: 15, pitta: 25, kapha: 60 },
            constitution: 'Kapha-Pitta',
            symptoms: ['Weight gain', 'Lethargy', 'Congestion', 'Slow digestion'],
            recommendations: {
                diet: 'Light, spicy foods, reduce dairy',
                lifestyle: 'Active routine, early rising',
                exercise: 'Vigorous cardio, strength training',
                herbs: ['Trikatu', 'Guggulu', 'Punarnava']
            },
            followUpDate: '2024-02-05',
            assessedBy: 'Dr. Priya Sharma',
            notes: 'Kapha predominant with sluggish metabolism. Needs stimulating therapies and active lifestyle.'
        },
        {
            id: 4,
            patientName: 'Meera Joshi',
            patientAge: 35,
            patientGender: 'Female',
            assessmentDate: '2024-01-12',
            dominantDosha: 'Vata',
            doshaPercentages: { vata: 50, pitta: 35, kapha: 15 },
            constitution: 'Vata-Pitta',
            symptoms: ['Insomnia', 'Anxiety', 'Irregular periods', 'Dry hair'],
            recommendations: {
                diet: 'Nourishing, oily foods, regular meals',
                lifestyle: 'Consistent routine, oil massage',
                exercise: 'Gentle yoga, pranayama',
                herbs: ['Jatamansi', 'Shatavari', 'Brahmi']
            },
            followUpDate: '2024-02-12',
            assessedBy: 'Dr. Priya Sharma',
            notes: 'Vata imbalance affecting nervous system and reproductive health. Focus on grounding practices.'
        },
        {
            id: 5,
            patientName: 'Vikram Singh',
            patientAge: 41,
            patientGender: 'Male',
            assessmentDate: '2023-12-28',
            dominantDosha: 'Pitta',
            doshaPercentages: { vata: 25, pitta: 55, kapha: 20 },
            constitution: 'Pitta-Vata',
            symptoms: ['Hypertension', 'Irritability', 'Heartburn', 'Headaches'],
            recommendations: {
                diet: 'Cooling foods, avoid alcohol and caffeine',
                lifestyle: 'Stress management, cooling practices',
                exercise: 'Moderate intensity, avoid overheating',
                herbs: ['Arjuna', 'Brahmi', 'Saraswatarishta']
            },
            followUpDate: '2024-01-28',
            assessedBy: 'Dr. Priya Sharma',
            notes: 'Pitta aggravation with cardiovascular involvement. Requires cooling and calming interventions.'
        }
    ]);

    // Filter records based on search and filters
    const filteredRecords = assessmentRecords.filter(record => {
        const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            record.constitution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            record.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesDosha = doshaFilter === 'all' || record.dominantDosha.toLowerCase() === doshaFilter.toLowerCase();
        
        const matchesDate = (!dateRange.start || new Date(record.assessmentDate) >= new Date(dateRange.start)) &&
                          (!dateRange.end || new Date(record.assessmentDate) <= new Date(dateRange.end));

        return matchesSearch && matchesDosha && matchesDate;
    });

    // Statistics
    const stats = {
        total: assessmentRecords.length,
        vata: assessmentRecords.filter(r => r.dominantDosha === 'Vata').length,
        pitta: assessmentRecords.filter(r => r.dominantDosha === 'Pitta').length,
        kapha: assessmentRecords.filter(r => r.dominantDosha === 'Kapha').length
    };

    const toggleRecordExpansion = (recordId) => {
        setExpandedRecords(prev => ({
            ...prev,
            [recordId]: !prev[recordId]
        }));
    };

    const getDoshaColor = (dosha) => {
        switch (dosha.toLowerCase()) {
            case 'vata': return 'text-blue-600 bg-blue-100';
            case 'pitta': return 'text-red-600 bg-red-100';
            case 'kapha': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getDoshaIcon = (dosha) => {
        switch (dosha.toLowerCase()) {
            case 'vata': return <Heart size={16} />;
            case 'pitta': return <Zap size={16} />;
            case 'kapha': return <Brain size={16} />;
            default: return <User size={16} />;
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
                            Assessment Records
                        </h1>
                        <button className="btn btn-primary">
                            <BarChart3 size={20} />
                            Generate Report
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
                                <div className="stat-label">Total Assessments</div>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
                                <Heart size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.vata}</div>
                                <div className="stat-label">Vata Dominant</div>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                                <Zap size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.pitta}</div>
                                <div className="stat-label">Pitta Dominant</div>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                                <Brain size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.kapha}</div>
                                <div className="stat-label">Kapha Dominant</div>
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
                                placeholder="Search by patient name, constitution, or symptoms..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        
                        <div className="filter-group">
                            <div className="filter-item">
                                <Filter size={16} />
                                <select 
                                    value={doshaFilter} 
                                    onChange={(e) => setDoshaFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Doshas</option>
                                    <option value="vata">Vata</option>
                                    <option value="pitta">Pitta</option>
                                    <option value="kapha">Kapha</option>
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

                    {/* Assessment Records List */}
                    <div className="assessment-records-list">
                        {filteredRecords.map(record => (
                            <div key={record.id} className="assessment-record-card">
                                <div className="record-header" onClick={() => toggleRecordExpansion(record.id)}>
                                    <div className="record-basic-info">
                                        <div className="patient-avatar">
                                            {record.patientName.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="patient-details">
                                            <h3 className="patient-name">{record.patientName}</h3>
                                            <div className="patient-meta">
                                                <span>{record.patientAge} years, {record.patientGender}</span>
                                                <span className={`dosha-badge ${getDoshaColor(record.dominantDosha)}`}>
                                                    {getDoshaIcon(record.dominantDosha)}
                                                    {record.dominantDosha} Dominant
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="record-summary">
                                        <div className="assessment-date">
                                            <Calendar size={16} />
                                            {new Date(record.assessmentDate).toLocaleDateString()}
                                        </div>
                                        <div className="constitution-type">{record.constitution} Constitution</div>
                                    </div>
                                    
                                    <div className="record-actions">
                                        <button className="action-btn view" title="View Details">
                                            <Eye size={16} />
                                        </button>
                                        <button className="action-btn edit" title="Edit Assessment">
                                            <Edit size={16} />
                                        </button>
                                        <button className="action-btn download" title="Download Report">
                                            <Download size={16} />
                                        </button>
                                    </div>
                                </div>
                                
                                {expandedRecords[record.id] && (
                                    <div className="record-details">
                                        <div className="dosha-analysis">
                                            <h4>Dosha Analysis</h4>
                                            <div className="dosha-bars">
                                                <div className="dosha-bar">
                                                    <div className="dosha-label">
                                                        <Heart className="dosha-icon vata" />
                                                        <span>Vata</span>
                                                        <span className="percentage">{record.doshaPercentages.vata}%</span>
                                                    </div>
                                                    <div className="progress-bar">
                                                        <div 
                                                            className="progress-fill vata" 
                                                            style={{ width: `${record.doshaPercentages.vata}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                
                                                <div className="dosha-bar">
                                                    <div className="dosha-label">
                                                        <Zap className="dosha-icon pitta" />
                                                        <span>Pitta</span>
                                                        <span className="percentage">{record.doshaPercentages.pitta}%</span>
                                                    </div>
                                                    <div className="progress-bar">
                                                        <div 
                                                            className="progress-fill pitta" 
                                                            style={{ width: `${record.doshaPercentages.pitta}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                
                                                <div className="dosha-bar">
                                                    <div className="dosha-label">
                                                        <Brain className="dosha-icon kapha" />
                                                        <span>Kapha</span>
                                                        <span className="percentage">{record.doshaPercentages.kapha}%</span>
                                                    </div>
                                                    <div className="progress-bar">
                                                        <div 
                                                            className="progress-fill kapha" 
                                                            style={{ width: `${record.doshaPercentages.kapha}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="symptoms-section">
                                            <h4>Reported Symptoms</h4>
                                            <div className="symptoms-list">
                                                {record.symptoms.map((symptom, index) => (
                                                    <span key={index} className="symptom-tag">
                                                        {symptom}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="recommendations-section">
                                            <h4>Recommendations</h4>
                                            <div className="recommendations-grid">
                                                <div className="recommendation-item">
                                                    <h5>Diet</h5>
                                                    <p>{record.recommendations.diet}</p>
                                                </div>
                                                <div className="recommendation-item">
                                                    <h5>Lifestyle</h5>
                                                    <p>{record.recommendations.lifestyle}</p>
                                                </div>
                                                <div className="recommendation-item">
                                                    <h5>Exercise</h5>
                                                    <p>{record.recommendations.exercise}</p>
                                                </div>
                                                <div className="recommendation-item">
                                                    <h5>Herbal Support</h5>
                                                    <div className="herbs-list">
                                                        {record.recommendations.herbs.map((herb, index) => (
                                                            <span key={index} className="herb-tag">
                                                                {herb}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="assessment-notes">
                                            <h4>Assessment Notes</h4>
                                            <p>{record.notes}</p>
                                        </div>
                                        
                                        <div className="assessment-footer">
                                            <div className="assessment-info">
                                                <span>Assessed by: <strong>{record.assessedBy}</strong></span>
                                                <span>Follow-up: <strong>{new Date(record.followUpDate).toLocaleDateString()}</strong></span>
                                            </div>
                                            <button className="btn btn-outline">
                                                <TrendingUp size={16} />
                                                Track Progress
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {filteredRecords.length === 0 && (
                        <div className="empty-state">
                            <FileText size={48} className="empty-icon" />
                            <h3>No assessment records found</h3>
                            <p>Try adjusting your search criteria or create a new assessment.</p>
                        </div>
                    )}
                </div>
            </div>
            
            <style jsx>{`
                .assessment-records-list {
                    display: grid;
                    gap: 1.5rem;
                }
                
                .assessment-record-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e2e8f0;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .assessment-record-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .dosha-analysis {
                    margin-bottom: 1.5rem;
                }
                
                .dosha-bars {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .dosha-bar {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .dosha-label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 600;
                }
                
                .dosha-icon.vata { color: #3b82f6; }
                .dosha-icon.pitta { color: #ef4444; }
                .dosha-icon.kapha { color: #10b981; }
                
                .progress-bar {
                    height: 8px;
                    background: #e2e8f0;
                    border-radius: 4px;
                    overflow: hidden;
                }
                
                .progress-fill {
                    height: 100%;
                    transition: width 0.5s ease;
                }
                
                .progress-fill.vata { background: #3b82f6; }
                .progress-fill.pitta { background: #ef4444; }
                .progress-fill.kapha { background: #10b981; }
                
                .symptoms-section, .recommendations-section, .assessment-notes {
                    margin-bottom: 1.5rem;
                }
                
                .symptoms-section h4, .recommendations-section h4, .assessment-notes h4 {
                    color: #1e293b;
                    font-size: 1rem;
                    font-weight: 600;
                    margin: 0 0 0.75rem 0;
                }
                
                .symptoms-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                
                .symptom-tag {
                    background: #fef2f2;
                    color: #dc2626;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .recommendations-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                }
                
                .recommendation-item {
                    background: #f8fafc;
                    border-radius: 8px;
                    padding: 1rem;
                }
                
                .recommendation-item h5 {
                    color: #1e293b;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin: 0 0 0.5rem 0;
                }
                
                .recommendation-item p {
                    color: #64748b;
                    font-size: 0.875rem;
                    margin: 0;
                    line-height: 1.5;
                }
                
                .herbs-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.25rem;
                }
                
                .herb-tag {
                    background: #f0fdf4;
                    color: #16a34a;
                    padding: 0.25rem 0.5rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .assessment-notes p {
                    color: #64748b;
                    line-height: 1.6;
                    margin: 0;
                    font-style: italic;
                }
                
                .assessment-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 1.5rem;
                    padding-top: 1rem;
                    border-top: 1px solid #e2e8f0;
                }
                
                .assessment-info {
                    display: flex;
                    gap: 1rem;
                    font-size: 0.875rem;
                    color: #64748b;
                }
                
                .assessment-info strong {
                    color: #1e293b;
                }
                
                @media (max-width: 768px) {
                    .assessment-footer {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 1rem;
                    }
                    
                    .assessment-info {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    
                    .recommendations-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}

export default AssessmentRecords;
