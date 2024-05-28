import { useLocation, useNavigate } from 'react-router-dom';

import { productAPI, orderAPI } from '../../../API';
import { useEffect, useState } from 'react';

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
        updateOrderDetail();
    }, [productsInOrder]);

    const updateOrderState = async () => {
        try {
            const result = await orderAPI.updateOrder(order);
            console.log(result);
        } catch (error) {
            throw error;
        }
    };

    const updateProductInOrder = async () => {
        try {
            const promises = productsInOrder.map((product) => productAPI.updateProduct(product));
            const results = await Promise.all(promises);
            console.log(results);
        } catch (error) {
            throw error;
        }
    };
    const handleBackHome = () => {
        updateOrderState();
        updateProductInOrder();
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('storage'));
        navigate('/');
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
                    Here is your code:
                </p>
                {typesInOrder.map((type, index) => {
                    return (
                        <div key={index} className=" min-w-[70%] flex p-4 border-b border-gray-200 text-center">
                            <h1 className="text-[15px] text-orange-200 flex-1 text-start font-bold line-clamp-2">
                                {type.name}
                            </h1>
                            <div className=" flex-1 pl-10">
                                {productsInOrder.map((product, index) => {
                                    return (
                                        type.productType === product.productTypeId && (
                                            <p key={index} className='text-start'>
                                                <span>{index}.</span> {product.productCode}
                                            </p>
                                        )
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

                <div
                    onClick={handleBackHome}
                    className="text-[16px] cursor-pointer mt-3 text-white font-extralight bg-gradient-to-r from-orange-500 to-red-500 rounded-xl px-5 py-3"
                >
                    CONTINUE SHOPPING
                </div>
            </div>
        </div>
    );
}

export default PaymentResult;
