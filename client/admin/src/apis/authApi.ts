/* eslint-disable no-useless-catch */
import axios from './axiosConfig.js';

export const loginApi = async (username: string, password: string) => {
    try {
        const response = await axios.post('/auth/users', {
            username,
            password,
        });
        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
        }

        return response;
    } catch (error) {
        throw error;
    }
};
