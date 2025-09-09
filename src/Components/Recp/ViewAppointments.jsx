import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Edit, CheckCircle, AlertCircle } from 'lucide-react';
import '../../assets/css/viewappointments.css';

const ViewAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState('all');

  const appointments = [
    {
      id: 1,
      patient: 'Rajesh Kumar',
      doctor: 'Dr. Sharma',
      time: '10:00 AM',
      status: 'confirmed',
      phone: '+91 98765 43210',
      abhaId: '12-3456-7890-1234',
      type: 'Consultation',
      notes: 'Follow-up for cardiac checkup'
    },
    {
      id: 2,
      patient: 'Priya Singh',
      doctor: 'Dr. Patel',
      time: '10:30 AM',
      status: 'pending',
      phone: '+91 98765 43211',
      abhaId: '12-3456-7890-1235',
      type: 'Routine Checkup',
      notes: 'Annual health screening'
    },
    {
      id: 3,
      patient: 'Mohammed Ali',
      doctor: 'Dr. Kumar',
      time: '11:00 AM',
      status: 'confirmed',
      phone: '+91 98765 43212',
      abhaId: '12-3456-7890-1236',
      type: 'Emergency',
      notes: 'Severe back pain'
    },
    {
      id: 4,
      patient: 'Sunita Devi',
      doctor: 'Dr. Gupta',
      time: '11:30 AM',
      status: 'rescheduled',
      phone: '+91 98765 43213',
      abhaId: '12-3456-7890-1237',
      type: 'Follow-up',
      notes: 'Post-surgery checkup'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'rescheduled': return 'status-rescheduled';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'rescheduled': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (filterStatus === 'all') return true;
    return appointment.status === filterStatus;
  });

  const getAppointmentStats = () => {
    const total = appointments.length;
    const confirmed = appointments.filter(a => a.status === 'confirmed').length;
    const pending = appointments.filter(a => a.status === 'pending').length;
    const rescheduled = appointments.filter(a => a.status === 'rescheduled').length;
    
    return { total, confirmed, pending, rescheduled };
  };

  const stats = getAppointmentStats();

  return (
    <div className="view-appointments-container">
      <div className="page-header">
        <h2 className="page-title">Today's Appointments</h2>
        <p className="page-subtitle">View and manage all appointments for the selected date</p>
      </div>

      <div className="appointments-controls">
        <div className="date-selector">
          <label htmlFor="appointmentDate">
            <Calendar size={16} />
            Select Date:
          </label>
          <input
            type="date"
            id="appointmentDate"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="status-filter">
          <label>Filter by Status:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Appointments</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="rescheduled">Rescheduled</option>
          </select>
        </div>
      </div>

      <div className="appointments-stats">
        <div className="stat-item">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item confirmed">
          <span className="stat-number">{stats.confirmed}</span>
          <span className="stat-label">Confirmed</span>
        </div>
        <div className="stat-item pending">
          <span className="stat-number">{stats.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-item rescheduled">
          <span className="stat-number">{stats.rescheduled}</span>
          <span className="stat-label">Rescheduled</span>
        </div>
      </div>

      <div className="appointments-list-card">
        <div className="appointments-header">
          <h3>Appointments ({filteredAppointments.length})</h3>
        </div>

        {filteredAppointments.length > 0 ? (
          <div className="appointments-list">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-time">
                  <Clock size={20} />
                  <span className="time">{appointment.time}</span>
                </div>

                <div className="appointment-info">
                  <div className="patient-section">
                    <div className="patient-name">
                      <User size={16} />
                      {appointment.patient}
                    </div>
                    <div className="patient-details">
                      <span>ABHA: {appointment.abhaId}</span>
                      <span>Phone: {appointment.phone}</span>
                    </div>
                  </div>

                  <div className="doctor-section">
                    <div className="doctor-name">{appointment.doctor}</div>
                    <div className="appointment-type">{appointment.type}</div>
                  </div>

                  {appointment.notes && (
                    <div className="appointment-notes">
                      <strong>Notes:</strong> {appointment.notes}
                    </div>
                  )}
                </div>

                <div className="appointment-status">
                  <span className={`status-badge ${getStatusColor(appointment.status)}`}>
                    {getStatusIcon(appointment.status)}
                    {appointment.status}
                  </span>
                </div>

                <div className="appointment-actions">
                  <button className="action-btn call" title="Call Patient">
                    <Phone size={16} />
                  </button>
                  <button className="action-btn edit" title="Edit Appointment">
                    <Edit size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-appointments">
            <Calendar size={48} />
            <h3>No appointments found</h3>
            <p>No appointments match the selected criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAppointments;
