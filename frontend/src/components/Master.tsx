import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Master: React.FC = () => {
    return (
        <div className="flex h-screen">
            {/* 側邊欄 */}
            <nav className="w-1/4 bg-gray-800 text-white">
                <ul className="p-4">
                    <li className="mb-4">
                        <Link to="/dashboard" className="text-white">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/settings" className="text-white">Settings</Link>
                    </li>
                </ul>
            </nav>

            {/* 主內容區域 */}
            <div className="flex-1 p-6 bg-gray-100">
                <Outlet /> {/* 子頁面將會渲染在這裡 */}
            </div>
        </div>
    );
};

export default Master;
