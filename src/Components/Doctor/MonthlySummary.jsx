import React, { useState } from 'react';
import { Calendar, BarChart3, Users, TrendingUp, Activity, FileText, Clock } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function MonthlySummary({ 
    activeSection = 'monthly-summary',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [selectedMonth, setSelectedMonth] = useState('2024-01');

    const monthlyData = {
        '2024-01': {
            month: 'January 2024',
            overview: {
                totalPatients: 45,
                newPatients: 12,
                consultations: 78,
                treatmentsCompleted: 8,
                averageImprovement: 73,
                revenue: 125000
            },
            patientDistribution: {
                vata: 18,
                pitta: 15,
                kapha: 12
            },
            topConditions: [
                { condition: 'Digestive Issues', count: 15, percentage: 33 },
                { condition: 'Stress & Anxiety', count: 12, percentage: 27 },
                { condition: 'Joint Pain', count: 8, percentage: 18 },
                { condition: 'Skin Problems', count: 6, percentage: 13 },
                { condition: 'Sleep Disorders', count: 4, percentage: 9 }
            ],
            treatmentTypes: [
                { type: 'Panchakarma', sessions: 25, percentage: 32 },
                { type: 'Herbal Medicine', prescriptions: 42, percentage: 54 },
                { type: 'Diet Counseling', sessions: 35, percentage: 45 },
                { type: 'Yoga Therapy', sessions: 18, percentage: 23 }
            ],
            weeklyTrends: [
                { week: 'Week 1', consultations: 18, newPatients: 4 },
                { week: 'Week 2', consultations: 22, newPatients: 3 },
                { week: 'Week 3', consultations: 20, newPatients: 2 },
                { week: 'Week 4', consultations: 18, newPatients: 3 }
            ],
            successStories: [
                {
                    patient: 'Rajesh Kumar',
                    condition: 'Chronic Insomnia',
                    improvement: '85% improvement in sleep quality',
                    duration: '3 months'
                },
                {
                    patient: 'Priya Sharma',
                    condition: 'Skin Inflammation',
                    improvement: '70% reduction in symptoms',
                    duration: '2 months'
                }
            ]
        }
    };

    const currentData = monthlyData[selectedMonth];

    const getDoshaColor = (dosha) => {
        switch (dosha) {
            case 'vata': return '#8B5CF6';
            case 'pitta': return '#EF4444';
            case 'kapha': return '#10B981';
            default: return '#6B7280';
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
                            <BarChart3 className="title-icon" />
                            Monthly Summary
                        </h1>
                        <div className="month-selector">
                            <Calendar size={16} />
                            <select 
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="month-select"
                            >
                                <option value="2024-01">January 2024</option>
                                <option value="2023-12">December 2023</option>
                                <option value="2023-11">November 2023</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="content-body">
                    {/* Overview Stats */}
                    <div className="overview-section">
                        <h3>Monthly Overview - {currentData.month}</h3>
                        <div className="overview-grid">
                            <div className="overview-card patients">
                                <div className="card-icon">
                                    <Users size={24} />
                                </div>
                                <div className="card-content">
                                    <h4>{currentData.overview.totalPatients}</h4>
                                    <p>Total Patients</p>
                                    <span className="change positive">+{currentData.overview.newPatients} new</span>
                                </div>
                            </div>
                            <div className="overview-card consultations">
                                <div className="card-icon">
                                    <Activity size={24} />
                                </div>
                                <div className="card-content">
                                    <h4>{currentData.overview.consultations}</h4>
                                    <p>Consultations</p>
                                    <span className="change positive">+12% vs last month</span>
                                </div>
                            </div>
                            <div className="overview-card treatments">
                                <div className="card-icon">
                                    <FileText size={24} />
                                </div>
                                <div className="card-content">
                                    <h4>{currentData.overview.treatmentsCompleted}</h4>
                                    <p>Treatments Completed</p>
                                    <span className="change positive">100% success rate</span>
                                </div>
                            </div>
                            <div className="overview-card improvement">
                                <div className="card-icon">
                                    <TrendingUp size={24} />
                                </div>
                                <div className="card-content">
                                    <h4>{currentData.overview.averageImprovement}%</h4>
                                    <p>Avg Improvement</p>
                                    <span className="change positive">+8% vs last month</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Patient Distribution */}
                    <div className="distribution-section">
                        <div className="section-card">
                            <h4>Patient Distribution by Dosha</h4>
                            <div className="dosha-chart">
                                {Object.entries(currentData.patientDistribution).map(([dosha, count]) => (
                                    <div key={dosha} className="dosha-item">
                                        <div className="dosha-info">
                                            <span className="dosha-name">{dosha.charAt(0).toUpperCase() + dosha.slice(1)}</span>
                                            <span className="dosha-count">{count} patients</span>
                                        </div>
                                        <div className="dosha-bar">
                                            <div 
                                                className="dosha-fill"
                                                style={{ 
                                                    width: `${(count / currentData.overview.totalPatients) * 100}%`,
                                                    backgroundColor: getDoshaColor(dosha)
                                                }}
                                            ></div>
                                        </div>
                                        <span className="dosha-percentage">
                                            {Math.round((count / currentData.overview.totalPatients) * 100)}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="section-card">
                            <h4>Top Conditions Treated</h4>
                            <div className="conditions-list">
                                {currentData.topConditions.map((condition, index) => (
                                    <div key={index} className="condition-item">
                                        <div className="condition-info">
                                            <span className="condition-name">{condition.condition}</span>
                                            <span className="condition-count">{condition.count} cases</span>
                                        </div>
                                        <div className="condition-bar">
                                            <div 
                                                className="condition-fill"
                                                style={{ width: `${condition.percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="condition-percentage">{condition.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Treatment Analysis */}
                    <div className="treatment-section">
                        <div className="section-card">
                            <h4>Treatment Types Utilized</h4>
                            <div className="treatments-grid">
                                {currentData.treatmentTypes.map((treatment, index) => (
                                    <div key={index} className="treatment-card">
                                        <h5>{treatment.type}</h5>
                                        <div className="treatment-stats">
                                            <span className="treatment-count">
                                                {treatment.sessions || treatment.prescriptions}
                                                <small>{treatment.sessions ? ' sessions' : ' prescriptions'}</small>
                                            </span>
                                            <span className="treatment-percentage">{treatment.percentage}%</span>
                                        </div>
                                        <div className="treatment-progress">
                                            <div 
                                                className="progress-fill"
                                                style={{ width: `${treatment.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="section-card">
                            <h4>Weekly Consultation Trends</h4>
                            <div className="trends-chart">
                                {currentData.weeklyTrends.map((week, index) => (
                                    <div key={index} className="week-item">
                                        <div className="week-label">{week.week}</div>
                                        <div className="week-bars">
                                            <div className="consultation-bar">
                                                <div 
                                                    className="bar-fill consultations"
                                                    style={{ height: `${(week.consultations / 25) * 100}%` }}
                                                ></div>
                                                <span className="bar-value">{week.consultations}</span>
                                            </div>
                                            <div className="new-patient-bar">
                                                <div 
                                                    className="bar-fill new-patients"
                                                    style={{ height: `${(week.newPatients / 5) * 100}%` }}
                                                ></div>
                                                <span className="bar-value">{week.newPatients}</span>
                                            </div>
                                        </div>
                                        <div className="week-legend">
                                            <span className="legend-item consultations">Consultations</span>
                                            <span className="legend-item new-patients">New Patients</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Success Stories */}
                    <div className="success-section">
                        <div className="section-card">
                            <h4>Success Stories This Month</h4>
                            <div className="success-stories">
                                {currentData.successStories.map((story, index) => (
                                    <div key={index} className="success-story">
                                        <div className="story-header">
                                            <h5>{story.patient}</h5>
                                            <span className="story-duration">
                                                <Clock size={14} />
                                                {story.duration}
                                            </span>
                                        </div>
                                        <div className="story-condition">{story.condition}</div>
                                        <div className="story-improvement">{story.improvement}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .month-selector {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                }
                
                .month-select {
                    border: none;
                    background: none;
                    font-size: 0.875rem;
                    color: #374151;
                    cursor: pointer;
                }
                
                .overview-section {
                    margin-bottom: 2rem;
                }
                
                .overview-section h3 {
                    margin: 0 0 1.5rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .overview-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                }
                
                .overview-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .card-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }
                
                .overview-card.patients .card-icon { background: #3b82f6; }
                .overview-card.consultations .card-icon { background: #10b981; }
                .overview-card.treatments .card-icon { background: #8b5cf6; }
                .overview-card.improvement .card-icon { background: #f59e0b; }
                
                .card-content h4 {
                    margin: 0 0 0.25rem 0;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1e293b;
                }
                
                .card-content p {
                    margin: 0 0 0.5rem 0;
                    color: #64748b;
                    font-size: 0.875rem;
                }
                
                .change {
                    font-size: 0.75rem;
                    font-weight: 600;
                    padding: 0.125rem 0.5rem;
                    border-radius: 12px;
                }
                
                .change.positive {
                    background: #f0fdf4;
                    color: #166534;
                }
                
                .distribution-section, .treatment-section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }
                
                .section-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }
                
                .section-card h4 {
                    margin: 0 0 1rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .dosha-chart, .conditions-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .dosha-item, .condition-item {
                    display: grid;
                    grid-template-columns: 1fr 2fr auto;
                    gap: 1rem;
                    align-items: center;
                }
                
                .dosha-info, .condition-info {
                    display: flex;
                    flex-direction: column;
                }
                
                .dosha-name, .condition-name {
                    font-weight: 600;
                    color: #1e293b;
                    font-size: 0.875rem;
                }
                
                .dosha-count, .condition-count {
                    color: #64748b;
                    font-size: 0.75rem;
                }
                
                .dosha-bar, .condition-bar {
                    height: 8px;
                    background: #f1f5f9;
                    border-radius: 4px;
                    overflow: hidden;
                }
                
                .dosha-fill {
                    height: 100%;
                    transition: width 0.3s ease;
                }
                
                .condition-fill {
                    height: 100%;
                    background: #3b82f6;
                    transition: width 0.3s ease;
                }
                
                .dosha-percentage, .condition-percentage {
                    font-weight: 600;
                    color: #1e293b;
                    font-size: 0.875rem;
                    min-width: 40px;
                    text-align: right;
                }
                
                .treatments-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }
                
                .treatment-card {
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                }
                
                .treatment-card h5 {
                    margin: 0 0 0.75rem 0;
                    color: #1e293b;
                    font-weight: 600;
                    font-size: 0.875rem;
                }
                
                .treatment-stats {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }
                
                .treatment-count {
                    font-weight: 700;
                    color: #1e293b;
                }
                
                .treatment-count small {
                    font-weight: 400;
                    color: #64748b;
                }
                
                .treatment-percentage {
                    font-weight: 600;
                    color: #3b82f6;
                }
                
                .treatment-progress {
                    height: 4px;
                    background: #e2e8f0;
                    border-radius: 2px;
                    overflow: hidden;
                }
                
                .treatment-progress .progress-fill {
                    height: 100%;
                    background: #3b82f6;
                    transition: width 0.3s ease;
                }
                
                .trends-chart {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                }
                
                .week-item {
                    text-align: center;
                }
                
                .week-label {
                    font-size: 0.75rem;
                    color: #64748b;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                }
                
                .week-bars {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    height: 80px;
                    align-items: flex-end;
                    margin-bottom: 0.5rem;
                }
                
                .consultation-bar, .new-patient-bar {
                    width: 20px;
                    height: 100%;
                    position: relative;
                    background: #f1f5f9;
                    border-radius: 2px;
                }
                
                .bar-fill {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    border-radius: 2px;
                    transition: height 0.3s ease;
                }
                
                .bar-fill.consultations {
                    background: #3b82f6;
                }
                
                .bar-fill.new-patients {
                    background: #10b981;
                }
                
                .bar-value {
                    position: absolute;
                    top: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #1e293b;
                }
                
                .week-legend {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }
                
                .legend-item {
                    font-size: 0.625rem;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }
                
                .legend-item::before {
                    content: '';
                    width: 8px;
                    height: 8px;
                    border-radius: 2px;
                }
                
                .legend-item.consultations::before {
                    background: #3b82f6;
                }
                
                .legend-item.new-patients::before {
                    background: #10b981;
                }
                
                .success-section {
                    margin-bottom: 2rem;
                }
                
                .success-stories {
                    display: grid;
                    gap: 1rem;
                }
                
                .success-story {
                    padding: 1rem;
                    background: #f0fdf4;
                    border-radius: 8px;
                    border: 1px solid #bbf7d0;
                }
                
                .story-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }
                
                .story-header h5 {
                    margin: 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .story-duration {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: #64748b;
                    font-size: 0.75rem;
                }
                
                .story-condition {
                    color: #374151;
                    font-size: 0.875rem;
                    margin-bottom: 0.25rem;
                }
                
                .story-improvement {
                    color: #166534;
                    font-size: 0.875rem;
                    font-weight: 600;
                }
                
                @media (max-width: 768px) {
                    .overview-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .distribution-section, .treatment-section {
                        grid-template-columns: 1fr;
                    }
                    
                    .treatments-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .trends-chart {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .dosha-item, .condition-item {
                        grid-template-columns: 1fr;
                        gap: 0.5rem;
                    }
                    
                    .dosha-bar, .condition-bar {
                        order: 2;
                    }
                    
                    .dosha-percentage, .condition-percentage {
                        order: 3;
                        text-align: left;
                    }
                }
            `}</style>
        </div>
    );
}

export default MonthlySummary;
