/* eslint-disable no-useless-catch */
import IRegister from '../types/IRegister.js';
import axios from './axiosConfig.js';

export const registerApi = async (object: IRegister) => {
    try {
        const response = await axios.post('/users', {
            username: object.username,
            fullname: object.fullName,
            password: object.passWord,
            email: object.email,
        });

        return response;
    } catch (error) {
        throw error;
    }
};

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
