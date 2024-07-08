import axios from 'axios';
const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const VITE_EXCHANGE_RATE_API_KEY_URL = import.meta.env.VITE_EXCHANGE_RATE_API_KEY_URL;

const convertVNDToUSD = async (amountVND) => {
    try {
        const response = await axios.request(VITE_EXCHANGE_RATE_API_KEY_URL);
        const data = response.data;
        if (data.result === 'success') {
            const rate = data.conversion_rates.VND;
            const amountUSD = (amountVND / rate).toFixed(2);
            return amountUSD;
        }
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

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

export const postCreatePaymentIntent = async ({ amount }) => {
    const amountUSD = await convertVNDToUSD(amount);
    console.log(amountUSD);
    if (amountUSD) {
        const options = {
            url: `${API_DOMAIN}payment/stripe/create-payment-intent`,
            method: 'POST',
            data: {
                amount: amountUSD,
            },
        };
        try {
            const response = await axios.request(options);
            const result = response.data;
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};

export const postCancelPayment = async (orderId, paymentIntentId) => {
    const options = {
        url: `${API_DOMAIN}payment/stripe/${paymentIntentId}/cancel`,
        method: 'POST',
        data: { orderId },
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
