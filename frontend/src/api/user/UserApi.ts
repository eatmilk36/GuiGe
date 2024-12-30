import apiClient from '../AxiosInterceptors';
import {UserCreateRequest} from "./create/UserCreateRequest";
import {validateUserCreate} from "./create/UserCreateRequestValidate";

export const login = async (username: string, password: string) => {
    const response = await apiClient.post(`auth/login`, {username, password});
    return response.data;
};

export const list = async () => {
    const response = await apiClient.get(`user/list`, {});
    return response.data;
};

export const create = async (userData: UserCreateRequest) => {
    let errors = await validateUserCreate(userData);

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    try {
        const response = await apiClient.post(`user/register`, userData);
        return response.data;
    } catch (error) {
        return null;
    }
};