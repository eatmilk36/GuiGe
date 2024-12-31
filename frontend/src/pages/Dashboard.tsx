import React, { useState, useEffect } from 'react';
import { dashboard } from '../api/dailySales/DailySalesApi';

interface SalesData {
    totalSales: number;
    type: "daily" | "monthly" | "quarterly" | "yearly";
}

// 骨架屏元件 (SkeletonCard)
const SkeletonCard: React.FC = () => (
    <div className="animate-pulse bg-gray-300 p-4 rounded-lg shadow-md h-24"></div>
);

// 全屏載入動畫元件
const LoadingScreen: React.FC = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="text-center">
            <p className="text-2xl font-semibold mb-4 text-gray-700">資料載入中，請稍後...</p>
            <div className="animate-bounce text-5xl">📊</div>
        </div>
    </div>
);

const SalesCard: React.FC<{ title: string; value: number; bgColor: string }> = ({ title, value, bgColor }) => (
    <div className={`${bgColor} text-white p-4 rounded-lg shadow-md`}>
        <h2 className="text-lg font-bold">{value} 元</h2>
        <p>{title}</p>
    </div>
);

const Dashboard: React.FC = () => {
    const [salesData, setSalesData] = useState<SalesData[] | null>(null); // 初始為 null
    const [loading, setLoading] = useState(true); // 載入狀態
    const [error, setError] = useState<string | null>(null); // 錯誤信息

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await dashboard();
                setSalesData(response);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('無法載入資料，請稍後再試');
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const typeToTitle: { [key in SalesData["type"]]: string } = {
        daily: "每日營業額",
        monthly: "每月營業額",
        quarterly: "每季營業額",
        yearly: "每年營業額",
    };

    const typeToColor: { [key in SalesData["type"]]: string } = {
        daily: "bg-blue-500",
        monthly: "bg-green-500",
        quarterly: "bg-yellow-500",
        yearly: "bg-red-500",
    };

    const defaultSalesData: SalesData[] = [
        { type: "daily", totalSales: 0 },
        { type: "monthly", totalSales: 0 },
        { type: "quarterly", totalSales: 0 },
        { type: "yearly", totalSales: 0 },
    ];

    const mergedSalesData = defaultSalesData.map((defaultData) => {
        const actualData = salesData?.find((data) => data.type === defaultData.type);
        return actualData || defaultData;
    });

    if (loading) {
        return (
            <div>
                <LoadingScreen />
                <div className="grid grid-cols-4 gap-4 p-4">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">儀錶板</h1>
            <div className="grid grid-cols-4 gap-4">
                {mergedSalesData.map((data) => (
                    <SalesCard
                        key={data.type}
                        title={typeToTitle[data.type]}
                        value={data.totalSales}
                        bgColor={typeToColor[data.type]}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
