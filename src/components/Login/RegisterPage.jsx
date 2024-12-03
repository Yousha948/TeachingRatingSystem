import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }


    axios
    .post('http://localhost:5000/auth/register', formData)
    .then((res) => {
      console.log("Registered successfully");
      alert(`Registration successful for ${formData.name}!`);
      navigate('/'); // Navigate after successful registration
    })
    .catch((err) => {
      if (err.response) {
        // Server responded with a status code outside the 2xx range
        if (err.response.status === 400) {
          alert("Email is already registered. Please try a different one.");
        } else {
          alert(`Registration failed: ${err.response.data || "Unexpected error"}`);
        }
      }
    })
    ;
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Student ID</label>
          <input
            type="text"
            className="form-control"
            name="studentId"
            placeholder="Enter your student ID"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
