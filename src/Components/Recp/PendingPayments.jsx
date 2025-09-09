import React, { useState } from 'react';
import { Search, Calendar, AlertTriangle, IndianRupee, Phone, Mail, Clock, User } from 'lucide-react';
import '../../assets/css/pendingpayments.css';

const PendingPayments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDays, setFilterDays] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  const pendingPayments = [
    {
      id: 'BILL001',
      patient: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@email.com',
      amount: 2500,
      dueDate: '2024-01-10',
      daysPending: 5,
      services: 'Consultation + Blood Test',
      lastReminder: '2024-01-12',
      priority: 'high'
    },
    {
      id: 'BILL002',
      patient: 'Priya Singh',
      phone: '+91 98765 43211',
      email: 'priya.singh@email.com',
      amount: 1800,
      dueDate: '2024-01-12',
      daysPending: 3,
      services: 'X-Ray + Consultation',
      lastReminder: '2024-01-14',
      priority: 'medium'
    },
    {
      id: 'BILL003',
      patient: 'Mohammed Ali',
      phone: '+91 98765 43212',
      email: 'mohammed.ali@email.com',
      amount: 3200,
      dueDate: '2024-01-08',
      daysPending: 7,
      services: 'Ultrasound + Follow-up',
      lastReminder: '2024-01-10',
      priority: 'high'
    },
    {
      id: 'BILL004',
      patient: 'Sunita Devi',
      phone: '+91 98765 43213',
      email: 'sunita.devi@email.com',
      amount: 950,
      dueDate: '2024-01-14',
      daysPending: 1,
      services: 'ECG Test',
      lastReminder: null,
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getDaysPendingColor = (days) => {
    if (days >= 7) return 'days-critical';
    if (days >= 3) return 'days-warning';
    return 'days-normal';
  };

  const filteredPayments = pendingPayments.filter(payment => {
    const matchesSearch = payment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.phone.includes(searchTerm);
    
    const matchesDays = filterDays === 'all' || 
                       (filterDays === '1-3' && payment.daysPending >= 1 && payment.daysPending <= 3) ||
                       (filterDays === '4-7' && payment.daysPending >= 4 && payment.daysPending <= 7) ||
                       (filterDays === '7+' && payment.daysPending > 7);
    
    return matchesSearch && matchesDays;
  });

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    switch (sortBy) {
      case 'amount':
        return b.amount - a.amount;
      case 'daysPending':
        return b.daysPending - a.daysPending;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default:
        return new Date(a.dueDate) - new Date(b.dueDate);
    }
  });

  const calculateTotalPending = () => {
    return filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  };

  const getPaymentStats = () => {
    const total = filteredPayments.length;
    const highPriority = filteredPayments.filter(p => p.priority === 'high').length;
    const overdue = filteredPayments.filter(p => p.daysPending >= 7).length;
    const totalAmount = calculateTotalPending();
    
    return { total, highPriority, overdue, totalAmount };
  };

  const stats = getPaymentStats();

  const handleSendReminder = (paymentId, method) => {
    console.log(`Sending ${method} reminder for payment ${paymentId}`);
  };

  const handleMarkPaid = (paymentId) => {
    console.log(`Marking payment ${paymentId} as paid`);
  };

  return (
    <div className="pending-payments-container">
      <div className="page-header">
        <h2 className="page-title">Pending Payments</h2>
        <p className="page-subtitle">Track and manage outstanding patient payments</p>
      </div>

      <div className="controls-section">
        <div className="search-filter-row">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by patient name, bill ID, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filters">
            <div className="filter-group">
              <label>Days Pending:</label>
              <select 
                value={filterDays} 
                onChange={(e) => setFilterDays(e.target.value)}
              >
                <option value="all">All Days</option>
                <option value="1-3">1-3 Days</option>
                <option value="4-7">4-7 Days</option>
                <option value="7+">7+ Days</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="dueDate">Due Date</option>
                <option value="amount">Amount</option>
                <option value="daysPending">Days Pending</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total Pending</span>
        </div>
        <div className="stat-card high-priority">
          <span className="stat-number">{stats.highPriority}</span>
          <span className="stat-label">High Priority</span>
        </div>
        <div className="stat-card overdue">
          <span className="stat-number">{stats.overdue}</span>
          <span className="stat-label">Overdue (7+ Days)</span>
        </div>
        <div className="stat-card amount">
          <span className="stat-number">₹{stats.totalAmount.toLocaleString()}</span>
          <span className="stat-label">Total Amount</span>
        </div>
      </div>

      <div className="payments-card">
        <div className="payments-header">
          <h3>Pending Payments ({sortedPayments.length})</h3>
        </div>

        {sortedPayments.length > 0 ? (
          <div className="payments-list">
            {sortedPayments.map((payment) => (
              <div key={payment.id} className="payment-card">
                <div className="payment-header">
                  <div className="payment-id">
                    <span className="bill-id">{payment.id}</span>
                    <span className={`priority-badge ${getPriorityColor(payment.priority)}`}>
                      {payment.priority} priority
                    </span>
                  </div>
                  <div className="payment-amount">
                    <IndianRupee size={20} />
                    <span>₹{payment.amount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="payment-info">
                  <div className="patient-section">
                    <div className="patient-name">
                      <User size={16} />
                      {payment.patient}
                    </div>
                    <div className="contact-info">
                      <span><Phone size={14} /> {payment.phone}</span>
                      <span><Mail size={14} /> {payment.email}</span>
                    </div>
                  </div>

                  <div className="service-section">
                    <div className="services">{payment.services}</div>
                    <div className="due-info">
                      <span>Due: {payment.dueDate}</span>
                      <span className={`days-pending ${getDaysPendingColor(payment.daysPending)}`}>
                        <Clock size={14} />
                        {payment.daysPending} days pending
                      </span>
                    </div>
                  </div>

                  {payment.lastReminder && (
                    <div className="reminder-info">
                      <AlertTriangle size={14} />
                      Last reminder sent: {payment.lastReminder}
                    </div>
                  )}
                </div>

                <div className="payment-actions">
                  <button 
                    className="action-btn call"
                    onClick={() => handleSendReminder(payment.id, 'call')}
                  >
                    <Phone size={16} />
                    Call
                  </button>
                  <button 
                    className="action-btn sms"
                    onClick={() => handleSendReminder(payment.id, 'sms')}
                  >
                    <Mail size={16} />
                    SMS
                  </button>
                  <button 
                    className="action-btn email"
                    onClick={() => handleSendReminder(payment.id, 'email')}
                  >
                    <Mail size={16} />
                    Email
                  </button>
                  <button 
                    className="action-btn paid"
                    onClick={() => handleMarkPaid(payment.id)}
                  >
                    <IndianRupee size={16} />
                    Mark Paid
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-payments">
            <IndianRupee size={48} />
            <h3>No pending payments found</h3>
            <p>All payments are up to date or no payments match the selected criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingPayments;
