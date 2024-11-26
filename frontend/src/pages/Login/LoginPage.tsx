import React, { useState } from 'react';
import { login } from '../../api/authApi';
import './LoginPage.scss';
import Alert from '../../components/Alert/Alert';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleLogin = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const data = await login(username, password);
            setAlert({ message: `Login successful: ${data.token}`, type: 'success' });
        } catch (error) {
            setAlert({ message: 'Login failed. Please check your username and password.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    const closeAlert = () => setAlert(null);

    return (
        <div className="login-page">
            <h1>Welcome Back</h1>
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <div className="alert-container">
                {alert && <Alert message={alert.message} type={alert.type} onClose={closeAlert} />}
            </div>
        </div>
    );
};

export default LoginPage;
