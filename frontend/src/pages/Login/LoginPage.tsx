import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
import { login } from '../../api/UserApi';
import AutoCloseSnackbar from '../../components/AutoCloseSnackbar';
import { TextField, Button, Typography, Box, Card, CardContent, CircularProgress } from '@mui/material';
import '../../styles/tailwind.css';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error'; open: boolean }>({
        message: '',
        type: 'success',
        open: false,
    });

    const navigate = useNavigate(); // 初始化 useNavigate

    const handleLogin = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const data = await login(username, password);
            // 儲存 token 到 localStorage
            localStorage.setItem('authToken', data.token);
            console.log('Login successful! Welcome, ' + data.username + '. Your token is ' + data.token);
            setSnackbar({ message: `Login successful! Welcome, ${username}.`, type: 'success', open: true });

            // 延遲一段時間後跳轉到目標頁面
            setTimeout(() => {
                navigate('/dashboard'); // 導向至目標頁面
            }, 1000);
        } catch (error) {
            console.log(error)
            setSnackbar({ message: 'Login failed. Please check your username and password.', type: 'error', open: true });
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <Box className="login-page flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            <Card className="shadow-lg rounded-lg p-6 w-full max-w-sm">
                <CardContent>
                    <Typography variant="h4" className="text-center font-bold mb-4">
                        Login to Your Account
                    </Typography>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="mt-4"
                        size="large"
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </Button>
                </CardContent>
            </Card>
            <AutoCloseSnackbar
                message={snackbar.message}
                type={snackbar.type}
                open={snackbar.open}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
        </Box>
    );
};

export default LoginPage;
