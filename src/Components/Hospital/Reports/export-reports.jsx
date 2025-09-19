import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FilePieChart, Filter, Search, RefreshCw } from 'lucide-react';
import '../../../assets/css/export-reports.css';

const ExportReports = () => {
  const [selectedReports, setSelectedReports] = useState([]);
  const [format, setFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    department: 'all',
    reportType: 'all'
  });

  // Sample reports data
  const availableReports = [
    { id: 'patient-census', title: 'Patient Census', type: 'census', department: 'all' },
    { id: 'admissions', title: 'Admissions Report', type: 'admissions', department: 'all' },
    { id: 'discharges', title: 'Discharges Summary', type: 'discharges', department: 'all' },
    { id: 'financial', title: 'Financial Report', type: 'financial', department: 'finance' },
    { id: 'medication', title: 'Medication Usage', type: 'pharmacy', department: 'pharmacy' },
    { id: 'lab-results', title: 'Laboratory Results', type: 'laboratory', department: 'lab' },
    { id: 'surgical', title: 'Surgical Procedures', type: 'surgery', department: 'surgery' },
    { id: 'infection-control', title: 'Infection Control', type: 'quality', department: 'quality' }
  ];

  const toggleReport = (reportId) => {
    setSelectedReports(prev => 
      prev.includes(reportId)
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const selectAllReports = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(filteredReports.map(report => report.id));
    }
  };

  const handleExport = () => {
    if (selectedReports.length === 0) return;
    
    setIsExporting(true);
    
    // Simulate export
    setTimeout(() => {
      setIsExporting(false);
      alert(`Exported ${selectedReports.length} report(s) in ${format.toUpperCase()} format`);
      setSelectedReports([]);
    }, 1500);
  };

  const filteredReports = availableReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filters.department === 'all' || report.department === filters.department;
    const matchesType = filters.reportType === 'all' || report.type === filters.reportType;
    
    return matchesSearch && matchesDepartment && matchesType;
  });

  return (
    <div className="export-reports-container">
      <div className="export-header">
        <h1>Export Reports</h1>
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="export-controls">
        <div className="filter-group">
          <label>Department:</label>
          <select 
            value={filters.department}
            onChange={(e) => setFilters({...filters, department: e.target.value})}
          >
            <option value="all">All Departments</option>
            <option value="emergency">Emergency</option>
            <option value="surgery">Surgery</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="lab">Laboratory</option>
            <option value="finance">Finance</option>
            <option value="quality">Quality</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Report Type:</label>
          <select 
            value={filters.reportType}
            onChange={(e) => setFilters({...filters, reportType: e.target.value})}
          >
            <option value="all">All Types</option>
            <option value="census">Census</option>
            <option value="admissions">Admissions</option>
            <option value="discharges">Discharges</option>
            <option value="financial">Financial</option>
            <option value="pharmacy">Pharmacy</option>
          </select>
        </div>

        <div className="format-selector">
          <label>Format:</label>
          <div className="format-buttons">
            {['pdf', 'excel', 'csv'].map((fmt) => (
              <button
                key={fmt}
                className={`format-btn ${format === fmt ? 'active' : ''}`}
                onClick={() => setFormat(fmt)}
              >
                {fmt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button 
          className="export-btn"
          onClick={handleExport}
          disabled={selectedReports.length === 0 || isExporting}
        >
          {isExporting ? (
            <>
              <RefreshCw className="spinner" size={16} />
              Exporting...
            </>
          ) : (
            <>
              <Download size={16} />
              Export ({selectedReports.length})
            </>
          )}
        </button>
      </div>

      <div className="reports-list">
        <div className="reports-list-header">
          <div className="select-all">
            <input 
              type="checkbox" 
              id="select-all"
              checked={selectedReports.length > 0 && selectedReports.length === filteredReports.length}
              onChange={selectAllReports}
            />
            <label htmlFor="select-all">Select All</label>
          </div>
          <div className="report-count">
            {filteredReports.length} report(s) found
          </div>
        </div>

        <div className="reports-grid">
          {filteredReports.map(report => (
            <div 
              key={report.id} 
              className={`report-card ${selectedReports.includes(report.id) ? 'selected' : ''}`}
              onClick={() => toggleReport(report.id)}
            >
              <div className="report-checkbox">
                <input 
                  type="checkbox" 
                  id={`report-${report.id}`}
                  checked={selectedReports.includes(report.id)}
                  onChange={() => {}}
                  onClick={(e) => e.stopPropagation()}
                />
                <label htmlFor={`report-${report.id}`}></label>
              </div>
              <div className="report-icon">
                <FileText size={24} />
              </div>
              <div className="report-details">
                <h3>{report.title}</h3>
                <p>{report.type} • {report.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportReports;
