import apiClient from '../AxiosInterceptors';
import {DailySalesCreateRequest} from "./create/DailySalesCreateRequest";
import {validateDailySalesCreate} from "./create/DailySalesCreateRequestValidate";

const API_URL = 'http://localhost:3333/api/';

export const list = async () => {
    const response = await apiClient.get(`${API_URL}dailySales/list`, {});
    return response.data;
};

export const create = async (dailySalesData: DailySalesCreateRequest) => {
    let errors = await validateDailySalesCreate(dailySalesData);

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    try {
        const response = await apiClient.post(`${API_URL}dailySales/create`, dailySalesData);
        return response.data;
    } catch (error) {
        return null;
    }
};