import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Download, User, Clock, Eye, FileText, Activity, ChevronDown, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import '../../../assets/css/audit-logs.css';

const AuditLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    action: 'all',
    userType: 'all',
    dateRange: '7days',
    status: 'all'
  });
  const [auditLogs, setAuditLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedLogs, setExpandedLogs] = useState({});

  // Mock data for audit logs
  useEffect(() => {
    const fetchAuditLogs = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockLogs = [
          {
            id: 'AUD-2023-001',
            timestamp: '2024-09-18T14:32:45Z',
            action: 'login',
            status: 'success',
            user: {
              id: 'USR-001',
              name: 'Dr. Sarah Johnson',
              role: 'Doctor',
              department: 'Cardiology'
            },
            ipAddress: '192.168.1.45',
            device: 'Windows 10, Chrome 115.0',
            details: 'User successfully logged in from new device',
            changes: []
          },
          {
            id: 'AUD-2023-002',
            timestamp: '2024-09-18T13:15:22Z',
            action: 'record_access',
            status: 'success',
            user: {
              id: 'USR-045',
              name: 'Nurse Michael Chen',
              role: 'Nurse',
              department: 'Emergency'
            },
            ipAddress: '10.0.0.78',
            device: 'iOS 16.5, Safari',
            details: 'Accessed patient record #PT-78945',
            changes: [
              { field: 'Patient Record', oldValue: null, newValue: 'Accessed' }
            ]
          },
          {
            id: 'AUD-2023-003',
            timestamp: '2024-09-18T11:42:18Z',
            action: 'record_update',
            status: 'success',
            user: {
              id: 'USR-012',
              name: 'Dr. Robert Davis',
              role: 'Doctor',
              department: 'Neurology'
            },
            ipAddress: '192.168.2.134',
            device: 'macOS 13.4, Chrome 115.0',
            details: 'Updated treatment plan for patient #PT-67890',
            changes: [
              { field: 'Medication', oldValue: 'Aspirin 100mg', newValue: 'Ibuprofen 200mg' },
              { field: 'Dosage', oldValue: 'Once daily', newValue: 'Twice daily' },
              { field: 'Notes', oldValue: 'Monitor blood pressure', newValue: 'Monitor blood pressure and liver function' }
            ]
          },
          {
            id: 'AUD-2023-004',
            timestamp: '2024-09-18T09:25:37Z',
            action: 'login',
            status: 'failed',
            user: {
              id: 'USR-078',
              name: 'Dr. Emily Wilson',
              role: 'Doctor',
              department: 'Pediatrics'
            },
            ipAddress: '203.0.113.42',
            device: 'Windows 11, Edge 115.0',
            details: 'Failed login attempt - incorrect password',
            changes: []
          },
          {
            id: 'AUD-2023-005',
            timestamp: '2024-09-17T16:48:12Z',
            action: 'data_export',
            status: 'success',
            user: {
              id: 'ADM-001',
              name: 'Admin User',
              role: 'Administrator',
              department: 'IT'
            },
            ipAddress: '10.0.0.5',
            device: 'Windows 10, Firefox 116.0',
            details: 'Exported patient records for Q3 2024 analysis',
            changes: [
              { field: 'Export Type', oldValue: null, newValue: 'Patient Records' },
              { field: 'Date Range', oldValue: null, newValue: '2024-07-01 to 2024-09-30' },
              { field: 'Records Exported', oldValue: null, newValue: '1,245 records' }
            ]
          }
        ];
        setAuditLogs(mockLogs);
        setIsLoading(false);
      }, 1000);
    };

    fetchAuditLogs();
  }, []);

  // Chart data for activity trends
  const activityData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Login Attempts',
        data: [5, 12, 45, 32, 28, 18],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Record Access',
        data: [2, 8, 32, 45, 38, 15],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Data Modifications',
        data: [1, 5, 18, 25, 22, 8],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  // Action type distribution data
  const actionDistribution = {
    login: 124,
    record_access: 342,
    record_update: 187,
    data_export: 23,
    user_management: 45,
    system_config: 12
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const toggleLogDetails = (logId) => {
    setExpandedLogs(prev => ({
      ...prev,
      [logId]: !prev[logId]
    }));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      success: { color: 'bg-green-100 text-green-800', icon: '✓' },
      failed: { color: 'bg-red-100 text-red-800', icon: '✗' },
      warning: { color: 'bg-yellow-100 text-yellow-800', icon: '!' },
      info: { color: 'bg-blue-100 text-blue-800', icon: 'i' }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', icon: '?' };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon} {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getActionIcon = (action) => {
    const icons = {
      login: <User size={16} className="text-blue-500" />,
      record_access: <Eye size={16} className="text-green-500" />,
      record_update: <FileText size={16} className="text-purple-500" />,
      data_export: <Download size={16} className="text-amber-500" />,
      user_management: <User size={16} className="text-cyan-500" />,
      system_config: <Activity size={16} className="text-pink-500" />
    };
    
    return icons[action] || <Activity size={16} className="text-gray-500" />;
  };

  const formatActionText = (action) => {
    const actionMap = {
      login: 'Login',
      record_access: 'Record Access',
      record_update: 'Record Update',
      data_export: 'Data Export',
      user_management: 'User Management',
      system_config: 'System Configuration'
    };
    
    return actionMap[action] || action.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="audit-logs-container">
      <div className="page-header">
        <div className="header-content">
          <h1><Activity size={24} className="text-indigo-600" /> Audit Logs</h1>
          <p>Monitor and review all system activities and user actions</p>
        </div>
        <div className="header-actions">
          <button className="btn primary">
            <Download size={16} className="mr-2" /> Export Logs
          </button>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">1,245</div>
          <div className="stat-label">Total Events (24h)</div>
          <div className="stat-trend positive">↓ 8% from yesterday</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">98.7%</div>
          <div className="stat-label">Success Rate</div>
          <div className="stat-trend positive">↑ 0.5% from yesterday</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">16</div>
          <div className="stat-label">Failed Logins</div>
          <div className="stat-trend negative">↑ 3 from yesterday</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">342</div>
          <div className="stat-label">Record Accesses</div>
          <div className="stat-trend positive">↓ 12% from yesterday</div>
        </div>
      </div>

      <div className="filters-container">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Action Type</label>
          <select 
            value={filters.action}
            onChange={(e) => handleFilterChange('action', e.target.value)}
          >
            <option value="all">All Actions</option>
            <option value="login">Login Attempts</option>
            <option value="record_access">Record Access</option>
            <option value="record_update">Record Updates</option>
            <option value="data_export">Data Exports</option>
            <option value="user_management">User Management</option>
          </select>
        </div>
        <div className="filter-group">
          <label>User Type</label>
          <select 
            value={filters.userType}
            onChange={(e) => handleFilterChange('userType', e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="doctor">Doctors</option>
            <option value="nurse">Nurses</option>
            <option value="admin">Administrators</option>
            <option value="other">Other Staff</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Date Range</label>
          <select 
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
          >
            <option value="1h">Last Hour</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Status</label>
          <select 
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="warning">Warning</option>
          </select>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Activity Trends (Today)</h3>
          <div className="chart-wrapper">
            <Line 
              data={activityData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                  intersect: false,
                  mode: 'index',
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      precision: 0
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="action-distribution">
          <h3>Action Distribution (24h)</h3>
          <div className="distribution-list">
            {Object.entries(actionDistribution).map(([action, count]) => (
              <div key={action} className="distribution-item">
                <div className="action-info">
                  <span className="action-icon">{getActionIcon(action)}</span>
                  <span className="action-name">{formatActionText(action)}</span>
                </div>
                <div className="action-count">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="logs-table">
        <div className="table-header">
          <h3>Recent Activities</h3>
          <div className="table-actions">
            <button className="btn icon" title="Refresh">
              <RefreshCw size={16} />
            </button>
            <button className="btn icon" title="Filter">
              <Filter size={16} />
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Action</th>
                <th>User</th>
                <th>Details</th>
                <th>Status</th>
                <th>IP Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="loading-text">
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                      <span className="ml-2">Loading audit logs...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <React.Fragment key={log.id}>
                    <tr className="log-entry" onClick={() => toggleLogDetails(log.id)}>
                      <td>
                        <div className="flex items-center">
                          <div className="log-time">
                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="log-date">
                            {new Date(log.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center">
                          <span className="mr-2">{getActionIcon(log.action)}</span>
                          {formatActionText(log.action)}
                        </div>
                      </td>
                      <td>
                        <div className="user-info">
                          <div className="font-medium">{log.user.name}</div>
                          <div className="text-xs text-gray-500">{log.user.role}</div>
                        </div>
                      </td>
                      <td className="truncate max-w-xs">{log.details}</td>
                      <td>{getStatusBadge(log.status)}</td>
                      <td>{log.ipAddress}</td>
                      <td>
                        <button 
                          className={`expand-btn ${expandedLogs[log.id] ? 'expanded' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLogDetails(log.id);
                          }}
                        >
                          <ChevronDown size={16} />
                        </button>
                      </td>
                    </tr>
                    {expandedLogs[log.id] && (
                      <tr className="log-details">
                        <td colSpan="7">
                          <div className="details-container">
                            <div className="detail-section">
                              <h4>Details</h4>
                              <p>{log.details}</p>
                            </div>
                            
                            <div className="detail-section">
                              <h4>Device Information</h4>
                              <p>{log.device}</p>
                            </div>
                            
                            {log.changes && log.changes.length > 0 && (
                              <div className="detail-section">
                                <h4>Changes</h4>
                                <div className="changes-grid">
                                  <div className="change-header">Field</div>
                                  <div className="change-header">Old Value</div>
                                  <div className="change-header">New Value</div>
                                  
                                  {log.changes.map((change, index) => (
                                    <React.Fragment key={index}>
                                      <div className="change-field">{change.field}</div>
                                      <div className="change-old">
                                        {change.oldValue || <span className="text-gray-400">(empty)</span>}
                                      </div>
                                      <div className="change-new">
                                        {change.newValue || <span className="text-gray-400">(empty)</span>}
                                      </div>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="detail-actions">
                              <button className="btn small">
                                <Eye size={14} className="mr-1" /> View Full Details
                              </button>
                              <button className="btn small outline">
                                <Download size={14} className="mr-1" /> Export Entry
                              </button>
                              {log.status === 'failed' && (
                                <button className="btn small danger">
                                  <AlertCircle size={14} className="mr-1" /> Report Issue
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="table-footer">
          <div className="pagination-info">
            Showing 1 to 5 of 1,245 entries
          </div>
          <div className="pagination-controls">
            <button className="btn-icon" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="btn-icon active">1</button>
            <button className="btn-icon">2</button>
            <button className="btn-icon">3</button>
            <span className="px-2">...</span>
            <button className="btn-icon">25</button>
            <button className="btn-icon">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
