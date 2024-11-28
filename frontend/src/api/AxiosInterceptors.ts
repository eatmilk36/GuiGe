import axios from 'axios';

const API_URL = 'http://localhost:3333/api/';

// 建立 Axios 實例
const apiClient = axios.create({
    baseURL: API_URL,
});

// 添加請求攔截器來統一處理 Authorization
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // 從 localStorage 取得 token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // 添加 JWT 到 Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Login API
export const login = async (username: string, password: string) => {
    const response = await apiClient.post('/login', {username, password});
    return response.data;
};

// List API
export const list = async () => {
    const response = await apiClient.get('/list');
    return response.data;
};

export default apiClient;
