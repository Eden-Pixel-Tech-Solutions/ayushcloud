import React, { useState } from 'react';
import { User, Calendar, FileText, IndianRupee, Printer, Download, Plus, Trash2 } from 'lucide-react';
import '../../assets/css/generatebills.css';

const GenerateBills = () => {
  const [billData, setBillData] = useState({
    patientId: '',
    appointmentId: '',
    billDate: new Date().toISOString().split('T')[0],
    items: [
      { id: 1, description: '', quantity: 1, rate: 0, amount: 0 }
    ],
    discount: 0,
    tax: 18,
    notes: ''
  });

  const patients = [
    { id: 1, name: 'Rajesh Kumar', abhaId: '12-3456-7890-1234', phone: '+91 98765 43210' },
    { id: 2, name: 'Priya Singh', abhaId: '12-3456-7890-1235', phone: '+91 98765 43211' },
    { id: 3, name: 'Mohammed Ali', abhaId: '12-3456-7890-1236', phone: '+91 98765 43212' }
  ];

  const appointments = [
    { id: 1, patientId: 1, doctor: 'Dr. Sharma', date: '2024-01-15', type: 'Consultation' },
    { id: 2, patientId: 2, doctor: 'Dr. Patel', date: '2024-01-16', type: 'Follow-up' },
    { id: 3, patientId: 3, doctor: 'Dr. Kumar', date: '2024-01-17', type: 'Emergency' }
  ];

  const serviceItems = [
    { name: 'Consultation Fee', rate: 500 },
    { name: 'Blood Test', rate: 300 },
    { name: 'X-Ray', rate: 800 },
    { name: 'ECG', rate: 200 },
    { name: 'Ultrasound', rate: 1200 },
    { name: 'Medicine', rate: 0 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...billData.items];
    updatedItems[index][field] = value;
    
    if (field === 'quantity' || field === 'rate') {
      updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
    }
    
    setBillData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const addItem = () => {
    setBillData(prev => ({
      ...prev,
      items: [...prev.items, { 
        id: Date.now(), 
        description: '', 
        quantity: 1, 
        rate: 0, 
        amount: 0 
      }]
    }));
  };

  const removeItem = (index) => {
    if (billData.items.length > 1) {
      setBillData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const calculateSubtotal = () => {
    return billData.items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateDiscount = () => {
    return (calculateSubtotal() * billData.discount) / 100;
  };

  const calculateTax = () => {
    const afterDiscount = calculateSubtotal() - calculateDiscount();
    return (afterDiscount * billData.tax) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const billDetails = {
      ...billData,
      subtotal: calculateSubtotal(),
      discountAmount: calculateDiscount(),
      taxAmount: calculateTax(),
      total: calculateTotal()
    };
    console.log('Generated Bill:', billDetails);
    // Handle bill generation logic here
  };

  const selectedPatient = patients.find(p => p.id == billData.patientId);
  const filteredAppointments = appointments.filter(a => a.patientId == billData.patientId);

  return (
    <div className="generate-bills-container">
      <div className="page-header">
        <h2 className="page-title">Generate Bills</h2>
        <p className="page-subtitle">Create and manage patient billing</p>
      </div>

      <div className="bill-form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Patient Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="patientId">
                  <User size={16} />
                  Select Patient *
                </label>
                <select
                  id="patientId"
                  name="patientId"
                  value={billData.patientId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose Patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} - {patient.phone}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="appointmentId">
                  <Calendar size={16} />
                  Related Appointment
                </label>
                <select
                  id="appointmentId"
                  name="appointmentId"
                  value={billData.appointmentId}
                  onChange={handleInputChange}
                  disabled={!billData.patientId}
                >
                  <option value="">Select Appointment (Optional)</option>
                  {filteredAppointments.map(appointment => (
                    <option key={appointment.id} value={appointment.id}>
                      {appointment.doctor} - {appointment.date} ({appointment.type})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="billDate">
                  <FileText size={16} />
                  Bill Date *
                </label>
                <input
                  type="date"
                  id="billDate"
                  name="billDate"
                  value={billData.billDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {selectedPatient && (
              <div className="patient-details">
                <h4>Patient Details</h4>
                <div className="details-grid">
                  <span><strong>Name:</strong> {selectedPatient.name}</span>
                  <span><strong>ABHA ID:</strong> {selectedPatient.abhaId}</span>
                  <span><strong>Phone:</strong> {selectedPatient.phone}</span>
                </div>
              </div>
            )}
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>Bill Items</h3>
              <button type="button" className="btn add-item" onClick={addItem}>
                <Plus size={16} />
                Add Item
              </button>
            </div>

            <div className="items-table">
              <div className="table-header">
                <span>Description</span>
                <span>Qty</span>
                <span>Rate (₹)</span>
                <span>Amount (₹)</span>
                <span>Action</span>
              </div>

              {billData.items.map((item, index) => (
                <div key={item.id} className="table-row">
                  <div className="item-description">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      placeholder="Enter service/item description"
                      list="serviceItems"
                      required
                    />
                    <datalist id="serviceItems">
                      {serviceItems.map((service, i) => (
                        <option key={i} value={service.name} />
                      ))}
                    </datalist>
                  </div>

                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                    min="1"
                    required
                  />

                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                    required
                  />

                  <span className="amount">₹{item.amount.toFixed(2)}</span>

                  <button
                    type="button"
                    className="btn remove-item"
                    onClick={() => removeItem(index)}
                    disabled={billData.items.length === 1}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <div className="billing-summary">
              <div className="summary-left">
                <div className="form-group">
                  <label htmlFor="notes">Additional Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={billData.notes}
                    onChange={handleInputChange}
                    placeholder="Any additional notes or instructions"
                    rows="3"
                  />
                </div>
              </div>

              <div className="summary-right">
                <div className="calculation-section">
                  <div className="calc-row">
                    <span>Subtotal:</span>
                    <span>₹{calculateSubtotal().toFixed(2)}</span>
                  </div>

                  <div className="calc-row discount-row">
                    <label>
                      Discount (%):
                      <input
                        type="number"
                        name="discount"
                        value={billData.discount}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </label>
                    <span>-₹{calculateDiscount().toFixed(2)}</span>
                  </div>

                  <div className="calc-row tax-row">
                    <label>
                      Tax ({billData.tax}%):
                    </label>
                    <span>+₹{calculateTax().toFixed(2)}</span>
                  </div>

                  <div className="calc-row total-row">
                    <span>Total Amount:</span>
                    <span>₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn secondary">
              <Printer size={16} />
              Preview
            </button>
            <button type="button" className="btn secondary">
              <Download size={16} />
              Save Draft
            </button>
            <button type="submit" className="btn primary">
              <IndianRupee size={16} />
              Generate Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateBills;
