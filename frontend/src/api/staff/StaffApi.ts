import apiClient from '../AxiosInterceptors';
import {StaffCreateRequest} from "./create/StaffCreateRequest";
import {validateStaffCreate} from "./create/StaffCreateRequestValidate";

export const list = async () => {
    const response = await apiClient.get(`staff/list`, {});
    return response.data;
};

export const create = async (staffData: StaffCreateRequest) => {
    let errors = await validateStaffCreate(staffData);

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    try {
        const response = await apiClient.post(`staff/create`, staffData);
        return response.data;
    } catch (error) {
        return null;
    }
};