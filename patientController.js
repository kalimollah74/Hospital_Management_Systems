const db = require('../db');

//  Get all patients
exports.getAllPatients = (req, res) => {
  const sql = 'SELECT * FROM patients';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

//  Get single patient by ID
exports.getPatientById = (req, res) => {
  const sql = 'SELECT * FROM patients WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

//  Add a new patient
exports.addPatient = (req, res) => {
  const { name, age, gender, disease } = req.body;
  const sql = 'INSERT INTO patients (name, age, gender, disease) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, age, gender, disease], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Patient added successfully', id: result.insertId });
  });
};

//  Update patient by ID
exports.updatePatient = (req, res) => {
  const { name, age, gender, disease } = req.body;
  const sql = 'UPDATE patients SET name = ?, age = ?, gender = ?, disease = ? WHERE id = ?';
  db.query(sql, [name, age, gender, disease, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Patient updated successfully' });
  });
};

//  Delete patient by ID
exports.deletePatient = (req, res) => {
  const sql = 'DELETE FROM patients WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Patient deleted successfully' });
  });
};
