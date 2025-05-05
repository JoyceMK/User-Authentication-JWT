// src/router/PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../services/api';

export default function PrivateRoute({ children, allowedRole }) {
  const token = localStorage.getItem('access_token');
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await API.get('/profile/');
        setUserRole(res.data.role);
      } catch (err) {
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserRole();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (!token || userRole !== allowedRole) return <Navigate to="/login" />;
  return children;
}
