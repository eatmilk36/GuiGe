import React, {useEffect, useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import UserAddPage from './pages/user/UserAddPage';
import SupplierListPage from "./pages/supplier/SupplierListPage";
import UserListPage from "./pages/user/UserListPage";
import SupplierAddPage from "./pages/supplier/SupplierAddPage";
import DailySalesListPage from "./pages/dailySales/DailySalesListPage";
import DailySalesAddPage from "./pages/dailySales/DailySalesAddPage";
import ProductListPage from "./pages/product/ProductListPage";
import ProductAddPage from "./pages/product/ProductAddPage";

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

    // 檢查 localStorage 中的認證變化
    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('authToken'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <Routes>
            {/* 登入頁面 */}
            <Route path="/login" element={<LoginPage/>}/>

            {/* 受保護的路由 */}
            {isAuthenticated ? (
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Dashboard/>}/> {/* 預設頁面為 Dashboard */}
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="settings" element={<Settings/>}/>
                    <Route path="users" element={<UserListPage/>}/> {/* 用戶列表頁面 */}
                    <Route path="users/add" element={<UserAddPage/>}/> {/* 新增用戶頁面 */}
                    <Route path="supplier/list" element={<SupplierListPage/>}/>
                    <Route path="supplier/add" element={<SupplierAddPage/>}/>
                    <Route path="supplier/products/list" element={<ProductListPage/>}/>
                    <Route path="/supplier/products/add" element={<ProductAddPage/>}/>
                    <Route path="dailySales" element={<DailySalesListPage/>}/>
                    <Route path="dailySales/add" element={<DailySalesAddPage/>}/>
                </Route>
            ) : (
                <Route path="*" element={<Navigate to="/login" replace/>}/>
            )}
        </Routes>
    );
};

export default App;
