import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Hardcoded credentials check
    const credentials = {
      'recp@edenpixel.in': { password: '123456', role: 'recp', redirect: '/recp' },
      'doc@edenpixel.in': { password: '123456', role: 'doctor', redirect: '/doctor' },
      'government@edenpixel.in': { password: '123456', role: 'government', redirect: '/government' },
      'patient@edenpixel.in': { password: '123456', role: 'patient', redirect: '/patient' },
    };

    if (credentials[email] && credentials[email].password === password) {
      const userData = {
        email,
        role: credentials[email].role,
        redirect: credentials[email].redirect
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, redirect: userData.redirect };
    }
    
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};\n
export const useAuth = () => {
  return useContext(AuthContext);
};
