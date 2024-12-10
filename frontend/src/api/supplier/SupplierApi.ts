import apiClient from '../AxiosInterceptors';
import {SupplierCreateRequest} from "./create/SupplierCreateRequest";
import {validateSupplierCreate} from "./create/SupplierCreateRequestValidate";

const API_URL = 'http://localhost:3333/api/';

export const list = async () => {
    const response = await apiClient.get(`${API_URL}supplier/list`, {});
    return response.data;
};

export const create = async (supplierData: SupplierCreateRequest) => {
    let errors = await validateSupplierCreate(supplierData);

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    try {
        const response = await apiClient.post(`${API_URL}supplier/create`, supplierData);
        return response.data;
    } catch (error) {
        return null;
    }
};