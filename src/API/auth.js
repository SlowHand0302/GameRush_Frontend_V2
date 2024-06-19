import axios from 'axios';
import { API_DOMAIN } from '../constants';
import { useNavigate } from 'react-router-dom';

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
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage'));
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
