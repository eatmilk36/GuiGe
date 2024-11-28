import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TopNavbar: React.FC = () => {
    return (
        <nav className="bg-white border-b shadow-md px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-black focus:outline-none lg:hidden">
                    <FontAwesomeIcon icon="bars" />
                </button>
                <h1 className="text-xl font-bold text-gray-700">AdminLTE</h1>
            </div>
            <div className="flex items-center space-x-6">
                <button className="text-gray-600 hover:text-black">
                    <FontAwesomeIcon icon="envelope" />
                </button>
                <button className="text-gray-600 hover:text-black">
                    <FontAwesomeIcon icon="bell" />
                </button>
                <div className="flex items-center space-x-2">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="text-gray-700 font-medium">Alexander Pierce</span>
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;
