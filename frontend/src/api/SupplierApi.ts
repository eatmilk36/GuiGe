import apiClient from './AxiosInterceptors';

const API_URL = 'http://localhost:3333/api/';

export const list = async () => {
    const response = await apiClient.get(`${API_URL}supplier/list`, {});
    return response.data;
};