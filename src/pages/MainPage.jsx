import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Video Game Store</h1>
      <button onClick={() => navigate('/login')}>
        Go to Login
      </button>
    </div>
  );
}

export default MainPage;