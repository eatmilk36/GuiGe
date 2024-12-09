import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { create } from '../../api/user/UserApi';
import { UserCreateRequest } from "../../api/user/UserCreateRequest";
import { toast } from 'react-toastify';

const UserAddPage: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleAddUser = async () => {
        const requestData: UserCreateRequest = {
            username,
            email,
            password,
            isActive: true,
        };
        let response = await create(requestData);
        if (response == null) {
            return;
        }

        if (Object.keys(response).length > 1 && Object.keys(response)[0] !== 'message') {
            setErrors(response);
            return;
        }
        toast.success('使用者新增成功！', { position: 'top-right' }); // 顯示成功通知
        navigate('/users'); // 跳轉至列表頁
    };

    return (
        <Box
            p={3}
            component={Paper}
            className="max-w-xl mx-auto my-6"
            style={{ overflowX: 'auto' }}
        >
            <Typography variant="h4" gutterBottom>
                Add User
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={Boolean(errors.username)}
                    helperText={errors.username}
                    fullWidth
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    fullWidth
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleAddUser} fullWidth>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default UserAddPage;
