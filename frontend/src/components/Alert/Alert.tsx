import React from 'react';
import './Alert.scss';

interface AlertProps {
    message: string;
    type: 'success' | 'error'; // 定義警告類型
    onClose: () => void; // 關閉警告的回調函數
}

const Alert: React.FC<AlertProps> = ({message, type, onClose}) => {
    return (
        <div className={`alert alert-${type}`}>
            <span>{message}</span>
            <button onClick={onClose}>&times;</button>
        </div>
    );
};

export default Alert;
