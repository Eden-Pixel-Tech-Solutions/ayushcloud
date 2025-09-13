import React, { useState } from 'react';
import { User, Heart, Brain, Zap, CheckCircle, AlertCircle, Save, RotateCcw, FileText } from 'lucide-react';
import Navbar from './Navbar';
import '../../assets/css/navbar.css';
import '../../assets/css/doctor-dashboard.css';

function NewAssessment({ 
    activeSection = 'new-assessment',
    setActiveSection,
    sidebarOpen = false,
    setSidebarOpen,
    expandedMenus = {},
    setExpandedMenus
}) {
    const [currentStep, setCurrentStep] = useState(1);
    const [patientInfo, setPatientInfo] = useState({
        name: '',
        age: '',
        gender: '',
        phone: '',
        email: ''
    });

    const [assessmentData, setAssessmentData] = useState({
        physical: {},
        mental: {},
        lifestyle: {},
        symptoms: {}
    });

    const [results, setResults] = useState(null);

    // Dosha assessment questions
    const assessmentQuestions = {
        physical: [
            { id: 'body_frame', question: 'Body Frame', options: ['Thin/Light (Vata)', 'Medium/Muscular (Pitta)', 'Large/Heavy (Kapha)'] },
            { id: 'skin_type', question: 'Skin Type', options: ['Dry/Rough (Vata)', 'Oily/Sensitive (Pitta)', 'Thick/Smooth (Kapha)'] },
            { id: 'hair_type', question: 'Hair Type', options: ['Dry/Frizzy (Vata)', 'Fine/Oily (Pitta)', 'Thick/Wavy (Kapha)'] },
            { id: 'appetite', question: 'Appetite', options: ['Variable/Irregular (Vata)', 'Strong/Regular (Pitta)', 'Slow/Steady (Kapha)'] },
            { id: 'digestion', question: 'Digestion', options: ['Irregular/Gas (Vata)', 'Quick/Acidic (Pitta)', 'Slow/Heavy (Kapha)'] }
        ],
        mental: [
            { id: 'personality', question: 'Personality', options: ['Creative/Anxious (Vata)', 'Focused/Intense (Pitta)', 'Calm/Steady (Kapha)'] },
            { id: 'memory', question: 'Memory', options: ['Quick to learn, quick to forget (Vata)', 'Sharp/Clear (Pitta)', 'Slow to learn, long retention (Kapha)'] },
            { id: 'decision_making', question: 'Decision Making', options: ['Quick/Changeable (Vata)', 'Decisive/Firm (Pitta)', 'Slow/Deliberate (Kapha)'] },
            { id: 'stress_response', question: 'Stress Response', options: ['Worry/Anxiety (Vata)', 'Anger/Irritation (Pitta)', 'Withdrawal/Depression (Kapha)'] }
        ],
        lifestyle: [
            { id: 'sleep_pattern', question: 'Sleep Pattern', options: ['Light/Restless (Vata)', 'Moderate/Sound (Pitta)', 'Deep/Long (Kapha)'] },
            { id: 'activity_level', question: 'Activity Level', options: ['High/Erratic (Vata)', 'Moderate/Planned (Pitta)', 'Low/Steady (Kapha)'] },
            { id: 'weather_preference', question: 'Weather Preference', options: ['Warm/Humid (Vata)', 'Cool/Dry (Pitta)', 'Warm/Dry (Kapha)'] },
            { id: 'food_preference', question: 'Food Preference', options: ['Warm/Cooked (Vata)', 'Cool/Raw (Pitta)', 'Light/Spicy (Kapha)'] }
        ]
    };

    const handlePatientInfoChange = (field, value) => {
        setPatientInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleAssessmentChange = (category, questionId, value) => {
        setAssessmentData(prev => ({
            ...prev,
            [category]: { ...prev[category], [questionId]: value }
        }));
    };

    const calculateDosha = () => {
        const scores = { vata: 0, pitta: 0, kapha: 0 };
        
        Object.values(assessmentData).forEach(category => {
            Object.values(category).forEach(answer => {
                if (answer.includes('Vata')) scores.vata++;
                else if (answer.includes('Pitta')) scores.pitta++;
                else if (answer.includes('Kapha')) scores.kapha++;
            });
        });

        const total = scores.vata + scores.pitta + scores.kapha;
        const percentages = {
            vata: Math.round((scores.vata / total) * 100),
            pitta: Math.round((scores.pitta / total) * 100),
            kapha: Math.round((scores.kapha / total) * 100)
        };

        const dominant = Object.keys(percentages).reduce((a, b) => 
            percentages[a] > percentages[b] ? a : b
        );

        setResults({ scores, percentages, dominant });
        setCurrentStep(5);
    };

    const resetAssessment = () => {
        setCurrentStep(1);
        setPatientInfo({ name: '', age: '', gender: '', phone: '', email: '' });
        setAssessmentData({ physical: {}, mental: {}, lifestyle: {}, symptoms: {} });
        setResults(null);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="step-content">
                        <h3>Patient Information</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    value={patientInfo.name}
                                    onChange={(e) => handlePatientInfoChange('name', e.target.value)}
                                    className="form-input"
                                    placeholder="Enter patient's full name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Age *</label>
                                <input
                                    type="number"
                                    value={patientInfo.age}
                                    onChange={(e) => handlePatientInfoChange('age', e.target.value)}
                                    className="form-input"
                                    placeholder="Age"
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender *</label>
                                <select
                                    value={patientInfo.gender}
                                    onChange={(e) => handlePatientInfoChange('gender', e.target.value)}
                                    className="form-select"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    value={patientInfo.phone}
                                    onChange={(e) => handlePatientInfoChange('phone', e.target.value)}
                                    className="form-input"
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={patientInfo.email}
                                    onChange={(e) => handlePatientInfoChange('email', e.target.value)}
                                    className="form-input"
                                    placeholder="email@example.com"
                                />
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="step-content">
                        <h3>Physical Characteristics</h3>
                        <div className="questions-container">
                            {assessmentQuestions.physical.map(q => (
                                <div key={q.id} className="question-group">
                                    <h4>{q.question}</h4>
                                    <div className="options-grid">
                                        {q.options.map(option => (
                                            <label key={option} className="option-label">
                                                <input
                                                    type="radio"
                                                    name={q.id}
                                                    value={option}
                                                    checked={assessmentData.physical[q.id] === option}
                                                    onChange={(e) => handleAssessmentChange('physical', q.id, e.target.value)}
                                                />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="step-content">
                        <h3>Mental & Emotional Traits</h3>
                        <div className="questions-container">
                            {assessmentQuestions.mental.map(q => (
                                <div key={q.id} className="question-group">
                                    <h4>{q.question}</h4>
                                    <div className="options-grid">
                                        {q.options.map(option => (
                                            <label key={option} className="option-label">
                                                <input
                                                    type="radio"
                                                    name={q.id}
                                                    value={option}
                                                    checked={assessmentData.mental[q.id] === option}
                                                    onChange={(e) => handleAssessmentChange('mental', q.id, e.target.value)}
                                                />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="step-content">
                        <h3>Lifestyle Patterns</h3>
                        <div className="questions-container">
                            {assessmentQuestions.lifestyle.map(q => (
                                <div key={q.id} className="question-group">
                                    <h4>{q.question}</h4>
                                    <div className="options-grid">
                                        {q.options.map(option => (
                                            <label key={option} className="option-label">
                                                <input
                                                    type="radio"
                                                    name={q.id}
                                                    value={option}
                                                    checked={assessmentData.lifestyle[q.id] === option}
                                                    onChange={(e) => handleAssessmentChange('lifestyle', q.id, e.target.value)}
                                                />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="step-content">
                        <h3>Assessment Results</h3>
                        {results && (
                            <div className="results-container">
                                <div className="patient-summary">
                                    <h4>Patient: {patientInfo.name}</h4>
                                    <p>{patientInfo.age} years, {patientInfo.gender}</p>
                                </div>
                                
                                <div className="dosha-results">
                                    <h4>Dosha Constitution</h4>
                                    <div className="dosha-bars">
                                        <div className="dosha-bar">
                                            <div className="dosha-label">
                                                <Heart className="dosha-icon vata" />
                                                <span>Vata</span>
                                                <span className="percentage">{results.percentages.vata}%</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress-fill vata" 
                                                    style={{ width: `${results.percentages.vata}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        
                                        <div className="dosha-bar">
                                            <div className="dosha-label">
                                                <Zap className="dosha-icon pitta" />
                                                <span>Pitta</span>
                                                <span className="percentage">{results.percentages.pitta}%</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress-fill pitta" 
                                                    style={{ width: `${results.percentages.pitta}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        
                                        <div className="dosha-bar">
                                            <div className="dosha-label">
                                                <Brain className="dosha-icon kapha" />
                                                <span>Kapha</span>
                                                <span className="percentage">{results.percentages.kapha}%</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress-fill kapha" 
                                                    style={{ width: `${results.percentages.kapha}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="dominant-dosha">
                                        <h5>Dominant Constitution: <span className={`dosha-name ${results.dominant}`}>{results.dominant.toUpperCase()}</span></h5>
                                    </div>
                                </div>
                                
                                <div className="recommendations">
                                    <h4>Recommendations</h4>
                                    <div className="recommendation-cards">
                                        <div className="recommendation-card">
                                            <h5>Diet</h5>
                                            <p>Follow {results.dominant}-pacifying diet with warm, cooked foods.</p>
                                        </div>
                                        <div className="recommendation-card">
                                            <h5>Lifestyle</h5>
                                            <p>Maintain regular routines and practice stress-reducing activities.</p>
                                        </div>
                                        <div className="recommendation-card">
                                            <h5>Exercise</h5>
                                            <p>Gentle, regular exercise suitable for {results.dominant} constitution.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return patientInfo.name && patientInfo.age && patientInfo.gender;
            case 2:
                return Object.keys(assessmentData.physical).length === assessmentQuestions.physical.length;
            case 3:
                return Object.keys(assessmentData.mental).length === assessmentQuestions.mental.length;
            case 4:
                return Object.keys(assessmentData.lifestyle).length === assessmentQuestions.lifestyle.length;
            default:
                return true;
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
                            <User className="title-icon" />
                            New Dosha Assessment
                        </h1>
                        <button className="btn btn-outline" onClick={resetAssessment}>
                            <RotateCcw size={20} />
                            Reset Assessment
                        </button>
                    </div>
                    
                    {/* Progress Steps */}
                    <div className="progress-steps">
                        {[1, 2, 3, 4, 5].map(step => (
                            <div key={step} className={`step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
                                <div className="step-number">
                                    {currentStep > step ? <CheckCircle size={20} /> : step}
                                </div>
                                <div className="step-label">
                                    {step === 1 && 'Patient Info'}
                                    {step === 2 && 'Physical'}
                                    {step === 3 && 'Mental'}
                                    {step === 4 && 'Lifestyle'}
                                    {step === 5 && 'Results'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="content-body">
                    <div className="assessment-container">
                        {renderStepContent()}
                        
                        <div className="step-navigation">
                            {currentStep > 1 && currentStep < 5 && (
                                <button 
                                    className="btn btn-outline"
                                    onClick={() => setCurrentStep(currentStep - 1)}
                                >
                                    Previous
                                </button>
                            )}
                            
                            {currentStep < 4 && (
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => setCurrentStep(currentStep + 1)}
                                    disabled={!canProceed()}
                                >
                                    Next
                                </button>
                            )}
                            
                            {currentStep === 4 && (
                                <button 
                                    className="btn btn-success"
                                    onClick={calculateDosha}
                                    disabled={!canProceed()}
                                >
                                    <FileText size={20} />
                                    Generate Assessment
                                </button>
                            )}
                            
                            {currentStep === 5 && (
                                <button className="btn btn-primary">
                                    <Save size={20} />
                                    Save Assessment
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .progress-steps {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-top: 2rem;
                }
                
                .step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .step-number {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #e2e8f0;
                    color: #64748b;
                    font-weight: 600;
                }
                
                .step.active .step-number {
                    background: #3b82f6;
                    color: white;
                }
                
                .step.completed .step-number {
                    background: #10b981;
                    color: white;
                }
                
                .step-label {
                    font-size: 0.875rem;
                    color: #64748b;
                    font-weight: 500;
                }
                
                .assessment-container {
                    background: white;
                    border-radius: 12px;
                    padding: 2rem;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }
                
                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                }
                
                .questions-container {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }
                
                .question-group h4 {
                    margin-bottom: 1rem;
                    color: #1e293b;
                    font-weight: 600;
                }
                
                .options-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .option-label {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .option-label:hover {
                    border-color: #3b82f6;
                    background: #f8fafc;
                }
                
                .option-label input[type="radio"]:checked + span {
                    color: #3b82f6;
                    font-weight: 600;
                }
                
                .dosha-bars {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin: 1.5rem 0;
                }
                
                .dosha-bar {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .dosha-label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 600;
                }
                
                .dosha-icon.vata { color: #3b82f6; }
                .dosha-icon.pitta { color: #ef4444; }
                .dosha-icon.kapha { color: #10b981; }
                
                .progress-bar {
                    height: 12px;
                    background: #e2e8f0;
                    border-radius: 6px;
                    overflow: hidden;
                }
                
                .progress-fill {
                    height: 100%;
                    transition: width 0.5s ease;
                }
                
                .progress-fill.vata { background: #3b82f6; }
                .progress-fill.pitta { background: #ef4444; }
                .progress-fill.kapha { background: #10b981; }
                
                .dominant-dosha {
                    text-align: center;
                    margin: 2rem 0;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 8px;
                }
                
                .dosha-name.vata { color: #3b82f6; }
                .dosha-name.pitta { color: #ef4444; }
                .dosha-name.kapha { color: #10b981; }
                
                .recommendation-cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                }
                
                .recommendation-card {
                    padding: 1rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    background: #f8fafc;
                }
                
                .recommendation-card h5 {
                    margin: 0 0 0.5rem 0;
                    color: #1e293b;
                }
                
                .step-navigation {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 2rem;
                    padding-top: 2rem;
                    border-top: 1px solid #e2e8f0;
                }
            `}</style>
        </div>
    );
}

export default NewAssessment;
