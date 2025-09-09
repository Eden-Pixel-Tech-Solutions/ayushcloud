import React, { useState } from 'react';
import { Calendar, Clock, User, Search, Edit, X, CheckCircle, AlertTriangle } from 'lucide-react';
import '../../assets/css/reschedulecancel.css';

const RescheduleCancel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [action, setAction] = useState(''); // 'reschedule' or 'cancel'
  const [rescheduleData, setRescheduleData] = useState({
    newDate: '',
    newTime: '',
    reason: ''
  });
  const [cancelReason, setCancelReason] = useState('');

  const appointments = [
    {
      id: 1,
      patient: 'Rajesh Kumar',
      doctor: 'Dr. Sharma',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'confirmed',
      phone: '+91 98765 43210',
      type: 'Consultation'
    },
    {
      id: 2,
      patient: 'Priya Singh',
      doctor: 'Dr. Patel',
      date: '2024-01-16',
      time: '02:30 PM',
      status: 'confirmed',
      phone: '+91 98765 43211',
      type: 'Follow-up'
    },
    {
      id: 3,
      patient: 'Mohammed Ali',
      doctor: 'Dr. Kumar',
      date: '2024-01-17',
      time: '11:00 AM',
      status: 'pending',
      phone: '+91 98765 43212',
      type: 'Emergency'
    }
  ];

  const availableSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', 
    '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'
  ];

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.phone.includes(searchTerm)
  );

  const handleSelectAppointment = (appointment, actionType) => {
    setSelectedAppointment(appointment);
    setAction(actionType);
    setRescheduleData({ newDate: '', newTime: '', reason: '' });
    setCancelReason('');
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    console.log('Reschedule appointment:', {
      appointmentId: selectedAppointment.id,
      ...rescheduleData
    });
    // Handle reschedule logic here
    setSelectedAppointment(null);
    setAction('');
  };

  const handleCancelSubmit = (e) => {
    e.preventDefault();
    console.log('Cancel appointment:', {
      appointmentId: selectedAppointment.id,
      reason: cancelReason
    });
    // Handle cancel logic here
    setSelectedAppointment(null);
    setAction('');
  };

  const handleClose = () => {
    setSelectedAppointment(null);
    setAction('');
  };

  return (
    <div className="reschedule-cancel-container">
      <div className="page-header">
        <h2 className="page-title">Reschedule & Cancel Appointments</h2>
        <p className="page-subtitle">Modify or cancel existing appointments</p>
      </div>

      <div className="search-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by patient name, doctor, or phone number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="appointments-grid">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-header">
                <div className="patient-info">
                  <h3>{appointment.patient}</h3>
                  <p>{appointment.phone}</p>
                </div>
                <div className={`status-badge ${appointment.status}`}>
                  {appointment.status}
                </div>
              </div>

              <div className="appointment-details">
                <div className="detail-item">
                  <User size={16} />
                  <span>{appointment.doctor}</span>
                </div>
                <div className="detail-item">
                  <Calendar size={16} />
                  <span>{appointment.date}</span>
                </div>
                <div className="detail-item">
                  <Clock size={16} />
                  <span>{appointment.time}</span>
                </div>
                <div className="detail-item">
                  <span className="type-badge">{appointment.type}</span>
                </div>
              </div>

              <div className="appointment-actions">
                <button
                  className="btn reschedule"
                  onClick={() => handleSelectAppointment(appointment, 'reschedule')}
                >
                  <Edit size={16} />
                  Reschedule
                </button>
                <button
                  className="btn cancel"
                  onClick={() => handleSelectAppointment(appointment, 'cancel')}
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-appointments">
            <Search size={48} />
            <h3>No appointments found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Reschedule Modal */}
      {selectedAppointment && action === 'reschedule' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Reschedule Appointment</h3>
              <button className="close-btn" onClick={handleClose}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="current-appointment">
                <h4>Current Appointment</h4>
                <p><strong>Patient:</strong> {selectedAppointment.patient}</p>
                <p><strong>Doctor:</strong> {selectedAppointment.doctor}</p>
                <p><strong>Date:</strong> {selectedAppointment.date}</p>
                <p><strong>Time:</strong> {selectedAppointment.time}</p>
              </div>

              <form onSubmit={handleRescheduleSubmit}>
                <div className="form-group">
                  <label htmlFor="newDate">New Date *</label>
                  <input
                    type="date"
                    id="newDate"
                    value={rescheduleData.newDate}
                    onChange={(e) => setRescheduleData(prev => ({
                      ...prev,
                      newDate: e.target.value
                    }))}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newTime">New Time *</label>
                  <select
                    id="newTime"
                    value={rescheduleData.newTime}
                    onChange={(e) => setRescheduleData(prev => ({
                      ...prev,
                      newTime: e.target.value
                    }))}
                    required
                  >
                    <option value="">Select Time</option>
                    {availableSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="rescheduleReason">Reason for Reschedule</label>
                  <textarea
                    id="rescheduleReason"
                    value={rescheduleData.reason}
                    onChange={(e) => setRescheduleData(prev => ({
                      ...prev,
                      reason: e.target.value
                    }))}
                    placeholder="Optional: Reason for rescheduling"
                    rows="3"
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn secondary" onClick={handleClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn primary">
                    <CheckCircle size={16} />
                    Confirm Reschedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {selectedAppointment && action === 'cancel' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Cancel Appointment</h3>
              <button className="close-btn" onClick={handleClose}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="warning-message">
                <AlertTriangle size={24} />
                <p>Are you sure you want to cancel this appointment?</p>
              </div>

              <div className="current-appointment">
                <h4>Appointment Details</h4>
                <p><strong>Patient:</strong> {selectedAppointment.patient}</p>
                <p><strong>Doctor:</strong> {selectedAppointment.doctor}</p>
                <p><strong>Date:</strong> {selectedAppointment.date}</p>
                <p><strong>Time:</strong> {selectedAppointment.time}</p>
              </div>

              <form onSubmit={handleCancelSubmit}>
                <div className="form-group">
                  <label htmlFor="cancelReason">Reason for Cancellation *</label>
                  <textarea
                    id="cancelReason"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Please provide a reason for cancellation"
                    rows="3"
                    required
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn secondary" onClick={handleClose}>
                    Keep Appointment
                  </button>
                  <button type="submit" className="btn danger">
                    <X size={16} />
                    Cancel Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RescheduleCancel;
