import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <>
            {/* 側邊欄 */}
            <aside
                className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative`}
            >
                <div className="p-4 text-center text-xl font-bold">後臺管理系統</div>
                <ul className="space-y-2">
                    <li>
                        <Link to="/dashboard" className="flex items-center p-4 hover:bg-gray-700">
                            <FontAwesomeIcon icon="tachometer-alt" className="mr-4" />儀錶板
                        </Link>
                    </li>
                    <li>
                        <Link to="/users" className="flex items-center p-4 hover:bg-gray-700">
                            <FontAwesomeIcon icon={faUsers} className="mr-4" />使用者
                        </Link>
                    </li>
                    <li>
                        <Link to="/supplier" className="flex items-center p-4 hover:bg-gray-700">
                            <FontAwesomeIcon icon="th" className="mr-4" />供應商
                        </Link>
                    </li>
                    <li>
                        <Link to="/charts" className="flex items-center p-4 hover:bg-gray-700">
                            <FontAwesomeIcon icon="chart-pie" className="mr-4" />
                            Charts
                        </Link>
                    </li>
                </ul>
            </aside>

            {/* 遮罩層 */}
            {isOpen && (
                <button
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
                    onClick={toggleSidebar}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            toggleSidebar();
                        }
                    }}
                    aria-label="Close Sidebar" // 為無障礙性提供描述
                />
            )}
        </>
    );
};

export default Sidebar;
