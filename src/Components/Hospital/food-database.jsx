import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import '../../assets/css/food-database.css';

// Mock data for food items
const mockFoodData = [
  { id: 1, name: 'Brown Rice', category: 'Grains', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8 },
  { id: 2, name: 'Spinach', category: 'Vegetables', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 },
  { id: 3, name: 'Chicken Breast', category: 'Proteins', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
  { id: 4, name: 'Almonds', category: 'Nuts', calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 12.5 },
  { id: 5, name: 'Banana', category: 'Fruits', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 },
  { id: 6, name: 'Salmon', category: 'Seafood', calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0 },
  { id: 7, name: 'Sweet Potato', category: 'Vegetables', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3 },
  { id: 8, name: 'Greek Yogurt', category: 'Dairy', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0 },
];

// Categories for filtering
const categories = ['All', 'Grains', 'Vegetables', 'Proteins', 'Nuts', 'Fruits', 'Seafood', 'Dairy'];

const FoodDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  
  // Filter and sort food data
  const filteredFoods = mockFoodData
    .filter(food => 
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || food.category === selectedCategory)
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  // Chart data for visualization
  const chartData = {
    labels: filteredFoods.map(food => food.name),
    datasets: [
      {
        label: 'Calories per 100g',
        data: filteredFoods.map(food => food.calories),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: categories.filter(cat => cat !== 'All'),
    datasets: [
      {
        data: categories
          .filter(cat => cat !== 'All')
          .map(cat => 
            mockFoodData.filter(food => food.category === cat).length
          ),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
          '#9966FF', '#FF9F40', '#8AC24A', '#FF6384'
        ],
      },
    ],
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const exportToCSV = () => {
    // Simple CSV export implementation
    const headers = ['Name', 'Category', 'Calories', 'Protein (g)', 'Carbs (g)', 'Fat (g)', 'Fiber (g)'];
    const csvContent = [
      headers.join(','),
      ...filteredFoods.map(food => 
        [
          `"${food.name}"`,
          food.category,
          food.calories,
          food.protein,
          food.carbs,
          food.fat,
          food.fiber
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'food_database_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="food-database">
      <div className="page-header">
        <h1>National Food Database</h1>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => {}}>
            <Plus size={16} /> Add Food Item
          </button>
          <button className="btn btn-secondary" onClick={exportToCSV}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className="filter-section">
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showFilters && (
            <div className="filters-dropdown">
              <div className="filter-group">
                <label>Category</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="view-tabs">
        <button 
          className={`tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          List View
        </button>
        <button 
          className={`tab ${activeTab === 'charts' ? 'active' : ''}`}
          onClick={() => setActiveTab('charts')}
        >
          Data Visualization
        </button>
      </div>

      {activeTab === 'list' ? (
        <div className="food-table-container">
          <table className="food-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('name')}>
                  Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => requestSort('category')}>
                  Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => requestSort('calories')}>
                  Calories {sortConfig.key === 'calories' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th>Protein (g)</th>
                <th>Carbs (g)</th>
                <th>Fat (g)</th>
                <th>Fiber (g)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFoods.length > 0 ? (
                filteredFoods.map(food => (
                  <tr key={food.id}>
                    <td>{food.name}</td>
                    <td>
                      <span className={`category-badge ${food.category.toLowerCase()}`}>
                        {food.category}
                      </span>
                    </td>
                    <td>{food.calories}</td>
                    <td>{food.protein}</td>
                    <td>{food.carbs}</td>
                    <td>{food.fat}</td>
                    <td>{food.fiber}</td>
                    <td className="actions">
                      <button className="icon-btn" title="View Details">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                      <button className="icon-btn" title="Edit">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-results">
                    No food items found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="charts-container">
          <div className="chart-wrapper">
            <h3>Calorie Comparison</h3>
            <div className="chart">
              <Bar 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Calories per 100g'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div className="chart-wrapper">
            <h3>Food Distribution by Category</h3>
            <div className="chart">
              <Pie 
                data={pieData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right'
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDatabase;
