import React, { useState } from 'react';
import { Search, Utensils, Calendar, User, Plus, Download, Clock } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function AyurvedicDiet({ 
    activeSection = 'ayurvedic-diet',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [doshaFilter, setDoshaFilter] = useState('all');
    const [seasonFilter, setSeasonFilter] = useState('all');
    const [selectedDiet, setSelectedDiet] = useState(null);

    const dietRecommendations = [
        {
            id: 1,
            patientName: 'Rajesh Kumar',
            patientId: 'P001',
            dosha: 'Vata',
            condition: 'Anxiety & Insomnia',
            season: 'Winter',
            createdDate: '2024-01-15',
            meals: {
                breakfast: {
                    foods: ['Warm oatmeal with ghee', 'Soaked almonds', 'Warm milk with dates'],
                    timing: '7:00 AM',
                    notes: 'Warm, nourishing foods to ground Vata'
                },
                lunch: {
                    foods: ['Khichdi with vegetables', 'Buttermilk', 'Steamed vegetables'],
                    timing: '12:00 PM',
                    notes: 'Main meal should be largest and warm'
                },
                dinner: {
                    foods: ['Light soup', 'Chapati with ghee', 'Herbal tea'],
                    timing: '7:00 PM',
                    notes: 'Light, early dinner for better sleep'
                }
            },
            guidelines: [
                'Eat warm, cooked foods',
                'Regular meal times',
                'Avoid cold drinks',
                'Include healthy fats like ghee'
            ],
            avoidFoods: ['Raw salads', 'Cold beverages', 'Dry snacks', 'Excessive spices'],
            duration: '4 weeks'
        },
        {
            id: 2,
            patientName: 'Priya Sharma',
            patientId: 'P002',
            dosha: 'Pitta',
            condition: 'Acidity & Skin Issues',
            season: 'Summer',
            createdDate: '2024-01-12',
            meals: {
                breakfast: {
                    foods: ['Fresh fruit salad', 'Coconut water', 'Cooling smoothie'],
                    timing: '7:30 AM',
                    notes: 'Cool, sweet foods to pacify Pitta'
                },
                lunch: {
                    foods: ['Rice with dal', 'Cucumber raita', 'Sweet vegetables'],
                    timing: '12:30 PM',
                    notes: 'Avoid spicy and sour foods'
                },
                dinner: {
                    foods: ['Light khichdi', 'Mint tea', 'Sweet fruits'],
                    timing: '7:30 PM',
                    notes: 'Cool, easily digestible foods'
                }
            },
            guidelines: [
                'Favor cool, sweet foods',
                'Avoid spicy, sour, salty foods',
                'Eat at regular times',
                'Stay hydrated with cool drinks'
            ],
            avoidFoods: ['Spicy food', 'Citrus fruits', 'Tomatoes', 'Hot beverages'],
            duration: '6 weeks'
        },
        {
            id: 3,
            patientName: 'Amit Patel',
            patientId: 'P003',
            dosha: 'Kapha',
            condition: 'Weight Management',
            season: 'Spring',
            createdDate: '2024-01-10',
            meals: {
                breakfast: {
                    foods: ['Warm water with honey', 'Light fruits', 'Herbal tea'],
                    timing: '8:00 AM',
                    notes: 'Light breakfast to stimulate digestion'
                },
                lunch: {
                    foods: ['Quinoa salad', 'Steamed vegetables', 'Ginger tea'],
                    timing: '1:00 PM',
                    notes: 'Largest meal with warming spices'
                },
                dinner: {
                    foods: ['Vegetable soup', 'Small portion grains', 'Turmeric milk'],
                    timing: '6:30 PM',
                    notes: 'Early, light dinner'
                }
            },
            guidelines: [
                'Eat light, warm foods',
                'Include warming spices',
                'Reduce dairy and sweets',
                'Regular exercise before meals'
            ],
            avoidFoods: ['Heavy dairy', 'Excessive sweets', 'Cold foods', 'Overeating'],
            duration: '8 weeks'
        }
    ];

    const filteredDiets = dietRecommendations.filter(diet => {
        const matchesSearch = diet.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            diet.condition.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesDosha = doshaFilter === 'all' || diet.dosha.toLowerCase() === doshaFilter.toLowerCase();
        const matchesSeason = seasonFilter === 'all' || diet.season.toLowerCase() === seasonFilter.toLowerCase();
        
        return matchesSearch && matchesDosha && matchesSeason;
    });

    const getDoshaColor = (dosha) => {
        switch (dosha.toLowerCase()) {
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
                            <Utensils className="title-icon" />
                            Ayurvedic Diet Recommendations
                        </h1>
                        <button className="btn btn-primary">
                            <Plus size={20} />
                            Create Diet Plan
                        </button>
                    </div>
                </div>

                <div className="content-body">
                    <div className="filters-section">
                        <div className="search-filter-row">
                            <div className="search-box">
                                <Search className="search-icon" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search patients or conditions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            
                            <div className="filter-group">
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
                                
                                <select 
                                    value={seasonFilter} 
                                    onChange={(e) => setSeasonFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Seasons</option>
                                    <option value="spring">Spring</option>
                                    <option value="summer">Summer</option>
                                    <option value="monsoon">Monsoon</option>
                                    <option value="winter">Winter</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="diets-grid">
                        {filteredDiets.map(diet => (
                            <div key={diet.id} className="diet-card">
                                <div className="diet-header">
                                    <div className="patient-info">
                                        <h3>{diet.patientName}</h3>
                                        <p className="patient-id">ID: {diet.patientId}</p>
                                        <p className="condition">{diet.condition}</p>
                                    </div>
                                    <div className="diet-meta">
                                        <span 
                                            className="dosha-badge"
                                            style={{ 
                                                backgroundColor: getDoshaColor(diet.dosha) + '20',
                                                color: getDoshaColor(diet.dosha)
                                            }}
                                        >
                                            {diet.dosha}
                                        </span>
                                        <span className="season-badge">{diet.season}</span>
                                    </div>
                                </div>

                                <div className="meals-preview">
                                    <h5>Daily Meal Plan</h5>
                                    <div className="meals-summary">
                                        <div className="meal-item">
                                            <div className="meal-time">
                                                <Clock size={14} />
                                                {diet.meals.breakfast.timing}
                                            </div>
                                            <div className="meal-name">Breakfast</div>
                                            <div className="meal-foods">
                                                {diet.meals.breakfast.foods[0]}
                                                {diet.meals.breakfast.foods.length > 1 && ` +${diet.meals.breakfast.foods.length - 1} more`}
                                            </div>
                                        </div>
                                        <div className="meal-item">
                                            <div className="meal-time">
                                                <Clock size={14} />
                                                {diet.meals.lunch.timing}
                                            </div>
                                            <div className="meal-name">Lunch</div>
                                            <div className="meal-foods">
                                                {diet.meals.lunch.foods[0]}
                                                {diet.meals.lunch.foods.length > 1 && ` +${diet.meals.lunch.foods.length - 1} more`}
                                            </div>
                                        </div>
                                        <div className="meal-item">
                                            <div className="meal-time">
                                                <Clock size={14} />
                                                {diet.meals.dinner.timing}
                                            </div>
                                            <div className="meal-name">Dinner</div>
                                            <div className="meal-foods">
                                                {diet.meals.dinner.foods[0]}
                                                {diet.meals.dinner.foods.length > 1 && ` +${diet.meals.dinner.foods.length - 1} more`}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="guidelines-preview">
                                    <h5>Key Guidelines</h5>
                                    <ul className="guidelines-list">
                                        {diet.guidelines.slice(0, 2).map((guideline, index) => (
                                            <li key={index}>{guideline}</li>
                                        ))}
                                        {diet.guidelines.length > 2 && (
                                            <li className="more-guidelines">+{diet.guidelines.length - 2} more guidelines</li>
                                        )}
                                    </ul>
                                </div>

                                <div className="diet-footer">
                                    <div className="diet-duration">
                                        <Calendar size={14} />
                                        Duration: {diet.duration}
                                    </div>
                                    <div className="diet-actions">
                                        <button 
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => setSelectedDiet(diet)}
                                        >
                                            View Full Plan
                                        </button>
                                        <button className="btn btn-primary btn-sm">
                                            <Download size={14} />
                                            Export
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredDiets.length === 0 && (
                        <div className="no-results">
                            <Utensils size={48} />
                            <h3>No diet plans found</h3>
                            <p>Try adjusting your search criteria or create a new diet plan.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Diet Details Modal */}
            {selectedDiet && (
                <div className="modal-overlay" onClick={() => setSelectedDiet(null)}>
                    <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Diet Plan - {selectedDiet.patientName}</h2>
                            <button className="close-btn" onClick={() => setSelectedDiet(null)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="diet-overview">
                                <div className="overview-grid">
                                    <div className="overview-item">
                                        <h4>Patient</h4>
                                        <p>{selectedDiet.patientName} ({selectedDiet.patientId})</p>
                                    </div>
                                    <div className="overview-item">
                                        <h4>Condition</h4>
                                        <p>{selectedDiet.condition}</p>
                                    </div>
                                    <div className="overview-item">
                                        <h4>Dosha Type</h4>
                                        <span 
                                            className="dosha-badge"
                                            style={{ 
                                                backgroundColor: getDoshaColor(selectedDiet.dosha) + '20',
                                                color: getDoshaColor(selectedDiet.dosha)
                                            }}
                                        >
                                            {selectedDiet.dosha}
                                        </span>
                                    </div>
                                    <div className="overview-item">
                                        <h4>Season</h4>
                                        <p>{selectedDiet.season}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="detailed-meals">
                                <h4>Detailed Meal Plan</h4>
                                {Object.entries(selectedDiet.meals).map(([mealType, mealData]) => (
                                    <div key={mealType} className="meal-section">
                                        <div className="meal-header">
                                            <h5>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h5>
                                            <span className="meal-timing">{mealData.timing}</span>
                                        </div>
                                        <div className="meal-content">
                                            <div className="foods-list">
                                                <strong>Foods:</strong>
                                                <ul>
                                                    {mealData.foods.map((food, index) => (
                                                        <li key={index}>{food}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="meal-notes">
                                                <strong>Notes:</strong> {mealData.notes}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="guidelines-section">
                                <h4>Dietary Guidelines</h4>
                                <ul className="full-guidelines">
                                    {selectedDiet.guidelines.map((guideline, index) => (
                                        <li key={index}>{guideline}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="avoid-foods-section">
                                <h4>Foods to Avoid</h4>
                                <div className="avoid-foods-list">
                                    {selectedDiet.avoidFoods.map((food, index) => (
                                        <span key={index} className="avoid-food-tag">{food}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <style jsx>{`
                .filters-section {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    border: 1px solid #e2e8f0;
                }
                
                .diets-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 1.5rem;
                }
                
                .diet-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .diet-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .diet-header {
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
                
                .diet-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    align-items: flex-end;
                }
                
                .dosha-badge {
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border: 1px solid currentColor;
                }
                
                .season-badge {
                    background: #f0f9ff;
                    color: #0369a1;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                
                .meals-preview, .guidelines-preview {
                    margin-bottom: 1.5rem;
                }
                
                .meals-preview h5, .guidelines-preview h5 {
                    margin: 0 0 0.75rem 0;
                    color: #1e293b;
                    font-size: 0.875rem;
                    font-weight: 600;
                }
                
                .meals-summary {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .meal-item {
                    padding: 0.75rem;
                    background: #f8fafc;
                    border-radius: 8px;
                    border-left: 3px solid #3b82f6;
                }
                
                .meal-time {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: #64748b;
                    font-size: 0.75rem;
                    margin-bottom: 0.25rem;
                }
                
                .meal-name {
                    font-weight: 600;
                    color: #1e293b;
                    font-size: 0.875rem;
                    margin-bottom: 0.25rem;
                }
                
                .meal-foods {
                    color: #374151;
                    font-size: 0.875rem;
                }
                
                .guidelines-list {
                    margin: 0;
                    padding-left: 1.25rem;
                }
                
                .guidelines-list li {
                    margin-bottom: 0.25rem;
                    color: #374151;
                    font-size: 0.875rem;
                }
                
                .more-guidelines {
                    color: #64748b;
                    font-style: italic;
                }
                
                .diet-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1rem;
                    border-top: 1px solid #f1f5f9;
                }
                
                .diet-duration {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #64748b;
                    font-size: 0.875rem;
                }
                
                .diet-actions {
                    display: flex;
                    gap: 0.5rem;
                }
                
                .modal-content.large {
                    max-width: 900px;
                    width: 95%;
                }
                
                .diet-overview {
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
                
                .detailed-meals {
                    margin-bottom: 2rem;
                }
                
                .detailed-meals h4 {
                    margin: 0 0 1rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .meal-section {
                    margin-bottom: 1.5rem;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                }
                
                .meal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.75rem;
                }
                
                .meal-header h5 {
                    margin: 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .meal-timing {
                    color: #64748b;
                    font-size: 0.875rem;
                    font-weight: 500;
                }
                
                .meal-content {
                    display: grid;
                    gap: 0.75rem;
                }
                
                .foods-list ul {
                    margin: 0.5rem 0 0 1.25rem;
                    padding: 0;
                }
                
                .foods-list li {
                    margin-bottom: 0.25rem;
                    color: #374151;
                }
                
                .meal-notes {
                    color: #64748b;
                    font-size: 0.875rem;
                }
                
                .guidelines-section, .avoid-foods-section {
                    margin-bottom: 2rem;
                }
                
                .guidelines-section h4, .avoid-foods-section h4 {
                    margin: 0 0 0.75rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .full-guidelines {
                    margin: 0;
                    padding-left: 1.25rem;
                }
                
                .full-guidelines li {
                    margin-bottom: 0.5rem;
                    color: #374151;
                    line-height: 1.4;
                }
                
                .avoid-foods-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                
                .avoid-food-tag {
                    background: #fef2f2;
                    color: #dc2626;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                    border: 1px solid #fecaca;
                }
                
                @media (max-width: 768px) {
                    .diets-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .diet-header {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .diet-meta {
                        align-items: flex-start;
                        flex-direction: row;
                    }
                    
                    .overview-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .diet-footer {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: stretch;
                    }
                    
                    .diet-actions {
                        justify-content: stretch;
                    }
                    
                    .diet-actions .btn {
                        flex: 1;
                    }
                }
            `}</style>
        </div>
    );
}

export default AyurvedicDiet;
