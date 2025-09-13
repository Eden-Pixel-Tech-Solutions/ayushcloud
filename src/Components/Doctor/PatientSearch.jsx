import React, { useState } from 'react';
import { Search, Filter, User, Phone, Mail, MapPin, Heart, Calendar, Clock, Eye, Edit, UserPlus, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';

function PatientSearch({ 
    activeSection = 'patient-search',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('name');
    const [ageRange, setAgeRange] = useState({ min: '', max: '' });
    const [genderFilter, setGenderFilter] = useState('all');
    const [conditionFilter, setConditionFilter] = useState('');
    const [doshaFilter, setDoshaFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Sample patient database
    const patientDatabase = [
        {
            id: 1,
            name: 'Rajesh Kumar',
            age: 45,
            gender: 'Male',
            phone: '+91 98765 43210',
            email: 'rajesh.kumar@email.com',
            address: 'Mumbai, Maharashtra',
            lastVisit: '2024-01-10',
            nextAppointment: '2024-01-20',
            status: 'Active',
            primaryCondition: 'Hypertension',
            secondaryConditions: ['Diabetes', 'High Cholesterol'],
            dosha: 'Vata-Pitta',
            registrationDate: '2023-06-15',
            totalVisits: 12,
            emergencyContact: '+91 98765 43211',
            bloodGroup: 'B+',
            allergies: ['Peanuts', 'Shellfish']
        },
        {
            id: 2,
            name: 'Priya Sharma',
            age: 32,
            gender: 'Female',
            phone: '+91 87654 32109',
            email: 'priya.sharma@email.com',
            address: 'Delhi, Delhi',
            lastVisit: '2024-01-08',
            nextAppointment: '2024-01-18',
            status: 'Active',
            primaryCondition: 'Digestive Issues',
            secondaryConditions: ['Acidity', 'IBS'],
            dosha: 'Pitta-Kapha',
            registrationDate: '2023-08-20',
            totalVisits: 8,
            emergencyContact: '+91 87654 32110',
            bloodGroup: 'A+',
            allergies: ['Dairy']
        },
        {
            id: 3,
            name: 'Amit Patel',
            age: 58,
            gender: 'Male',
            phone: '+91 76543 21098',
            email: 'amit.patel@email.com',
            address: 'Ahmedabad, Gujarat',
            lastVisit: '2024-01-05',
            nextAppointment: null,
            status: 'Inactive',
            primaryCondition: 'Arthritis',
            secondaryConditions: ['Joint Pain', 'Stiffness'],
            dosha: 'Vata-Kapha',
            registrationDate: '2023-03-10',
            totalVisits: 15,
            emergencyContact: '+91 76543 21099',
            bloodGroup: 'O+',
            allergies: ['None']
        },
        {
            id: 4,
            name: 'Sunita Reddy',
            age: 28,
            gender: 'Female',
            phone: '+91 65432 10987',
            email: 'sunita.reddy@email.com',
            address: 'Hyderabad, Telangana',
            lastVisit: '2024-01-12',
            nextAppointment: '2024-01-22',
            status: 'Active',
            primaryCondition: 'Skin Allergies',
            secondaryConditions: ['Eczema', 'Dermatitis'],
            dosha: 'Pitta',
            registrationDate: '2023-11-05',
            totalVisits: 4,
            emergencyContact: '+91 65432 10988',
            bloodGroup: 'AB+',
            allergies: ['Dust', 'Pollen']
        },
        {
            id: 5,
            name: 'Vikram Singh',
            age: 41,
            gender: 'Male',
            phone: '+91 54321 09876',
            email: 'vikram.singh@email.com',
            address: 'Jaipur, Rajasthan',
            lastVisit: '2023-12-28',
            nextAppointment: '2024-01-25',
            status: 'Active',
            primaryCondition: 'Diabetes',
            secondaryConditions: ['Hypertension', 'Obesity'],
            dosha: 'Kapha-Pitta',
            registrationDate: '2023-01-15',
            totalVisits: 18,
            emergencyContact: '+91 54321 09877',
            bloodGroup: 'B-',
            allergies: ['Sulfa drugs']
        },
        {
            id: 6,
            name: 'Meera Joshi',
            age: 35,
            gender: 'Female',
            phone: '+91 43210 98765',
            email: 'meera.joshi@email.com',
            address: 'Pune, Maharashtra',
            lastVisit: '2024-01-11',
            nextAppointment: '2024-01-19',
            status: 'Active',
            primaryCondition: 'Anxiety & Stress',
            secondaryConditions: ['Insomnia', 'Depression'],
            dosha: 'Vata',
            registrationDate: '2023-09-12',
            totalVisits: 6,
            emergencyContact: '+91 43210 98766',
            bloodGroup: 'O-',
            allergies: ['Latex']
        },
        {
            id: 7,
            name: 'Arjun Nair',
            age: 52,
            gender: 'Male',
            phone: '+91 32109 87654',
            email: 'arjun.nair@email.com',
            address: 'Kochi, Kerala',
            lastVisit: '2024-01-09',
            nextAppointment: '2024-01-21',
            status: 'Active',
            primaryCondition: 'Respiratory Issues',
            secondaryConditions: ['Asthma', 'Bronchitis'],
            dosha: 'Kapha-Vata',
            registrationDate: '2023-04-18',
            totalVisits: 10,
            emergencyContact: '+91 32109 87655',
            bloodGroup: 'A-',
            allergies: ['Dust mites', 'Pet dander']
        }
    ];

    const performSearch = () => {
        setIsSearching(true);
        setHasSearched(true);
        
        // Simulate search delay
        setTimeout(() => {
            let results = patientDatabase.filter(patient => {
                // Search query filter
                let matchesQuery = true;
                if (searchQuery.trim()) {
                    switch (searchType) {
                        case 'name':
                            matchesQuery = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
                            break;
                        case 'phone':
                            matchesQuery = patient.phone.includes(searchQuery);
                            break;
                        case 'email':
                            matchesQuery = patient.email.toLowerCase().includes(searchQuery.toLowerCase());
                            break;
                        case 'condition':
                            matchesQuery = patient.primaryCondition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                         patient.secondaryConditions.some(cond => 
                                             cond.toLowerCase().includes(searchQuery.toLowerCase())
                                         );
                            break;
                        case 'address':
                            matchesQuery = patient.address.toLowerCase().includes(searchQuery.toLowerCase());
                            break;
                        default:
                            matchesQuery = true;
                    }
                }

                // Age range filter
                const matchesAge = (!ageRange.min || patient.age >= parseInt(ageRange.min)) &&
                                 (!ageRange.max || patient.age <= parseInt(ageRange.max));

                // Gender filter
                const matchesGender = genderFilter === 'all' || 
                                    patient.gender.toLowerCase() === genderFilter.toLowerCase();

                // Condition filter
                const matchesCondition = !conditionFilter.trim() || 
                                       patient.primaryCondition.toLowerCase().includes(conditionFilter.toLowerCase()) ||
                                       patient.secondaryConditions.some(cond => 
                                           cond.toLowerCase().includes(conditionFilter.toLowerCase())
                                       );

                // Dosha filter
                const matchesDosha = doshaFilter === 'all' || 
                                   patient.dosha.toLowerCase().includes(doshaFilter.toLowerCase());

                // Status filter
                const matchesStatus = statusFilter === 'all' || 
                                    patient.status.toLowerCase() === statusFilter.toLowerCase();

                return matchesQuery && matchesAge && matchesGender && 
                       matchesCondition && matchesDosha && matchesStatus;
            });

            setSearchResults(results);
            setIsSearching(false);
        }, 800);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchType('name');
        setAgeRange({ min: '', max: '' });
        setGenderFilter('all');
        setConditionFilter('');
        setDoshaFilter('all');
        setStatusFilter('all');
        setSearchResults([]);
        setHasSearched(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'text-green-600 bg-green-100';
            case 'Inactive': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getDoshaColor = (dosha) => {
        if (dosha.includes('Vata')) return 'text-blue-600 bg-blue-100';
        if (dosha.includes('Pitta')) return 'text-red-600 bg-red-100';
        if (dosha.includes('Kapha')) return 'text-green-600 bg-green-100';
        return 'text-gray-600 bg-gray-100';
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
                            <Search className="title-icon" />
                            Patient Search
                        </h1>
                        <button className="btn btn-primary">
                            <UserPlus size={20} />
                            Add New Patient
                        </button>
                    </div>
                </div>

                <div className="content-body">
                    {/* Advanced Search Form */}
                    <div className="search-form-container">
                        <div className="search-form">
                            <h3>Advanced Patient Search</h3>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Search Type</label>
                                    <select 
                                        value={searchType} 
                                        onChange={(e) => setSearchType(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="name">Name</option>
                                        <option value="phone">Phone Number</option>
                                        <option value="email">Email</option>
                                        <option value="condition">Medical Condition</option>
                                        <option value="address">Address</option>
                                    </select>
                                </div>
                                
                                <div className="form-group flex-2">
                                    <label>Search Query</label>
                                    <div className="search-input-container">
                                        <Search className="search-icon" size={20} />
                                        <input
                                            type="text"
                                            placeholder={`Search by ${searchType}...`}
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Age Range</label>
                                    <div className="age-range-inputs">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={ageRange.min}
                                            onChange={(e) => setAgeRange({...ageRange, min: e.target.value})}
                                            className="form-input age-input"
                                        />
                                        <span>to</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={ageRange.max}
                                            onChange={(e) => setAgeRange({...ageRange, max: e.target.value})}
                                            className="form-input age-input"
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select 
                                        value={genderFilter} 
                                        onChange={(e) => setGenderFilter(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="all">All Genders</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                
                                <div className="form-group">
                                    <label>Dosha Type</label>
                                    <select 
                                        value={doshaFilter} 
                                        onChange={(e) => setDoshaFilter(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="all">All Doshas</option>
                                        <option value="vata">Vata</option>
                                        <option value="pitta">Pitta</option>
                                        <option value="kapha">Kapha</option>
                                    </select>
                                </div>
                                
                                <div className="form-group">
                                    <label>Status</label>
                                    <select 
                                        value={statusFilter} 
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group flex-2">
                                    <label>Medical Condition</label>
                                    <input
                                        type="text"
                                        placeholder="Filter by condition (e.g., diabetes, hypertension)..."
                                        value={conditionFilter}
                                        onChange={(e) => setConditionFilter(e.target.value)}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button 
                                    onClick={performSearch}
                                    disabled={isSearching}
                                    className="btn btn-primary"
                                >
                                    {isSearching ? 'Searching...' : 'Search Patients'}
                                </button>
                                <button 
                                    onClick={clearSearch}
                                    className="btn btn-outline"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Search Results */}
                    {hasSearched && (
                        <div className="search-results-section">
                            <div className="results-header">
                                <h3>Search Results ({searchResults.length} patients found)</h3>
                            </div>

                            {searchResults.length > 0 ? (
                                <div className="patient-results">
                                    {searchResults.map(patient => (
                                        <div key={patient.id} className="patient-result-card">
                                            <div className="patient-header">
                                                <div className="patient-basic-info">
                                                    <div className="patient-avatar">
                                                        {patient.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div className="patient-details">
                                                        <h4 className="patient-name">{patient.name}</h4>
                                                        <div className="patient-meta">
                                                            <span className="patient-age">{patient.age} years</span>
                                                            <span className="patient-gender">{patient.gender}</span>
                                                            <span className={`status-badge ${getStatusColor(patient.status)}`}>
                                                                {patient.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="patient-actions">
                                                    <button className="action-btn view" title="View Details">
                                                        <Eye size={16} />
                                                    </button>
                                                    <button className="action-btn edit" title="Edit Patient">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button className="action-btn contact" title="Call Patient">
                                                        <Phone size={16} />
                                                    </button>
                                                    <button className="action-btn email" title="Send Email">
                                                        <Mail size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div className="patient-info-grid">
                                                <div className="info-item">
                                                    <Phone size={16} className="info-icon" />
                                                    <span>{patient.phone}</span>
                                                </div>
                                                <div className="info-item">
                                                    <Mail size={16} className="info-icon" />
                                                    <span>{patient.email}</span>
                                                </div>
                                                <div className="info-item">
                                                    <MapPin size={16} className="info-icon" />
                                                    <span>{patient.address}</span>
                                                </div>
                                                <div className="info-item">
                                                    <Heart size={16} className="info-icon" />
                                                    <span>{patient.primaryCondition}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className={`dosha-badge ${getDoshaColor(patient.dosha)}`}>
                                                        {patient.dosha}
                                                    </span>
                                                </div>
                                                <div className="info-item">
                                                    <Clock size={16} className="info-icon" />
                                                    <span>Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="patient-additional-info">
                                                <div className="additional-conditions">
                                                    <strong>Other Conditions:</strong>
                                                    <div className="condition-tags">
                                                        {patient.secondaryConditions.map((condition, index) => (
                                                            <span key={index} className="condition-tag">
                                                                {condition}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                                <div className="patient-stats">
                                                    <span className="stat-item">
                                                        <strong>Blood Group:</strong> {patient.bloodGroup}
                                                    </span>
                                                    <span className="stat-item">
                                                        <strong>Total Visits:</strong> {patient.totalVisits}
                                                    </span>
                                                    <span className="stat-item">
                                                        <strong>Registered:</strong> {new Date(patient.registrationDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className="patient-footer">
                                                {patient.nextAppointment && (
                                                    <span className="next-appointment">
                                                        <Calendar size={14} />
                                                        Next Appointment: {new Date(patient.nextAppointment).toLocaleDateString()}
                                                    </span>
                                                )}
                                                
                                                <button className="btn btn-outline">
                                                    Schedule Appointment
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <AlertCircle size={48} className="empty-icon" />
                                    <h3>No patients found</h3>
                                    <p>Try adjusting your search criteria or check the spelling.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {!hasSearched && (
                        <div className="search-placeholder">
                            <Search size={64} className="placeholder-icon" />
                            <h3>Advanced Patient Search</h3>
                            <p>Use the search form above to find patients by various criteria including name, contact information, medical conditions, age, gender, and dosha type.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PatientSearch;
