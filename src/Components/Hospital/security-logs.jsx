import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Shield,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  ExternalLink,
  RefreshCw,
  FileText,
  Lock,
  Unlock,
  AlertOctagon
} from 'lucide-react';
import '../../assets/css/security-logs.css';

const SecurityLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    logType: '',
    severity: '',
    dateRange: '7days',
    status: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLogs: 0,
    critical: 0,
    warnings: 0,
    suspiciousActivities: 0
  });
  const [selectedLog, setSelectedLog] = useState(null);
  const [showLogDetails, setShowLogDetails] = useState(false);

  // Mock data - In a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    const mockLogs = Array.from({ length: 50 }, (_, i) => {
      const types = ['authentication', 'data_access', 'user_management', 'system', 'api_call'];
      const severities = ['critical', 'high', 'medium', 'low'];
      const statuses = ['resolved', 'pending', 'investigating', 'false_positive'];
      const users = ['admin', 'doctor1', 'nurse1', 'receptionist1', 'lab_technician'];
      const actions = [
        'Failed login attempt',
        'Data export initiated',
        'User role changed',
        'Sensitive data accessed',
        'Password changed',
        'Login successful',
        'Permission modified',
        'API rate limit exceeded',
        'Suspicious IP address',
        'Account locked'
      ];
      
      const logType = types[Math.floor(Math.random() * types.length)];
      const severity = severities[Math.floor(Math.random() * severities.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const user = users[Math.floor(Math.random() * users.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      
      const now = new Date();
      const randomDaysAgo = Math.floor(Math.random() * 30);
      const timestamp = new Date(now.setDate(now.getDate() - randomDaysAgo));
      
      return {
        id: `LOG-${1000 + i}`,
        type: logType,
        severity,
        status,
        user,
        action,
        ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        timestamp: timestamp.toISOString(),
        details: `This is a detailed description of the security event. It includes information about what happened, which resources were affected, and potential impact. The severity level is ${severity} and requires ${status === 'resolved' ? 'no further action' : 'attention'}.`,
        source: Math.random() > 0.5 ? 'web_application' : 'mobile_app',
        device: Math.random() > 0.7 ? 'mobile' : 'desktop',
        location: `${['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'][Math.floor(Math.random() * 5)]}, India`,
        sessionId: `sess_${Math.random().toString(36).substr(2, 10)}`
      };
    });

    setLogs(mockLogs);
    
    // Calculate stats
    setStats({
      totalLogs: mockLogs.length,
      critical: mockLogs.filter(log => log.severity === 'critical').length,
      warnings: mockLogs.filter(log => log.severity === 'high' || log.severity === 'medium').length,
      suspiciousActivities: mockLogs.filter(log => log.status === 'investigating').length
    });
    
    setLoading(false);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      logType: '',
      severity: '',
      dateRange: '7days',
      status: ''
    });
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.includes(searchTerm);
    
    const matchesFilters = 
      (filters.logType === '' || log.type === filters.logType) &&
      (filters.severity === '' || log.severity === filters.severity) &&
      (filters.status === '' || log.status === filters.status);
    
    // Filter by date range
    const logDate = new Date(log.timestamp);
    const now = new Date();
    let dateMatched = true;
    
    if (filters.dateRange === 'today') {
      const today = new Date(now.setHours(0, 0, 0, 0));
      dateMatched = logDate >= today;
    } else if (filters.dateRange === '7days') {
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      dateMatched = logDate >= sevenDaysAgo;
    } else if (filters.dateRange === '30days') {
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      dateMatched = logDate >= thirtyDaysAgo;
    }
    
    return matchesSearch && matchesFilters && dateMatched;
  });

  const viewLogDetails = (log) => {
    setSelectedLog(log);
    setShowLogDetails(true);
  };

  const closeLogDetails = () => {
    setShowLogDetails(false);
    setTimeout(() => setSelectedLog(null), 300); // Wait for animation to complete
  };

  const exportLogs = () => {
    // In a real app, this would generate and download a CSV/PDF report
    alert('Exporting security logs...');
  };

  const refreshLogs = () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => setLoading(false), 1000);
  };

  const getSeverityBadge = (severity) => {
    const severityMap = {
      critical: { label: 'Critical', color: '#e74a3b', icon: <AlertTriangle size={14} /> },
      high: { label: 'High', color: '#f6c23e', icon: <AlertTriangle size={14} /> },
      medium: { label: 'Medium', color: '#f6c23e', icon: <AlertTriangle size={14} /> },
      low: { label: 'Low', color: '#36b9cc', icon: <AlertTriangle size={14} /> }
    };
    
    const { label, color, icon } = severityMap[severity] || { label: 'Unknown', color: '#6c757d' };
    
    return (
      <span className="severity-badge" style={{ backgroundColor: `${color}20`, color, borderColor: color }}>
        {icon}
        {label}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      resolved: { label: 'Resolved', color: '#1cc88a', icon: <CheckCircle size={14} /> },
      pending: { label: 'Pending', color: '#f6c23e', icon: <Clock size={14} /> },
      investigating: { label: 'Investigating', color: '#4e73df', icon: <Eye size={14} /> },
      false_positive: { label: 'False Positive', color: '#6c757d', icon: <FileText size={14} /> }
    };
    
    const { label, color, icon } = statusMap[status] || { label: 'Unknown', color: '#6c757d' };
    
    return (
      <span className="status-badge" style={{ backgroundColor: `${color}20`, color, borderColor: color }}>
        {icon}
        {label}
      </span>
    );
  };

  const getTypeLabel = (type) => {
    const typeMap = {
      authentication: 'Authentication',
      data_access: 'Data Access',
      user_management: 'User Management',
      system: 'System',
      api_call: 'API Call'
    };
    
    return typeMap[type] || type;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading security logs...</p>
      </div>
    );
  }

  return (
    <div className="security-logs">
      <div className="page-header">
        <h1>
          <Shield size={24} className="header-icon" />
          Security & Audit Logs
        </h1>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={refreshLogs} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spinning' : ''} />
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button className="btn btn-primary" onClick={exportLogs}>
            <Download size={16} /> Export Logs
          </button>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon total">
            <FileText size={24} />
          </div>
          <div className="stat-details">
            <h3>{stats.totalLogs.toLocaleString()}</h3>
            <p>Total Logs</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon critical">
            <AlertOctagon size={24} />
          </div>
          <div className="stat-details">
            <h3>{stats.critical}</h3>
            <p>Critical Alerts</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-details">
            <h3>{stats.warnings}</h3>
            <p>Warnings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon investigating">
            <Eye size={24} />
          </div>
          <div className="stat-details">
            <h3>{stats.suspiciousActivities}</h3>
            <p>Under Investigation</p>
          </div>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by log ID, user, action, or IP..."
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
              <div className="filter-row">
                <div className="filter-group">
                  <label>Log Type</label>
                  <select name="logType" value={filters.logType} onChange={handleFilterChange}>
                    <option value="">All Types</option>
                    <option value="authentication">Authentication</option>
                    <option value="data_access">Data Access</option>
                    <option value="user_management">User Management</option>
                    <option value="system">System</option>
                    <option value="api_call">API Calls</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Severity</label>
                  <select name="severity" value={filters.severity} onChange={handleFilterChange}>
                    <option value="">All Severities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Status</label>
                  <select name="status" value={filters.status} onChange={handleFilterChange}>
                    <option value="">All Statuses</option>
                    <option value="resolved">Resolved</option>
                    <option value="pending">Pending</option>
                    <option value="investigating">Investigating</option>
                    <option value="false_positive">False Positive</option>
                  </select>
                </div>
              </div>
              
              <div className="filter-row">
                <div className="filter-group">
                  <label>Date Range</label>
                  <select name="dateRange" value={filters.dateRange} onChange={handleFilterChange}>
                    <option value="today">Today</option>
                    <option value="7days">Last 7 days</option>
                    <option value="30days">Last 30 days</option>
                    <option value="all">All Time</option>
                  </select>
                </div>
                
                <div className="filter-actions">
                  <button className="btn btn-link" onClick={clearFilters}>
                    Clear All
                  </button>
                  <button className="btn btn-primary" onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="logs-table-container">
        <div className="table-responsive">
          <table className="logs-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Type</th>
                <th>Severity</th>
                <th>User</th>
                <th>Action</th>
                <th>IP Address</th>
                <th>Timestamp</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map(log => (
                  <tr key={log.id} className={`log-row severity-${log.severity}`}>
                    <td className="log-id">{log.id}</td>
                    <td className="log-type">{getTypeLabel(log.type)}</td>
                    <td className="log-severity">{getSeverityBadge(log.severity)}</td>
                    <td className="log-user">
                      <div className="user-info">
                        <User size={16} />
                        <span>{log.user}</span>
                      </div>
                    </td>
                    <td className="log-action">{log.action}</td>
                    <td className="log-ip">{log.ip}</td>
                    <td className="log-timestamp">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="log-status">
                      {getStatusBadge(log.status)}
                    </td>
                    <td className="log-actions">
                      <button 
                        className="btn-icon" 
                        title="View Details"
                        onClick={() => viewLogDetails(log)}
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-results">
                    No security logs found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination">
        <button className="btn btn-outline" disabled>Previous</button>
        <div className="page-numbers">
          <span className="active">1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>5</span>
        </div>
        <button className="btn btn-outline">Next</button>
      </div>

      {/* Log Details Modal */}
      {selectedLog && (
        <div className={`modal-overlay ${showLogDetails ? 'show' : ''}`} onClick={closeLogDetails}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Security Log Details</h2>
              <button className="btn-icon close-btn" onClick={closeLogDetails}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="log-details-grid">
                <div className="detail-group">
                  <label>Log ID</label>
                  <p>{selectedLog.id}</p>
                </div>
                
                <div className="detail-group">
                  <label>Timestamp</label>
                  <p>{new Date(selectedLog.timestamp).toLocaleString()}</p>
                </div>
                
                <div className="detail-group">
                  <label>Severity</label>
                  <div>
                    {getSeverityBadge(selectedLog.severity)}
                  </div>
                </div>
                
                <div className="detail-group">
                  <label>Status</label>
                  <div>
                    {getStatusBadge(selectedLog.status)}
                  </div>
                </div>
                
                <div className="detail-group">
                  <label>User</label>
                  <p>
                    <User size={16} className="inline-icon" />
                    {selectedLog.user}
                  </p>
                </div>
                
                <div className="detail-group">
                  <label>IP Address</label>
                  <p>{selectedLog.ip}</p>
                </div>
                
                <div className="detail-group">
                  <label>Location</label>
                  <p>
                    <MapPin size={16} className="inline-icon" />
                    {selectedLog.location}
                  </p>
                </div>
                
                <div className="detail-group">
                  <label>Source</label>
                  <p>{selectedLog.source.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                </div>
                
                <div className="detail-group full-width">
                  <label>Action</label>
                  <p className="action-text">{selectedLog.action}</p>
                </div>
                
                <div className="detail-group full-width">
                  <label>Details</label>
                  <div className="details-box">
                    <p>{selectedLog.details}</p>
                    
                    <div className="metadata">
                      <div className="metadata-item">
                        <span className="metadata-label">Session ID:</span>
                        <span className="metadata-value">{selectedLog.sessionId}</span>
                      </div>
                      <div className="metadata-item">
                        <span className="metadata-label">Device:</span>
                        <span className="metadata-value">
                          {selectedLog.device === 'mobile' ? 'Mobile' : 'Desktop'}
                        </span>
                      </div>
                      <div className="metadata-item">
                        <span className="metadata-label">User Agent:</span>
                        <span className="metadata-value">
                          {selectedLog.device === 'mobile' 
                            ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
                            : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="action-buttons">
                <button className="btn btn-outline" onClick={closeLogDetails}>
                  Close
                </button>
                {selectedLog.status !== 'resolved' && (
                  <button className="btn btn-primary">
                    <CheckCircle size={16} /> Mark as Resolved
                  </button>
                )}
                <button className="btn btn-secondary">
                  <ExternalLink size={16} /> View Full Audit Trail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityLogs;
