import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // No validation – just go to store
    navigate('/store');
  };

  const handleRegister = () => {
    // Also just go to store
    navigate('/store');
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', border: '1px solid black', padding: '16px' }}>
      <h2>Login / Register</h2>
      <div style={{ marginBottom: '12px' }}>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: 'block', width: '100%', marginTop: '4px' }}
        />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', width: '100%', marginTop: '4px' }}
        />
      </div>
      <button onClick={handleLogin} style={{ marginRight: '8px' }}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default LoginPage;