import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = (props) => {
    const { orderId } = props;
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe && !elements) {
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment/${orderId}/success`,
                // expand: 
            },
        });

        if (error) {
            setMessage(error.message);
        }

        setIsProcessing(false);
    };
    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement />
            <button
                disabled={isProcessing || !stripe || !elements}
                id="submit"
                className="text-[16px] w-full mt-3 text-white font-extralight bg-gradient-to-r from-orange-500 to-red-500 rounded-xl px-5 py-3"
            >
                <span id="button-text">{isProcessing ? 'Processing ... ' : 'Pay now'}</span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};

export default CheckoutForm;
