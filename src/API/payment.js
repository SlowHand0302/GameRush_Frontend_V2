import axios from 'axios';
import { API_DOMAIN } from '../constants';
import { data } from 'autoprefixer';

export const getStripeConfig = async () => {
    const options = {
        url: `${API_DOMAIN}payment/stripe/config`,
        method: 'GET',
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

export const postCreatePaymentIntent = async () => {
    const options = {
        url: `${API_DOMAIN}payment/stripe/create-payment-intent`,
        method: 'POST',
        data: JSON.stringify({}),
    };
    try {
        const response = await axios.request(options);
        const result = response.data;
        return result.clientSecret;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
