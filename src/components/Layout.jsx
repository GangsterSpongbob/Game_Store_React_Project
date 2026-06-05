import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className="layout-main" style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;