const db = require('../db');

//  Get all doctors
exports.getAllDoctors = (req, res) => {
  const sql = 'SELECT * FROM doctors';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

//  Get a single doctor by ID
exports.getDoctorById = (req, res) => {
  const sql = 'SELECT * FROM doctors WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
};

//  Add a new doctor
exports.addDoctor = (req, res) => {
  const { name, specialty, available } = req.body;
  const sql = 'INSERT INTO doctors (name, specialty, available) VALUES (?, ?, ?)';
  db.query(sql, [name, specialty, available], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'Doctor added successfully', id: result.insertId });
  });
};

//  Update an existing doctor
exports.updateDoctor = (req, res) => {
  const { name, specialty, available } = req.body;
  const sql = 'UPDATE doctors SET name = ?, specialty = ?, available = ? WHERE id = ?';
  db.query(sql, [name, specialty, available, req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Doctor updated successfully' });
  });
};

//  Delete a doctor by ID
exports.deleteDoctor = (req, res) => {
  const sql = 'DELETE FROM doctors WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Doctor deleted successfully' });
  });
};
