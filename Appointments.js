import React, { useEffect, useState } from 'react';
import api from '../api';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    date: '',
    time: ''
  });

  // Fetch data on load
  useEffect(() => {
    api.get('/appointments').then(res => setAppointments(res.data));
    api.get('/patients').then(res => setPatients(res.data));
    api.get('/doctors').then(res => setDoctors(res.data));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', formData);
      alert('Appointment scheduled!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Error scheduling appointment');
    }
  };

  // Delete appointment
  const deleteAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      alert('Appointment deleted!');
      setAppointments(appointments.filter(app => app.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Appointments</h2>

      {/* Appointment Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <select name="patient_id" onChange={handleChange} required>
          <option value="">Select Patient</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <select name="doctor_id" onChange={handleChange} required>
          <option value="">Select Doctor</option>
          {doctors.map(d => (
            <option key={d.id} value={d.id}>{d.name} - {d.specialty}</option>
          ))}
        </select>

        <input type="date" name="date" onChange={handleChange} required />
        <input type="time" name="time" onChange={handleChange} required />

        <button type="submit">Add Appointment</button>
      </form>

      {/* Appointment Table */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(app => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.patient_id}</td>
              <td>{app.doctor_id}</td>
              <td>{app.date}</td>
              <td>{app.time}</td>
              <td><button onClick={() => deleteAppointment(app.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
