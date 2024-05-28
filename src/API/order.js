import axios from 'axios';
import { API_DOMAIN } from '../constants';
import queryString from 'query-string';

export const createOrder = async (orderDetail) => {
    const options = {
        url: `${API_DOMAIN}order/create`,
        method: 'POST',
        data: orderDetail,
    };
    try {
        const response = await axios.request(options);
        const result = response.data;
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getOrders = async (sort) => {
    const options = {
        url: `${API_DOMAIN}order/readMany?${queryString.stringify(sort)}`,
        method: 'GET',
    };

    try {
        const response = await axios.request(options);
        const result = response.data;
        if (result.success) return result.orders;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getOrderById = async (id) => {
    const options = {
        url: `${API_DOMAIN}order/readOne/${id}`,
        method: 'GET',
    };

    try {
        const response = await axios.request(options);
        const result = response.data;
        if (result.success) return result.order;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateOrder = async (orderDetail) => {
    const options = {
        url: `${API_DOMAIN}order/updateOne/${orderDetail._id}`,
        method: 'PUT',
        data: orderDetail,
    };
    console.log(options)
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
        url: `${API_DOMAIN}order/search?searchText=${query}`,
        method: 'GET',
    };

    try {
        const response = await axios.request(options);
        const result = response.data;
        if (result.success) return result.orders;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
