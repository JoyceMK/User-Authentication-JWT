// src/components/Login.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // 👈 import Link
import API from '../services/api';
import './Login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await API.post('/login/', { username, password });
      
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          API.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      
          const profileRes = await API.get('/profile/');
          const role = profileRes.data.role;
      
          if (role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/user-dashboard');
          }
        } catch (error) {
          alert('Login failed');
          console.error(error);
        }
      };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <img
            src="https://images.pexels.com/photos/459653/pexels-photo-459653.jpeg"
            alt="MacBook"
          />
        </div>
        <div className="login-right">
          <div className="login-box">
            <h1 className="main-title">Welcome to User Authentication</h1>
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)

                  } 
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)
                  }
                  required
                />
              </div>
              <div className="button-group">
                <button type="submit">Login</button>
              </div>
              <p className="register-msg">
                Not registered?{' '}
                <Link to="/register" className="register-link">
                  Click here to register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
