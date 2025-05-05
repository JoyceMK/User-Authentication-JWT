import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function UserDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
      // Clear tokens and role
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
  
      // Optionally clear default auth headers
      delete API.defaults.headers.common['Authorization'];
  
  
      // Redirect to login
      navigate('/login');
    };


    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Welcome to User Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }