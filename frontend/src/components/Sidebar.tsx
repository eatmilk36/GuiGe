import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import {
    faUsers,
    faTachometerAlt,
    faTh,
    faBriefcase,
    faMoneyBillAlt,
    faChevronDown,
    faChevronUp
} from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        // 根據當前路徑初始化展開狀態
        setExpanded({
            supplier: location.pathname.startsWith('/supplier'),
            staff: location.pathname.startsWith('/staff'),
            sales: location.pathname.startsWith('/dailySales'),
            report: location.pathname.startsWith('/report'),
        });
    }, [location.pathname]);

    const handleLinkClick = () => {
        if (isOpen) {
            toggleSidebar();
        }
    };

    const toggleExpand = (key: string) => {
        setExpanded((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
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
                            className={`flex items-center p-4 hover:bg-gray-700 ${
                                isActive('/dashboard') ? 'bg-gray-700' : ''
                            }`}
                            onClick={handleLinkClick}
                        >
                            <FontAwesomeIcon icon={faTachometerAlt} className="mr-4"/>儀錶板
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/users"
                            className={`flex items-center p-4 hover:bg-gray-700 ${
                                isActive('/users') ? 'bg-gray-700' : ''
                            }`}
                            onClick={handleLinkClick}
                        >
                            <FontAwesomeIcon icon={faUsers} className="mr-4"/>使用者列表
                        </Link>
                    </li>
                    <li>
                        <button
                            className="flex items-center justify-between w-full p-4 hover:bg-gray-700 focus:outline-none"
                            onClick={() => toggleExpand('staff')}
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faBriefcase} className="mr-4"/>員工管理
                            </div>
                            <FontAwesomeIcon
                                icon={expanded['staff'] ? faChevronUp : faChevronDown}
                            />
                        </button>
                        {expanded['staff'] && (
                            <ul className="ml-6 space-y-2">
                                <li>
                                    <Link
                                        to="/staff"
                                        className={`flex items-center p-4 hover:bg-gray-700 ${
                                            isActive('/staff') ? 'bg-gray-700' : ''
                                        }`}
                                        onClick={handleLinkClick}
                                    >
                                        員工列表
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/staffWork"
                                        className={`flex items-center p-4 hover:bg-gray-700 ${
                                            isActive('/staffWork') ? 'bg-gray-700' : ''
                                        }`}
                                        onClick={handleLinkClick}
                                    >
                                        員工工作
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button
                            className="flex items-center justify-between w-full p-4 hover:bg-gray-700 focus:outline-none"
                            onClick={() => toggleExpand('supplier')}
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faTh} className="mr-4"/>供應商
                            </div>
                            <FontAwesomeIcon
                                icon={expanded['supplier'] ? faChevronUp : faChevronDown}
                            />
                        </button>
                        {expanded['supplier'] && (
                            <ul className="ml-6 space-y-2">
                                <li>
                                    <Link
                                        to="/supplier/list"
                                        className={`flex items-center p-4 hover:bg-gray-700 ${
                                            isActive('/supplier/list') ? 'bg-gray-700' : ''
                                        }`}
                                        onClick={handleLinkClick}
                                    >
                                        供應商列表
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/supplier/products/list"
                                        className={`flex items-center p-4 hover:bg-gray-700 ${
                                            isActive('/supplier/products/list') ? 'bg-gray-700' : ''
                                        }`}
                                        onClick={handleLinkClick}
                                    >
                                        商品列表
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button
                            className="flex items-center justify-between w-full p-4 hover:bg-gray-700 focus:outline-none"
                            onClick={() => toggleExpand('sales')}
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faMoneyBillAlt} className="mr-4"/>營業額
                            </div>
                            <FontAwesomeIcon
                                icon={expanded['sales'] ? faChevronUp : faChevronDown}
                            />
                        </button>
                        {expanded['sales'] && (
                            <ul className="ml-6 space-y-2">
                                <li>
                                    <Link
                                        to="/dailySales"
                                        className={`flex items-center p-4 hover:bg-gray-700 ${
                                            isActive('/dailySales') ? 'bg-gray-700' : ''
                                        }`}
                                        onClick={handleLinkClick}
                                    >
                                        營業額列表
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dailySalesType"
                                        className={`flex items-center p-4 hover:bg-gray-700 ${
                                            isActive('/dailySalesType') ? 'bg-gray-700' : ''
                                        }`}
                                        onClick={handleLinkClick}
                                    >
                                        營業額類型
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button
                            className="flex items-center justify-between w-full p-4 hover:bg-gray-700 focus:outline-none"
                            onClick={() => toggleExpand('report')}
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faTachometerAlt} className="mr-4"/>報表
                            </div>
                            <FontAwesomeIcon
                                icon={expanded['report'] ? faChevronUp : faChevronDown}
                            />
                        </button>
                        {expanded['report'] && (
                            <ul className="ml-6 space-y-2">
                                <li>
                                    <Link
                                        to="/report/1"
                                        className={`flex items-center p-4 hover:bg-gray-700 ${
                                            isActive('/report/grocery') ? 'bg-gray-700' : ''
                                        }`}
                                        onClick={handleLinkClick}
                                    >
                                        每日報表 - 雜貨
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/report/2"
                                        className={`flex items-center p-4 hover:bg-gray-700 ${
                                            isActive('/report/fruit') ? 'bg-gray-700' : ''
                                        }`}
                                        onClick={handleLinkClick}
                                    >
                                        每日報表 - 水果攤
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </aside>

            {/* 遮罩層（僅小螢幕顯示） */}
            {isOpen && (
                <button
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
                    onClick={toggleSidebar}
                    aria-label="Close Sidebar"
                />
            )}
        </>
    );
};

export default Sidebar;
