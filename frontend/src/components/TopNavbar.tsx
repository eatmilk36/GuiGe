import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserActions from './Logout';

interface TopNavbarProps {
    toggleSidebar: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ toggleSidebar }) => {
    return (
        <nav className="bg-white border-b shadow-md px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <button
                    className="text-gray-600 hover:text-black focus:outline-none lg:hidden"
                    onClick={toggleSidebar}
                >
                    <FontAwesomeIcon icon="bars" />
                </button>
                <h1 className="text-xl font-bold text-gray-700">後臺管理系統</h1>
            </div>
            <UserActions />
        </nav>
    );
};

export default TopNavbar;
