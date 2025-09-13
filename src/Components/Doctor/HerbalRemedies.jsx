import React, { useState } from 'react';
import { Search, Leaf, Filter, Eye, BookOpen, Star, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function HerbalRemedies({ 
    activeSection = 'herbal-remedies',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [doshaFilter, setDoshaFilter] = useState('all');
    const [selectedRemedy, setSelectedRemedy] = useState(null);

    const herbalRemedies = [
        {
            id: 1,
            name: 'Ashwagandha',
            scientificName: 'Withania somnifera',
            category: 'Adaptogen',
            doshaEffect: ['Vata', 'Kapha'],
            properties: ['Rasayana', 'Balya', 'Vajikara'],
            indications: ['Stress', 'Insomnia', 'Weakness', 'Anxiety', 'Immunity'],
            contraindications: ['Pregnancy', 'Hyperthyroidism', 'Autoimmune disorders'],
            dosage: '3-6g powder daily or 300-500mg extract',
            preparation: 'Powder with milk/water, capsules, decoction',
            rating: 4.8,
            image: '/api/placeholder/150/150'
        },
        {
            id: 2,
            name: 'Triphala',
            scientificName: 'Amalaki + Bibhitaki + Haritaki',
            category: 'Digestive',
            doshaEffect: ['Vata', 'Pitta', 'Kapha'],
            properties: ['Deepana', 'Pachana', 'Anulomana'],
            indications: ['Constipation', 'Indigestion', 'Eye disorders', 'Detox'],
            contraindications: ['Diarrhea', 'Pregnancy', 'Severe dehydration'],
            dosage: '3-6g powder at bedtime',
            preparation: 'Powder with warm water, tablets',
            rating: 4.9,
            image: '/api/placeholder/150/150'
        },
        {
            id: 3,
            name: 'Brahmi',
            scientificName: 'Bacopa monnieri',
            category: 'Nootropic',
            doshaEffect: ['Vata', 'Pitta'],
            properties: ['Medhya', 'Saraswatarishta'],
            indications: ['Memory loss', 'Anxiety', 'ADHD', 'Epilepsy'],
            contraindications: ['Bradycardia', 'Ulcers'],
            dosage: '3-6g powder or 300mg extract daily',
            preparation: 'Powder with ghee, capsules, syrup',
            rating: 4.7,
            image: '/api/placeholder/150/150'
        },
        {
            id: 4,
            name: 'Turmeric',
            scientificName: 'Curcuma longa',
            category: 'Anti-inflammatory',
            doshaEffect: ['Kapha', 'Pitta'],
            properties: ['Krimighna', 'Varnya', 'Raktashodhaka'],
            indications: ['Inflammation', 'Wounds', 'Skin disorders', 'Arthritis'],
            contraindications: ['Gallstones', 'Blood thinners'],
            dosage: '1-3g powder daily',
            preparation: 'Powder with milk, paste, capsules',
            rating: 4.6,
            image: '/api/placeholder/150/150'
        },
        {
            id: 5,
            name: 'Neem',
            scientificName: 'Azadirachta indica',
            category: 'Antimicrobial',
            doshaEffect: ['Pitta', 'Kapha'],
            properties: ['Krimighna', 'Kushthaghna', 'Tikta'],
            indications: ['Skin diseases', 'Diabetes', 'Infections', 'Fever'],
            contraindications: ['Pregnancy', 'Infertility treatment'],
            dosage: '2-4g powder or 10-20ml juice',
            preparation: 'Leaf powder, juice, oil, capsules',
            rating: 4.5,
            image: '/api/placeholder/150/150'
        },
        {
            id: 6,
            name: 'Ginger',
            scientificName: 'Zingiber officinale',
            category: 'Digestive',
            doshaEffect: ['Vata', 'Kapha'],
            properties: ['Deepana', 'Pachana', 'Ushna'],
            indications: ['Nausea', 'Indigestion', 'Cold', 'Arthritis'],
            contraindications: ['Gallstones', 'High fever'],
            dosage: '1-3g fresh or 250-1000mg dry',
            preparation: 'Fresh juice, powder, tea, capsules',
            rating: 4.8,
            image: '/api/placeholder/150/150'
        }
    ];

    const categories = ['all', 'Adaptogen', 'Digestive', 'Nootropic', 'Anti-inflammatory', 'Antimicrobial'];
    const doshas = ['all', 'Vata', 'Pitta', 'Kapha'];

    const filteredRemedies = herbalRemedies.filter(remedy => {
        const matchesSearch = remedy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            remedy.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            remedy.indications.some(ind => ind.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = categoryFilter === 'all' || remedy.category === categoryFilter;
        const matchesDosha = doshaFilter === 'all' || remedy.doshaEffect.includes(doshaFilter);
        
        return matchesSearch && matchesCategory && matchesDosha;
    });

    const getDoshaColor = (dosha) => {
        switch (dosha) {
            case 'Vata': return '#8B5CF6';
            case 'Pitta': return '#EF4444';
            case 'Kapha': return '#10B981';
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
                            <Leaf className="title-icon" />
                            Herbal Remedies Database
                        </h1>
                        <div className="remedies-stats">
                            <span className="stat-badge">
                                <BookOpen size={16} />
                                {herbalRemedies.length} Remedies
                            </span>
                            <span className="stat-badge">
                                <Filter size={16} />
                                {filteredRemedies.length} Filtered
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
                                    placeholder="Search remedies, conditions, or scientific names..."
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
                                            {dosha === 'all' ? 'All Doshas' : dosha}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="remedies-grid">
                        {filteredRemedies.map(remedy => (
                            <div key={remedy.id} className="remedy-card">
                                <div className="remedy-header">
                                    <div className="remedy-image">
                                        <Leaf size={32} color="#10b981" />
                                    </div>
                                    <div className="remedy-title">
                                        <h3>{remedy.name}</h3>
                                        <p className="scientific-name">{remedy.scientificName}</p>
                                        <div className="rating">
                                            <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                            <span>{remedy.rating}</span>
                                        </div>
                                    </div>
                                    <div className="category-badge">
                                        {remedy.category}
                                    </div>
                                </div>

                                <div className="remedy-content">
                                    <div className="dosha-effects">
                                        <h5>Dosha Effects:</h5>
                                        <div className="dosha-tags">
                                            {remedy.doshaEffect.map(dosha => (
                                                <span 
                                                    key={dosha} 
                                                    className="dosha-tag"
                                                    style={{ backgroundColor: getDoshaColor(dosha) + '20', color: getDoshaColor(dosha) }}
                                                >
                                                    {dosha}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="indications">
                                        <h5>Indications:</h5>
                                        <div className="indication-tags">
                                            {remedy.indications.slice(0, 3).map((indication, index) => (
                                                <span key={index} className="indication-tag">
                                                    {indication}
                                                </span>
                                            ))}
                                            {remedy.indications.length > 3 && (
                                                <span className="more-tag">+{remedy.indications.length - 3} more</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="dosage-info">
                                        <h5>Dosage:</h5>
                                        <p>{remedy.dosage}</p>
                                    </div>

                                    {remedy.contraindications.length > 0 && (
                                        <div className="contraindications">
                                            <div className="warning-header">
                                                <AlertCircle size={16} />
                                                <h5>Contraindications:</h5>
                                            </div>
                                            <p>{remedy.contraindications.join(', ')}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="remedy-footer">
                                    <button 
                                        className="btn btn-primary btn-sm"
                                        onClick={() => setSelectedRemedy(remedy)}
                                    >
                                        <Eye size={16} />
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredRemedies.length === 0 && (
                        <div className="no-results">
                            <Leaf size={48} />
                            <h3>No remedies found</h3>
                            <p>Try adjusting your search criteria or filters.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Detailed Modal */}
            {selectedRemedy && (
                <div className="modal-overlay" onClick={() => setSelectedRemedy(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{selectedRemedy.name}</h2>
                            <button className="close-btn" onClick={() => setSelectedRemedy(null)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-section">
                                <h4>Scientific Name</h4>
                                <p>{selectedRemedy.scientificName}</p>
                            </div>
                            <div className="detail-section">
                                <h4>Properties</h4>
                                <p>{selectedRemedy.properties.join(', ')}</p>
                            </div>
                            <div className="detail-section">
                                <h4>All Indications</h4>
                                <p>{selectedRemedy.indications.join(', ')}</p>
                            </div>
                            <div className="detail-section">
                                <h4>Preparation Methods</h4>
                                <p>{selectedRemedy.preparation}</p>
                            </div>
                            <div className="detail-section">
                                <h4>Contraindications</h4>
                                <p>{selectedRemedy.contraindications.join(', ')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <style jsx>{`
                .remedies-stats {
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
                
                .remedies-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 1.5rem;
                }
                
                .remedy-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .remedy-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .remedy-header {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                    position: relative;
                }
                
                .remedy-image {
                    width: 48px;
                    height: 48px;
                    background: #f0fdf4;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                
                .remedy-title {
                    flex: 1;
                }
                
                .remedy-title h3 {
                    margin: 0 0 0.25rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .scientific-name {
                    margin: 0 0 0.5rem 0;
                    color: #64748b;
                    font-style: italic;
                    font-size: 0.875rem;
                }
                
                .rating {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #1e293b;
                }
                
                .category-badge {
                    position: absolute;
                    top: 0;
                    right: 0;
                    background: #dbeafe;
                    color: #1d4ed8;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                
                .remedy-content {
                    margin-bottom: 1.5rem;
                }
                
                .dosha-effects, .indications, .dosage-info, .contraindications {
                    margin-bottom: 1rem;
                }
                
                .dosha-effects h5, .indications h5, .dosage-info h5, .contraindications h5 {
                    margin: 0 0 0.5rem 0;
                    color: #1e293b;
                    font-size: 0.875rem;
                    font-weight: 600;
                }
                
                .dosha-tags, .indication-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                
                .dosha-tag {
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border: 1px solid currentColor;
                }
                
                .indication-tag {
                    background: #f1f5f9;
                    color: #475569;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .more-tag {
                    background: #e2e8f0;
                    color: #64748b;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .dosage-info p {
                    margin: 0;
                    color: #374151;
                    font-size: 0.875rem;
                }
                
                .contraindications {
                    background: #fef2f2;
                    padding: 0.75rem;
                    border-radius: 8px;
                    border: 1px solid #fecaca;
                }
                
                .warning-header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #dc2626;
                }
                
                .contraindications p {
                    margin: 0;
                    color: #dc2626;
                    font-size: 0.875rem;
                }
                
                .remedy-footer {
                    display: flex;
                    justify-content: flex-end;
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
                    max-width: 600px;
                    width: 90%;
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
                
                .modal-header h2 {
                    margin: 0;
                    color: #1e293b;
                }
                
                .close-btn {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #64748b;
                }
                
                .modal-body {
                    padding: 1.5rem;
                }
                
                .detail-section {
                    margin-bottom: 1.5rem;
                }
                
                .detail-section h4 {
                    margin: 0 0 0.5rem 0;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .detail-section p {
                    margin: 0;
                    color: #374151;
                    line-height: 1.5;
                }
                
                .no-results {
                    text-align: center;
                    padding: 3rem 2rem;
                    color: #64748b;
                }
                
                .no-results h3 {
                    margin: 1rem 0 0.5rem 0;
                    color: #1e293b;
                }
                
                @media (max-width: 768px) {
                    .search-filter-row {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    
                    .search-box {
                        min-width: auto;
                    }
                    
                    .filter-group {
                        justify-content: space-between;
                    }
                    
                    .remedies-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .remedy-header {
                        flex-direction: column;
                        text-align: center;
                    }
                    
                    .category-badge {
                        position: static;
                        align-self: center;
                        margin-top: 0.5rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default HerbalRemedies;
