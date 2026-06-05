import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import StorePage from './pages/StorePage';
import LibraryPage from './pages/LibraryPage';
import AccountPage from './pages/AccountPage';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Pages with navbar */}
        <Route element={<Layout />}>
          <Route path="/store" element={<StorePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;