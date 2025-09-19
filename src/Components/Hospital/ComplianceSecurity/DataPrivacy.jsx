import React, { useState, useEffect } from 'react';
import { Shield, Search, Filter, Download, AlertCircle, CheckCircle, XCircle, ChevronDown, ChevronLeft, ChevronRight, RefreshCw, Eye } from 'lucide-react';
import { Bar, Pie } from 'react-chartjs-2';
import '../../../assets/css/data-privacy.css';

const DataPrivacy = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: '30days',
    department: 'all'
  });
  const [dataBreaches, setDataBreaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for data privacy
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true);
      // Mock data
      const mockData = [
        { id: 1, type: 'Personal Data Access', status: 'resolved', date: '2024-09-15', user: 'Dr. Smith', department: 'Cardiology' },
        { id: 2, type: 'Unauthorized Access', status: 'investigating', date: '2024-09-18', user: 'Nurse Johnson', department: 'Emergency' },
        { id: 3, type: 'Data Export', status: 'pending', date: '2024-09-17', user: 'Admin', department: 'Administration' },
        { id: 4, type: 'Record Modification', status: 'pending', date: '2024-09-18', user: 'Dr. Williams', department: 'Neurology' },
        { id: 5, type: 'Login Attempt', status: 'resolved', date: '2024-09-16', user: 'Dr. Brown', department: 'Pediatrics' },
      ];
      setDataBreaches(mockData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Chart data
  const chartData = {
    labels: ['Resolved', 'Investigating', 'Pending', 'Critical'],
    datasets: [
      {
        data: [12, 5, 8, 3],
        backgroundColor: ['#10B981', '#F59E0B', '#3B82F6', '#EF4444'],
      },
    ],
  };

  const departmentData = {
    labels: ['Cardiology', 'Emergency', 'Neurology', 'Pediatrics', 'Administration'],
    datasets: [
      {
        label: 'Privacy Incidents by Department',
        data: [12, 19, 3, 5, 7],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleExport = (format) => {
    // Implement export functionality
    console.log(`Exporting data as ${format}`);
    // Actual implementation would generate and download the file
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return <span className="badge success"><CheckCircle size={14} /> Resolved</span>;
      case 'investigating':
        return <span className="badge warning"><AlertCircle size={14} /> Investigating</span>;
      case 'pending':
        return <span className="badge info"><AlertCircle size={14} /> Pending</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="data-privacy-container">
      <div className="page-header">
        <div className="header-content">
          <h1><Shield size={24} /> Data Privacy Dashboard</h1>
          <p>Monitor and manage data privacy incidents and compliance status</p>
        </div>
        <div className="header-actions">
          <button className="btn primary" onClick={() => handleExport('pdf')}>
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">Resolved Incidents</div>
          <div className="stat-trend positive">↓ 15% from last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">5</div>
          <div className="stat-label">Active Investigations</div>
          <div className="stat-trend negative">↑ 25% from last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">98%</div>
          <div className="stat-label">Compliance Score</div>
          <div className="stat-trend positive">↑ 2% from last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">3</div>
          <div className="stat-label">Critical Alerts</div>
          <div className="stat-trend negative">↑ 1 new today</div>
        </div>
      </div>

      <div className="filters-container">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search incidents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Status</label>
          <select 
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="resolved">Resolved</option>
            <option value="investigating">Investigating</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Date Range</label>
          <select 
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">This year</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Department</label>
          <select 
            value={filters.department}
            onChange={(e) => handleFilterChange('department', e.target.value)}
          >
            <option value="all">All Departments</option>
            <option value="cardiology">Cardiology</option>
            <option value="emergency">Emergency</option>
            <option value="neurology">Neurology</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="administration">Administration</option>
          </select>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Incident Status Overview</h3>
          <div className="chart-wrapper">
            <Pie 
              data={chartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="chart-card">
          <h3>Incidents by Department</h3>
          <div className="chart-wrapper">
            <Bar 
              data={departmentData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="incidents-table">
        <div className="table-header">
          <h3>Recent Privacy Incidents</h3>
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
                <th>ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>User</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="loading-text">Loading data...</td>
                </tr>
              ) : (
                dataBreaches.map((incident) => (
                  <tr key={incident.id}>
                    <td>#{incident.id}</td>
                    <td>{incident.type}</td>
                    <td>{getStatusBadge(incident.status)}</td>
                    <td>{incident.date}</td>
                    <td>{incident.user}</td>
                    <td>{incident.department}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon" title="View Details">
                          <Eye size={16} />
                        </button>
                        <button className="btn-icon" title="Resolve">
                          <CheckCircle size={16} />
                        </button>
                        <button className="btn-icon danger" title="Escalate">
                          <AlertCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="pagination-info">
            Showing 1 to 5 of 24 entries
          </div>
          <div className="pagination-controls">
            <button className="btn-icon" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="btn-icon active">1</button>
            <button className="btn-icon">2</button>
            <button className="btn-icon">3</button>
            <button className="btn-icon">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPrivacy;
