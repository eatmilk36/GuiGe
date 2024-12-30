import apiClient from '../AxiosInterceptors';

const API_URL = 'http://localhost:3333/api/';

export const list = async (stall: any, date: any) => {
    const response = await apiClient.get(`${API_URL}report/daily/${stall}/${date}`, {});
    return response.data;
};