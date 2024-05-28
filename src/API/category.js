import axios from 'axios';
import queryString from 'query-string';
import { API_DOMAIN } from '../constants';

export const getCategoryBySort = async (sort) => {
    const options = {
        url: `${API_DOMAIN}category/readBySort/?sort=${Object.values(sort)[0]}`,
        method: 'GET',
    };
    try {
        const response = await axios.request(options);
        const result = response.data;
        return result.category;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const createCategory = async (categoryInfor) => {
    const options = {
        url: `${API_DOMAIN}category/create`,
        method: 'POST',
        data: categoryInfor,
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

export const updateCategory = async (categoryInfor) => {
    const options = {
        url: `${API_DOMAIN}category/updateOne/${categoryInfor._id}`,
        method: 'PUT',
        data: categoryInfor,
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

export const createSubCategory = async (subCategoryInfor) => {
    const options = {
        url: `${API_DOMAIN}subcategory/create`,
        method: 'POST',
        data: subCategoryInfor,
    };

    try {
        const response = await axios.request(options);
        const result = response.data;
        return result.sucess;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getSubcategoryByCategory = async (categoryId) => {
    const options = {
        url: `${API_DOMAIN}subcategory/readByCategory/${categoryId}`,
        method: 'GET',
    };
    try {
        const response = await axios.request(options);
        const result = response.data;
        return result.subCategories;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateSubCategory = async (subCategoryInfor) => {
    const options = {
        url: `${API_DOMAIN}subcategory/updateOne/${subCategoryInfor._id}`,
        method: 'PUT',
        data: subCategoryInfor,
    };

    try {
        const response = await axios.request(options);
        const result = response.data;
        return result.sucess;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getSearch = async (query) => {
    const options = {
        url: `${API_DOMAIN}category/search?categoryName=${query}`,
        method: 'GET',
    };
    try {
        const response = await axios.request(options);
        const result = response.data;
        if (result.success) return result.categories;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getCategoryByType = async (query) => {
    const options = {
        url: `http://localhost:5000/api/category/readByType?${queryString.stringify(query)}`,
        method: 'GET',
    };
    try {
        const response = await axios.request(options);
        const result = response.data;
        return result.categories;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};
