import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token); // Save token for authenticated sessions
      alert("Login Successful!");
      setIsLoggedIn(true);

      // Redirect to the profile page
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
