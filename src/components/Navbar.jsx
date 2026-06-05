import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div style={{
      width: '150px',
      borderRight: '2px solid black',
      height: '100vh',
      padding: '16px'
    }}>
      <div style={{ marginBottom: '16px' }}>
        <Link to="/store">Store</Link>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Link to="/library">Library</Link>
      </div>
      <div>
        <Link to="/account">Account</Link>
      </div>
    </div>
  );
}

export default Navbar;