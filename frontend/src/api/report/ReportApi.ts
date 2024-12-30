import apiClient from '../AxiosInterceptors';

export const list = async (stall: any, date: any) => {
    const response = await apiClient.get(`report/daily/${stall}/${date}`, {});
    return response.data;
};