import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddUserPage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleAddUser = () => {
        // 模擬提交操作
        console.log('User added:', { name, email, role });
        navigate('/'); // 返回用戶列表頁面
    };

    return (
        <Box p={3} component={Paper}>
            <Typography variant="h4" gutterBottom>
                Add User
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Role"
                    variant="outlined"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleAddUser}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default AddUserPage;
