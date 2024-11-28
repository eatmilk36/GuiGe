import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* 登入頁面 */}
                <Route path="/login" element={<LoginPage />} />

                {/* 使用 Layout 包裹的子路由 */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} /> {/* 預設頁面為 Dashboard */}
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
