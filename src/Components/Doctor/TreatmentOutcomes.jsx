import React, { useState } from 'react';
import { Search, TrendingUp, Calendar, User, BarChart3, Target, CheckCircle } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function TreatmentOutcomes({ 
    activeSection = 'treatment-outcomes',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [outcomeFilter, setOutcomeFilter] = useState('all');
    const [timeFilter, setTimeFilter] = useState('all');

    const treatmentOutcomes = [
        {
            id: 1,
            patientName: 'Rajesh Kumar',
            patientId: 'P001',
            condition: 'Vata Imbalance - Anxiety & Insomnia',
            treatmentPlan: 'Vata Pacification Protocol',
            startDate: '2023-10-15',
            endDate: '2024-01-15',
            duration: '3 months',
            outcome: 'Excellent',
            improvementRate: 85,
            metrics: {
                sleepQuality: { before: 3, after: 8, improvement: 67 },
                anxietyLevel: { before: 8, after: 3, improvement: 63 },
                energyLevel: { before: 4, after: 7, improvement: 43 },
                overallWellbeing: { before: 4, after: 8, improvement: 50 }
            },
            keyAchievements: [
                'Sleep duration increased from 4 to 7 hours',
                'Anxiety episodes reduced by 70%',
                'Improved work productivity',
                'Better stress management'
            ],
            followUpStatus: 'Maintenance phase'
        },
        {
            id: 2,
            patientName: 'Priya Sharma',
            patientId: 'P002',
            condition: 'Pitta Aggravation - Skin Issues & Acidity',
            treatmentPlan: 'Pitta Cooling Therapy',
            startDate: '2023-11-12',
            endDate: '2024-01-12',
            duration: '2 months',
            outcome: 'Good',
            improvementRate: 70,
            metrics: {
                skinCondition: { before: 3, after: 7, improvement: 57 },
                acidityFrequency: { before: 8, after: 3, improvement: 63 },
                irritability: { before: 7, after: 4, improvement: 43 },
                overallWellbeing: { before: 4, after: 7, improvement: 43 }
            },
            keyAchievements: [
                'Skin inflammation reduced significantly',
                'Acidity episodes decreased by 60%',
                'Improved emotional balance',
                'Better dietary habits'
            ],
            followUpStatus: 'Ongoing monitoring'
        },
        {
            id: 3,
            patientName: 'Amit Patel',
            patientId: 'P003',
            condition: 'Kapha Stagnation - Weight Management',
            treatmentPlan: 'Kapha Reduction Program',
            startDate: '2023-09-10',
            endDate: '2024-01-10',
            duration: '4 months',
            outcome: 'Excellent',
            improvementRate: 92,
            metrics: {
                weightLoss: { before: 85, after: 77, improvement: 9 },
                energyLevel: { before: 3, after: 8, improvement: 67 },
                metabolism: { before: 4, after: 8, improvement: 50 },
                overallWellbeing: { before: 5, after: 9, improvement: 44 }
            },
            keyAchievements: [
                'Lost 8kg in 4 months',
                'Increased daily activity levels',
                'Improved metabolic rate',
                'Enhanced self-confidence'
            ],
            followUpStatus: 'Treatment completed'
        },
        {
            id: 4,
            patientName: 'Sunita Reddy',
            patientId: 'P004',
            condition: 'Digestive Issues - Poor Agni',
            treatmentPlan: 'Agni Deepana Protocol',
            startDate: '2023-12-01',
            endDate: '2024-02-01',
            duration: '2 months',
            outcome: 'Moderate',
            improvementRate: 55,
            metrics: {
                digestion: { before: 3, after: 6, improvement: 50 },
                appetite: { before: 4, after: 7, improvement: 43 },
                bloating: { before: 7, after: 4, improvement: 43 },
                overallWellbeing: { before: 4, after: 6, improvement: 33 }
            },
            keyAchievements: [
                'Improved appetite regulation',
                'Reduced bloating episodes',
                'Better meal timing',
                'Enhanced nutrient absorption'
            ],
            followUpStatus: 'Extended treatment'
        }
    ];

    const filteredOutcomes = treatmentOutcomes.filter(outcome => {
        const matchesSearch = outcome.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            outcome.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            outcome.treatmentPlan.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesOutcome = outcomeFilter === 'all' || outcome.outcome.toLowerCase() === outcomeFilter.toLowerCase();
        
        const matchesTime = timeFilter === 'all' || 
                           (timeFilter === 'recent' && new Date(outcome.endDate) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)) ||
                           (timeFilter === 'completed' && outcome.followUpStatus === 'Treatment completed');
        
        return matchesSearch && matchesOutcome && matchesTime;
    });

    const getOutcomeColor = (outcome) => {
        switch (outcome.toLowerCase()) {
            case 'excellent': return 'text-green-600 bg-green-100 border-green-200';
            case 'good': return 'text-blue-600 bg-blue-100 border-blue-200';
            case 'moderate': return 'text-orange-600 bg-orange-100 border-orange-200';
            case 'poor': return 'text-red-600 bg-red-100 border-red-200';
            default: return 'text-gray-600 bg-gray-100 border-gray-200';
        }
    };

    const getImprovementColor = (rate) => {
        if (rate >= 80) return '#10B981';
        if (rate >= 60) return '#3B82F6';
        if (rate >= 40) return '#F59E0B';
        return '#EF4444';
    };

    const outcomeStats = {
        total: treatmentOutcomes.length,
        excellent: treatmentOutcomes.filter(o => o.outcome === 'Excellent').length,
        good: treatmentOutcomes.filter(o => o.outcome === 'Good').length,
        avgImprovement: Math.round(treatmentOutcomes.reduce((sum, o) => sum + o.improvementRate, 0) / treatmentOutcomes.length)
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
                            <TrendingUp className="title-icon" />
                            Treatment Outcomes
                        </h1>
                    </div>
                    
                    <div className="outcome-stats">
                        <div className="stat-card">
                            <div className="stat-icon total">
                                <Target size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{outcomeStats.total}</h3>
                                <p>Total Cases</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon excellent">
                                <CheckCircle size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{outcomeStats.excellent}</h3>
                                <p>Excellent Results</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon good">
                                <TrendingUp size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{outcomeStats.good}</h3>
                                <p>Good Results</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon avg">
                                <BarChart3 size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{outcomeStats.avgImprovement}%</h3>
                                <p>Avg Improvement</p>
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
                                    placeholder="Search patients, conditions, or treatments..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            
                            <div className="filter-group">
                                <select 
                                    value={outcomeFilter} 
                                    onChange={(e) => setOutcomeFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Outcomes</option>
                                    <option value="excellent">Excellent</option>
                                    <option value="good">Good</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="poor">Poor</option>
                                </select>
                                
                                <select 
                                    value={timeFilter} 
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Time</option>
                                    <option value="recent">Recent (3 months)</option>
                                    <option value="completed">Completed Only</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="outcomes-grid">
                        {filteredOutcomes.map(outcome => (
                            <div key={outcome.id} className="outcome-card">
                                <div className="outcome-header">
                                    <div className="patient-section">
                                        <h3>{outcome.patientName}</h3>
                                        <p className="patient-id">ID: {outcome.patientId}</p>
                                        <p className="condition">{outcome.condition}</p>
                                    </div>
                                    <div className="outcome-badge-section">
                                        <div className={`outcome-badge ${getOutcomeColor(outcome.outcome)}`}>
                                            {outcome.outcome}
                                        </div>
                                        <div className="improvement-rate">
                                            <span 
                                                className="rate-value"
                                                style={{ color: getImprovementColor(outcome.improvementRate) }}
                                            >
                                                {outcome.improvementRate}%
                                            </span>
                                            <span className="rate-label">Improvement</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="treatment-info">
                                    <div className="info-row">
                                        <span className="info-label">Treatment:</span>
                                        <span>{outcome.treatmentPlan}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Duration:</span>
                                        <span>{outcome.duration}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Status:</span>
                                        <span>{outcome.followUpStatus}</span>
                                    </div>
                                </div>

                                <div className="metrics-section">
                                    <h5>Key Metrics</h5>
                                    <div className="metrics-grid">
                                        {Object.entries(outcome.metrics).slice(0, 3).map(([metric, data]) => (
                                            <div key={metric} className="metric-item">
                                                <div className="metric-name">
                                                    {metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                </div>
                                                <div className="metric-progress">
                                                    <div className="progress-bar">
                                                        <div 
                                                            className="progress-fill"
                                                            style={{ 
                                                                width: `${(data.after / 10) * 100}%`,
                                                                backgroundColor: getImprovementColor(data.improvement)
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <span className="metric-value">{data.after}/10</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="achievements-section">
                                    <h5>Key Achievements</h5>
                                    <ul className="achievements-list">
                                        {outcome.keyAchievements.slice(0, 2).map((achievement, index) => (
                                            <li key={index}>{achievement}</li>
                                        ))}
                                        {outcome.keyAchievements.length > 2 && (
                                            <li className="more-achievements">+{outcome.keyAchievements.length - 2} more</li>
                                        )}
                                    </ul>
                                </div>

                                <div className="outcome-footer">
                                    <div className="timeline">
                                        <Calendar size={14} />
                                        <span>{new Date(outcome.startDate).toLocaleDateString()} - {new Date(outcome.endDate).toLocaleDateString()}</span>
                                    </div>
                                    <button className="btn btn-primary btn-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredOutcomes.length === 0 && (
                        <div className="no-results">
                            <TrendingUp size={48} />
                            <h3>No treatment outcomes found</h3>
                            <p>Try adjusting your search criteria or filters.</p>
                        </div>
                    )}
                </div>
            </div>
            
            <style jsx>{`
                .outcome-stats {
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
                .stat-icon.excellent { background: #10b981; }
                .stat-icon.good { background: #8b5cf6; }
                .stat-icon.avg { background: #f59e0b; }
                
                .filters-section {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    border: 1px solid #e2e8f0;
                }
                
                .outcomes-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
                    gap: 1.5rem;
                }
                
                .outcome-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .outcome-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .outcome-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #f1f5f9;
                }
                
                .patient-section h3 {
                    margin: 0 0 0.25rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .patient-id {
                    margin: 0 0 0.25rem 0;
                    color: #64748b;
                    font-size: 0.875rem;
                }
                
                .condition {
                    margin: 0;
                    color: #374151;
                    font-size: 0.875rem;
                    font-weight: 500;
                }
                
                .outcome-badge-section {
                    text-align: right;
                }
                
                .outcome-badge {
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border: 1px solid;
                    margin-bottom: 0.5rem;
                }
                
                .improvement-rate {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                }
                
                .rate-value {
                    font-size: 1.25rem;
                    font-weight: 700;
                }
                
                .rate-label {
                    font-size: 0.75rem;
                    color: #64748b;
                }
                
                .treatment-info {
                    margin-bottom: 1.5rem;
                }
                
                .info-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                }
                
                .info-label {
                    color: #64748b;
                    font-weight: 500;
                }
                
                .metrics-section, .achievements-section {
                    margin-bottom: 1.5rem;
                }
                
                .metrics-section h5, .achievements-section h5 {
                    margin: 0 0 0.75rem 0;
                    color: #1e293b;
                    font-size: 0.875rem;
                    font-weight: 600;
                }
                
                .metrics-grid {
                    display: grid;
                    gap: 0.75rem;
                }
                
                .metric-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .metric-name {
                    font-size: 0.75rem;
                    color: #64748b;
                    font-weight: 500;
                }
                
                .metric-progress {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    flex: 1;
                    margin-left: 1rem;
                }
                
                .progress-bar {
                    flex: 1;
                    height: 6px;
                    background: #f1f5f9;
                    border-radius: 3px;
                    overflow: hidden;
                }
                
                .progress-fill {
                    height: 100%;
                    transition: width 0.3s ease;
                }
                
                .metric-value {
                    font-size: 0.75rem;
                    color: #1e293b;
                    font-weight: 600;
                    min-width: 30px;
                }
                
                .achievements-list {
                    margin: 0;
                    padding-left: 1.25rem;
                }
                
                .achievements-list li {
                    margin-bottom: 0.25rem;
                    color: #374151;
                    font-size: 0.875rem;
                }
                
                .more-achievements {
                    color: #64748b;
                    font-style: italic;
                }
                
                .outcome-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1rem;
                    border-top: 1px solid #f1f5f9;
                }
                
                .timeline {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #64748b;
                    font-size: 0.875rem;
                }
                
                @media (max-width: 768px) {
                    .outcome-stats {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .outcomes-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .outcome-header {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .outcome-badge-section {
                        text-align: left;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                    }
                    
                    .improvement-rate {
                        align-items: flex-end;
                    }
                    
                    .outcome-footer {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: stretch;
                    }
                }
            `}</style>
        </div>
    );
}

export default TreatmentOutcomes;
