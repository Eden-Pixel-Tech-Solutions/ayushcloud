import React, { useState } from 'react';
import { Search, FileText, Calendar, User, Plus, Edit, Eye, Filter } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function TreatmentPlans({ 
    activeSection = 'treatment-plans',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const treatmentPlans = [
        {
            id: 1,
            patientId: 'P001',
            patientName: 'Rajesh Kumar',
            condition: 'Vata Imbalance',
            planTitle: 'Vata Pacification Protocol',
            status: 'Active',
            startDate: '2024-01-15',
            duration: '3 months',
            progress: 65,
            treatments: [
                { type: 'Panchakarma', name: 'Abhyanga + Swedana', frequency: 'Daily for 14 days' },
                { type: 'Herbal Medicine', name: 'Ashwagandha Churna', frequency: '3g twice daily' },
                { type: 'Diet', name: 'Vata pacifying foods', frequency: 'Ongoing' },
                { type: 'Lifestyle', name: 'Regular sleep schedule', frequency: 'Daily' }
            ],
            nextAppointment: '2024-02-15',
            notes: 'Patient showing good response to treatment. Anxiety levels reduced significantly.'
        },
        {
            id: 2,
            patientId: 'P002',
            patientName: 'Priya Sharma',
            condition: 'Pitta Aggravation',
            planTitle: 'Pitta Cooling Therapy',
            status: 'Active',
            startDate: '2024-01-12',
            duration: '2 months',
            progress: 40,
            treatments: [
                { type: 'Panchakarma', name: 'Shirodhara', frequency: '3 times per week' },
                { type: 'Herbal Medicine', name: 'Saraswatarishta', frequency: '15ml twice daily' },
                { type: 'Diet', name: 'Cooling foods, avoid spicy', frequency: 'Ongoing' },
                { type: 'Yoga', name: 'Cooling pranayama', frequency: 'Daily morning' }
            ],
            nextAppointment: '2024-02-12',
            notes: 'Skin inflammation reducing. Continue current protocol.'
        },
        {
            id: 3,
            patientId: 'P003',
            patientName: 'Amit Patel',
            condition: 'Kapha Stagnation',
            planTitle: 'Kapha Reduction Program',
            status: 'Completed',
            startDate: '2023-11-10',
            duration: '4 months',
            progress: 100,
            treatments: [
                { type: 'Panchakarma', name: 'Udvartana', frequency: 'Daily for 21 days' },
                { type: 'Herbal Medicine', name: 'Triphala Guggulu', frequency: '2 tablets twice daily' },
                { type: 'Exercise', name: 'Vigorous yoga', frequency: 'Daily' },
                { type: 'Diet', name: 'Light, warm foods', frequency: 'Ongoing' }
            ],
            nextAppointment: '2024-03-10',
            notes: 'Treatment completed successfully. Weight reduced by 8kg. Maintain lifestyle changes.'
        },
        {
            id: 4,
            patientId: 'P004',
            patientName: 'Sunita Reddy',
            condition: 'Digestive Issues',
            planTitle: 'Agni Deepana Protocol',
            status: 'Pending',
            startDate: '2024-02-01',
            duration: '6 weeks',
            progress: 0,
            treatments: [
                { type: 'Herbal Medicine', name: 'Hingwashtak Churna', frequency: '1g before meals' },
                { type: 'Diet', name: 'Easy to digest foods', frequency: 'Ongoing' },
                { type: 'Lifestyle', name: 'Regular meal times', frequency: 'Daily' },
                { type: 'Yoga', name: 'Digestive asanas', frequency: 'Evening' }
            ],
            nextAppointment: '2024-02-01',
            notes: 'Initial consultation completed. Plan to start next week.'
        }
    ];

    const filteredPlans = treatmentPlans.filter(plan => {
        const matchesSearch = plan.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            plan.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            plan.planTitle.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || plan.status.toLowerCase() === statusFilter.toLowerCase();
        
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return 'text-green-600 bg-green-100 border-green-200';
            case 'completed': return 'text-blue-600 bg-blue-100 border-blue-200';
            case 'pending': return 'text-orange-600 bg-orange-100 border-orange-200';
            case 'paused': return 'text-gray-600 bg-gray-100 border-gray-200';
            default: return 'text-gray-600 bg-gray-100 border-gray-200';
        }
    };

    const getTreatmentTypeColor = (type) => {
        switch (type.toLowerCase()) {
            case 'panchakarma': return '#8B5CF6';
            case 'herbal medicine': return '#10B981';
            case 'diet': return '#F59E0B';
            case 'lifestyle': return '#3B82F6';
            case 'yoga': return '#EF4444';
            case 'exercise': return '#06B6D4';
            default: return '#6B7280';
        }
    };

    const planStats = {
        total: treatmentPlans.length,
        active: treatmentPlans.filter(p => p.status === 'Active').length,
        completed: treatmentPlans.filter(p => p.status === 'Completed').length,
        pending: treatmentPlans.filter(p => p.status === 'Pending').length
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
                            Treatment Plans
                        </h1>
                        <button 
                            className="btn btn-primary"
                            onClick={() => setShowCreateForm(true)}
                        >
                            <Plus size={20} />
                            Create New Plan
                        </button>
                    </div>
                    
                    <div className="plan-stats">
                        <div className="stat-card">
                            <div className="stat-icon total">
                                <FileText size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{planStats.total}</h3>
                                <p>Total Plans</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon active">
                                <Calendar size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{planStats.active}</h3>
                                <p>Active Plans</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon completed">
                                <User size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{planStats.completed}</h3>
                                <p>Completed</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon pending">
                                <Plus size={24} />
                            </div>
                            <div className="stat-info">
                                <h3>{planStats.pending}</h3>
                                <p>Pending</p>
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
                                    placeholder="Search patients, conditions, or plans..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            
                            <div className="filter-group">
                                <select 
                                    value={statusFilter} 
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="paused">Paused</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="plans-grid">
                        {filteredPlans.map(plan => (
                            <div key={plan.id} className="plan-card">
                                <div className="plan-header">
                                    <div className="plan-title-section">
                                        <h3>{plan.planTitle}</h3>
                                        <p className="patient-info">
                                            <User size={14} />
                                            {plan.patientName} (ID: {plan.patientId})
                                        </p>
                                        <p className="condition">{plan.condition}</p>
                                    </div>
                                    <div className={`status-badge ${getStatusColor(plan.status)}`}>
                                        {plan.status}
                                    </div>
                                </div>

                                <div className="plan-progress">
                                    <div className="progress-header">
                                        <span>Progress</span>
                                        <span>{plan.progress}%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div 
                                            className="progress-fill"
                                            style={{ width: `${plan.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="plan-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Start Date:</span>
                                        <span>{new Date(plan.startDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Duration:</span>
                                        <span>{plan.duration}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Next Visit:</span>
                                        <span>{new Date(plan.nextAppointment).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="treatments-preview">
                                    <h5>Treatments ({plan.treatments.length})</h5>
                                    <div className="treatment-types">
                                        {plan.treatments.slice(0, 3).map((treatment, index) => (
                                            <span 
                                                key={index} 
                                                className="treatment-tag"
                                                style={{ 
                                                    backgroundColor: getTreatmentTypeColor(treatment.type) + '20',
                                                    color: getTreatmentTypeColor(treatment.type)
                                                }}
                                            >
                                                {treatment.type}
                                            </span>
                                        ))}
                                        {plan.treatments.length > 3 && (
                                            <span className="more-treatments">+{plan.treatments.length - 3} more</span>
                                        )}
                                    </div>
                                </div>

                                <div className="plan-actions">
                                    <button 
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => setSelectedPlan(plan)}
                                    >
                                        <Eye size={16} />
                                        View Details
                                    </button>
                                    <button className="btn btn-primary btn-sm">
                                        <Edit size={16} />
                                        Edit Plan
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredPlans.length === 0 && (
                        <div className="no-results">
                            <FileText size={48} />
                            <h3>No treatment plans found</h3>
                            <p>Try adjusting your search criteria or create a new plan.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Plan Details Modal */}
            {selectedPlan && (
                <div className="modal-overlay" onClick={() => setSelectedPlan(null)}>
                    <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{selectedPlan.planTitle}</h2>
                            <button className="close-btn" onClick={() => setSelectedPlan(null)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="plan-overview">
                                <div className="overview-grid">
                                    <div className="overview-item">
                                        <h4>Patient</h4>
                                        <p>{selectedPlan.patientName} ({selectedPlan.patientId})</p>
                                    </div>
                                    <div className="overview-item">
                                        <h4>Condition</h4>
                                        <p>{selectedPlan.condition}</p>
                                    </div>
                                    <div className="overview-item">
                                        <h4>Status</h4>
                                        <span className={`status-badge ${getStatusColor(selectedPlan.status)}`}>
                                            {selectedPlan.status}
                                        </span>
                                    </div>
                                    <div className="overview-item">
                                        <h4>Progress</h4>
                                        <p>{selectedPlan.progress}%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="treatments-section">
                                <h4>Treatment Details</h4>
                                <div className="treatments-list">
                                    {selectedPlan.treatments.map((treatment, index) => (
                                        <div key={index} className="treatment-item">
                                            <div className="treatment-header">
                                                <span 
                                                    className="treatment-type"
                                                    style={{ 
                                                        backgroundColor: getTreatmentTypeColor(treatment.type) + '20',
                                                        color: getTreatmentTypeColor(treatment.type)
                                                    }}
                                                >
                                                    {treatment.type}
                                                </span>
                                                <h5>{treatment.name}</h5>
                                            </div>
                                            <p className="treatment-frequency">{treatment.frequency}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="notes-section">
                                <h4>Notes</h4>
                                <p>{selectedPlan.notes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <style jsx>{`
                .plan-stats {
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
                .stat-icon.active { background: #10b981; }
                .stat-icon.completed { background: #8b5cf6; }
                .stat-icon.pending { background: #f59e0b; }
                
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
                }
                
                .filter-select {
                    padding: 0.5rem 1rem;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    background: white;
                    color: #374151;
                    font-size: 0.875rem;
                }
                
                .plans-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 1.5rem;
                }
                
                .plan-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .plan-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .plan-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.5rem;
                }
                
                .plan-title-section h3 {
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
                
                .condition {
                    margin: 0;
                    color: #374151;
                    font-size: 0.875rem;
                    font-weight: 500;
                }
                
                .status-badge {
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border: 1px solid;
                }
                
                .plan-progress {
                    margin-bottom: 1.5rem;
                }
                
                .progress-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
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
                    background: #10b981;
                    transition: width 0.3s ease;
                }
                
                .plan-details {
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
                
                .treatments-preview h5 {
                    margin: 0 0 0.75rem 0;
                    color: #1e293b;
                    font-size: 0.875rem;
                    font-weight: 600;
                }
                
                .treatment-types {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }
                
                .treatment-tag {
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border: 1px solid currentColor;
                }
                
                .more-treatments {
                    background: #e2e8f0;
                    color: #64748b;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .plan-actions {
                    display: flex;
                    gap: 0.75rem;
                    justify-content: flex-end;
                }
                
                .modal-content.large {
                    max-width: 800px;
                    width: 95%;
                }
                
                .plan-overview {
                    margin-bottom: 2rem;
                }
                
                .overview-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }
                
                .overview-item h4 {
                    margin: 0 0 0.5rem 0;
                    color: #1e293b;
                    font-weight: 600;
                    font-size: 0.875rem;
                }
                
                .overview-item p {
                    margin: 0;
                    color: #374151;
                }
                
                .treatments-section {
                    margin-bottom: 2rem;
                }
                
                .treatments-section h4 {
                    margin: 0 0 1rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .treatments-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .treatment-item {
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                }
                
                .treatment-header {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 0.5rem;
                }
                
                .treatment-type {
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border: 1px solid currentColor;
                }
                
                .treatment-header h5 {
                    margin: 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .treatment-frequency {
                    margin: 0;
                    color: #64748b;
                    font-size: 0.875rem;
                }
                
                .notes-section h4 {
                    margin: 0 0 0.75rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .notes-section p {
                    margin: 0;
                    color: #374151;
                    line-height: 1.5;
                }
                
                @media (max-width: 768px) {
                    .plan-stats {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .search-filter-row {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    
                    .search-box {
                        min-width: auto;
                    }
                    
                    .plans-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .plan-header {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .overview-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .plan-actions {
                        justify-content: stretch;
                    }
                    
                    .plan-actions .btn {
                        flex: 1;
                    }
                }
            `}</style>
        </div>
    );
}

export default TreatmentPlans;
