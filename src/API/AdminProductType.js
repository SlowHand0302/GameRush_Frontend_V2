import axios from 'axios';
import queryString from 'query-string';
import { API_DOMAIN } from '../constants';

export const getProductTypesByFilter = async (query) => {
    const options = {
        url: `${API_DOMAIN}productType/readByFilter?${queryString.stringify(query)}`,
        method: 'GET',
    };
    try {
        const response = await axios.request(options);
        const result = response.data;
        return result.productTypes;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const createProductType = async (productTypeInfor) => {
    const options = {
        url: `${API_DOMAIN}productType/create`,
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: productTypeInfor,
    };

    try {
        const response = await axios.request(options);
        const result = response.data;
        return result.success;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateProductType = async (productTypeInfor) => {
    const options = {
        url: `${API_DOMAIN}productType/updateOne/${productTypeInfor._id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: productTypeInfor,
    };
    console.log(options.data);
    try {
        const response = await axios.request(options);
        const result = response.data;
        return result.success;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getSearch = async (query) => {
    const options = {
        url: `${API_DOMAIN}productType/search?name=${query}`,
        method: 'GET',
    };

    try {
        const response = await axios.request(options);
        const result = response.data;
        if (result.success) return result.productTypes;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
