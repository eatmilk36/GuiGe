import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">儀錶板</h1>
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold">150</h2>
                    <p>New Orders</p>
                </div>
                <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold">53%</h2>
                    <p>Bounce Rate</p>
                </div>
                <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold">44</h2>
                    <p>User Registrations</p>
                </div>
                <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold">65</h2>
                    <p>Unique Visitors</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
