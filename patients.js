const express = require('express');
const router = express.Router();
const db = require('../db');
const patientController = require('../controllers/patientController');

router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.post('/', patientController.addPatient);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);


// ✅ GET all patients
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM patients';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// ✅ GET single patient by ID
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM patients WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
});

// ✅ POST (Add) a new patient
router.post('/', (req, res) => {
  const { name, age, gender, disease } = req.body;
  const sql = 'INSERT INTO patients (name, age, gender, disease) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, age, gender, disease], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Patient added successfully', id: result.insertId });
  });
});


// ✅ PUT (Update) patient by ID
router.put('/:id', (req, res) => {
  const { name, age, gender, disease } = req.body;
  const sql = 'UPDATE patients SET name = ?, age = ?, gender = ?, disease = ? WHERE id = ?';
  db.query(sql, [name, age, gender, disease, req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Patient updated successfully' });
  });
});

// ✅ DELETE patient by ID
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM patients WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Patient deleted successfully' });
  });
});

module.exports = router;
