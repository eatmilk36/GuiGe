import apiClient from '../AxiosInterceptors';
import {DailySalesCreateRequest} from "./create/DailySalesCreateRequest";
import {validateDailySalesCreate} from "./create/DailySalesCreateRequestValidate";

export const dashboard = async () => {
    const response = await apiClient.get(`dailySales/dashboard`, {});
    return response.data;
};

export const list = async () => {
    const response = await apiClient.get(`dailySales/list`, {});
    return response.data;
};

export const deleteDailySales= async (id: number) => {
    const response = await apiClient.post(`dailySales/delete/${id}`, {});
    return response.data;
};

export const create = async (dailySalesData: DailySalesCreateRequest) => {
    let errors = await validateDailySalesCreate(dailySalesData);

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    try {
        const response = await apiClient.post(`dailySales/create`, dailySalesData);
        return response.data;
    } catch (error) {
        return null;
    }
};