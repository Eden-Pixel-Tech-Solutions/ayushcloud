import React, { useState } from 'react';
import { Search, FileText, Download, Calendar, User, BarChart3, Filter } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function PatientReports({ 
    activeSection = 'patient-reports',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [reportTypeFilter, setReportTypeFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    const patientReports = [
        {
            id: 1,
            patientName: 'Rajesh Kumar',
            patientId: 'P001',
            reportType: 'Comprehensive Health Report',
            generatedDate: '2024-01-15',
            reportPeriod: 'Jan 2024',
            status: 'Completed',
            sections: ['Medical History', 'Dosha Analysis', 'Treatment Progress', 'Prescriptions', 'Recommendations'],
            keyFindings: ['Vata imbalance improved by 60%', 'Sleep quality enhanced', 'Anxiety levels reduced'],
            fileSize: '2.4 MB'
        },
        {
            id: 2,
            patientName: 'Priya Sharma',
            patientId: 'P002',
            reportType: 'Treatment Progress Report',
            generatedDate: '2024-01-12',
            reportPeriod: 'Dec 2023 - Jan 2024',
            status: 'Completed',
            sections: ['Current Treatment', 'Symptom Tracking', 'Medication Adherence', 'Follow-up Schedule'],
            keyFindings: ['Pitta symptoms reduced by 45%', 'Skin condition improving', 'Diet compliance good'],
            fileSize: '1.8 MB'
        },
        {
            id: 3,
            patientName: 'Amit Patel',
            patientId: 'P003',
            reportType: 'Dosha Assessment Report',
            generatedDate: '2024-01-10',
            reportPeriod: 'Jan 2024',
            status: 'Completed',
            sections: ['Constitutional Analysis', 'Current Imbalances', 'Lifestyle Assessment', 'Dietary Recommendations'],
            keyFindings: ['Kapha constitution confirmed', 'Weight management on track', 'Exercise routine effective'],
            fileSize: '1.2 MB'
        },
        {
            id: 4,
            patientName: 'Sunita Reddy',
            patientId: 'P004',
            reportType: 'Lab Results Summary',
            generatedDate: '2024-01-08',
            reportPeriod: 'Jan 2024',
            status: 'Pending Review',
            sections: ['Blood Work', 'Metabolic Panel', 'Ayurvedic Pulse Analysis', 'Recommendations'],
            keyFindings: ['Pending doctor review', 'Lab values within normal range', 'Pulse analysis scheduled'],
            fileSize: '0.9 MB'
        }
    ];

    const filteredReports = patientReports.filter(report => {
        const matchesSearch = report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            report.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            report.reportType.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesType = reportTypeFilter === 'all' || 
                           report.reportType.toLowerCase().includes(reportTypeFilter.toLowerCase());
        
        const matchesDate = dateFilter === 'all' || 
                           new Date(report.generatedDate).getMonth() === parseInt(dateFilter);
        
        return matchesSearch && matchesType && matchesDate;
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'text-green-600 bg-green-100 border-green-200';
            case 'pending review': return 'text-orange-600 bg-orange-100 border-orange-200';
            case 'draft': return 'text-gray-600 bg-gray-100 border-gray-200';
            default: return 'text-gray-600 bg-gray-100 border-gray-200';
        }
    };

    const reportStats = {
        total: patientReports.length,
        completed: patientReports.filter(r => r.status === 'Completed').length,
        pending: patientReports.filter(r => r.status === 'Pending Review').length,
        thisMonth: patientReports.filter(r => new Date(r.generatedDate).getMonth() === new Date().getMonth()).length
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
                            Patient Reports
                        </h1>
                        <button className="btn btn-primary">
                            <FileText size={20} />
                            Generate Report
                        </button>
                    </div>
                    
                    <div className="report-stats">
                        <div className="stat-card">
                            <div className="stat-icon total">
                                <FileText size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{reportStats.total}</h3>
                                <p>Total Reports</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon completed">
                                <BarChart3 size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{reportStats.completed}</h3>
                                <p>Completed</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon pending">
                                <Calendar size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{reportStats.pending}</h3>
                                <p>Pending Review</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon month">
                                <User size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{reportStats.thisMonth}</h3>
                                <p>This Month</p>
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
                                    placeholder="Search patients or report types..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            
                            <div className="filter-group">
                                <select 
                                    value={reportTypeFilter} 
                                    onChange={(e) => setReportTypeFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Report Types</option>
                                    <option value="comprehensive">Comprehensive Health</option>
                                    <option value="treatment">Treatment Progress</option>
                                    <option value="dosha">Dosha Assessment</option>
                                    <option value="lab">Lab Results</option>
                                </select>
                                
                                <select 
                                    value={dateFilter} 
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Dates</option>
                                    <option value="0">January</option>
                                    <option value="1">February</option>
                                    <option value="2">March</option>
                                    <option value="11">December</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="reports-grid">
                        {filteredReports.map(report => (
                            <div key={report.id} className="report-card">
                                <div className="report-header">
                                    <div className="report-title-section">
                                        <h3>{report.reportType}</h3>
                                        <p className="patient-info">
                                            <User size={14} />
                                            {report.patientName} (ID: {report.patientId})
                                        </p>
                                        <p className="report-period">Period: {report.reportPeriod}</p>
                                    </div>
                                    <div className={`status-badge ${getStatusColor(report.status)}`}>
                                        {report.status}
                                    </div>
                                </div>

                                <div className="report-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Generated:</span>
                                        <span>{new Date(report.generatedDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">File Size:</span>
                                        <span>{report.fileSize}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Sections:</span>
                                        <span>{report.sections.length} sections</span>
                                    </div>
                                </div>

                                <div className="report-sections">
                                    <h5>Report Sections</h5>
                                    <div className="sections-list">
                                        {report.sections.slice(0, 3).map((section, index) => (
                                            <span key={index} className="section-tag">
                                                {section}
                                            </span>
                                        ))}
                                        {report.sections.length > 3 && (
                                            <span className="more-sections">+{report.sections.length - 3} more</span>
                                        )}
                                    </div>
                                </div>

                                <div className="key-findings">
                                    <h5>Key Findings</h5>
                                    <ul className="findings-list">
                                        {report.keyFindings.slice(0, 2).map((finding, index) => (
                                            <li key={index}>{finding}</li>
                                        ))}
                                        {report.keyFindings.length > 2 && (
                                            <li className="more-findings">+{report.keyFindings.length - 2} more findings</li>
                                        )}
                                    </ul>
                                </div>

                                <div className="report-actions">
                                    <button className="btn btn-secondary btn-sm">
                                        <FileText size={16} />
                                        View Report
                                    </button>
                                    <button className="btn btn-primary btn-sm">
                                        <Download size={16} />
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredReports.length === 0 && (
                        <div className="no-results">
                            <FileText size={48} />
                            <h3>No reports found</h3>
                            <p>Try adjusting your search criteria or generate a new report.</p>
                        </div>
                    )}
                </div>
            </div>
            
            <style jsx>{`
                .report-stats {
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
                .stat-icon.completed { background: #10b981; }
                .stat-icon.pending { background: #f59e0b; }
                .stat-icon.month { background: #8b5cf6; }
                
                .filters-section {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    border: 1px solid #e2e8f0;
                }
                
                .reports-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 1.5rem;
                }
                
                .report-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .report-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .report-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #f1f5f9;
                }
                
                .report-title-section h3 {
                    margin: 0 0 0.5rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .patient-info {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin: 0 0 0.25rem 0;
                    color: #64748b;
                    font-size: 0.875rem;
                }
                
                .report-period {
                    margin: 0;
                    color: #374151;
                    font-size: 0.875rem;
                }
                
                .status-badge {
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border: 1px solid;
                }
                
                .report-details {
                    margin-bottom: 1.5rem;
                }
                
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                }
                
                .detail-label {
                    color: #64748b;
                    font-weight: 500;
                }
                
                .report-sections, .key-findings {
                    margin-bottom: 1.5rem;
                }
                
                .report-sections h5, .key-findings h5 {
                    margin: 0 0 0.75rem 0;
                    color: #1e293b;
                    font-size: 0.875rem;
                    font-weight: 600;
                }
                
                .sections-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                
                .section-tag {
                    background: #dbeafe;
                    color: #1d4ed8;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .more-sections {
                    background: #e2e8f0;
                    color: #64748b;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .findings-list {
                    margin: 0;
                    padding-left: 1.25rem;
                }
                
                .findings-list li {
                    margin-bottom: 0.25rem;
                    color: #374151;
                    font-size: 0.875rem;
                }
                
                .more-findings {
                    color: #64748b;
                    font-style: italic;
                }
                
                .report-actions {
                    display: flex;
                    gap: 0.75rem;
                    justify-content: flex-end;
                }
                
                @media (max-width: 768px) {
                    .report-stats {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .reports-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .report-header {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .report-actions {
                        justify-content: stretch;
                    }
                    
                    .report-actions .btn {
                        flex: 1;
                    }
                }
            `}</style>
        </div>
    );
}

export default PatientReports;
