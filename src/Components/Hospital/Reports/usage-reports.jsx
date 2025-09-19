import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { 
  Search, Filter, Calendar, Download, RefreshCw, BarChart2, LineChart, PieChart,
  Users, Activity, Clock, TrendingUp, FileText, Database, ArrowUp, ArrowDown
} from 'lucide-react';
import '../../../assets/css/usage-reports.css';

const UsageReports = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data - replace with actual API calls
  const [usageData, setUsageData] = useState({
    totalUsers: 1245,
    activeUsers: 856,
    newUsers: 124,
    avgSession: '12m 34s',
    pageViews: 5678,
    bounceRate: '32%',
    userGrowth: 12.5,
    sessions: [1200, 1900, 1500, 2000, 1800, 2100, 2300],
    pageViewsData: [800, 1200, 1000, 1500, 1800, 2000, 2200],
    userTypes: {
      new: 35,
      returning: 65
    },
    popularPages: [
      { name: 'Dashboard', views: 2300 },
      { name: 'Patient Records', views: 1800 },
      { name: 'Appointments', views: 1500 },
      { name: 'Reports', views: 1200 },
      { name: 'Settings', views: 800 },
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
    console.log(`Exporting data as ${format}`);
    // Actual implementation would generate and download the file
  };

  // Chart data
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Active Users',
        data: usageData.sessions,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        tension: 0.3,
      },
      {
        label: 'Page Views',
        data: usageData.pageViewsData,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        tension: 0.3,
      },
    ],
  };

  const userTypeData = {
    labels: ['New Users', 'Returning Users'],
    datasets: [
      {
        data: [usageData.userTypes.new, usageData.userTypes.returning],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
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
      },
    },
  };

  return (
    <div className="usage-reports-container">
      <div className="reports-header">
        <h1>Usage Analytics</h1>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="time-range-selector">
            {['day', 'week', 'month', 'year'].map((range) => (
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

      <div className="reports-tabs">
        {['overview', 'users', 'pages', 'events', 'custom'].map((tab) => (
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
          <p>Loading data...</p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <StatCard 
              icon={<Users size={24} />}
              title="Total Users"
              value={usageData.totalUsers.toLocaleString()}
              change={usageData.userGrowth}
              isPositive={usageData.userGrowth >= 0}
            />
            <StatCard 
              icon={<Activity size={24} />}
              title="Active Users"
              value={usageData.activeUsers.toLocaleString()}
              change={5.2}
              isPositive={true}
            />
            <StatCard 
              icon={<TrendingUp size={24} />}
              title="New Users"
              value={usageData.newUsers.toLocaleString()}
              change={8.7}
              isPositive={true}
            />
            <StatCard 
              icon={<Clock size={24} />}
              title="Avg. Session"
              value={usageData.avgSession}
              change={-2.1}
              isPositive={false}
            />
          </div>

          <div className="chart-container">
            <div className="chart-card">
              <div className="chart-header">
                <h3>User Activity</h3>
                <div className="chart-actions">
                  <button className="chart-type-btn active">
                    <BarChart2 size={16} />
                  </button>
                  <button className="chart-type-btn">
                    <LineChart size={16} />
                  </button>
                </div>
              </div>
              <div className="chart-wrapper">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>User Types</h3>
              </div>
              <div className="chart-wrapper pie-chart">
                <PieChart data={userTypeData} options={chartOptions} />
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-color" style={{backgroundColor: '#FF6384'}}></span>
                    <span>New Users: {usageData.userTypes.new}%</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color" style={{backgroundColor: '#36A2EB'}}></span>
                    <span>Returning: {usageData.userTypes.returning}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="popular-pages">
            <h3>Most Visited Pages</h3>
            <div className="pages-list">
              {usageData.popularPages.map((page, index) => (
                <div key={index} className="page-item">
                  <div className="page-info">
                    <span className="page-rank">{index + 1}</span>
                    <span className="page-name">{page.name}</span>
                  </div>
                  <div className="page-stats">
                    <span className="page-views">{page.views.toLocaleString()} views</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{
                          width: `${(page.views / usageData.popularPages[0].views) * 100}%`,
                          backgroundColor: index % 2 === 0 ? '#4BC0C0' : '#36A2EB'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const StatCard = ({ icon, title, value, change, isPositive }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-details">
      <h3>{value}</h3>
      <p>{title}</p>
      {change !== undefined && (
        <span className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          {Math.abs(change)}% {isPositive ? 'Increase' : 'Decrease'} from last period
        </span>
      )}
    </div>
  </div>
);

export default UsageReports;
