const db = require('../db');

//  Get all appointments with patient and doctor names
const getAppointments = (req, res) => {
  const sql = `
    SELECT a.id, a.date, a.time,
           p.name AS patient_name,
           d.name AS doctor_name
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    JOIN doctors d ON a.doctor_id = d.id
    ORDER BY a.date DESC, a.time ASC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

//  Get a single appointment by ID
const getAppointmentById = (req, res) => {
  const sql = `
    SELECT a.id, a.date, a.time,
           p.name AS patient_name,
           d.name AS doctor_name
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    JOIN doctors d ON a.doctor_id = d.id
    WHERE a.id = ?
  `;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

//  Create a new appointment
const createAppointment = (req, res) => {
  const { patient_id, doctor_id, date, time } = req.body;
  const sql = `
    INSERT INTO appointments (patient_id, doctor_id, date, time)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [patient_id, doctor_id, date, time], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Appointment created', id: result.insertId });
  });
};

//  Update appointment by ID
const updateAppointment = (req, res) => {
  const { patient_id, doctor_id, date, time } = req.body;
  const sql = `
    UPDATE appointments
    SET patient_id = ?, doctor_id = ?, date = ?, time = ?
    WHERE id = ?
  `;

  db.query(sql, [patient_id, doctor_id, date, time, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Appointment updated successfully' });
  });
};

//  Delete appointment
const deleteAppointment = (req, res) => {
  const sql = 'DELETE FROM appointments WHERE id = ?';

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Appointment deleted successfully' });
  });
};

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
