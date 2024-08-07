import { data } from 'autoprefixer';
import axios from 'axios';
const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

export const login = async (userInfor) => {
    const options = {
        url: `${API_DOMAIN}user/auth`,
        method: 'POST',
        data: userInfor,
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

export const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage'));
    // window.dispatchEvent(new Event('checkAuth'));
};

export const register = async (userInfor) => {
    const options = {
        url: `${API_DOMAIN}user/create`,
        method: 'POST',
        data: userInfor,
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

export const getCurrentUser = () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    return { userId, token };
};

export const getUserById = async (userId, token) => {
    const options = {
        url: `${API_DOMAIN}user/readOne/${userId}`,
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.request(options);
        const result = response.data;
        return result.user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const putUpdateUserById = async (userInfor) => {
    const { userId, token } = getCurrentUser();
    const options = {
        url: `${API_DOMAIN}user/updateOne/${userId}`,
        method: 'PUT',
        headers: {
            authorization: `Bearer ${token}`,
        },
        data: {
            ...userInfor,
        },
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

export const getUsersBySort = async (sort) => {
    const { userId, token } = getCurrentUser();
    const options = {
        url: `${API_DOMAIN}user/readBySort?sort=${sort}`,
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.request(options);
        const result = response.data;
        return result.users;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUsersBySearchName = async (name) => {
    const { userId, token } = getCurrentUser();
    const options = {
        url: `${API_DOMAIN}user/search?name=${name}`,
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.request(options);
        const result = response.data;
        return result.users;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
