import axios from 'axios';

export const createProduct = async (productInfor) => {
    const options = {
        url: 'http://localhost:5000/api/product/create',
        method: 'POST',
        data: productInfor,
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

export const getProduct = async () => {
    const options = {
        url: 'http://localhost:5000/api/product/readMany',
        method: 'GET',
    };

    try {
        const response = await axios.request(options);
        const result = response.data;
        if (result.success) return result.products;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getProductByType = async (typeId) => {
    const options = {
        url: `http://localhost:5000/api/product/readByType/${typeId}`,
        method: 'GET',
    };

    try {
        const response = await axios.request(options);
        const result = response.data;
        return result.products;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getCountByType = async (typeId) => {
    const options = {
        url: `http://localhost:5000/api/product/countByType/${typeId}`,
        method: 'GET',
    };

    try {
        const response = await axios.request(options);
        const result = response.data;
        return result.number;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateProduct = async (productInfor) => {
    const options = {
        url: `http://localhost:5000/api/product/updateOne/${productInfor._id}`,
        method: 'PUT',
        data: productInfor,
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
