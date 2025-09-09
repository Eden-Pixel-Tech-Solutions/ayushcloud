import React, { useState } from 'react';
import '../assets/css/login.css';

// Import dashboard components
import RecpDashboard from './Recp/RecpDashboard';
import DocDashboard from './Doctor/DocDashboard';
import HospitalDashboard from './Hospital/HospitalDashboard';
import PatientDashboard from './patient/PatientDashboard';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Hardcoded credentials
    const credentials = {
      'recp@edenpixel.in': { password: '123456', role: 'recp', name: 'Receptionist' },
      'doc@edenpixel.in': { password: '123456', role: 'doctor', name: 'Doctor' },
      'government@edenpixel.in': { password: '123456', role: 'government', name: 'Government' },
      'patient@edenpixel.in': { password: '123456', role: 'patient', name: 'Patient' }
    };

    setTimeout(() => {
      if (credentials[formData.email] && credentials[formData.email].password === formData.password) {
        // Successful login
        const userData = {
          email: formData.email,
          role: credentials[formData.email].role,
          name: credentials[formData.email].name
        };
        setCurrentUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
      } else {
        // Failed login
        setError('Invalid email or password. Please check your credentials.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setFormData({ email: '', password: '' });
    setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Check if user is already logged in on component mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Render appropriate dashboard based on user role
  if (currentUser) {
    switch (currentUser.role) {
      case 'recp':
        return <RecpDashboard user={currentUser} onLogout={handleLogout} />;
      case 'doctor':
        return <DocDashboard user={currentUser} onLogout={handleLogout} />;
      case 'government':
        return <HospitalDashboard user={currentUser} onLogout={handleLogout} />;
      case 'patient':
        return <PatientDashboard user={currentUser} onLogout={handleLogout} />;
      default:
        return <div>Unknown user role</div>;
    }
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="ayurveda-pattern"></div>
        <div className="floating-elements">
          <div className="leaf leaf-1">🌿</div>
          <div className="leaf leaf-2">🍃</div>
          <div className="leaf leaf-3">🌱</div>
          <div className="leaf leaf-4">🌿</div>
          <div className="leaf leaf-5">🍃</div>
        </div>
      </div>
      
      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-section">
              <h1 className="hospital-name">AyushCloud</h1>
              <p className="tagline">Traditional Healing, Modern Care</p>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message" style={{ 
                color: 'var(--error-color)', 
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                padding: '0.75rem',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--error-color)',
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
                <span className="input-icon">📧</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="remember"
                />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#forgot-password" className="forgot-password">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>

            <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>Demo Credentials:</strong><br />
              Receptionist: recp@edenpixel.in<br />
              Doctor: doc@edenpixel.in<br />
              Government: government@edenpixel.in<br />
              Patient: patient@edenpixel.in<br />
              Password: 123456
            </div>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <a href="#" className="signup-link">Sign Up</a></p>
            <div className="divider">
              <span>or</span>
            </div>
            <div className="social-login">
              <button className="social-button google">
                <span className="social-icon">G</span>
                Continue with Google
              </button>
            </div>
          </div>
        </div>

        <div className="info-panel">
          <div className="info-content">
            <h2>Welcome to AyushCloud</h2>
            <p>Experience the perfect blend of ancient Ayurvedic wisdom and modern healthcare technology.</p>
            <div className="features">
              <div className="feature">
                <span className="feature-icon">🌿</span>
                <span>Natural Healing</span>
              </div>
              <div className="feature">
                <span className="feature-icon">💊</span>
                <span>Personalized Treatment</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📱</span>
                <span>Digital Health Records</span>
              </div>
              <div className="feature">
                <span className="feature-icon">👨‍⚕️</span>
                <span>Expert Practitioners</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;