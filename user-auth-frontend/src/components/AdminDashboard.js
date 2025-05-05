import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function AdminDashboard() {
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
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
