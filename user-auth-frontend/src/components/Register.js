// src/components/Register.js
import { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/register/', formData);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data);
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-left">
          <img
            src="https://images.pexels.com/photos/374631/pexels-photo-374631.jpeg"
            alt="Auth Visual"
          />
        </div>
        <div className="register-right">
          <div className="register-form-box">
            <h2 className="main-title">Welcome to User Registration</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <select onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit">Register</button>
            </form>
            <p className="auth-link">
              Already registered? <Link to="/login">Click to login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
