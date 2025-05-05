import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get('profile/')
      .then(res => setProfile(res.data))
      .catch(() => alert('Failed to fetch profile'));
  }, []);

  return profile ? (
    <div>
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
    </div>
  ) : <p>Loading...</p>;
};

export default Profile;
