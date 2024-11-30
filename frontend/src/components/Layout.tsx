import React, { useState } from 'react';
import TopNavbar from './TopNavbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen">
            {/* 側邊欄 */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* 主內容 */}
            <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'ml-64' : ''} transition-all duration-300`}>
                <TopNavbar toggleSidebar={toggleSidebar} />
                <main className="p-4 bg-gray-100 flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
