import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '16px' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;