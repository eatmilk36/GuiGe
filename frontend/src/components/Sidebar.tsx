import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <aside className="bg-gray-800 text-white w-64 h-screen fixed">
            <div className="p-4 text-center text-xl font-bold">AdminLTE</div>
            <ul className="space-y-2">
                <li>
                    <Link to="/dashboard" className="flex items-center p-4 hover:bg-gray-700">
                        <FontAwesomeIcon icon="tachometer-alt" className="mr-4" />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/widgets" className="flex items-center p-4 hover:bg-gray-700">
                        <FontAwesomeIcon icon="th" className="mr-4" />
                        Widgets
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
    );
};

export default Sidebar;
