import React, { useState } from 'react';
import { Calendar, Search, Filter, Download, Eye, IndianRupee, CreditCard, Banknote } from 'lucide-react';
import '../../assets/css/transactionhistory.css';

const TransactionHistory = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: new Date().toISOString().split('T')[0]
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPaymentMode, setFilterPaymentMode] = useState('all');

  const transactions = [
    {
      id: 'TXN001',
      billId: 'BILL001',
      patient: 'Rajesh Kumar',
      amount: 1500,
      paymentMode: 'cash',
      status: 'completed',
      date: '2024-01-15',
      time: '10:30 AM',
      description: 'Consultation + Blood Test',
      receivedBy: 'Reception Desk 1'
    },
    {
      id: 'TXN002',
      billId: 'BILL002',
      patient: 'Priya Singh',
      amount: 2800,
      paymentMode: 'card',
      status: 'completed',
      date: '2024-01-15',
      time: '02:15 PM',
      description: 'X-Ray + Consultation',
      receivedBy: 'Reception Desk 2'
    },
    {
      id: 'TXN003',
      billId: 'BILL003',
      patient: 'Mohammed Ali',
      amount: 800,
      paymentMode: 'upi',
      status: 'pending',
      date: '2024-01-16',
      time: '11:45 AM',
      description: 'Emergency Consultation',
      receivedBy: 'Reception Desk 1'
    },
    {
      id: 'TXN004',
      billId: 'BILL004',
      patient: 'Sunita Devi',
      amount: 3200,
      paymentMode: 'card',
      status: 'completed',
      date: '2024-01-16',
      time: '04:20 PM',
      description: 'Ultrasound + Follow-up',
      receivedBy: 'Reception Desk 2'
    },
    {
      id: 'TXN005',
      billId: 'BILL005',
      patient: 'Amit Sharma',
      amount: 450,
      paymentMode: 'cash',
      status: 'failed',
      date: '2024-01-17',
      time: '09:15 AM',
      description: 'ECG Test',
      receivedBy: 'Reception Desk 1'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'failed': return 'status-failed';
      case 'refunded': return 'status-refunded';
      default: return 'status-pending';
    }
  };

  const getPaymentModeIcon = (mode) => {
    switch (mode) {
      case 'cash': return <Banknote size={16} />;
      case 'card': return <CreditCard size={16} />;
      case 'upi': return <IndianRupee size={16} />;
      default: return <IndianRupee size={16} />;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.billId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    const matchesPaymentMode = filterPaymentMode === 'all' || transaction.paymentMode === filterPaymentMode;
    
    return matchesSearch && matchesStatus && matchesPaymentMode;
  });

  const calculateTotalAmount = () => {
    return filteredTransactions
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTransactionStats = () => {
    const total = filteredTransactions.length;
    const completed = filteredTransactions.filter(t => t.status === 'completed').length;
    const pending = filteredTransactions.filter(t => t.status === 'pending').length;
    const failed = filteredTransactions.filter(t => t.status === 'failed').length;
    
    return { total, completed, pending, failed };
  };

  const stats = getTransactionStats();

  const handleExport = () => {
    console.log('Exporting transactions:', filteredTransactions);
    // Handle export logic here
  };

  return (
    <div className="transaction-history-container">
      <div className="page-header">
        <h2 className="page-title">Transaction History</h2>
        <p className="page-subtitle">View and manage all payment transactions</p>
      </div>

      <div className="controls-section">
        <div className="search-filter-row">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by patient, bill ID, or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filters">
            <div className="filter-group">
              <label>Status:</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Payment Mode:</label>
              <select 
                value={filterPaymentMode} 
                onChange={(e) => setFilterPaymentMode(e.target.value)}
              >
                <option value="all">All Modes</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
              </select>
            </div>
          </div>

          <button className="btn export" onClick={handleExport}>
            <Download size={16} />
            Export
          </button>
        </div>

        <div className="date-range-row">
          <div className="date-range">
            <div className="date-input">
              <label htmlFor="startDate">
                <Calendar size={16} />
                From:
              </label>
              <input
                type="date"
                id="startDate"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({
                  ...prev,
                  startDate: e.target.value
                }))}
              />
            </div>

            <div className="date-input">
              <label htmlFor="endDate">To:</label>
              <input
                type="date"
                id="endDate"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({
                  ...prev,
                  endDate: e.target.value
                }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total Transactions</span>
        </div>
        <div className="stat-card completed">
          <span className="stat-number">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card pending">
          <span className="stat-number">{stats.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card failed">
          <span className="stat-number">{stats.failed}</span>
          <span className="stat-label">Failed</span>
        </div>
        <div className="stat-card amount">
          <span className="stat-number">₹{calculateTotalAmount().toLocaleString()}</span>
          <span className="stat-label">Total Amount</span>
        </div>
      </div>

      <div className="transactions-card">
        <div className="transactions-header">
          <h3>Transactions ({filteredTransactions.length})</h3>
        </div>

        {filteredTransactions.length > 0 ? (
          <div className="transactions-table">
            <div className="table-header">
              <span>Transaction ID</span>
              <span>Patient</span>
              <span>Amount</span>
              <span>Payment Mode</span>
              <span>Status</span>
              <span>Date & Time</span>
              <span>Actions</span>
            </div>

            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="table-row">
                <div className="transaction-id">
                  <span className="id">{transaction.id}</span>
                  <span className="bill-id">Bill: {transaction.billId}</span>
                </div>

                <div className="patient-info">
                  <span className="patient-name">{transaction.patient}</span>
                  <span className="description">{transaction.description}</span>
                </div>

                <div className="amount">
                  ₹{transaction.amount.toLocaleString()}
                </div>

                <div className="payment-mode">
                  {getPaymentModeIcon(transaction.paymentMode)}
                  <span>{transaction.paymentMode.toUpperCase()}</span>
                </div>

                <div className="status">
                  <span className={`status-badge ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>

                <div className="datetime">
                  <span className="date">{transaction.date}</span>
                  <span className="time">{transaction.time}</span>
                </div>

                <div className="actions">
                  <button className="action-btn view" title="View Details">
                    <Eye size={16} />
                  </button>
                  <button className="action-btn download" title="Download Receipt">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-transactions">
            <Search size={48} />
            <h3>No transactions found</h3>
            <p>No transactions match the selected criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
