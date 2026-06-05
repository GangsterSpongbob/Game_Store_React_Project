import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { loginUser, registerUser } from '../services/api';

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const user = await loginUser(loginEmail, loginPassword);
      setUser(user);
      navigate('/store');
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegError('');
    try {
      const newUser = await registerUser(regEmail, regUsername, regPassword);
      setUser(newUser);
      navigate('/store');
    } catch (err) {
      setRegError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '32px', maxWidth: '800px', margin: '50px auto' }}>
      {/* Login Column */}
      <div style={{ flex: 1, border: '1px solid black', padding: '16px' }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '12px' }}>
            <label>Email: </label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
              style={{ display: 'block', width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label>Password: </label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
              style={{ display: 'block', width: '100%' }}
            />
          </div>
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Register Column */}
      <div style={{ flex: 1, border: '1px solid black', padding: '16px' }}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '12px' }}>
            <label>Email: </label>
            <input
              type="email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
              style={{ display: 'block', width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label>Username: </label>
            <input
              type="text"
              value={regUsername}
              onChange={(e) => setRegUsername(e.target.value)}
              required
              style={{ display: 'block', width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label>Password: </label>
            <input
              type="password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
              style={{ display: 'block', width: '100%' }}
            />
          </div>
          {regError && <p style={{ color: 'red' }}>{regError}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;