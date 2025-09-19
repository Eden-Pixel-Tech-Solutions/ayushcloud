import React, { useState } from 'react';
import { Activity, BarChart2, LineChart as LineChartIcon, PieChart, Download, Users, Clock, TrendingUp, Search, Filter } from 'lucide-react';
import PageHeader from '../Common/PageHeader';
import '../../assets/css/performance-monitoring.css';

const PerformanceMonitoring = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [activeMetric, setActiveMetric] = useState('all');
  
  // Sample data - in a real app, this would come from an API
  const metrics = [
    { id: 'all', label: 'All Metrics', icon: Activity },
    { id: 'patients', label: 'Patient Volume', icon: Users },
    { id: 'waiting', label: 'Waiting Time', icon: Clock },
    { id: 'admissions', label: 'Admissions', icon: TrendingUp },
  ];

  // Sample hospital performance data
  const hospitals = [
    {
      id: 'HSP-1001',
      name: 'City General Hospital',
      patientSatisfaction: 92,
      avgWaitTime: 35,
      readmissionRate: 8.2,
      bedOccupancy: 78,
      trend: 'up',
      trendValue: 5.2
    },
    // Add more sample data as needed
  ];

  // Sample chart data
  const patientVolumeData = [
    { month: 'Jan', patients: 1200 },
    { month: 'Feb', patients: 1900 },
    { month: 'Mar', patients: 1500 },
    { month: 'Apr', patients: 1800 },
    { month: 'May', patients: 2100 },
    { month: 'Jun', patients: 2300 },
  ];

  const renderChart = () => {
    switch(activeMetric) {
      case 'patients':
        return <BarChart data={patientVolumeData} title="Patient Volume" />;
      case 'waiting':
        return <LineChartComponent data={[]} title="Average Waiting Time" />;
      case 'admissions':
        return <PieChartComponent data={[]} title="Admission Types" />;
      default:
        return (
          <div className="metrics-grid">
            <MetricCard 
              title="Patient Satisfaction"
              value="92%"
              change="+2.5%"
              isPositive={true}
              icon={<Users size={20} />}
            />
            <MetricCard 
              title="Avg. Waiting Time"
              value="35 min"
              change="-5 min"
              isPositive={true}
              icon={<Clock size={20} />}
            />
            <MetricCard 
              title="Readmission Rate"
              value="8.2%"
              change="-1.2%"
              isPositive={true}
              icon={<TrendingUp size={20} />}
            />
            <MetricCard 
              title="Bed Occupancy"
              value="78%"
              change="+3.5%"
              isPositive={false}
              icon={<Activity size={20} />}
            />
          </div>
        );
    }
  };

  return (
    <div className="performance-monitoring">
      <PageHeader
        title="Performance Monitoring"
        subtitle="Track and analyze hospital performance metrics"
        breadcrumbs={['Analytics', 'Performance']}
        actions={[
          {
            label: 'Export Report',
            icon: Download,
            primary: true,
            onClick: () => console.log('Export Report clicked')
          }
        ]}
      />
      
      <div className="filters">
        <div className="time-range-selector">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-select"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
        
        <div className="metrics-tabs">
          {metrics.map(metric => (
            <button
              key={metric.id}
              className={`metric-tab ${activeMetric === metric.id ? 'active' : ''}`}
              onClick={() => setActiveMetric(metric.id)}
            >
              <metric.icon size={16} />
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      <div className="search-filter">
        <div className="search-box">
          <Search size={16} />
          <input type="text" placeholder="Search hospitals..." />
        </div>
        <button className="btn secondary">
          <Filter size={16} /> Filter
        </button>
      </div>

      <div className="chart-container">
        {renderChart()}
      </div>

      <div className="hospitals-table">
        <div className="table-header">
          <h3>Hospital Performance</h3>
          <div className="table-actions">
            <select>
              <option>Sort by Performance</option>
              <option>Sort by Name</option>
              <option>Sort by Patient Volume</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Hospital Name</th>
              <th>Patient Satisfaction</th>
              <th>Avg. Wait Time</th>
              <th>Readmission Rate</th>
              <th>Bed Occupancy</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map(hospital => (
              <tr key={hospital.id}>
                <td className="hospital-name">
                  <div className="hospital-info">
                    <div className="name">{hospital.name}</div>
                    <div className="id">{hospital.id}</div>
                  </div>
                </td>
                <td>
                  <div className="metric-value">
                    {hospital.patientSatisfaction}%
                    <span className={`trend ${hospital.trend} ${hospital.trend === 'up' ? 'positive' : 'negative'}`}>
                      {hospital.trend === 'up' ? '↑' : '↓'} {hospital.trendValue}%
                    </span>
                  </div>
                </td>
                <td>{hospital.avgWaitTime} min</td>
                <td>{hospital.readmissionRate}%</td>
                <td>
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ width: `${hospital.bedOccupancy}%` }}
                    ></div>
                    <span>{hospital.bedOccupancy}%</span>
                  </div>
                </td>
                <td>
                  <button className="btn-text">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper components
const MetricCard = ({ title, value, change, isPositive, icon }) => (
  <div className="metric-card">
    <div className="metric-icon">
      {icon}
    </div>
    <div className="metric-content">
      <h3>{value}</h3>
      <p>{title}</p>
      <span className={`change ${isPositive ? 'positive' : 'negative'}`}>
        {change} {isPositive ? '↑' : '↓'}
      </span>
    </div>
  </div>
);

const BarChart = ({ title }) => (
  <div className="chart">
    <h3>{title}</h3>
    <div className="chart-placeholder">
      <BarChart2 size={48} />
      <p>Bar chart showing {title.toLowerCase()}</p>
    </div>
  </div>
);

const LineChartComponent = ({ title }) => (
  <div className="chart">
    <h3>{title}</h3>
    <div className="chart-placeholder">
      <LineChartIcon size={48} />
      <p>Line chart showing {title.toLowerCase()}</p>
    </div>
  </div>
);

const PieChartComponent = ({ title }) => (
  <div className="chart">
    <h3>{title}</h3>
    <div className="chart-placeholder">
      <PieChart size={48} />
      <p>Pie chart showing {title.toLowerCase()}</p>
    </div>
  </div>
);

export default PerformanceMonitoring;
