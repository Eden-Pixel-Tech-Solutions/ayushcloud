import React, { useState } from 'react';
import { History, Search, Filter, Eye, Download, Calendar, User } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function DietChartHistory({ 
    activeSection = 'diet-chart-history',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [selectedChart, setSelectedChart] = useState(null);

    const dietCharts = [
        {
            id: 'DC001',
            patientName: 'Rajesh Kumar',
            patientId: 'P001',
            condition: 'Digestive Issues',
            dosha: 'Vata-Pitta',
            createdDate: '2024-01-15',
            duration: '21 days',
            status: 'Active',
            progress: 65,
            meals: {
                breakfast: ['Oats with Ghee', 'Herbal Tea', 'Almonds'],
                lunch: ['Basmati Rice', 'Moong Dal', 'Steamed Vegetables'],
                dinner: ['Khichdi', 'Buttermilk', 'Ginger Tea']
            }
        },
        {
            id: 'DC002',
            patientName: 'Priya Sharma',
            patientId: 'P002',
            condition: 'Weight Management',
            dosha: 'Kapha',
            createdDate: '2024-01-10',
            duration: '30 days',
            status: 'Completed',
            progress: 100,
            meals: {
                breakfast: ['Green Tea', 'Upma', 'Honey'],
                lunch: ['Quinoa', 'Mixed Vegetables', 'Turmeric Milk'],
                dinner: ['Vegetable Soup', 'Roti', 'Herbal Tea']
            }
        },
        {
            id: 'DC003',
            patientName: 'Amit Patel',
            patientId: 'P003',
            condition: 'Stress & Anxiety',
            dosha: 'Vata',
            createdDate: '2024-01-08',
            duration: '14 days',
            status: 'Paused',
            progress: 45,
            meals: {
                breakfast: ['Warm Milk', 'Dates', 'Ghee'],
                lunch: ['Sweet Potato', 'Sesame Oil', 'Cooked Vegetables'],
                dinner: ['Warm Soup', 'Rice', 'Chamomile Tea']
            }
        },
        {
            id: 'DC004',
            patientName: 'Sunita Reddy',
            patientId: 'P004',
            condition: 'Skin Problems',
            dosha: 'Pitta',
            createdDate: '2024-01-05',
            duration: '21 days',
            status: 'Active',
            progress: 80,
            meals: {
                breakfast: ['Coconut Water', 'Cucumber', 'Mint Tea'],
                lunch: ['Cooling Rice', 'Coriander Chutney', 'Yogurt'],
                dinner: ['Light Khichdi', 'Rose Water', 'Fennel Tea']
            }
        }
    ];

    const filteredCharts = dietCharts.filter(chart => {
        const matchesSearch = chart.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            chart.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            chart.condition.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || chart.status.toLowerCase() === statusFilter.toLowerCase();
        
        const matchesDate = dateFilter === 'all' || 
                          (dateFilter === 'recent' && new Date(chart.createdDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
                          (dateFilter === 'older' && new Date(chart.createdDate) <= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
        
        return matchesSearch && matchesStatus && matchesDate;
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return '#10b981';
            case 'completed': return '#3b82f6';
            case 'paused': return '#f59e0b';
            default: return '#6b7280';
        }
    };

    const getDoshaColor = (dosha) => {
        if (dosha.includes('Vata')) return '#8b5cf6';
        if (dosha.includes('Pitta')) return '#ef4444';
        if (dosha.includes('Kapha')) return '#10b981';
        return '#6b7280';
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
                    <h1 className="page-title">
                        <History className="title-icon" />
                        Diet Chart History
                    </h1>
                    <div className="header-stats">
                        <div className="stat-item">
                            <span className="stat-value">{dietCharts.length}</span>
                            <span className="stat-label">Total Charts</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{dietCharts.filter(c => c.status === 'Active').length}</span>
                            <span className="stat-label">Active</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{dietCharts.filter(c => c.status === 'Completed').length}</span>
                            <span className="stat-label">Completed</span>
                        </div>
                    </div>
                </div>

                <div className="content-body">
                    {/* Filters */}
                    <div className="filters-section">
                        <div className="search-box">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Search by patient name, ID, or condition..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-controls">
                            <div className="filter-group">
                                <Filter size={16} />
                                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="paused">Paused</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <Calendar size={16} />
                                <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                                    <option value="all">All Dates</option>
                                    <option value="recent">Last 30 Days</option>
                                    <option value="older">Older than 30 Days</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Diet Charts Grid */}
                    <div className="charts-grid">
                        {filteredCharts.map(chart => (
                            <div key={chart.id} className="chart-card">
                                <div className="chart-header">
                                    <div className="chart-id">#{chart.id}</div>
                                    <div 
                                        className="chart-status"
                                        style={{ backgroundColor: getStatusColor(chart.status) }}
                                    >
                                        {chart.status}
                                    </div>
                                </div>
                                
                                <div className="patient-info">
                                    <div className="patient-name">
                                        <User size={16} />
                                        {chart.patientName}
                                    </div>
                                    <div className="patient-details">
                                        <span>ID: {chart.patientId}</span>
                                        <span className="dosha-badge" style={{ backgroundColor: getDoshaColor(chart.dosha) }}>
                                            {chart.dosha}
                                        </span>
                                    </div>
                                </div>

                                <div className="chart-details">
                                    <div className="detail-row">
                                        <span className="label">Condition:</span>
                                        <span className="value">{chart.condition}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Duration:</span>
                                        <span className="value">{chart.duration}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Created:</span>
                                        <span className="value">{new Date(chart.createdDate).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {chart.status !== 'Completed' && (
                                    <div className="progress-section">
                                        <div className="progress-header">
                                            <span>Progress</span>
                                            <span>{chart.progress}%</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div 
                                                className="progress-fill"
                                                style={{ width: `${chart.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                <div className="chart-actions">
                                    <button 
                                        className="action-btn view"
                                        onClick={() => setSelectedChart(chart)}
                                    >
                                        <Eye size={16} />
                                        View Details
                                    </button>
                                    <button className="action-btn download">
                                        <Download size={16} />
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredCharts.length === 0 && (
                        <div className="no-results">
                            <History size={48} />
                            <h3>No diet charts found</h3>
                            <p>Try adjusting your search criteria or filters</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Chart Details Modal */}
            {selectedChart && (
                <div className="modal-overlay" onClick={() => setSelectedChart(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Diet Chart Details - {selectedChart.patientName}</h3>
                            <button className="close-btn" onClick={() => setSelectedChart(null)}>×</button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="chart-overview">
                                <div className="overview-item">
                                    <span className="label">Chart ID:</span>
                                    <span className="value">{selectedChart.id}</span>
                                </div>
                                <div className="overview-item">
                                    <span className="label">Patient:</span>
                                    <span className="value">{selectedChart.patientName} ({selectedChart.patientId})</span>
                                </div>
                                <div className="overview-item">
                                    <span className="label">Condition:</span>
                                    <span className="value">{selectedChart.condition}</span>
                                </div>
                                <div className="overview-item">
                                    <span className="label">Dosha:</span>
                                    <span className="value dosha" style={{ color: getDoshaColor(selectedChart.dosha) }}>
                                        {selectedChart.dosha}
                                    </span>
                                </div>
                            </div>

                            <div className="meals-section">
                                <h4>Daily Meal Plan</h4>
                                {Object.entries(selectedChart.meals).map(([mealType, foods]) => (
                                    <div key={mealType} className="meal-group">
                                        <h5>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h5>
                                        <div className="foods-list">
                                            {foods.map((food, index) => (
                                                <span key={index} className="food-item">{food}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <style jsx>{`
                .header-stats {
                    display: flex;
                    gap: 2rem;
                }
                
                .stat-item {
                    text-align: center;
                }
                
                .stat-value {
                    display: block;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1e293b;
                }
                
                .stat-label {
                    font-size: 0.75rem;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                .filters-section {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    flex-wrap: wrap;
                }
                
                .search-box {
                    flex: 1;
                    min-width: 300px;
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                
                .search-box svg {
                    position: absolute;
                    left: 1rem;
                    color: #64748b;
                }
                
                .search-box input {
                    width: 100%;
                    padding: 0.75rem 1rem 0.75rem 2.5rem;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    font-size: 0.875rem;
                }
                
                .filter-controls {
                    display: flex;
                    gap: 1rem;
                }
                
                .filter-group {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #64748b;
                }
                
                .filter-group select {
                    padding: 0.5rem;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    font-size: 0.875rem;
                    background: white;
                }
                
                .charts-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 1.5rem;
                }
                
                .chart-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .chart-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .chart-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                
                .chart-id {
                    font-weight: 600;
                    color: #1e293b;
                    font-size: 0.875rem;
                }
                
                .chart-status {
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    color: white;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                }
                
                .patient-info {
                    margin-bottom: 1rem;
                }
                
                .patient-name {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 600;
                    color: #1e293b;
                    margin-bottom: 0.5rem;
                }
                
                .patient-details {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.875rem;
                    color: #64748b;
                }
                
                .dosha-badge {
                    padding: 0.125rem 0.5rem;
                    border-radius: 8px;
                    color: white;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                
                .chart-details {
                    margin-bottom: 1rem;
                }
                
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                }
                
                .detail-row .label {
                    color: #64748b;
                }
                
                .detail-row .value {
                    color: #1e293b;
                    font-weight: 500;
                }
                
                .progress-section {
                    margin-bottom: 1rem;
                }
                
                .progress-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                    color: #64748b;
                }
                
                .progress-bar {
                    height: 6px;
                    background: #f1f5f9;
                    border-radius: 3px;
                    overflow: hidden;
                }
                
                .progress-fill {
                    height: 100%;
                    background: #3b82f6;
                    transition: width 0.3s ease;
                }
                
                .chart-actions {
                    display: flex;
                    gap: 0.5rem;
                }
                
                .action-btn {
                    flex: 1;
                    padding: 0.5rem;
                    border: 1px solid #d1d5db;
                    background: white;
                    border-radius: 6px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.25rem;
                    font-size: 0.75rem;
                    transition: all 0.2s;
                }
                
                .action-btn:hover {
                    background: #f8fafc;
                }
                
                .action-btn.view {
                    color: #3b82f6;
                    border-color: #3b82f6;
                }
                
                .action-btn.download {
                    color: #10b981;
                    border-color: #10b981;
                }
                
                .no-results {
                    text-align: center;
                    padding: 3rem;
                    color: #64748b;
                }
                
                .no-results svg {
                    margin-bottom: 1rem;
                    opacity: 0.5;
                }
                
                .no-results h3 {
                    margin: 0 0 0.5rem 0;
                    color: #374151;
                }
                
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                
                .modal-content {
                    background: white;
                    border-radius: 12px;
                    width: 90%;
                    max-width: 600px;
                    max-height: 80vh;
                    overflow-y: auto;
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    border-bottom: 1px solid #e2e8f0;
                }
                
                .modal-header h3 {
                    margin: 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .close-btn {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #64748b;
                    padding: 0;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 6px;
                }
                
                .close-btn:hover {
                    background: #f1f5f9;
                }
                
                .modal-body {
                    padding: 1.5rem;
                }
                
                .chart-overview {
                    margin-bottom: 1.5rem;
                }
                
                .overview-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.75rem;
                    padding-bottom: 0.75rem;
                    border-bottom: 1px solid #f1f5f9;
                }
                
                .overview-item:last-child {
                    border-bottom: none;
                }
                
                .overview-item .label {
                    color: #64748b;
                    font-weight: 500;
                }
                
                .overview-item .value {
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .overview-item .value.dosha {
                    font-weight: 700;
                }
                
                .meals-section h4 {
                    margin: 0 0 1rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .meal-group {
                    margin-bottom: 1rem;
                }
                
                .meal-group h5 {
                    margin: 0 0 0.5rem 0;
                    color: #374151;
                    font-weight: 600;
                    font-size: 0.875rem;
                }
                
                .foods-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                
                .food-item {
                    background: #f8fafc;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    color: #374151;
                    border: 1px solid #e2e8f0;
                }
                
                @media (max-width: 768px) {
                    .filters-section {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    
                    .search-box {
                        min-width: auto;
                    }
                    
                    .filter-controls {
                        justify-content: space-between;
                    }
                    
                    .charts-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .header-stats {
                        gap: 1rem;
                    }
                    
                    .modal-content {
                        width: 95%;
                        margin: 1rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default DietChartHistory;
