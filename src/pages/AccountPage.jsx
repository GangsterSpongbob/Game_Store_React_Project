import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { updateUser } from '../services/api';

function AccountPage() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');

  // If no user is logged in (should not happen because we'll protect routes later)
  if (!user) {
    return <div>Please log in. <button onClick={() => navigate('/login')}>Go to Login</button></div>;
  }

  const handleChangeUsername = async () => {
    if (!newUsername.trim()) {
      setError('Username cannot be empty');
      return;
    }
    setError('');
    try {
      // Update in json-server
      const updatedUser = await updateUser(user.id, { username: newUsername });
      // Update context
      setUser(updatedUser);
      // Close prompt
      setShowUsernamePrompt(false);
      setNewUsername('');
    } catch (err) {
      setError('Failed to update username');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      // Delete user from json-server
      await fetch(`http://localhost:5000/users/${user.id}`, { method: 'DELETE' });
      setUser(null);
      navigate('/');
    }
  };

  return (
    <div>
      <h2>Account</h2>
      <div style={{ border: '1px solid black', padding: '16px', marginBottom: '16px' }}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <button onClick={() => setShowUsernamePrompt(true)}>Change Username</button>
      </div>

      {showUsernamePrompt && (
        <div style={{ border: '1px solid black', padding: '16px', marginBottom: '16px' }}>
          <h3>Change Username</h3>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter new username"
            style={{ display: 'block', marginBottom: '8px', width: '100%' }}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleChangeUsername} style={{ marginRight: '8px' }}>Save</button>
          <button onClick={() => { setShowUsernamePrompt(false); setError(''); setNewUsername(''); }}>Cancel</button>
        </div>
      )}

      <div style={{ border: '1px solid black', padding: '16px', marginBottom: '16px' }}>
        <p><strong>Owned games:</strong> {user.library ? user.library.length : 0}</p>
      </div>

      <div style={{ border: '1px solid black', padding: '16px' }}>
        <button onClick={handleLogout} style={{ marginRight: '8px' }}>Log Out</button>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  );
}

export default AccountPage;