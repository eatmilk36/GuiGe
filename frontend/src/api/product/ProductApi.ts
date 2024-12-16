import apiClient from '../AxiosInterceptors';
import {validateProductCreate} from "./create/ProductCreateRequestValidate";
import {ProductCreateRequest} from "./create/ProductCreateRequest";

const API_URL = 'http://localhost:3333/api/';

export const list = async () => {
    const response = await apiClient.get(`${API_URL}product/list`, {});
    return response.data;
};

export const create = async (supplierData: ProductCreateRequest) => {
    let errors = await validateProductCreate(supplierData);

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    try {
        const response = await apiClient.post(`${API_URL}product/create`, supplierData);
        return response.data;
    } catch (error) {
        return null;
    }
};