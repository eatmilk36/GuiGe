import apiClient from '../AxiosInterceptors';
import {StaffWorkCreateRequest} from "./create/StaffWorkCreateRequest";
import {validateStaffWorkCreate} from "./create/StaffWorkCreateRequestValidate";

export const list = async () => {
    const response = await apiClient.get(`staffWork/list`, {});
    return response.data;
};

export const deleteStaffWork= async (id: number) => {
    const response = await apiClient.post(`staffWork/delete/${id}`, {});
    return response.data;
};

export const create = async (staffWorkData: StaffWorkCreateRequest) => {
    let errors = await validateStaffWorkCreate(staffWorkData);

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    try {
        const response = await apiClient.post(`staffWork/create`, staffWorkData);
        return response.data;
    } catch (error) {
        return null;
    }
};