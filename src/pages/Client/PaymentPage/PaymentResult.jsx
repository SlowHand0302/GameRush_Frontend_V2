import { useLocation, useNavigate } from 'react-router-dom';

import { productAPI, orderAPI } from '../../../API';
import { useEffect, useState } from 'react';

// check update order state
function PaymentResult(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    const [typesInOrder, setTypesInOrder] = useState([]);
    const [productsInOrder, setProductsInOrder] = useState([]);

    useEffect(() => {
        const getOrderDetail = async () => {
            try {
                const result = await orderAPI.getOrderById(location.pathname.split('/')[2]);
                setOrder(result);
                setTypesInOrder(result.productTypes);
            } catch (error) {
                console.log(error);
            }
        };
        getOrderDetail();
    }, []);

    useEffect(() => {
        const getProductByTypeAndQuantity = async () => {
            const queries = typesInOrder.map((type) => ({ ['typeId']: type.productType, ['quantity']: type.quantity }));
            const promises = queries.map((query) => productAPI.getProductByTypeAndQuantity(query));
            try {
                const results = await Promise.all(promises);
                setProductsInOrder(results.flat().map((item) => ({ ...item, status: 'sold' })));
            } catch (error) {
                console.log(error);
            }
        };
        getProductByTypeAndQuantity();
    }, [typesInOrder]);

    useEffect(() => {
        const updateOrderDetail = () => {
            let types = [...typesInOrder];
            types.map((type) => {
                return productsInOrder.map(
                    (product) =>
                        type.productType === product.productTypeId &&
                        type.products.filter((item) => item._id === product._id).length === 0 &&
                        type.products.push(product),
                );
            });
            setOrder((prev) => ({ ...prev, productTypes: types, status: 'completed' }));
        };
        const updateProductInOrder = async () => {
            try {
                const promises = productsInOrder.map((product) => productAPI.updateProduct(product));
                const results = await Promise.all(promises);
            } catch (error) {
                throw error;
            }
        };
        updateOrderDetail();
        updateProductInOrder();
    }, [productsInOrder]);

    useEffect(() => {
        const updateOrderState = async () => {
            if (Object.keys(order).length > 0) {
                try {
                    const result = await orderAPI.updateOrder(order);
                } catch (error) {
                    throw error;
                }
            }
        };
        updateOrderState();
    }, [order]);

    const handleBackHome = () => {
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('storage'));
        navigate('/me');
    };
    return (
        <div className="w-full h-screen bg-gray-100 flex items-center justify-center md:h-[90vh] sm:h-[90vh] 2sm:h-[90vh]">
            <div className="w-[75%] relative flex flex-col items-center bg-white shadow-2xl rounded-xl py-7 md:w-[85%] sm:w-[90%] 2sm:max-w-full">
                <p className="text-[100px] text-center font-extralight bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent 2sm:text-[50px]">
                    Thank You
                </p>
                <p className="text-[16px] font-extralight text-center mb-5 md:w-[50%] sm:w-[60%] 2sm:w-[80%]">
                    Your order has been placed
                </p>
                <p className="text-[16px] text-center font-extralight mb-5 md:w-[50%] sm:w-[60%] 2sm:w-[80%]">
                    Please Check Your History Purchase To View Your Code
                </p>
                <div
                    onClick={handleBackHome}
                    className="text-[16px] cursor-pointer mt-3 text-white font-extralight bg-gradient-to-r from-orange-500 to-red-500 rounded-xl px-5 py-3"
                >
                    VIEW YOUR CODE
                </div>
            </div>
        </div>
    );
}

export default PaymentResult;
