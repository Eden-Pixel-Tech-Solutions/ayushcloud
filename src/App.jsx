import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './Components/login';
import ProtectedRoute from './components/ProtectedRoute';
import './assets/css/page-header.css';

// Import dashboard components
import RecpDashboard from './Components/Recp/RecpDashboard';
import DocDashboard from './Components/Doctor/DocDashboard';
import HospitalDashboard from './Components/Hospital/HospitalDashboard';
import PatientDashboard from './Components/patient/PatientDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/recp" element={<RecpDashboard />} />
            <Route path="/doctor" element={<DocDashboard />} />
            <Route path="/government" element={<HospitalDashboard />} />
            <Route path="/patient" element={<PatientDashboard />} />
            
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>
          
          {/* Catch all other routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;