import React, { useState } from 'react';
import { Bookmark, Search, Star, Copy, Edit, Trash2, Plus, Filter } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function SavedDietCharts({ 
    activeSection = 'saved-diet-charts',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [selectedChart, setSelectedChart] = useState(null);

    const savedCharts = [
        {
            id: 'ST001',
            name: 'Vata Balancing Diet',
            category: 'Dosha-Specific',
            description: 'Comprehensive diet plan for Vata constitution with warming and grounding foods',
            tags: ['Vata', 'Digestive', 'Anxiety'],
            rating: 4.8,
            usageCount: 15,
            lastUsed: '2024-01-12',
            meals: {
                breakfast: ['Warm Oatmeal with Ghee', 'Ginger Tea', 'Dates', 'Almonds'],
                lunch: ['Basmati Rice', 'Moong Dal', 'Cooked Vegetables', 'Buttermilk'],
                dinner: ['Khichdi', 'Warm Milk', 'Turmeric', 'Honey']
            },
            guidelines: [
                'Eat warm, cooked foods',
                'Include healthy fats like ghee',
                'Avoid cold and raw foods',
                'Regular meal times are important'
            ]
        },
        {
            id: 'ST002',
            name: 'Pitta Cooling Protocol',
            category: 'Dosha-Specific',
            description: 'Cooling diet template for Pitta types with anti-inflammatory foods',
            tags: ['Pitta', 'Cooling', 'Inflammation'],
            rating: 4.9,
            usageCount: 22,
            lastUsed: '2024-01-10',
            meals: {
                breakfast: ['Coconut Water', 'Fresh Fruits', 'Mint Tea', 'Cucumber'],
                lunch: ['Cooling Rice', 'Coriander Chutney', 'Steamed Vegetables', 'Yogurt'],
                dinner: ['Light Khichdi', 'Rose Water', 'Fennel Tea', 'Sweet Fruits']
            },
            guidelines: [
                'Favor cool and sweet foods',
                'Avoid spicy and sour foods',
                'Include plenty of fresh fruits',
                'Stay hydrated with cooling drinks'
            ]
        },
        {
            id: 'ST003',
            name: 'Kapha Energizing Plan',
            category: 'Dosha-Specific',
            description: 'Stimulating diet for Kapha constitution to boost metabolism',
            tags: ['Kapha', 'Weight Loss', 'Energy'],
            rating: 4.7,
            usageCount: 18,
            lastUsed: '2024-01-08',
            meals: {
                breakfast: ['Green Tea', 'Upma', 'Honey', 'Ginger'],
                lunch: ['Quinoa', 'Spiced Vegetables', 'Turmeric Milk', 'Bitter Greens'],
                dinner: ['Vegetable Soup', 'Millet Roti', 'Herbal Tea', 'Light Salad']
            },
            guidelines: [
                'Eat light and warm foods',
                'Include pungent spices',
                'Avoid heavy and oily foods',
                'Skip breakfast occasionally'
            ]
        },
        {
            id: 'ST004',
            name: 'Digestive Healing Diet',
            category: 'Therapeutic',
            description: 'Gentle diet plan for digestive disorders and gut healing',
            tags: ['Digestive', 'Healing', 'Gentle'],
            rating: 4.6,
            usageCount: 12,
            lastUsed: '2024-01-05',
            meals: {
                breakfast: ['Rice Porridge', 'Ginger Water', 'Cooked Apples'],
                lunch: ['Simple Khichdi', 'Buttermilk', 'Steamed Carrots'],
                dinner: ['Vegetable Broth', 'Plain Rice', 'Chamomile Tea']
            },
            guidelines: [
                'Eat simple, easily digestible foods',
                'Avoid raw and complex foods',
                'Include digestive spices',
                'Eat smaller, frequent meals'
            ]
        },
        {
            id: 'ST005',
            name: 'Seasonal Spring Cleanse',
            category: 'Seasonal',
            description: 'Detoxifying diet plan for spring season to eliminate toxins',
            tags: ['Detox', 'Spring', 'Cleansing'],
            rating: 4.5,
            usageCount: 8,
            lastUsed: '2024-01-03',
            meals: {
                breakfast: ['Warm Lemon Water', 'Light Fruits', 'Herbal Tea'],
                lunch: ['Bitter Greens', 'Quinoa', 'Detox Soup', 'Green Tea'],
                dinner: ['Vegetable Broth', 'Steamed Vegetables', 'Turmeric Milk']
            },
            guidelines: [
                'Include bitter and astringent tastes',
                'Reduce heavy and oily foods',
                'Drink plenty of warm water',
                'Include detoxifying herbs'
            ]
        }
    ];

    const categories = ['all', 'Dosha-Specific', 'Therapeutic', 'Seasonal', 'Weight Management'];

    const filteredCharts = savedCharts.filter(chart => {
        const matchesSearch = chart.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            chart.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            chart.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = categoryFilter === 'all' || chart.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });

    const handleUseTemplate = (chart) => {
        alert(`Using template: ${chart.name}`);
        // Logic to use template would go here
    };

    const handleCopyTemplate = (chart) => {
        alert(`Template "${chart.name}" copied to clipboard`);
        // Logic to copy template would go here
    };

    const handleEditTemplate = (chart) => {
        alert(`Editing template: ${chart.name}`);
        // Logic to edit template would go here
    };

    const handleDeleteTemplate = (chart) => {
        if (window.confirm(`Are you sure you want to delete "${chart.name}"?`)) {
            alert(`Template "${chart.name}" deleted`);
            // Logic to delete template would go here
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
                    <h1 className="page-title">
                        <Bookmark className="title-icon" />
                        Saved Diet Chart Templates
                    </h1>
                    <button className="create-template-btn">
                        <Plus size={16} />
                        Create New Template
                    </button>
                </div>

                <div className="content-body">
                    {/* Filters */}
                    <div className="filters-section">
                        <div className="search-box">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Search templates by name, description, or tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-controls">
                            <div className="filter-group">
                                <Filter size={16} />
                                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category === 'all' ? 'All Categories' : category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Templates Grid */}
                    <div className="templates-grid">
                        {filteredCharts.map(chart => (
                            <div key={chart.id} className="template-card">
                                <div className="template-header">
                                    <div className="template-info">
                                        <h3 className="template-name">{chart.name}</h3>
                                        <span className="template-category">{chart.category}</span>
                                    </div>
                                    <div className="template-rating">
                                        <Star size={16} fill="#fbbf24" color="#fbbf24" />
                                        <span>{chart.rating}</span>
                                    </div>
                                </div>

                                <p className="template-description">{chart.description}</p>

                                <div className="template-tags">
                                    {chart.tags.map((tag, index) => (
                                        <span key={index} className="tag">{tag}</span>
                                    ))}
                                </div>

                                <div className="template-stats">
                                    <div className="stat">
                                        <span className="stat-value">{chart.usageCount}</span>
                                        <span className="stat-label">Times Used</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-value">{new Date(chart.lastUsed).toLocaleDateString()}</span>
                                        <span className="stat-label">Last Used</span>
                                    </div>
                                </div>

                                <div className="template-actions">
                                    <button 
                                        className="action-btn primary"
                                        onClick={() => handleUseTemplate(chart)}
                                    >
                                        <Plus size={14} />
                                        Use Template
                                    </button>
                                    <button 
                                        className="action-btn secondary"
                                        onClick={() => setSelectedChart(chart)}
                                    >
                                        View Details
                                    </button>
                                    <div className="action-menu">
                                        <button 
                                            className="action-btn icon"
                                            onClick={() => handleCopyTemplate(chart)}
                                            title="Copy Template"
                                        >
                                            <Copy size={14} />
                                        </button>
                                        <button 
                                            className="action-btn icon"
                                            onClick={() => handleEditTemplate(chart)}
                                            title="Edit Template"
                                        >
                                            <Edit size={14} />
                                        </button>
                                        <button 
                                            className="action-btn icon danger"
                                            onClick={() => handleDeleteTemplate(chart)}
                                            title="Delete Template"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredCharts.length === 0 && (
                        <div className="no-results">
                            <Bookmark size={48} />
                            <h3>No templates found</h3>
                            <p>Try adjusting your search criteria or create a new template</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Template Details Modal */}
            {selectedChart && (
                <div className="modal-overlay" onClick={() => setSelectedChart(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{selectedChart.name}</h3>
                            <button className="close-btn" onClick={() => setSelectedChart(null)}>×</button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="template-overview">
                                <div className="overview-item">
                                    <span className="label">Category:</span>
                                    <span className="value">{selectedChart.category}</span>
                                </div>
                                <div className="overview-item">
                                    <span className="label">Rating:</span>
                                    <span className="value rating">
                                        <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                        {selectedChart.rating}
                                    </span>
                                </div>
                                <div className="overview-item">
                                    <span className="label">Usage Count:</span>
                                    <span className="value">{selectedChart.usageCount} times</span>
                                </div>
                            </div>

                            <div className="description-section">
                                <h4>Description</h4>
                                <p>{selectedChart.description}</p>
                            </div>

                            <div className="meals-section">
                                <h4>Meal Plan</h4>
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

                            <div className="guidelines-section">
                                <h4>Guidelines</h4>
                                <ul className="guidelines-list">
                                    {selectedChart.guidelines.map((guideline, index) => (
                                        <li key={index}>{guideline}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="modal-actions">
                                <button 
                                    className="btn-primary"
                                    onClick={() => handleUseTemplate(selectedChart)}
                                >
                                    <Plus size={16} />
                                    Use This Template
                                </button>
                                <button 
                                    className="btn-secondary"
                                    onClick={() => handleCopyTemplate(selectedChart)}
                                >
                                    <Copy size={16} />
                                    Copy Template
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <style jsx>{`
                .create-template-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    background: #3b82f6;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                
                .create-template-btn:hover {
                    background: #2563eb;
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
                
                .templates-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                    gap: 1.5rem;
                }
                
                .template-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .template-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .template-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }
                
                .template-info {
                    flex: 1;
                }
                
                .template-name {
                    margin: 0 0 0.25rem 0;
                    color: #1e293b;
                    font-weight: 600;
                    font-size: 1.125rem;
                }
                
                .template-category {
                    background: #f1f5f9;
                    color: #475569;
                    padding: 0.125rem 0.5rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .template-rating {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: #1e293b;
                    font-weight: 600;
                    font-size: 0.875rem;
                }
                
                .template-description {
                    color: #64748b;
                    font-size: 0.875rem;
                    line-height: 1.5;
                    margin-bottom: 1rem;
                }
                
                .template-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }
                
                .tag {
                    background: #e0f2fe;
                    color: #0369a1;
                    padding: 0.125rem 0.5rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .template-stats {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1.5rem;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 8px;
                }
                
                .stat {
                    text-align: center;
                }
                
                .stat-value {
                    display: block;
                    font-weight: 700;
                    color: #1e293b;
                    font-size: 0.875rem;
                }
                
                .stat-label {
                    font-size: 0.75rem;
                    color: #64748b;
                }
                
                .template-actions {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }
                
                .action-btn {
                    padding: 0.5rem 1rem;
                    border: 1px solid #d1d5db;
                    background: white;
                    border-radius: 6px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    font-size: 0.75rem;
                    transition: all 0.2s;
                    font-weight: 500;
                }
                
                .action-btn:hover {
                    background: #f8fafc;
                }
                
                .action-btn.primary {
                    background: #3b82f6;
                    color: white;
                    border-color: #3b82f6;
                }
                
                .action-btn.primary:hover {
                    background: #2563eb;
                }
                
                .action-btn.secondary {
                    color: #374151;
                }
                
                .action-btn.icon {
                    padding: 0.5rem;
                    min-width: auto;
                }
                
                .action-btn.danger {
                    color: #ef4444;
                    border-color: #ef4444;
                }
                
                .action-btn.danger:hover {
                    background: #fef2f2;
                }
                
                .action-menu {
                    display: flex;
                    gap: 0.25rem;
                    margin-left: auto;
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
                    max-width: 700px;
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
                
                .template-overview {
                    margin-bottom: 1.5rem;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 8px;
                }
                
                .overview-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                }
                
                .overview-item:last-child {
                    margin-bottom: 0;
                }
                
                .overview-item .label {
                    color: #64748b;
                    font-weight: 500;
                }
                
                .overview-item .value {
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .overview-item .value.rating {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }
                
                .description-section,
                .meals-section,
                .guidelines-section {
                    margin-bottom: 1.5rem;
                }
                
                .description-section h4,
                .meals-section h4,
                .guidelines-section h4 {
                    margin: 0 0 1rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .description-section p {
                    color: #64748b;
                    line-height: 1.6;
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
                    background: #f1f5f9;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    color: #374151;
                    border: 1px solid #e2e8f0;
                }
                
                .guidelines-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .guidelines-list li {
                    padding: 0.5rem 0;
                    border-bottom: 1px solid #f1f5f9;
                    color: #374151;
                }
                
                .guidelines-list li:last-child {
                    border-bottom: none;
                }
                
                .guidelines-list li::before {
                    content: '•';
                    color: #3b82f6;
                    font-weight: bold;
                    margin-right: 0.5rem;
                }
                
                .modal-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: flex-end;
                    padding-top: 1rem;
                    border-top: 1px solid #e2e8f0;
                }
                
                .btn-primary, .btn-secondary {
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.2s;
                }
                
                .btn-primary {
                    background: #3b82f6;
                    color: white;
                    border: none;
                }
                
                .btn-primary:hover {
                    background: #2563eb;
                }
                
                .btn-secondary {
                    background: white;
                    color: #374151;
                    border: 1px solid #d1d5db;
                }
                
                .btn-secondary:hover {
                    background: #f9fafb;
                }
                
                @media (max-width: 768px) {
                    .filters-section {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    
                    .search-box {
                        min-width: auto;
                    }
                    
                    .templates-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .template-actions {
                        flex-wrap: wrap;
                    }
                    
                    .action-menu {
                        margin-left: 0;
                        margin-top: 0.5rem;
                    }
                    
                    .modal-content {
                        width: 95%;
                        margin: 1rem;
                    }
                    
                    .modal-actions {
                        flex-direction: column;
                    }
                }
            `}</style>
        </div>
    );
}

export default SavedDietCharts;
