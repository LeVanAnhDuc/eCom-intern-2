/* eslint-disable no-useless-catch */
import axios from './axiosConfig.js';
import { IAllProductAPI } from '../types/IProduct.js';

const filterUndefinedParams = (params: Record<string, string | number | boolean | undefined>): string => {
    const validParams: string[] = [];

    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key) && params[key] !== undefined && params[key] !== '') {
            validParams.push(`${key}=${params[key]}`);
        }
    }

    return validParams.join('&');
};

export const getAllProductsAPI = async (object: IAllProductAPI) => {
    const filteredParams = filterUndefinedParams({
        searchTerm: object.searchTerm,
        page: object.page,
        sortBy: object.sortBy,
        sortType: object.sortType,
        active: object.active,
    });
    try {
        const response = await axios.get(`/products?${filteredParams}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getProductAPI = async (id: number) => {
    try {
        const response = await axios.get(`/products/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};
