import apiClient from '../AxiosInterceptors';

const API_URL = 'http://localhost:3333/api/';

export const list = async (stall: any) => {
    const response = await apiClient.get(`${API_URL}report/daily/` + stall, {});
    return response.data;
};