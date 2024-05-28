import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { paymentAPI, orderAPI } from '../../../API';
import CheckoutForm from './CheckoutForm';
import SimpleProductCard from '../CartPage/SimpleProductCard';
import { formatCash } from '../../../utils/helpers';

function Payment(props) {
    const location = useLocation();
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [orderDetail, setOrderDetail] = useState({});
    const [productDetails, setProductDetails] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    useEffect(() => {
        const getStripePromise = async () => {
            try {
                const result = await paymentAPI.getStripeConfig();
                setStripePromise(loadStripe(result.publicshableKey));
            } catch (error) {
                throw error;
            }
        };
        getStripePromise();
    }, []);

    useEffect(() => {
        const postClientIntent = async () => {
            try {
                const clientSecret = await paymentAPI.postCreatePaymentIntent({amount: orderDetail.finalPrice, });
                setClientSecret(clientSecret);
            } catch (error) {
                throw error;
            }
        };
        postClientIntent();
    }, []);

    useEffect(() => {
        const getOrderDetail = async () => {
            try {
                const result = await orderAPI.getOrderById(location.pathname.split('/').pop());
                setOrderDetail(result);
            } catch (error) {
                console.log(error);
                throw error;
            }
        };
        getOrderDetail();
    }, []);
    console.log(orderDetail)
    return (
        <div className="w-full bg-gray-100 flex justify-center items-center p-7 2sm:p-0">
            <div className="xl:w-layout lg:w-full md:w-full sm:w-full ">
                <section className="flex justify-center gap-8 w-full bg-white border rounded-xl p-[35px] md:flex-col sm:flex-col 2sm:flex-col 2sm:p-5">
                    <div className="w-[75%] md:w-full sm:w-full 2sm:w-full">
                        <div className="text-[27px] font-bold">Thanh toán</div>
                        <div className="flex justify-start text-[14px] gap-5 items-center">
                            <p>Tổng giá trị thanh toán:</p>
                            <p className="font-bold text-[30px] text-orange-200">
                                {formatCash(`${orderDetail.finalPrice}`)}
                            </p>
                        </div>
                        {orderDetail?.productTypes?.length > 0 && (
                            <div className="w-full flex flex-col gap-5">
                                {orderDetail.productTypes.map((item, index) => {
                                    return (
                                        <SimpleProductCard
                                            key={index}
                                            img={
                                                item.productType === productDetails[index]._id &&
                                                productDetails[index].image
                                            }
                                            name={item.name}
                                            sellPrice={item.priceAtPurchase}
                                            quantity={item.quantity}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div className="w-[25%] md:w-full sm:w-full 2sm:w-full">
                        {stripePromise && clientSecret && (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm orderId={orderDetail._id} />
                            </Elements>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Payment;
