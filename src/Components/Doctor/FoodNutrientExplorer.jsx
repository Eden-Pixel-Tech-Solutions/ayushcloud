import React, { useState } from 'react';
import { Search, Apple, Filter, Info, Star, Zap } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function FoodNutrientExplorer({ 
    activeSection = 'food-nutrient-explorer',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [doshaFilter, setDoshaFilter] = useState('all');
    const [selectedFood, setSelectedFood] = useState(null);

    const foodDatabase = [
        {
            id: 1,
            name: 'Rice (Basmati)',
            category: 'Grains',
            doshaEffect: { vata: 'Balancing', pitta: 'Cooling', kapha: 'Neutral' },
            taste: ['Sweet'],
            potency: 'Cooling',
            postDigestive: 'Sweet',
            nutrients: {
                calories: 130,
                protein: 2.7,
                carbs: 28,
                fiber: 0.4,
                vitamins: ['B1', 'B3', 'B6'],
                minerals: ['Manganese', 'Selenium']
            },
            benefits: ['Easy to digest', 'Provides energy', 'Calming for Pitta'],
            cautions: ['Can increase Kapha if consumed excessively'],
            preparation: ['Boiled', 'Steamed', 'In khichdi'],
            season: 'All seasons'
        },
        {
            id: 2,
            name: 'Ginger',
            category: 'Spices',
            doshaEffect: { vata: 'Balancing', pitta: 'Aggravating', kapha: 'Balancing' },
            taste: ['Pungent', 'Sweet'],
            potency: 'Heating',
            postDigestive: 'Sweet',
            nutrients: {
                calories: 80,
                protein: 1.8,
                carbs: 18,
                fiber: 2,
                vitamins: ['C', 'B6'],
                minerals: ['Potassium', 'Manganese', 'Magnesium']
            },
            benefits: ['Improves digestion', 'Reduces nausea', 'Anti-inflammatory'],
            cautions: ['Avoid in high Pitta conditions', 'Limit during pregnancy'],
            preparation: ['Fresh juice', 'Tea', 'Cooked in dishes'],
            season: 'Winter, Monsoon'
        },
        {
            id: 3,
            name: 'Coconut',
            category: 'Fruits',
            doshaEffect: { vata: 'Balancing', pitta: 'Cooling', kapha: 'Aggravating' },
            taste: ['Sweet'],
            potency: 'Cooling',
            postDigestive: 'Sweet',
            nutrients: {
                calories: 354,
                protein: 3.3,
                carbs: 15,
                fiber: 9,
                vitamins: ['C', 'E', 'B1', 'B3', 'B6'],
                minerals: ['Manganese', 'Copper', 'Selenium']
            },
            benefits: ['Hydrating', 'Cooling effect', 'Good for skin and hair'],
            cautions: ['High in saturated fat', 'Can increase Kapha'],
            preparation: ['Fresh water', 'Oil', 'Milk', 'Grated'],
            season: 'Summer'
        },
        {
            id: 4,
            name: 'Turmeric',
            category: 'Spices',
            doshaEffect: { vata: 'Neutral', pitta: 'Balancing', kapha: 'Balancing' },
            taste: ['Bitter', 'Pungent'],
            potency: 'Heating',
            postDigestive: 'Pungent',
            nutrients: {
                calories: 354,
                protein: 8,
                carbs: 65,
                fiber: 21,
                vitamins: ['C', 'B6'],
                minerals: ['Iron', 'Manganese', 'Potassium']
            },
            benefits: ['Anti-inflammatory', 'Antioxidant', 'Supports immunity'],
            cautions: ['May increase bleeding risk', 'Avoid with gallstones'],
            preparation: ['Powder in milk', 'Fresh paste', 'In cooking'],
            season: 'All seasons'
        },
        {
            id: 5,
            name: 'Almonds',
            category: 'Nuts',
            doshaEffect: { vata: 'Balancing', pitta: 'Neutral', kapha: 'Aggravating' },
            taste: ['Sweet'],
            potency: 'Heating',
            postDigestive: 'Sweet',
            nutrients: {
                calories: 579,
                protein: 21,
                carbs: 22,
                fiber: 12,
                vitamins: ['E', 'B2', 'B3'],
                minerals: ['Magnesium', 'Phosphorus', 'Calcium']
            },
            benefits: ['Brain health', 'Heart health', 'Protein source'],
            cautions: ['High calorie', 'Soak before eating', 'Limit in Kapha excess'],
            preparation: ['Soaked overnight', 'Almond milk', 'Ground paste'],
            season: 'Winter'
        },
        {
            id: 6,
            name: 'Cucumber',
            category: 'Vegetables',
            doshaEffect: { vata: 'Aggravating', pitta: 'Cooling', kapha: 'Neutral' },
            taste: ['Sweet', 'Astringent'],
            potency: 'Cooling',
            postDigestive: 'Sweet',
            nutrients: {
                calories: 16,
                protein: 0.7,
                carbs: 4,
                fiber: 0.5,
                vitamins: ['K', 'C'],
                minerals: ['Potassium', 'Magnesium']
            },
            benefits: ['Hydrating', 'Cooling', 'Low calorie'],
            cautions: ['Can aggravate Vata', 'Avoid in cold weather'],
            preparation: ['Raw salad', 'Juice', 'Cooked curry'],
            season: 'Summer'
        }
    ];

    const categories = ['all', 'Grains', 'Spices', 'Fruits', 'Vegetables', 'Nuts', 'Legumes'];
    const doshas = ['all', 'vata', 'pitta', 'kapha'];

    const filteredFoods = foodDatabase.filter(food => {
        const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            food.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = categoryFilter === 'all' || food.category === categoryFilter;
        const matchesDosha = doshaFilter === 'all' || 
                           food.doshaEffect[doshaFilter] === 'Balancing' ||
                           food.doshaEffect[doshaFilter] === 'Cooling';
        
        return matchesSearch && matchesCategory && matchesDosha;
    });

    const getDoshaEffectColor = (effect) => {
        switch (effect) {
            case 'Balancing': return '#10B981';
            case 'Cooling': return '#3B82F6';
            case 'Aggravating': return '#EF4444';
            case 'Neutral': return '#6B7280';
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
                            <Apple className="title-icon" />
                            Food & Nutrient Explorer
                        </h1>
                        <div className="food-stats">
                            <span className="stat-badge">
                                <Apple size={16} />
                                {foodDatabase.length} Foods
                            </span>
                            <span className="stat-badge">
                                <Filter size={16} />
                                {filteredFoods.length} Filtered
                            </span>
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
                                    placeholder="Search foods, nutrients, or benefits..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            
                            <div className="filter-group">
                                <select 
                                    value={categoryFilter} 
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat === 'all' ? 'All Categories' : cat}
                                        </option>
                                    ))}
                                </select>
                                
                                <select 
                                    value={doshaFilter} 
                                    onChange={(e) => setDoshaFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    {doshas.map(dosha => (
                                        <option key={dosha} value={dosha}>
                                            {dosha === 'all' ? 'All Doshas' : `Good for ${dosha.charAt(0).toUpperCase() + dosha.slice(1)}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="foods-grid">
                        {filteredFoods.map(food => (
                            <div key={food.id} className="food-card">
                                <div className="food-header">
                                    <div className="food-icon">
                                        <Apple size={32} color="#10b981" />
                                    </div>
                                    <div className="food-title">
                                        <h3>{food.name}</h3>
                                        <span className="category-badge">{food.category}</span>
                                    </div>
                                </div>

                                <div className="dosha-effects">
                                    <h5>Dosha Effects:</h5>
                                    <div className="dosha-grid">
                                        {Object.entries(food.doshaEffect).map(([dosha, effect]) => (
                                            <div key={dosha} className="dosha-effect">
                                                <span className="dosha-name">{dosha.charAt(0).toUpperCase() + dosha.slice(1)}</span>
                                                <span 
                                                    className="effect-badge"
                                                    style={{ 
                                                        backgroundColor: getDoshaEffectColor(effect) + '20',
                                                        color: getDoshaEffectColor(effect)
                                                    }}
                                                >
                                                    {effect}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="taste-properties">
                                    <div className="property-row">
                                        <span className="property-label">Taste:</span>
                                        <span className="property-value">{food.taste.join(', ')}</span>
                                    </div>
                                    <div className="property-row">
                                        <span className="property-label">Potency:</span>
                                        <span className="property-value">{food.potency}</span>
                                    </div>
                                    <div className="property-row">
                                        <span className="property-label">Season:</span>
                                        <span className="property-value">{food.season}</span>
                                    </div>
                                </div>

                                <div className="nutrition-preview">
                                    <h5>Key Nutrients:</h5>
                                    <div className="nutrient-tags">
                                        <span className="nutrient-tag calories">
                                            <Zap size={12} />
                                            {food.nutrients.calories} cal
                                        </span>
                                        <span className="nutrient-tag protein">
                                            Protein: {food.nutrients.protein}g
                                        </span>
                                        <span className="nutrient-tag carbs">
                                            Carbs: {food.nutrients.carbs}g
                                        </span>
                                    </div>
                                </div>

                                <div className="benefits-preview">
                                    <h5>Benefits:</h5>
                                    <div className="benefits-list">
                                        {food.benefits.slice(0, 2).map((benefit, index) => (
                                            <span key={index} className="benefit-tag">
                                                <Star size={12} />
                                                {benefit}
                                            </span>
                                        ))}
                                        {food.benefits.length > 2 && (
                                            <span className="more-benefits">+{food.benefits.length - 2} more</span>
                                        )}
                                    </div>
                                </div>

                                <div className="food-footer">
                                    <button 
                                        className="btn btn-primary btn-sm"
                                        onClick={() => setSelectedFood(food)}
                                    >
                                        <Info size={16} />
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredFoods.length === 0 && (
                        <div className="no-results">
                            <Apple size={48} />
                            <h3>No foods found</h3>
                            <p>Try adjusting your search criteria or filters.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Food Details Modal */}
            {selectedFood && (
                <div className="modal-overlay" onClick={() => setSelectedFood(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{selectedFood.name}</h2>
                            <button className="close-btn" onClick={() => setSelectedFood(null)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-grid">
                                <div className="detail-section">
                                    <h4>Ayurvedic Properties</h4>
                                    <div className="properties-list">
                                        <div className="property-item">
                                            <strong>Taste (Rasa):</strong> {selectedFood.taste.join(', ')}
                                        </div>
                                        <div className="property-item">
                                            <strong>Potency (Virya):</strong> {selectedFood.potency}
                                        </div>
                                        <div className="property-item">
                                            <strong>Post-digestive (Vipaka):</strong> {selectedFood.postDigestive}
                                        </div>
                                        <div className="property-item">
                                            <strong>Best Season:</strong> {selectedFood.season}
                                        </div>
                                    </div>
                                </div>

                                <div className="detail-section">
                                    <h4>Nutritional Information (per 100g)</h4>
                                    <div className="nutrition-grid">
                                        <div className="nutrition-item">
                                            <strong>Calories:</strong> {selectedFood.nutrients.calories}
                                        </div>
                                        <div className="nutrition-item">
                                            <strong>Protein:</strong> {selectedFood.nutrients.protein}g
                                        </div>
                                        <div className="nutrition-item">
                                            <strong>Carbohydrates:</strong> {selectedFood.nutrients.carbs}g
                                        </div>
                                        <div className="nutrition-item">
                                            <strong>Fiber:</strong> {selectedFood.nutrients.fiber}g
                                        </div>
                                    </div>
                                    <div className="vitamins-minerals">
                                        <div className="vm-section">
                                            <strong>Vitamins:</strong> {selectedFood.nutrients.vitamins.join(', ')}
                                        </div>
                                        <div className="vm-section">
                                            <strong>Minerals:</strong> {selectedFood.nutrients.minerals.join(', ')}
                                        </div>
                                    </div>
                                </div>

                                <div className="detail-section">
                                    <h4>Health Benefits</h4>
                                    <ul className="benefits-detailed">
                                        {selectedFood.benefits.map((benefit, index) => (
                                            <li key={index}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="detail-section">
                                    <h4>Preparation Methods</h4>
                                    <div className="preparation-list">
                                        {selectedFood.preparation.map((method, index) => (
                                            <span key={index} className="preparation-tag">{method}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="detail-section">
                                    <h4>Cautions</h4>
                                    <ul className="cautions-list">
                                        {selectedFood.cautions.map((caution, index) => (
                                            <li key={index}>{caution}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <style jsx>{`
                .food-stats {
                    display: flex;
                    gap: 1rem;
                }
                
                .stat-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: #f0f9ff;
                    color: #0369a1;
                    border-radius: 20px;
                    font-size: 0.875rem;
                    font-weight: 500;
                }
                
                .filters-section {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    border: 1px solid #e2e8f0;
                }
                
                .foods-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 1.5rem;
                }
                
                .food-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .food-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .food-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }
                
                .food-icon {
                    width: 48px;
                    height: 48px;
                    background: #f0fdf4;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                
                .food-title h3 {
                    margin: 0 0 0.25rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .category-badge {
                    background: #dbeafe;
                    color: #1d4ed8;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                
                .dosha-effects, .taste-properties, .nutrition-preview, .benefits-preview {
                    margin-bottom: 1.5rem;
                }
                
                .dosha-effects h5, .taste-properties h5, .nutrition-preview h5, .benefits-preview h5 {
                    margin: 0 0 0.75rem 0;
                    color: #1e293b;
                    font-size: 0.875rem;
                    font-weight: 600;
                }
                
                .dosha-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.5rem;
                }
                
                .dosha-effect {
                    text-align: center;
                }
                
                .dosha-name {
                    display: block;
                    font-size: 0.75rem;
                    color: #64748b;
                    margin-bottom: 0.25rem;
                }
                
                .effect-badge {
                    padding: 0.25rem 0.5rem;
                    border-radius: 8px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border: 1px solid currentColor;
                }
                
                .property-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                }
                
                .property-label {
                    color: #64748b;
                    font-weight: 500;
                }
                
                .property-value {
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .nutrient-tags, .benefits-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                
                .nutrient-tag {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                
                .nutrient-tag.calories {
                    background: #fef3c7;
                    color: #92400e;
                }
                
                .nutrient-tag.protein {
                    background: #dbeafe;
                    color: #1d4ed8;
                }
                
                .nutrient-tag.carbs {
                    background: #fecaca;
                    color: #dc2626;
                }
                
                .benefit-tag {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    background: #f0fdf4;
                    color: #166534;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .more-benefits {
                    background: #e2e8f0;
                    color: #64748b;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .food-footer {
                    display: flex;
                    justify-content: flex-end;
                }
                
                .detail-grid {
                    display: grid;
                    gap: 1.5rem;
                }
                
                .detail-section h4 {
                    margin: 0 0 0.75rem 0;
                    color: #1e293b;
                    font-weight: 600;
                    border-bottom: 1px solid #e2e8f0;
                    padding-bottom: 0.5rem;
                }
                
                .properties-list, .nutrition-grid {
                    display: grid;
                    gap: 0.5rem;
                }
                
                .property-item, .nutrition-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem;
                    background: #f8fafc;
                    border-radius: 6px;
                    font-size: 0.875rem;
                }
                
                .vitamins-minerals {
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid #e2e8f0;
                }
                
                .vm-section {
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                    color: #374151;
                }
                
                .benefits-detailed, .cautions-list {
                    margin: 0;
                    padding-left: 1.25rem;
                }
                
                .benefits-detailed li, .cautions-list li {
                    margin-bottom: 0.5rem;
                    color: #374151;
                    line-height: 1.4;
                }
                
                .preparation-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                
                .preparation-tag {
                    background: #eff6ff;
                    color: #1d4ed8;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .cautions-list {
                    color: #dc2626;
                }
                
                @media (max-width: 768px) {
                    .foods-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .dosha-grid {
                        grid-template-columns: 1fr;
                        gap: 0.75rem;
                    }
                    
                    .dosha-effect {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .dosha-name {
                        margin-bottom: 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default FoodNutrientExplorer;
