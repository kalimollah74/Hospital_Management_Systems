const express = require('express');
const router = express.Router();
const db = require('../db');

const doctorController = require('../controllers/doctorController');

router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.post('/', doctorController.addDoctor);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

// GET all doctors
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM doctors';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET a doctor by ID
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM doctors WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Doctor not found' });
    res.json(results[0]);
  });
});

// POST - Add new doctor
router.post('/', (req, res) => {
  const { name, specialty, available } = req.body;
  const sql = 'INSERT INTO doctors (name, specialty, available) VALUES (?, ?, ?)';
  db.query(sql, [name, specialty, available], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Doctor added', doctorId: result.insertId });
  });
});

// PUT - Update doctor info
router.put('/:id', (req, res) => {
  const { name, specialty, available } = req.body;
  const sql = 'UPDATE doctors SET name = ?, specialty = ?, available = ? WHERE id = ?';
  db.query(sql, [name, specialty, available, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Doctor updated' });
  });
});

// DELETE - Remove doctor
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM doctors WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Doctor deleted' });
  });
});

module.exports = router;
