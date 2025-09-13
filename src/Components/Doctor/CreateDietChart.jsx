import React, { useState } from 'react';
import { Plus, Save, User, Calendar, Clock, Utensils } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function CreateDietChart({ 
    activeSection = 'create-diet-chart',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [formData, setFormData] = useState({
        patientId: '',
        patientName: '',
        age: '',
        gender: '',
        dosha: '',
        condition: '',
        duration: '7',
        startDate: '',
        notes: ''
    });

    const [mealPlan, setMealPlan] = useState({
        breakfast: { foods: [], time: '07:00' },
        midMorning: { foods: [], time: '10:00' },
        lunch: { foods: [], time: '13:00' },
        evening: { foods: [], time: '16:00' },
        dinner: { foods: [], time: '19:00' }
    });

    const [selectedMeal, setSelectedMeal] = useState('breakfast');
    const [foodSearch, setFoodSearch] = useState('');

    const ayurvedicFoods = [
        { name: 'Basmati Rice', category: 'Grains', dosha: 'All', properties: 'Cooling, Easy to digest' },
        { name: 'Ghee', category: 'Fats', dosha: 'All', properties: 'Nourishing, Digestive' },
        { name: 'Turmeric', category: 'Spices', dosha: 'All', properties: 'Anti-inflammatory' },
        { name: 'Ginger', category: 'Spices', dosha: 'Vata, Kapha', properties: 'Warming, Digestive' },
        { name: 'Almonds', category: 'Nuts', dosha: 'Vata, Pitta', properties: 'Nourishing' },
        { name: 'Coconut Water', category: 'Beverages', dosha: 'Pitta', properties: 'Cooling' },
        { name: 'Moong Dal', category: 'Legumes', dosha: 'All', properties: 'Light, Digestive' },
        { name: 'Cucumber', category: 'Vegetables', dosha: 'Pitta', properties: 'Cooling' },
        { name: 'Sweet Potato', category: 'Vegetables', dosha: 'Vata', properties: 'Grounding' },
        { name: 'Pomegranate', category: 'Fruits', dosha: 'Pitta', properties: 'Cooling, Astringent' }
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleMealTimeChange = (meal, time) => {
        setMealPlan({
            ...mealPlan,
            [meal]: { ...mealPlan[meal], time }
        });
    };

    const addFoodToMeal = (food) => {
        setMealPlan({
            ...mealPlan,
            [selectedMeal]: {
                ...mealPlan[selectedMeal],
                foods: [...mealPlan[selectedMeal].foods, food]
            }
        });
        setFoodSearch('');
    };

    const removeFoodFromMeal = (meal, index) => {
        setMealPlan({
            ...mealPlan,
            [meal]: {
                ...mealPlan[meal],
                foods: mealPlan[meal].foods.filter((_, i) => i !== index)
            }
        });
    };

    const filteredFoods = ayurvedicFoods.filter(food =>
        food.name.toLowerCase().includes(foodSearch.toLowerCase()) ||
        food.category.toLowerCase().includes(foodSearch.toLowerCase())
    );

    const handleSaveDietChart = () => {
        // Save logic here
        alert('Diet chart saved successfully!');
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
                        <Plus className="title-icon" />
                        Create Diet Chart
                    </h1>
                </div>

                <div className="content-body">
                    <div className="diet-form-container">
                        {/* Patient Information */}
                        <div className="form-section">
                            <h3>Patient Information</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Patient ID</label>
                                    <input
                                        type="text"
                                        name="patientId"
                                        value={formData.patientId}
                                        onChange={handleInputChange}
                                        placeholder="Enter patient ID"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Patient Name</label>
                                    <input
                                        type="text"
                                        name="patientName"
                                        value={formData.patientName}
                                        onChange={handleInputChange}
                                        placeholder="Enter patient name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        placeholder="Age"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select name="gender" value={formData.gender} onChange={handleInputChange}>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Primary Dosha</label>
                                    <select name="dosha" value={formData.dosha} onChange={handleInputChange}>
                                        <option value="">Select Dosha</option>
                                        <option value="vata">Vata</option>
                                        <option value="pitta">Pitta</option>
                                        <option value="kapha">Kapha</option>
                                        <option value="vata-pitta">Vata-Pitta</option>
                                        <option value="pitta-kapha">Pitta-Kapha</option>
                                        <option value="vata-kapha">Vata-Kapha</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Condition</label>
                                    <input
                                        type="text"
                                        name="condition"
                                        value={formData.condition}
                                        onChange={handleInputChange}
                                        placeholder="Primary health condition"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Diet Plan Details */}
                        <div className="form-section">
                            <h3>Diet Plan Details</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Duration (days)</label>
                                    <select name="duration" value={formData.duration} onChange={handleInputChange}>
                                        <option value="7">7 days</option>
                                        <option value="14">14 days</option>
                                        <option value="21">21 days</option>
                                        <option value="30">30 days</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group full-width">
                                <label>Special Notes</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    placeholder="Any special dietary instructions or restrictions"
                                    rows="3"
                                />
                            </div>
                        </div>

                        {/* Meal Planning */}
                        <div className="form-section">
                            <h3>Daily Meal Plan</h3>
                            
                            {/* Meal Selector */}
                            <div className="meal-selector">
                                {Object.keys(mealPlan).map(meal => (
                                    <button
                                        key={meal}
                                        className={`meal-tab ${selectedMeal === meal ? 'active' : ''}`}
                                        onClick={() => setSelectedMeal(meal)}
                                    >
                                        {meal.charAt(0).toUpperCase() + meal.slice(1).replace(/([A-Z])/g, ' $1')}
                                    </button>
                                ))}
                            </div>

                            {/* Selected Meal Configuration */}
                            <div className="meal-config">
                                <div className="meal-header">
                                    <h4>{selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1).replace(/([A-Z])/g, ' $1')}</h4>
                                    <div className="meal-time">
                                        <Clock size={16} />
                                        <input
                                            type="time"
                                            value={mealPlan[selectedMeal].time}
                                            onChange={(e) => handleMealTimeChange(selectedMeal, e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Food Search */}
                                <div className="food-search">
                                    <input
                                        type="text"
                                        placeholder="Search for foods to add..."
                                        value={foodSearch}
                                        onChange={(e) => setFoodSearch(e.target.value)}
                                    />
                                    {foodSearch && (
                                        <div className="food-suggestions">
                                            {filteredFoods.map((food, index) => (
                                                <div
                                                    key={index}
                                                    className="food-suggestion"
                                                    onClick={() => addFoodToMeal(food)}
                                                >
                                                    <div className="food-info">
                                                        <span className="food-name">{food.name}</span>
                                                        <span className="food-category">{food.category}</span>
                                                    </div>
                                                    <div className="food-properties">
                                                        <span className="dosha-info">Good for: {food.dosha}</span>
                                                        <span className="properties">{food.properties}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Selected Foods */}
                                <div className="selected-foods">
                                    {mealPlan[selectedMeal].foods.map((food, index) => (
                                        <div key={index} className="selected-food">
                                            <div className="food-details">
                                                <span className="food-name">{food.name}</span>
                                                <span className="food-properties">{food.properties}</span>
                                            </div>
                                            <button
                                                className="remove-food"
                                                onClick={() => removeFoodFromMeal(selectedMeal, index)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    {mealPlan[selectedMeal].foods.length === 0 && (
                                        <div className="no-foods">
                                            <Utensils size={24} />
                                            <p>No foods added yet. Search and add foods above.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="form-actions">
                            <button className="btn-secondary">Save as Draft</button>
                            <button className="btn-primary" onClick={handleSaveDietChart}>
                                <Save size={16} />
                                Create Diet Chart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .diet-form-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .form-section {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }
                
                .form-section h3 {
                    margin: 0 0 1.5rem 0;
                    color: #1e293b;
                    font-weight: 600;
                    font-size: 1.125rem;
                }
                
                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1rem;
                }
                
                .form-group {
                    display: flex;
                    flex-direction: column;
                }
                
                .form-group.full-width {
                    grid-column: 1 / -1;
                }
                
                .form-group label {
                    margin-bottom: 0.5rem;
                    color: #374151;
                    font-weight: 500;
                    font-size: 0.875rem;
                }
                
                .form-group input,
                .form-group select,
                .form-group textarea {
                    padding: 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    transition: border-color 0.2s;
                }
                
                .form-group input:focus,
                .form-group select:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }
                
                .meal-selector {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                }
                
                .meal-tab {
                    padding: 0.5rem 1rem;
                    border: 1px solid #d1d5db;
                    background: white;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.875rem;
                }
                
                .meal-tab:hover {
                    background: #f8fafc;
                }
                
                .meal-tab.active {
                    background: #3b82f6;
                    color: white;
                    border-color: #3b82f6;
                }
                
                .meal-config {
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 1rem;
                }
                
                .meal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                
                .meal-header h4 {
                    margin: 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .meal-time {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #64748b;
                }
                
                .meal-time input {
                    border: 1px solid #d1d5db;
                    border-radius: 4px;
                    padding: 0.25rem 0.5rem;
                    font-size: 0.875rem;
                }
                
                .food-search {
                    position: relative;
                    margin-bottom: 1rem;
                }
                
                .food-search input {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    font-size: 0.875rem;
                }
                
                .food-suggestions {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    max-height: 200px;
                    overflow-y: auto;
                    z-index: 10;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                
                .food-suggestion {
                    padding: 0.75rem;
                    cursor: pointer;
                    border-bottom: 1px solid #f1f5f9;
                    transition: background-color 0.2s;
                }
                
                .food-suggestion:hover {
                    background: #f8fafc;
                }
                
                .food-suggestion:last-child {
                    border-bottom: none;
                }
                
                .food-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.25rem;
                }
                
                .food-name {
                    font-weight: 600;
                    color: #1e293b;
                }
                
                .food-category {
                    font-size: 0.75rem;
                    color: #64748b;
                    background: #f1f5f9;
                    padding: 0.125rem 0.5rem;
                    border-radius: 12px;
                }
                
                .food-properties {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: #64748b;
                }
                
                .dosha-info {
                    font-weight: 500;
                }
                
                .selected-foods {
                    min-height: 100px;
                }
                
                .selected-food {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    margin-bottom: 0.5rem;
                }
                
                .food-details {
                    display: flex;
                    flex-direction: column;
                }
                
                .selected-food .food-name {
                    font-weight: 600;
                    color: #1e293b;
                    margin-bottom: 0.25rem;
                }
                
                .selected-food .food-properties {
                    font-size: 0.75rem;
                    color: #64748b;
                }
                
                .remove-food {
                    background: #ef4444;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    line-height: 1;
                }
                
                .no-foods {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    color: #64748b;
                    text-align: center;
                }
                
                .no-foods svg {
                    margin-bottom: 0.5rem;
                    opacity: 0.5;
                }
                
                .form-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: flex-end;
                    padding: 1.5rem;
                    background: white;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
                    .form-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .meal-selector {
                        flex-direction: column;
                    }
                    
                    .meal-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.5rem;
                    }
                    
                    .form-actions {
                        flex-direction: column;
                    }
                }
            `}</style>
        </div>
    );
}

export default CreateDietChart;
