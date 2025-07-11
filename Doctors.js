import React, { useEffect, useState } from 'react';
import api from '../api';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    available: true
  });

  // Fetch doctors on component load
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get('/doctors');
      setDoctors(res.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setNewDoctor(prev => ({ ...prev, available: !prev.available }));
  };

  const addDoctor = async () => {
    try {
      await api.post('/doctors', newDoctor);
      alert("Doctor added successfully!");
      fetchDoctors();
      setNewDoctor({ name: '', specialty: '', available: true });
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const deleteDoctor = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await api.delete(`/doctors/${id}`);
        fetchDoctors();
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };

  const toggleAvailability = async (id, currentStatus) => {
    try {
      await api.put(`/doctors/${id}`, { available: !currentStatus });
      fetchDoctors();
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Doctors</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newDoctor.name}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          name="specialty"
          placeholder="Specialty"
          value={newDoctor.specialty}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <label style={{ marginRight: '10px' }}>
          <input
            type="checkbox"
            checked={newDoctor.available}
            onChange={handleCheckboxChange}
          />
          Available
        </label>
        <button onClick={addDoctor}>Add Doctor</button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialty</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              <td>{doctor.available ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => toggleAvailability(doctor.id, doctor.available)}>
                  Toggle Availability
                </button>
                <button onClick={() => deleteDoctor(doctor.id)} style={{ marginLeft: '10px' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;
