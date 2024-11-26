import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
};
