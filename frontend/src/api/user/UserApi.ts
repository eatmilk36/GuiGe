import apiClient from '../AxiosInterceptors';
import {UserCreateRequest} from "./UserCreateRequest";
import {validateUserCreate} from "./UserCreateRequestValidate";

const API_URL = 'http://localhost:3333/api/';

export const login = async (username: string, password: string) => {
    const response = await apiClient.post(`${API_URL}auth/login`, {username, password});
    return response.data;
};

export const list = async () => {
    const response = await apiClient.get(`${API_URL}user/list`, {});
    return response.data;
};

export const create = async (userData: UserCreateRequest) => {
    let errors = await validateUserCreate(userData);

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    try {
        const response = await apiClient.post(`${API_URL}user/register`, userData);
        return response.data;
    } catch (error) {
        return null;
    }
};