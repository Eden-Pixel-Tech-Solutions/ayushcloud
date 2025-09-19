import React, { useState } from 'react';
import { 
  BarChart2, 
  LineChart, 
  PieChart, 
  Download, 
  Filter, 
  Calendar, 
  Users, 
  Clock, 
  Activity, 
  TrendingUp,
  Award,
  Star,
  ChevronDown,
  Search
} from 'lucide-react';
import PageHeader from '../Common/PageHeader';
import '../../assets/css/doctor-analytics.css';

const DoctorAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [activeMetric, setActiveMetric] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    specialization: 'all',
    experience: 'all',
    location: 'all',
    rating: 'all'
  });

  // Sample data
  const metrics = [
    { 
      id: 'all', 
      label: 'Overview', 
      icon: Activity,
      color: '#4e73df'
    },
    { 
      id: 'patients', 
      label: 'Patient Volume', 
      icon: Users,
      color: '#1cc88a'
    },
    { 
      id: 'waiting', 
      label: 'Waiting Time', 
      icon: Clock,
      color: '#f6c23e'
    },
    { 
      id: 'satisfaction', 
      label: 'Satisfaction', 
      icon: Star,
      color: '#e74a3b'
    },
    { 
      id: 'admissions', 
      label: 'Admissions', 
      icon: TrendingUp,
      color: '#36b9cc'
    }
  ];

  const specializations = [
    'All Specializations',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'Gastroenterology',
    'Oncology'
  ];

  const locations = [
    'All Locations',
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune'
  ];

  // Dummy data for charts
  const monthlyPatientData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Patients',
      data: [120, 190, 150, 210, 180, 250],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const performanceData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Performance',
      data: [85, 78, 92, 88],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const specializationData = {
    labels: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'General'],
    datasets: [{
      data: [25, 20, 30, 15, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  };

  const satisfactionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Satisfaction Score',
        data: [4.2, 4.5, 4.3, 4.7, 4.8, 4.9],
        borderColor: 'rgba(231, 74, 59, 1)',
        backgroundColor: 'rgba(231, 74, 59, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  const waitingTimeData = {
    labels: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology'],
    datasets: [
      {
        label: 'Average Waiting Time (min)',
        data: [45, 30, 25, 35, 20],
        backgroundColor: [
          'rgba(246, 194, 62, 0.8)',
          'rgba(54, 185, 204, 0.8)',
          'rgba(78, 115, 223, 0.8)',
          'rgba(28, 200, 138, 0.8)',
          'rgba(155, 89, 182, 0.8)'
        ],
        borderColor: [
          'rgba(246, 194, 62, 1)',
          'rgba(54, 185, 204, 1)',
          'rgba(78, 115, 223, 1)',
          'rgba(28, 200, 138, 1)',
          'rgba(155, 89, 182, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const topDoctors = [
    {
      id: 'DOC-1001',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Cardiology',
      hospital: 'City General Hospital',
      patients: 245,
      satisfaction: 4.8,
      change: '+12%'
    },
    {
      id: 'DOC-1002',
      name: 'Dr. Priya Sharma',
      specialization: 'Neurology',
      hospital: 'Metro Health Center',
      patients: 198,
      satisfaction: 4.9,
      change: '+8%'
    },
    {
      id: 'DOC-1003',
      name: 'Dr. Amit Patel',
      specialization: 'Orthopedics',
      hospital: 'Greenfield Medical',
      patients: 187,
      satisfaction: 4.7,
      change: '+15%'
    },
    {
      id: 'DOC-1004',
      name: 'Dr. Neha Gupta',
      specialization: 'Pediatrics',
      hospital: 'Sunshine Children\'s',
      patients: 176,
      satisfaction: 4.9,
      change: '+5%'
    },
    {
      id: 'DOC-1005',
      name: 'Dr. Sanjay Verma',
      specialization: 'Cardiology',
      hospital: 'City General Hospital',
      patients: 165,
      satisfaction: 4.6,
      change: '+9%'
    }
  ];

  const kpiData = [
    {
      title: 'Total Doctors',
      value: '1,248',
      change: '+5.2%',
      isPositive: true,
      icon: Users,
      color: '#4e73df'
    },
    {
      title: 'Avg. Patient Load',
      value: '42',
      change: '+3.1%',
      isPositive: true,
      icon: Activity,
      color: '#1cc88a'
    },
    {
      title: 'Avg. Waiting Time',
      value: '32 min',
      change: '-8.2%',
      isPositive: true,
      icon: Clock,
      color: '#f6c23e'
    },
    {
      title: 'Avg. Satisfaction',
      value: '4.7/5',
      change: '+0.3',
      isPositive: true,
      icon: Star,
      color: '#e74a3b'
    }
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  const renderChart = () => {
    switch(activeMetric) {
      case 'patients':
        return <BarChartComponent data={monthlyPatientData} title="Monthly Patient Volume" />;
      case 'waiting':
        return (
          <div className="chart-grid">
            <BarChartComponent data={performanceData} title="Performance Over Time" />
            <LineChartComponent data={satisfactionData} title="Patient Satisfaction" />
            <PieChartComponent data={specializationData} title="Doctor Specialization" />
          </div>
        );
      case 'admissions':
        return <PieChartComponent data={waitingTimeData} title="Admissions by Department" />;
      case 'all':
      default:
        return (
          <>
            <div className="overview-grid">
              <div className="overview-card">
                <h3>Monthly Patient Volume</h3>
                <div className="chart-container">
                  <BarChartComponent data={monthlyPatientData} />
                </div>
              </div>
              <div className="overview-card">
                <h3>Patient Satisfaction</h3>
                <div className="chart-container">
                  <LineChartComponent data={satisfactionData} />
                </div>
              </div>
              <div className="overview-card">
                <h3>Average Waiting Time</h3>
                <div className="chart-container">
                  <BarChartComponent data={waitingTimeData} />
                </div>
              </div>
              <div className="overview-card">
                <h3>Admissions Distribution</h3>
                <div className="chart-container">
                  <PieChartComponent data={waitingTimeData} />
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  // Simple chart components (in a real app, you would use a library like Chart.js or Recharts)
  const BarChartComponent = ({ data = { labels: [], datasets: [] }, title }) => (
    <div className="chart">
      {title && <h4>{title}</h4>}
      <div className="chart-placeholder">
        <BarChart2 size={40} />
        <p>Bar Chart: {data?.labels?.join(', ') || 'No data'}</p>
      </div>
    </div>
  );

  const LineChartComponent = ({ data = { labels: [], datasets: [] }, title }) => (
    <div className="chart">
      {title && <h4>{title}</h4>}
      <div className="chart-placeholder">
        <LineChart size={40} />
        <p>Line Chart: {data?.labels?.join(', ') || 'No data'}</p>
      </div>
    </div>
  );

  const PieChartComponent = ({ data = { labels: [], datasets: [] }, title }) => (
    <div className="chart">
      {title && <h4>{title}</h4>}
      <div className="chart-placeholder">
        <PieChart size={40} />
        <p>Pie Chart: {data?.labels?.join(', ') || 'No data'}</p>
      </div>
    </div>
  );

  return (
    <div className="doctor-analytics">
      <PageHeader
        title="Doctor Performance Analytics"
        subtitle="Track and analyze doctor performance metrics"
        breadcrumbs={['Doctor Management', 'Performance Analytics']}
        actions={[
          {
            label: 'Export Report',
            icon: Download,
            primary: false,
            onClick: () => console.log('Export Report clicked')
          },
          {
            label: 'Apply Filters',
            icon: Filter,
            primary: true,
            onClick: () => setShowFilters(!showFilters)
          }
        ]}
      />

      {/* Filters */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <div className="filter-item">
              <label>Time Range</label>
              <div className="time-range-buttons">
                {['week', 'month', 'quarter', 'year'].map(range => (
                  <button
                    key={range}
                    className={`time-button ${timeRange === range ? 'active' : ''}`}
                    onClick={() => setTimeRange(range)}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="filter-item">
              <label>Specialization</label>
              <div className="select-wrapper">
                <select
                  value={filters.specialization}
                  onChange={(e) => handleFilterChange('specialization', e.target.value)}
                >
                  {specializations.map(spec => (
                    <option key={spec} value={spec === 'All Specializations' ? 'all' : spec}>
                      {spec}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="select-arrow" />
              </div>
            </div>
            
            <div className="filter-item">
              <label>Location</label>
              <div className="select-wrapper">
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc === 'All Locations' ? 'all' : loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="select-arrow" />
              </div>
            </div>
            
            <div className="filter-item">
              <label>Minimum Rating</label>
              <div className="select-wrapper">
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                >
                  <option value="all">All Ratings</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.8">4.8+ Stars</option>
                </select>
                <ChevronDown size={16} className="select-arrow" />
              </div>
            </div>
          </div>
          
          <div className="filter-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setFilters({
                  specialization: 'all',
                  experience: 'all',
                  location: 'all',
                  rating: 'all'
                });
              }}
            >
              Reset Filters
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setShowFilters(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* KPIs */}
      <div className="kpi-grid">
        {kpiData.map((kpi, index) => (
          <div key={index} className="kpi-card">
            <div className="kpi-icon" style={{ backgroundColor: `${kpi.color}15` }}>
              <kpi.icon size={20} color={kpi.color} />
            </div>
            <div className="kpi-content">
              <div className="kpi-title">{kpi.title}</div>
              <div className="kpi-value">{kpi.value}</div>
              <div className={`kpi-change ${kpi.isPositive ? 'positive' : 'negative'}`}>
                {kpi.change}
                <span className="trend-arrow">{kpi.isPositive ? '↑' : '↓'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Metric Tabs */}
      <div className="metric-tabs">
        {metrics.map(metric => (
          <button
            key={metric.id}
            className={`metric-tab ${activeMetric === metric.id ? 'active' : ''}`}
            onClick={() => setActiveMetric(metric.id)}
            style={{
              borderBottom: activeMetric === metric.id ? `3px solid ${metric.color}` : '3px solid transparent'
            }}
          >
            <metric.icon 
              size={18} 
              color={activeMetric === metric.id ? metric.color : '#6c757d'} 
              style={{ marginRight: '8px' }} 
            />
            {metric.label}
          </button>
        ))}
      </div>

      {/* Main Chart */}
      <div className="chart-container">
        {renderChart()}
      </div>

      {/* Top Performers */}
      <div className="top-performers">
        <div className="section-header">
          <h3>Top Performing Doctors</h3>
          <div className="view-all">View All</div>
        </div>
        
        <div className="doctors-grid">
          {topDoctors.map((doctor, index) => (
            <div key={doctor.id} className="doctor-card">
              <div className="rank">#{index + 1}</div>
              <div className="doctor-avatar">
                <Users size={24} />
              </div>
              <div className="doctor-info">
                <h4>{doctor.name}</h4>
                <div className="specialization">{doctor.specialization}</div>
                <div className="hospital">{doctor.hospital}</div>
              </div>
              <div className="doctor-stats">
                <div className="stat">
                  <span className="value">{doctor.patients}</span>
                  <span className="label">Patients</span>
                </div>
                <div className="stat">
                  <span className="value">{doctor.satisfaction}</span>
                  <span className="label">Rating</span>
                </div>
                <div className={`change ${parseFloat(doctor.change) >= 0 ? 'positive' : 'negative'}`}>
                  {doctor.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAnalytics;
