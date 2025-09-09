import React, { useState } from 'react';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';
import '../../assets/css/bookappointment.css';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    timeSlot: '',
    appointmentType: 'consultation',
    notes: ''
  });

  const [availableSlots, setAvailableSlots] = useState([
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', 
    '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'
  ]);

  const patients = [
    { id: 1, name: 'Rajesh Kumar', mobile: '98765 43210' },
    { id: 2, name: 'Priya Singh', mobile: '98765 43211' },
    { id: 3, name: 'Mohammed Ali', mobile: '98765 43212' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Sharma', specialization: 'Cardiology', available: true },
    { id: 2, name: 'Dr. Patel', specialization: 'General Medicine', available: true },
    { id: 3, name: 'Dr. Kumar', specialization: 'Orthopedics', available: false },
    { id: 4, name: 'Dr. Gupta', specialization: 'Pediatrics', available: true }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment Data:', formData);
    // Handle appointment booking logic here
  };

  const handleCancel = () => {
    setFormData({
      patientId: '',
      doctorId: '',
      appointmentDate: '',
      timeSlot: '',
      appointmentType: 'consultation',
      notes: ''
    });
  };

  return (
    <div className="book-appointment-container">
      <div className="page-header">
        <h2 className="page-title">Book Appointment</h2>
        <p className="page-subtitle">Schedule appointment with doctor and time slot</p>
      </div>

      <div className="appointment-form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="patientId">
                <User size={16} />
                Select Patient *
              </label>
              <select
                id="patientId"
                name="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose Patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.mobile}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="doctorId">
                <Stethoscope size={16} />
                Select Doctor *
              </label>
              <select
                id="doctorId"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose Doctor</option>
                {doctors.filter(doctor => doctor.available).map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="appointmentDate">
                <Calendar size={16} />
                Appointment Date *
              </label>
              <input
                type="date"
                id="appointmentDate"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="timeSlot">
                <Clock size={16} />
                Time Slot *
              </label>
              <select
                id="timeSlot"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Time</option>
                {availableSlots.map(slot => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="appointmentType">Appointment Type</label>
              <select
                id="appointmentType"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleInputChange}
              >
                <option value="consultation">Consultation</option>
                <option value="follow-up">Follow-up</option>
                <option value="emergency">Emergency</option>
                <option value="routine-checkup">Routine Checkup</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any specific requirements or notes for the appointment"
                rows="3"
              />
            </div>
          </div>

          <div className="appointment-summary">
            <h3>Appointment Summary</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Patient:</span>
                <span className="summary-value">
                  {formData.patientId ? 
                    patients.find(p => p.id == formData.patientId)?.name || 'Not selected' 
                    : 'Not selected'}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Doctor:</span>
                <span className="summary-value">
                  {formData.doctorId ? 
                    doctors.find(d => d.id == formData.doctorId)?.name || 'Not selected' 
                    : 'Not selected'}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Date & Time:</span>
                <span className="summary-value">
                  {formData.appointmentDate && formData.timeSlot ? 
                    `${formData.appointmentDate} at ${formData.timeSlot}` 
                    : 'Not selected'}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Type:</span>
                <span className="summary-value">{formData.appointmentType}</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
