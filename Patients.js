import React, { useEffect, useState } from 'react';
import api from '../api';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    disease: ''
  });
  const [editId, setEditId] = useState(null);

  // Fetch patients from server
  const fetchPatients = () => {
    api.get('/patients')
      .then(res => setPatients(res.data))
      .catch(err => console.error('Error fetching patients', err));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editId) {
      api.put(`/patients/${editId}`, formData).then(() => {
        alert("Patient updated!");
        setFormData({ name: '', age: '', gender: '', disease: '' });
        setEditId(null);
        fetchPatients();
      });
    } else {
      api.post('/patients', formData).then(() => {
        alert("Patient added!");
        setFormData({ name: '', age: '', gender: '', disease: '' });
        fetchPatients();
      });
    }
  };

  const handleEdit = (patient) => {
    setFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      disease: patient.disease
    });
    setEditId(patient.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      api.delete(`/patients/${id}`).then(() => {
        alert("Patient deleted!");
        fetchPatients();
      });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🧍 Patient Management</h2>
      <div style={{ marginBottom: '10px' }}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleInputChange} />
        <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleInputChange} />
        <input name="disease" placeholder="Disease" value={formData.disease} onChange={handleInputChange} />
        <button onClick={handleAddOrUpdate}>{editId ? 'Update' : 'Add'} Patient</button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Disease</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{p.disease}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)} style={{ marginLeft: '5px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Patients;
