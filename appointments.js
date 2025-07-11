const express = require('express');
const router = express.Router();
const db = require('../db');
const appointmentController = require('../controllers/appointmentController');

/*router.get('/', appointmentController.getAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.post('/', appointmentController.createAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);*/
                         //OR
// GET all appointments
router.get('/', (req, res) => {
  const sql = `
    SELECT appointments.id, patients.name AS patient_name, doctors.name AS doctor_name,
           appointments.date, appointments.time
    FROM appointments
    JOIN patients ON appointments.patient_id = patients.id
    JOIN doctors ON appointments.doctor_id = doctors.id
    ORDER BY appointments.date DESC;
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// POST a new appointment
router.post('/', (req, res) => {
  const { patient_id, doctor_id, date, time } = req.body;
  const sql = `INSERT INTO appointments (patient_id, doctor_id, date, time) VALUES (?, ?, ?, ?)`;
  db.query(sql, [patient_id, doctor_id, date, time], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Appointment created successfully', id: result.insertId });
  });
});

// PUT update an appointment
router.put('/:id', (req, res) => {
  const { patient_id, doctor_id, date, time } = req.body;
  const appointmentId = req.params.id;

  const sql = `UPDATE appointments SET patient_id = ?, doctor_id = ?, date = ?, time = ? WHERE id = ?`;
  db.query(sql, [patient_id, doctor_id, date, time, appointmentId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Appointment updated successfully' });
  });
});

// DELETE an appointment
router.delete('/:id', (req, res) => {
  const appointmentId = req.params.id;
  const sql = `DELETE FROM appointments WHERE id = ?`;
  db.query(sql, [appointmentId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Appointment deleted successfully' });
  });
});

module.exports = router;
