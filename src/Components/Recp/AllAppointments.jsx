import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Edit, CheckCircle, AlertCircle, Info, X, Trash2, RotateCcw } from 'lucide-react';
import '../../assets/css/allappointments.css';

const AllAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    patientName: '',
    doctor: '',
    date: '',
    timeSlot: '',
    appointmentType: '',
    notes: ''
  });

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
      type: 'General Checkup',
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
      notes: 'Chest pain complaint'
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
    },
    {
      id: 5,
      patient: 'Amit Sharma',
      doctor: 'Dr. Verma',
      time: '02:00 PM',
      status: 'confirmed',
      phone: '+91 98765 43214',
      abhaId: '12-3456-7890-1238',
      type: 'Consultation',
      notes: 'Diabetes management'
    },
    {
      id: 6,
      patient: 'Kavita Jain',
      doctor: 'Dr. Singh',
      time: '02:30 PM',
      status: 'pending',
      phone: '+91 98765 43215',
      abhaId: '12-3456-7890-1239',
      type: 'General Checkup',
      notes: 'Routine health check'
    }
  ];

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

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setShowModal(false);
    setShowDeleteConfirm(false);
    setShowRescheduleModal(false);
  };

  const showDeleteConfirmation = () => {
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const confirmDelete = (appointmentId) => {
    // Handle appointment deletion logic here
    console.log('Deleting appointment:', appointmentId);
    closeModal();
  };

  const showRescheduleForm = () => {
    setRescheduleData({
      patientName: selectedAppointment.patient,
      doctor: selectedAppointment.doctor,
      date: new Date().toISOString().split('T')[0],
      timeSlot: selectedAppointment.time,
      appointmentType: selectedAppointment.type,
      notes: selectedAppointment.notes || ''
    });
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    // Update the appointment with new data
    console.log('Rescheduling appointment:', selectedAppointment.id, rescheduleData);
    // Here you would typically update the appointment in your data source
    closeModal();
  };

  const handleRescheduleChange = (field, value) => {
    setRescheduleData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="view-appointments-container">
      <div className="appointments-list-card">
        <div className="appointments-header">
          <h3>All Appointments ({filteredAppointments.length})</h3>
        </div>

        {filteredAppointments.length > 0 ? (
          <div className="simple-appointments-list">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="simple-appointment-item">
                <div className="appointment-basic-info">
                  <span className="patient-name">{appointment.patient}</span>
                  <span className="patient-mobile">{appointment.phone}</span>
                </div>
                <button 
                  className="more-info-btn"
                  onClick={() => openModal(appointment)}
                >
                  <Info size={16} />
                  More Info
                </button>
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

      {/* Modal Popup */}
      {showModal && selectedAppointment && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Appointment Details</h3>
              <button className="close-btn" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Patient Name:</span>
                <span className="detail-value">{selectedAppointment.patient}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Mobile Number:</span>
                <span className="detail-value">{selectedAppointment.phone}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">ABHA ID:</span>
                <span className="detail-value">{selectedAppointment.abhaId}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Doctor:</span>
                <span className="detail-value">{selectedAppointment.doctor}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Time:</span>
                <span className="detail-value">{selectedAppointment.time}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{selectedAppointment.type}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`detail-value status-${selectedAppointment.status}`}>
                  {selectedAppointment.status}
                </span>
              </div>
              
              {selectedAppointment.notes && (
                <div className="detail-row">
                  <span className="detail-label">Notes:</span>
                  <span className="detail-value">{selectedAppointment.notes}</span>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button 
                className="reschedule-appointment-btn"
                onClick={showRescheduleForm}
              >
                <RotateCcw size={16} />
                Reschedule Appointment
              </button>
              <button 
                className="delete-appointment-btn"
                onClick={showDeleteConfirmation}
              >
                <Trash2 size={16} />
                Delete Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && selectedAppointment && (
        <div className="confirmation-overlay" onClick={cancelDelete}>
          <div className="confirmation-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="confirmation-header">
              <h3>Delete Appointment</h3>
            </div>
            
            <div className="confirmation-body">
              <p>Are you sure you want to delete this appointment?</p>
              <div className="appointment-summary">
                <strong>{selectedAppointment.patient}</strong><br />
                {selectedAppointment.doctor} - {selectedAppointment.time}
              </div>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            
            <div className="confirmation-footer">
              <button 
                className="confirm-btn cancel"
                onClick={cancelDelete}
              >
                Go Back
              </button>
              <button 
                className="confirm-btn no"
                onClick={cancelDelete}
              >
                No
              </button>
              <button 
                className="confirm-btn yes"
                onClick={() => confirmDelete(selectedAppointment.id)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedAppointment && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="reschedule-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reschedule Appointment</h3>
              <button className="close-btn" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleRescheduleSubmit} className="reschedule-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="reschedule-patient">Patient Name</label>
                  <input
                    type="text"
                    id="reschedule-patient"
                    value={rescheduleData.patientName}
                    onChange={(e) => handleRescheduleChange('patientName', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reschedule-doctor">Select Doctor</label>
                  <select
                    id="reschedule-doctor"
                    value={rescheduleData.doctor}
                    onChange={(e) => handleRescheduleChange('doctor', e.target.value)}
                    required
                  >
                    <option value="">Choose Doctor</option>
                    <option value="Dr. Sharma">Dr. Sharma - Cardiologist</option>
                    <option value="Dr. Patel">Dr. Patel - General Physician</option>
                    <option value="Dr. Kumar">Dr. Kumar - Orthopedic</option>
                    <option value="Dr. Gupta">Dr. Gupta - Pediatrician</option>
                    <option value="Dr. Verma">Dr. Verma - Dermatologist</option>
                    <option value="Dr. Singh">Dr. Singh - Neurologist</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="reschedule-date">Appointment Date</label>
                  <input
                    type="date"
                    id="reschedule-date"
                    value={rescheduleData.date}
                    onChange={(e) => handleRescheduleChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reschedule-time">Time Slot</label>
                  <select
                    id="reschedule-time"
                    value={rescheduleData.timeSlot}
                    onChange={(e) => handleRescheduleChange('timeSlot', e.target.value)}
                    required
                  >
                    <option value="">Select Time</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="reschedule-type">Appointment Type</label>
                  <select
                    id="reschedule-type"
                    value={rescheduleData.appointmentType}
                    onChange={(e) => handleRescheduleChange('appointmentType', e.target.value)}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Emergency">Emergency</option>
                    <option value="General Checkup">General Checkup</option>
                    <option value="Routine Check">Routine Check</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="reschedule-notes">Notes</label>
                  <textarea
                    id="reschedule-notes"
                    value={rescheduleData.notes}
                    onChange={(e) => handleRescheduleChange('notes', e.target.value)}
                    placeholder="Any additional notes or special instructions"
                    rows="3"
                  />
                </div>
              </div>

              <div className="reschedule-actions">
                <button type="button" className="cancel-reschedule-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="confirm-reschedule-btn">
                  <RotateCcw size={16} />
                  Reschedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
