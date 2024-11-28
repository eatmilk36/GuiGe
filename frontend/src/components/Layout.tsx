import React from 'react';
import TopNavbar from './TopNavbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div className="flex">
            <Sidebar /> {/* 側邊欄 */}
            <div className="flex-1 flex flex-col ml-64">
                <TopNavbar /> {/* 頂部導航欄 */}
                <main className="p-6 bg-gray-100 flex-1">
                    <Outlet /> {/* 渲染子頁面 */}
                </main>
            </div>
        </div>
    );
};

export default Layout;
