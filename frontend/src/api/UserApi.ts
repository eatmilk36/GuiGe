import apiClient from './AxiosInterceptors';

const API_URL = 'http://localhost:3333/api/';

export const login = async (username: string, password: string) => {
    const response = await apiClient.post(`${API_URL}auth/login`, {username, password});
    return response.data;
};

export const list = async () => {
    const response = await apiClient.get(`${API_URL}user/list`, {});
    return response.data;
};