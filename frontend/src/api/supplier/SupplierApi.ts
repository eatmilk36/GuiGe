import apiClient from '../AxiosInterceptors';
import {SupplierCreateRequest} from "./create/SupplierCreateRequest";
import {validateSupplierCreate} from "./create/SupplierCreateRequestValidate";

export const list = async () => {
    const response = await apiClient.get(`supplier/list`, {});
    return response.data;
};

export const deleteSupplier= async (id: number) => {
    const response = await apiClient.post(`supplier/delete/${id}`, {});
    return response.data;
};

export const create = async (supplierData: SupplierCreateRequest) => {
    let errors = await validateSupplierCreate(supplierData);

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    try {
        const response = await apiClient.post(`supplier/create`, supplierData);
        return response.data;
    } catch (error) {
        return null;
    }
};