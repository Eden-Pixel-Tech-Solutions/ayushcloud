import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  X, 
  BarChart2, 
  PieChart as PieChartIcon,
  Users,
  Activity,
  Clock,
  MapPin,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../../assets/css/usage-statistics.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const UsageStatistics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalVisits: 0,
    activePatients: 0,
    newRegistrations: 0,
    avgVisitDuration: '0m',
  });
  
  const [filters, setFilters] = useState({
    location: '',
    department: '',
    dateRange: 'this_month',
  });

  // Mock data for charts
  const [chartData, setChartData] = useState({
    monthlyVisits: {},
    departmentDistribution: {},
    patientDemographics: {},
    trendData: {},
  });

  useEffect(() => {
    // Simulate API call to fetch data
    const fetchData = () => {
      setLoading(true);
      
      // Mock data - in a real app, this would come from an API
      setTimeout(() => {
        // Mock stats
        setStats({
          totalVisits: 1245,
          activePatients: 856,
          newRegistrations: 189,
          avgVisitDuration: '12m 34s',
        });
        
        // Mock chart data
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
        const departments = ['General', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'];
        const ageGroups = ['0-18', '19-30', '31-45', '46-60', '60+'];
        
        // Monthly visits data
        const monthlyVisits = {
          labels: months.slice(0, 9), // Last 9 months
          datasets: [
            {
              label: 'Visits',
              data: Array(9).fill().map(() => Math.floor(Math.random() * 500) + 100),
              backgroundColor: 'rgba(78, 115, 223, 0.8)',
              borderColor: 'rgba(78, 115, 223, 1)',
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        };
        
        // Department distribution data
        const departmentDistribution = {
          labels: departments,
          datasets: [
            {
              data: departments.map(() => Math.floor(Math.random() * 200) + 50),
              backgroundColor: [
                'rgba(54, 185, 204, 0.8)',
                'rgba(78, 115, 223, 0.8)',
                'rgba(28, 200, 138, 0.8)',
                'rgba(246, 194, 62, 0.8)',
                'rgba(231, 74, 59, 0.8)',
              ],
              borderColor: [
                'rgba(54, 185, 204, 1)',
                'rgba(78, 115, 223, 1)',
                'rgba(28, 200, 138, 1)',
                'rgba(246, 194, 62, 1)',
                'rgba(231, 74, 59, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };
        
        // Patient demographics data
        const patientDemographics = {
          labels: ageGroups,
          datasets: [
            {
              label: 'Patients by Age Group',
              data: ageGroups.map(() => Math.floor(Math.random() * 300) + 50),
              backgroundColor: [
                'rgba(54, 185, 204, 0.8)',
                'rgba(78, 115, 223, 0.8)',
                'rgba(28, 200, 138, 0.8)',
                'rgba(246, 194, 62, 0.8)',
                'rgba(231, 74, 59, 0.8)',
              ],
              borderColor: [
                'rgba(54, 185, 204, 1)',
                'rgba(78, 115, 223, 1)',
                'rgba(28, 200, 138, 1)',
                'rgba(246, 194, 62, 1)',
                'rgba(231, 74, 59, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };
        
        // Trend data
        const trendData = {
          labels: Array(12).fill().map((_, i) => `Week ${i + 1}`),
          datasets: [
            {
              label: 'Patient Visits',
              data: Array(12).fill().map(() => Math.floor(Math.random() * 200) + 50),
              borderColor: 'rgba(78, 115, 223, 1)',
              backgroundColor: 'rgba(78, 115, 223, 0.1)',
              fill: true,
              tension: 0.3,
            },
            {
              label: 'New Registrations',
              data: Array(12).fill().map(() => Math.floor(Math.random() * 100) + 10),
              borderColor: 'rgba(28, 200, 138, 1)',
              backgroundColor: 'rgba(28, 200, 138, 0.1)',
              fill: true,
              tension: 0.3,
            },
          ],
        };
        
        setChartData({
          monthlyVisits,
          departmentDistribution,
          patientDemographics,
          trendData,
        });
        
        setLoading(false);
      }, 1000);
    };
    
    fetchData();
  }, [timeRange, filters]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // In a real app, this would trigger a new API call with the updated range
  };
  
  const refreshData = () => {
    // In a real app, this would refresh the data from the API
    console.log('Refreshing data...');
  };
  
  const exportReport = () => {
    // In a real app, this would generate and download a report
    alert('Exporting report...');
  };
  
  // Chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Patient Visits',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
  
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Department Distribution',
      },
    },
  };
  
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Patient Visits Trend',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
  
  const pieChartOptions2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Patient Demographics',
      },
    },
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading usage statistics...</p>
      </div>
    );
  }
  
  return (
    <div className="usage-statistics">
      <div className="page-header">
        <h1>
          <BarChart2 size={24} className="header-icon" />
          Usage Statistics
        </h1>
        <div className="header-actions">
          <div className="time-range-selector">
            <button 
              className={`time-range-btn ${timeRange === 'week' ? 'active' : ''}`}
              onClick={() => handleTimeRangeChange('week')}
            >
              Week
            </button>
            <button 
              className={`time-range-btn ${timeRange === 'month' ? 'active' : ''}`}
              onClick={() => handleTimeRangeChange('month')}
            >
              Month
            </button>
            <button 
              className={`time-range-btn ${timeRange === 'year' ? 'active' : ''}`}
              onClick={() => handleTimeRangeChange('year')}
            >
              Year
            </button>
          </div>
          <button className="btn btn-outline" onClick={refreshData}>
            <RefreshCw size={16} /> Refresh
          </button>
          <button className="btn btn-primary" onClick={exportReport}>
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>
      
      <div className="filters-container">
        <div className="filter-group">
          <label>Location</label>
          <select name="location" value={filters.location} onChange={handleFilterChange}>
            <option value="">All Locations</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
            <option value="bangalore">Bangalore</option>
            <option value="hyderabad">Hyderabad</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Department</label>
          <select name="department" value={filters.department} onChange={handleFilterChange}>
            <option value="">All Departments</option>
            <option value="general">General</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="orthopedics">Orthopedics</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Date Range</label>
          <select name="dateRange" value={filters.dateRange} onChange={handleFilterChange}>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="this_week">This Week</option>
            <option value="last_week">Last Week</option>
            <option value="this_month" selected>This Month</option>
            <option value="last_month">Last Month</option>
            <option value="this_year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <Users size={24} />
          </div>
          <div className="stat-details">
            <h3>{stats.totalVisits.toLocaleString()}</h3>
            <p>Total Visits</p>
          </div>
          <div className="stat-trend up">
            <TrendingUp size={16} /> 12.5%
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon active">
            <Activity size={24} />
          </div>
          <div className="stat-details">
            <h3>{stats.activePatients.toLocaleString()}</h3>
            <p>Active Patients</p>
          </div>
          <div className="stat-trend up">
            <TrendingUp size={16} /> 8.2%
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon new">
            <Users size={24} />
          </div>
          <div className="stat-details">
            <h3>+{stats.newRegistrations.toLocaleString()}</h3>
            <p>New Registrations</p>
          </div>
          <div className="stat-trend up">
            <TrendingUp size={16} /> 5.7%
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon duration">
            <Clock size={24} />
          </div>
          <div className="stat-details">
            <h3>{stats.avgVisitDuration}</h3>
            <p>Avg. Visit Duration</p>
          </div>
          <div className="stat-trend down">
            <TrendingUp size={16} /> 2.1%
          </div>
        </div>
      </div>
      
      <div className="charts-grid">
        <div className="chart-container">
          <div className="chart-header">
            <h3>Monthly Patient Visits</h3>
            <div className="chart-actions">
              <button className="btn-icon">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="chart-wrapper">
            <Bar data={chartData.monthlyVisits} options={barChartOptions} />
          </div>
        </div>
        
        <div className="chart-container">
          <div className="chart-header">
            <h3>Department Distribution</h3>
            <div className="chart-actions">
              <button className="btn-icon">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="chart-wrapper pie-chart">
            <Pie data={chartData.departmentDistribution} options={pieChartOptions} />
          </div>
        </div>
        
        <div className="chart-container full-width">
          <div className="chart-header">
            <h3>Patient Visits Trend</h3>
            <div className="chart-actions">
              <button className="btn-icon">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="chart-wrapper">
            <Line data={chartData.trendData} options={lineChartOptions} />
          </div>
        </div>
        
        <div className="chart-container">
          <div className="chart-header">
            <h3>Patient Demographics</h3>
            <div className="chart-actions">
              <button className="btn-icon">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="chart-wrapper pie-chart">
            <Pie data={chartData.patientDemographics} options={pieChartOptions2} />
          </div>
        </div>
        
        <div className="chart-container">
          <div className="chart-header">
            <h3>Top Locations</h3>
            <div className="chart-actions">
              <button className="btn-icon">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="location-list">
            {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai'].map((location, index) => (
              <div key={index} className="location-item">
                <div className="location-info">
                  <MapPin size={16} className="location-icon" />
                  <span className="location-name">{location}</span>
                </div>
                <div className="location-stats">
                  <span className="location-count">{Math.floor(Math.random() * 500) + 100}</span>
                  <span className="location-trend up">+{Math.floor(Math.random() * 15) + 5}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {Array(5).fill().map((_, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">
                <Users size={18} />
              </div>
              <div className="activity-details">
                <p className="activity-message">
                  <strong>Dr. Smith</strong> registered a new patient <strong>John Doe</strong>
                </p>
                <p className="activity-time">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsageStatistics;
