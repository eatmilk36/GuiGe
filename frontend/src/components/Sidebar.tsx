import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faUsers, faTachometerAlt, faTh, faChartPie } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const handleLinkClick = () => {
        if (isOpen) {
            toggleSidebar();
        }
    };

    return (
        <>
            {/* 側邊欄 */}
            <aside
                className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out z-20 lg:translate-x-0 lg:relative`}
            >
                <div className="p-4 text-center text-xl font-bold">後臺管理系統</div>
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/dashboard"
                            className="flex items-center p-4 hover:bg-gray-700"
                            onClick={handleLinkClick}
                        >
                            <FontAwesomeIcon icon={faTachometerAlt} className="mr-4" />儀錶板
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/users"
                            className="flex items-center p-4 hover:bg-gray-700"
                            onClick={handleLinkClick}
                        >
                            <FontAwesomeIcon icon={faUsers} className="mr-4" />使用者
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/supplier"
                            className="flex items-center p-4 hover:bg-gray-700"
                            onClick={handleLinkClick}
                        >
                            <FontAwesomeIcon icon={faTh} className="mr-4" />供應商
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dailyTurnover"
                            className="flex items-center p-4 hover:bg-gray-700"
                            onClick={handleLinkClick}
                        >
                            <FontAwesomeIcon icon={faChartPie} className="mr-4" />每日營業額
                        </Link>
                    </li>
                </ul>
            </aside>

            {/* 遮罩層（僅小螢幕顯示） */}
            {isOpen && (
                <button
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
                    onClick={toggleSidebar}
                    aria-label="Close Sidebar" // 無障礙性描述
                />
            )}
        </>
    );
};

export default Sidebar;
