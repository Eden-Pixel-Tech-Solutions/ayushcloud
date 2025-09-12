import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Navbar from './Navbar';

function DocDashboard({ user, onLogout }) {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState({});

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
            
            <div className="main-content">
                <header className="dashboard-header">
                    <button 
                        className="menu-toggle"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                    <h1>Doctor Dashboard</h1>
                    <button 
                        onClick={onLogout} 
                        className="logout-btn"
                        style={{ 
                            padding: '0.5rem 1rem', 
                            backgroundColor: '#ef4444', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer' 
                        }}
                    >
                        Logout
                    </button>
                </header>
                
                <div className="dashboard-content">
                    <div className="welcome-section">
                        <h2>Welcome, Dr. {user?.name || 'Doctor'}!</h2>
                        <p>Email: {user?.email}</p>
                        <p>Current Section: {activeSection}</p>
                    </div>
                    
                    {/* Content will be rendered based on activeSection */}
                    <div className="section-content">
                        {activeSection === 'dashboard' && (
                            <div className="dashboard-overview">
                                <h3>Dashboard Overview</h3>
                                <p>Welcome to your doctor portal. Use the navigation menu to access different sections.</p>
                            </div>
                        )}
                        
                        {activeSection === 'todays-consultations' && (
                            <div className="consultations-section">
                                <h3>Today's Consultations</h3>
                                <p>View and manage your consultations for today.</p>
                            </div>
                        )}
                        
                        {activeSection === 'patient-list' && (
                            <div className="patients-section">
                                <h3>My Patients</h3>
                                <p>View and manage your patient list.</p>
                            </div>
                        )}
                        
                        {activeSection === 'create-prescription' && (
                            <div className="prescription-section">
                                <h3>Create Prescription</h3>
                                <p>Create new prescriptions for your patients.</p>
                            </div>
                        )}
                        
                        {activeSection === 'dosha-analysis' && (
                            <div className="ayurveda-section">
                                <h3>Dosha Analysis</h3>
                                <p>Perform Ayurvedic dosha analysis for patients.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocDashboard;
