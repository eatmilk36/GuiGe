import apiClient from '../AxiosInterceptors';
import {DailySalesTypeCreateRequest} from "./create/DailySalesTypeCreateRequest";
import {validateDailySalesTypeCreate} from "./create/DailySalesTypeCreateRequestValidate";

export const list = async () => {
    const response = await apiClient.get(`dailySalesType/list`, {});
    return response.data;
};

export const create = async (dailySalesTypeData: DailySalesTypeCreateRequest) => {
    let errors = await validateDailySalesTypeCreate(dailySalesTypeData);

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    try {
        const response = await apiClient.post(`dailySalesType/create`, dailySalesTypeData);
        return response.data;
    } catch (error) {
        return null;
    }
};