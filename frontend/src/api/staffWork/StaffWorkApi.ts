import apiClient from '../AxiosInterceptors';
import {StaffWorkCreateRequest} from "./create/StaffWorkCreateRequest";
import {validateStaffWorkCreate} from "./create/StaffWorkCreateRequestValidate";

const API_URL = 'http://localhost:3333/api/';

export const list = async () => {
    const response = await apiClient.get(`${API_URL}staffWork/list`, {});
    return response.data;
};

export const create = async (staffWorkData: StaffWorkCreateRequest) => {
    let errors = await validateStaffWorkCreate(staffWorkData);

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    try {
        const response = await apiClient.post(`${API_URL}staffWork/create`, staffWorkData);
        return response.data;
    } catch (error) {
        return null;
    }
};