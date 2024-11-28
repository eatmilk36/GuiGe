import React from 'react';
import Button from '@mui/material/Button';

const Settings: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <Button variant="contained" color="primary">保存設定</Button>
        </div>
    );
};

export default Settings;
