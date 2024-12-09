import axios from 'axios';

const API_URL = 'http://localhost:3333/api/';

// 定義回調函數類型
type RefreshCallback = (newToken: string) => void;

const apiClient = axios.create({
    baseURL: API_URL,
});

let isRefreshing = false; // 是否正在刷新 Token
const MAX_RETRIES = 3; // 最大重試次數
let retryCount = 0; // 重試計數器
const refreshSubscribers: RefreshCallback[] = []; // 儲存等待刷新完成的請求

// 用於通知所有訂閱者令牌已刷新
const notifyTokenRefreshed = (newToken: string): void => {
    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers.length = 0; // 清空訂閱者列表
};

// 添加訂閱者
const addRefreshSubscriber = (callback: RefreshCallback): void => {
    refreshSubscribers.push(callback);
};

// 檢查並處理刷新 Token
const handleTokenRefresh = async (originalRequest: any, handleLogout: () => void): Promise<any> => {
    if (!isRefreshing) {
        isRefreshing = true;
        try {
            const newToken = await renewToken(); // 呼叫 ReNewToken API
            updateTokenStorage(newToken); // 更新 token 存儲
            notifyTokenRefreshed(newToken); // 通知等待的請求
            return retryRequestWithToken(originalRequest, newToken);
        } catch (error) {
            handleLogout();
            throw wrapError(error, 'Failed to renew token');
        } finally {
            isRefreshing = false;
        }
    } else {
        return new Promise((resolve, _) => {
            addRefreshSubscriber((newToken) => {
                resolve(retryRequestWithToken(originalRequest, newToken));
            });
        });
    }
};

// 包裝非 Error 的錯誤為 Error
const wrapError = (error: unknown, defaultMessage: string): Error => {
    return error instanceof Error ? error : new Error(defaultMessage);
};

// 重試請求並更新 Authorization
const retryRequestWithToken = (originalRequest: any, token: string): Promise<any> => {
    originalRequest.headers.Authorization = `Bearer ${token}`;
    return apiClient(originalRequest);
};

// 添加請求攔截器來統一處理 Authorization
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // 從 localStorage 取得 token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // 添加 JWT 到 Authorization header
        }
        return config;
    },
    (error) => Promise.reject(wrapError(error, 'Request interception error'))
);

// 添加回應攔截器來處理 403 錯誤
export const setupInterceptors = (navigate: (path: string) => void) => {
    const handleLogout = (): void => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    apiClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 403 && !originalRequest._retry) {
                originalRequest._retry = true;

                if (retryCount >= MAX_RETRIES) {
                    handleLogout();
                    retryCount = 0;
                    throw wrapError(error, 'Max retries reached');
                }

                retryCount++;
                return handleTokenRefresh(originalRequest, handleLogout);
            }

            throw wrapError(error, 'Response interception error');
        }
    );
};

// ReNewToken API
const renewToken = async (): Promise<string> => {
    try {
        const response = await axios.post(`${API_URL}renewToken`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        const newToken = response.data.token;
        localStorage.setItem('authToken', newToken); // 更新 token
        return newToken;
    } catch (error) {
        throw wrapError(error, 'Failed to renew token');
    }
};

// 更新 token 存儲
const updateTokenStorage = (newToken: string): void => {
    localStorage.setItem('authToken', newToken);
};

export default apiClient;
