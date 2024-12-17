import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/user/UserApi';
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

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const data = await login(username, password);
            localStorage.setItem('authToken', data.token);
            window.dispatchEvent(new Event('storage'));
            setSnackbar({ message: `登入成功! 歡迎, ${username}.`, type: 'success', open: true });

            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (error) {
            console.error(error);
            setSnackbar({ message: '登入失敗，請檢查帳號與密碼', type: 'error', open: true });
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
        <Box className="login-page flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 px-4">
            <Card className="shadow-lg rounded-lg p-6 w-full max-w-sm">
                <CardContent>
                    <Typography variant="h4" className="text-center font-bold mb-6">
                       登入
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
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'login'}
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
