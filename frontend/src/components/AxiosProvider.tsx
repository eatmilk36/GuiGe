import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setupInterceptors } from '../api/AxiosInterceptors';

const AxiosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        setupInterceptors(navigate); // 傳遞 navigate 到 Axios 攔截器
    }, [navigate]);

    return <>{children}</>;
};

export default AxiosProvider;
