import React, { useState } from 'react';
import { Search, Filter, Plus, Trash2, Edit, Copy, Download, ChevronDown, ChevronUp, X } from 'lucide-react';
import '../../assets/css/diet-templates.css';

// Mock data for diet templates
const mockTemplates = [
  {
    id: 1,
    name: 'Diabetic Diet Plan',
    description: 'Balanced diet plan for managing blood sugar levels',
    category: 'Therapeutic',
    meals: ['Breakfast', 'Mid-Morning Snack', 'Lunch', 'Evening Snack', 'Dinner'],
    created: '2023-10-15',
    modified: '2023-10-20',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Weight Loss Program',
    description: 'Calorie-controlled diet for healthy weight management',
    category: 'Weight Management',
    meals: ['Breakfast', 'Lunch', 'Dinner', '2 Snacks'],
    created: '2023-09-28',
    modified: '2023-10-10',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Cardiac Diet',
    description: 'Heart-healthy diet low in sodium and saturated fats',
    category: 'Therapeutic',
    meals: ['Breakfast', 'Lunch', 'Dinner', '2 Snacks'],
    created: '2023-10-05',
    modified: '2023-10-18',
    status: 'Draft'
  },
  {
    id: 4,
    name: 'Athlete Meal Plan',
    description: 'High-protein diet for muscle gain and performance',
    category: 'Sports Nutrition',
    meals: ['Pre-Workout', 'Post-Workout', '5 Meals'],
    created: '2023-09-15',
    modified: '2023-10-22',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Vegetarian Balanced Diet',
    description: 'Complete plant-based nutrition plan',
    category: 'Vegetarian',
    meals: ['Breakfast', 'Lunch', 'Dinner', '2 Snacks'],
    created: '2023-10-01',
    modified: '2023-10-15',
    status: 'Active'
  }
];

// Categories for filtering
const categories = ['All', 'Therapeutic', 'Weight Management', 'Sports Nutrition', 'Vegetarian', 'Vegan', 'Keto'];

// Status options
const statusOptions = ['All', 'Active', 'Draft', 'Archived'];

const DietTemplates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [templates, setTemplates] = useState(mockTemplates);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Form state for new template
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: '',
    status: 'Draft',
    meals: []
  });
  
  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || template.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTemplate(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Add a new template
  const handleCreateTemplate = (e) => {
    e.preventDefault();
    const newId = Math.max(...templates.map(t => t.id), 0) + 1;
    const today = new Date().toISOString().split('T')[0];
    
    const templateToAdd = {
      ...newTemplate,
      id: newId,
      created: today,
      modified: today,
      meals: newTemplate.meals.length > 0 ? newTemplate.meals : ['Breakfast', 'Lunch', 'Dinner']
    };
    
    setTemplates([...templates, templateToAdd]);
    setShowCreateModal(false);
    resetForm();
  };
  
  // Reset form
  const resetForm = () => {
    setNewTemplate({
      name: '',
      description: '',
      category: '',
      status: 'Draft',
      meals: []
    });
  };
  
  // Delete a template
  const handleDeleteTemplate = (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(template => template.id !== id));
    }
  };
  
  // Duplicate a template
  const handleDuplicateTemplate = (template) => {
    const newId = Math.max(...templates.map(t => t.id), 0) + 1;
    const today = new Date().toISOString().split('T')[0];
    
    const duplicatedTemplate = {
      ...template,
      id: newId,
      name: `${template.name} (Copy)`,
      created: today,
      modified: today,
      status: 'Draft'
    };
    
    setTemplates([...templates, duplicatedTemplate]);
  };

  return (
    <div className="diet-templates">
      <div className="page-header">
        <h1>Standardized Diet Templates</h1>
        <div className="header-actions">
          <button 
            className="btn btn-primary" 
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={16} /> Create Template
          </button>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search templates..."
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
              
              <div className="filter-group">
                <label>Status</label>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statusOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="templates-grid">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map(template => (
            <div key={template.id} className="template-card">
              <div className="template-header">
                <div>
                  <h3>{template.name}</h3>
                  <span className={`status-badge ${template.status.toLowerCase()}`}>
                    {template.status}
                  </span>
                </div>
                <div className="template-actions">
                  <button 
                    className="icon-btn" 
                    title="Edit"
                    onClick={() => {}}
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="icon-btn" 
                    title="Duplicate"
                    onClick={() => handleDuplicateTemplate(template)}
                  >
                    <Copy size={16} />
                  </button>
                  <button 
                    className="icon-btn danger" 
                    title="Delete"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <p className="template-description">{template.description}</p>
              
              <div className="template-details">
                <div className="detail-item">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{template.category}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Meals:</span>
                  <span className="detail-value">{template.meals.join(', ')}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Created:</span>
                  <span className="detail-value">{template.created}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Modified:</span>
                  <span className="detail-value">{template.modified}</span>
                </div>
              </div>
              
              <div className="template-footer">
                <button className="btn btn-outline">View Details</button>
                <button className="btn btn-primary">Use Template</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No templates found matching your criteria.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={16} /> Create New Template
            </button>
          </div>
        )}
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Create New Diet Template</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateTemplate}>
              <div className="form-group">
                <label>Template Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newTemplate.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Diabetic Diet Plan"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={newTemplate.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of this template"
                  rows="3"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={newTemplate.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.filter(cat => cat !== 'All').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={newTemplate.status}
                    onChange={handleInputChange}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Active">Active</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Meal Structure</label>
                <div className="meals-selection">
                  {['Breakfast', 'Mid-Morning Snack', 'Lunch', 'Evening Snack', 'Dinner', 'Pre-Workout', 'Post-Workout'].map(meal => (
                    <label key={meal} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newTemplate.meals.includes(meal)}
                        onChange={(e) => {
                          const updatedMeals = e.target.checked
                            ? [...newTemplate.meals, meal]
                            : newTemplate.meals.filter(m => m !== meal);
                          setNewTemplate({ ...newTemplate, meals: updatedMeals });
                        }}
                      />
                      <span className="checkbox-custom"></span>
                      {meal}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietTemplates;
