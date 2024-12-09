import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const UserActions: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-black">
                <FontAwesomeIcon icon="envelope" />
            </button>
            <button className="text-gray-600 hover:text-black">
                <FontAwesomeIcon icon="bell" />
            </button>
            <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-medium focus:outline-none"
            >
                登出
            </button>
        </div>
    );
};

export default UserActions;
