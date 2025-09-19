import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { 
  Search, Filter, Calendar, Download, RefreshCw, BarChart2, LineChart, PieChart,
  Activity, HeartPulse, Stethoscope, Pill, TrendingUp, AlertTriangle, Users, Clock
} from 'lucide-react';
import '../../../assets/css/health-trends.css';

const HealthTrends = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('all');
  
  // Mock data - replace with actual API calls
  const [healthData, setHealthData] = useState({
    totalPatients: 856,
    activeCases: 124,
    recovered: 712,
    mortalityRate: '2.3%',
    avgRecoveryTime: '14.5 days',
    readmissionRate: '5.8%',
    commonConditions: [
      { name: 'Hypertension', cases: 245, trend: 'up' },
      { name: 'Diabetes', cases: 198, trend: 'up' },
      { name: 'Respiratory Infections', cases: 176, trend: 'down' },
      { name: 'Arthritis', cases: 143, trend: 'stable' },
      { name: 'Cardiovascular', cases: 132, trend: 'up' },
    ],
    ageDistribution: {
      '0-18': 15,
      '19-35': 28,
      '36-50': 32,
      '51-65': 18,
      '65+': 7
    },
    monthlyTrends: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      cases: [85, 92, 105, 98, 112, 128, 145, 132, 148],
      recoveries: [78, 85, 92, 88, 102, 118, 132, 125, 140],
      mortality: [2, 1, 3, 2, 1, 4, 2, 3, 1]
    },
    departmentStats: [
      { name: 'Cardiology', patients: 156, avgStay: '3.2 days' },
      { name: 'Neurology', patients: 128, avgStay: '4.1 days' },
      { name: 'Orthopedics', patients: 198, avgStay: '2.8 days' },
      { name: 'Pediatrics', patients: 87, avgStay: '2.1 days' },
      { name: 'Oncology', patients: 64, avgStay: '5.7 days' },
    ]
  });

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // Here you would typically fetch data based on the selected time range
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = (format) => {
    // Implement export functionality
    console.log(`Exporting health trends as ${format}`);
    // Actual implementation would generate and download the file
  };

  // Chart data for cases and recoveries
  const trendsChartData = {
    labels: healthData.monthlyTrends.labels,
    datasets: [
      {
        label: 'New Cases',
        data: healthData.monthlyTrends.cases,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      },
      {
        label: 'Recoveries',
        data: healthData.monthlyTrends.recoveries,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      },
      {
        label: 'Mortality',
        data: healthData.monthlyTrends.mortality,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        borderDash: [5, 5]
      }
    ]
  };

  // Age distribution pie chart data
  const ageDistributionData = {
    labels: Object.keys(healthData.ageDistribution),
    datasets: [
      {
        data: Object.values(healthData.ageDistribution),
        backgroundColor: [
          '#36A2EB',
          '#4BC0C0',
          '#FFCE56',
          '#FF9F40',
          '#FF6384'
        ],
        borderWidth: 1
      }
    ]
  };

  // Department stats bar chart
  const departmentChartData = {
    labels: healthData.departmentStats.map(dept => dept.name),
    datasets: [
      {
        label: 'Number of Patients',
        data: healthData.departmentStats.map(dept => dept.patients),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value;
          }
        }
      }
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="health-trends-container">
      <div className="trends-header">
        <h1>Health Trends & Analytics</h1>
        <div className="header-actions">
          <div className="metric-selector">
            <select 
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="metric-dropdown"
            >
              <option value="all">All Metrics</option>
              <option value="cases">Cases</option>
              <option value="recoveries">Recoveries</option>
              <option value="mortality">Mortality</option>
            </select>
          </div>
          <div className="time-range-selector">
            {['week', 'month', 'quarter', 'year'].map((range) => (
              <button
                key={range}
                className={`time-range-btn ${timeRange === range ? 'active' : ''}`}
                onClick={() => handleTimeRangeChange(range)}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
          <button className="export-btn" onClick={() => handleExport('pdf')}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="trends-tabs">
        {['overview', 'epidemiology', 'clinical', 'demographics', 'custom'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <RefreshCw className="spinner" size={24} />
          <p>Loading health data...</p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-details">
                <h3>{healthData.totalPatients}</h3>
                <p>Total Patients</p>
                <span className="stat-change positive">
                  <TrendingUp size={14} />
                  +5.2% from last month
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Activity size={24} />
              </div>
              <div className="stat-details">
                <h3>{healthData.activeCases}</h3>
                <p>Active Cases</p>
                <span className="stat-change negative">
                  <TrendingUp size={14} />
                  +12.7% from last month
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <HeartPulse size={24} />
              </div>
              <div className="stat-details">
                <h3>{healthData.recovered}</h3>
                <p>Recovered</p>
                <span className="stat-change positive">
                  <TrendingUp size={14} />
                  +8.3% from last month
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <AlertTriangle size={24} />
              </div>
              <div className="stat-details">
                <h3>{healthData.mortalityRate}</h3>
                <p>Mortality Rate</p>
                <span className="stat-change positive">
                  <TrendingUp size={14} />
                  -0.7% from last month
                </span>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-card main-chart">
              <div className="chart-header">
                <h3>Health Trends Overview</h3>
                <div className="chart-actions">
                  <button className={`chart-type-btn ${selectedMetric === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedMetric('all')}>
                    <LineChart size={16} />
                  </button>
                  <button className={`chart-type-btn ${selectedMetric === 'cases' ? 'active' : ''}`}
                    onClick={() => setSelectedMetric('cases')}>
                    <BarChart2 size={16} />
                  </button>
                </div>
              </div>
              <div className="chart-wrapper">
                <Line 
                  data={{
                    ...trendsChartData,
                    datasets: selectedMetric === 'all' 
                      ? trendsChartData.datasets 
                      : trendsChartData.datasets.filter(ds => 
                          selectedMetric === 'cases' ? ds.label.includes('Cases') :
                          selectedMetric === 'recoveries' ? ds.label.includes('Recoveries') :
                          ds.label.includes('Mortality')
                        )
                  }} 
                  options={chartOptions} 
                />
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Age Distribution</h3>
              </div>
              <div className="chart-wrapper">
                <Pie data={ageDistributionData} options={pieChartOptions} />
              </div>
            </div>
          </div>

          <div className="bottom-charts">
            <div className="chart-card">
              <div className="chart-header">
                <h3>Department Statistics</h3>
              </div>
              <div className="chart-wrapper">
                <Bar data={departmentChartData} options={{
                  ...chartOptions,
                  indexAxis: 'y',
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    x: {
                      beginAtZero: true
                    }
                  }
                }} />
              </div>
            </div>
          </div>

          <div className="common-conditions">
            <h3>Most Common Conditions</h3>
            <div className="conditions-list">
              {healthData.commonConditions.map((condition, index) => (
                <div key={index} className="condition-item">
                  <div className="condition-info">
                    <span className="condition-rank">{index + 1}</span>
                    <div>
                      <h4>{condition.name}</h4>
                      <p>{condition.cases} cases reported</p>
                    </div>
                  </div>
                  <div className={`condition-trend ${condition.trend}`}>
                    {condition.trend === 'up' ? '↑' : condition.trend === 'down' ? '↓' : '→'}
                    <span>{condition.trend === 'up' ? 'Increasing' : condition.trend === 'down' ? 'Decreasing' : 'Stable'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="department-stats">
            <h3>Department Performance</h3>
            <div className="department-table">
              <div className="table-header">
                <span>Department</span>
                <span>Patients</span>
                <span>Avg. Stay</span>
                <span>Status</span>
              </div>
              {healthData.departmentStats.map((dept, index) => (
                <div key={index} className="table-row">
                  <span className="dept-name">
                    <span className="dept-icon">
                      {index % 3 === 0 ? <HeartPulse size={16} /> : 
                       index % 3 === 1 ? <Stethoscope size={16} /> : 
                       <Pill size={16} />}
                    </span>
                    {dept.name}
                  </span>
                  <span>{dept.patients}</span>
                  <span>{dept.avgStay}</span>
                  <span className={`status-badge ${
                    index % 3 === 0 ? 'good' : 
                    index % 3 === 1 ? 'warning' : 'critical'
                  }`}>
                    {index % 3 === 0 ? 'Good' : index % 3 === 1 ? 'Warning' : 'Critical'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HealthTrends;
