import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Navbar from './Navbar';
import TodaysConsultant from './TodaysConsultant';
import ConsultationHistory from './ConsultationHistory';
import FollowUpAppointments from './FollowUpAppointments';
import PatientList from './PatientList';
import PatientSearch from './PatientSearch';
import MedicalRecords from './MedicalRecords';
import NewAssessment from './NewAssessment';
import AssessmentRecords from './AssessmentRecords';
import CreatePrescription from './CreatePrescription';
import PrescriptionHistory from './PrescriptionHistory';
import DrugInteractions from './DrugInteractions';
import DoshaAnalysis from './DoshaAnalysis';
import HerbalRemedies from './HerbalRemedies';
import TreatmentPlans from './TreatmentPlans';
import FoodNutrientExplorer from './FoodNutrientExplorer';
import AyurvedicDiet from './AyurvedicDiet';
import PatientReports from './PatientReports';
import TreatmentOutcomes from './TreatmentOutcomes';
import MonthlySummary from './MonthlySummary';
import CreateDietChart from './CreateDietChart';
import DietChartHistory from './DietChartHistory';
import SavedDietCharts from './SavedDietCharts';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function DocDashboard({ user, onLogout }) {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState({});

    // If todays-consultations is selected, render the TodaysConsultant component
    if (activeSection === 'todays-consultations') {
        return <TodaysConsultant 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If consultation-history is selected, render the ConsultationHistory component
    if (activeSection === 'consultation-history') {
        return <ConsultationHistory 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If follow-ups is selected, render the FollowUpAppointments component
    if (activeSection === 'follow-ups') {
        return <FollowUpAppointments 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If patient-list is selected, render the PatientList component
    if (activeSection === 'patient-list') {
        return <PatientList 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If patient-search is selected, render the PatientSearch component
    if (activeSection === 'patient-search') {
        return <PatientSearch 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If patient-records is selected, render the MedicalRecords component
    if (activeSection === 'patient-records') {
        return <MedicalRecords 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If new-assessment is selected, render the NewAssessment component
    if (activeSection === 'new-assessment') {
        return <NewAssessment 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If assessment-records is selected, render the AssessmentRecords component
    if (activeSection === 'assessment-records') {
        return <AssessmentRecords 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If create-prescription is selected, render the CreatePrescription component
    if (activeSection === 'create-prescription') {
        return <CreatePrescription 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If prescription-history is selected, render the PrescriptionHistory component
    if (activeSection === 'prescription-history') {
        return <PrescriptionHistory 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If drug-interactions is selected, render the DrugInteractions component
    if (activeSection === 'drug-interactions') {
        return <DrugInteractions 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If dosha-analysis is selected, render the DoshaAnalysis component
    if (activeSection === 'dosha-analysis') {
        return <DoshaAnalysis 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If herbal-remedies is selected, render the HerbalRemedies component
    if (activeSection === 'herbal-remedies') {
        return <HerbalRemedies 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If treatment-plans is selected, render the TreatmentPlans component
    if (activeSection === 'treatment-plans') {
        return <TreatmentPlans 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If food-nutrient-explorer is selected, render the FoodNutrientExplorer component
    if (activeSection === 'food-nutrient-explorer') {
        return <FoodNutrientExplorer 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If ayurvedic-diet is selected, render the AyurvedicDiet component
    if (activeSection === 'ayurvedic-diet') {
        return <AyurvedicDiet 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If patient-reports is selected, render the PatientReports component
    if (activeSection === 'patient-reports') {
        return <PatientReports 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If treatment-outcomes is selected, render the TreatmentOutcomes component
    if (activeSection === 'treatment-outcomes') {
        return <TreatmentOutcomes 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If monthly-summary is selected, render the MonthlySummary component
    if (activeSection === 'monthly-summary') {
        return <MonthlySummary 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If create-diet-chart is selected, render the CreateDietChart component
    if (activeSection === 'create-diet-chart') {
        return <CreateDietChart 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If diet-chart-history is selected, render the DietChartHistory component
    if (activeSection === 'diet-chart-history') {
        return <DietChartHistory 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

    // If saved-diet-charts is selected, render the SavedDietCharts component
    if (activeSection === 'saved-diet-charts') {
        return <SavedDietCharts 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
        />;
    }

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
