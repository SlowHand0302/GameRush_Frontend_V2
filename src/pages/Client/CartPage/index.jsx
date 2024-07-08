import { useEffect, useState } from 'react';
import { useNavigate, useBlocker } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { orderAPI, producTypeAPI } from '../../../API';
import { useAuth } from '../../../hooks/authContext';
import { cartIcons } from '../../../assets/img';
import { formatCash } from '../../../utils/helpers';
import SimpleProductCard from './SimpleProductCard';

function CartPage(props) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [products, setProducts] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [totalProductPrice, setTotalProductPrice] = useState(0);
    const [orderDetail, setOrderDetail] = useState({
        customer: user,
        finalPrice: totalProductPrice,
        paymentType: '661d0fe6492ea3586321213e',
        products: [],
        status: 'pending',
    });
    const handleRemoveProduct = (id) => {
        setProducts(products.filter((item) => item._id !== id));
    };

    const handleOnQuantityChange = (id, quantity) => {
        setProducts((prevData) =>
            prevData.map((item) => (item._id === id ? { ...item, ['quantity']: quantity } : item)),
        );
    };

    const handleCreateOrderDetail = () => {
        const productsAtPurchase = [
            ...products.map((item) => {
                return {
                    productType: item._id,
                    name: item.name,
                    priceAtPurchase: item.sellPrice,
                    quantity: item.quantity,
                    subtotal: item.quantity * item.sellPrice,
                };
            }),
        ];
        setOrderDetail((prev) => ({
            ...prev,
            productTypes: productsAtPurchase,
            customer: user._id,
            finalPrice: totalProductPrice,
        }));
    };

    const handlePlaceOrder = async () => {
        if (Object.keys(user).length === 0 || user.role !== 'Customer') {
            toast.warning('Vui lòng đăng nhập trước khi giao dịch');
            return;
        }
        try {
            const { success, order, msg } = await orderAPI.createOrder(orderDetail);

            if (success) {
                toast.success(msg);
                setTimeout(() => navigate(`/payment/${order._id}`), 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loadProductInCart = async () => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            try {
                const promises = cart.map((product) => producTypeAPI.getProductTypesByFilter({ _id: product._id }));
                const result = (await Promise.all(promises)).flat();
                const clone = result.map((product, index) => {
                    return { ...product, ['quantity']: cart[index].quantity };
                });
                setProducts(clone);
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    };

    useEffect(() => {
        setTotalProductPrice(0);
        if (products.length > 0) {
            products.map((item) => {
                return setTotalProductPrice((prev) => (prev += item.sellPrice * item.quantity));
            });
            localStorage.setItem('cart', JSON.stringify(products));
            window.dispatchEvent(new Event('storage'));
        } else {
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('storage'));
        }
    }, [products]);

    useEffect(() => {
        handleCreateOrderDetail();
    }, [products, user, totalProductPrice]);

    useEffect(() => {
        loadProductInCart();
    }, []);

    return (
        <div className="w-full bg-gray-100 flex justify-center items-center p-7 2sm:p-0">
            <div className="xl:w-layout lg:w-full md:w-full sm:w-full ">
                <section className="flex justify-center gap-8 w-full bg-white border rounded-xl p-[35px]  mt-[21px] md:flex-col sm:flex-col 2sm:flex-col 2sm:p-5">
                    {products.length > 0 ? (
                        <div className="w-[75%] md:w-full sm:w-full 2sm:w-full">
                            <p className="text-[27px] font-bold">
                                Giỏ hàng <span className="text-[14px] font-light">( {products.length} sản phẩm )</span>
                            </p>
                            <div className="w-full flex flex-col gap-5">
                                {products.map((item, index) => {
                                    return (
                                        <SimpleProductCard
                                            key={index}
                                            url={`/product/${item._id}`}
                                            img={item.image}
                                            id={item._id}
                                            name={item.name}
                                            originalPrice={item.originalPrice}
                                            sellPrice={item.sellPrice}
                                            status={item.status}
                                            quantity={item.quantity}
                                            onQuantityChange={handleOnQuantityChange}
                                            onRemove={handleRemoveProduct}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="w-[75%] md:w-full sm:w-full 2sm:w-full">
                            <div className="flex items-center flex-col">
                                <p className="text-[25px] font-bold">Giỏ hàng trống!</p>
                                <p>Thêm sản phẩm vào giỏ và quay lại trang này để thanh toán nha bạn</p>
                                <img src={cartIcons.emptyCart} alt="Empty Cart" />
                            </div>
                        </div>
                    )}
                    <div className="w-[25%] md:w-full sm:w-full 2sm:w-full">
                        <div className="text-[27px] font-bold">Thanh toán</div>
                        <div className="flex justify-between text-[14px]">
                            <p>Tổng giá trị sản phẩm:</p>
                            <p>{formatCash(totalProductPrice)}</p>
                        </div>
                        <hr className="h-px w-full my-4 bg-gray-200 border-0"></hr>
                        <div className="flex justify-between text-[14px]">
                            <p>Tổng giá trị thanh toán:</p>
                            <p className="font-bold">{formatCash(totalProductPrice)}</p>
                        </div>
                        <div className="flex justify-between text-[14px]">
                            <p>Số dư hiện tại:</p>
                            <p className="font-bold">{formatCash(0)}</p>
                        </div>
                        <div className="flex justify-between text-[14px]">
                            <p>Số tiền cần nạp thêm:</p>
                            <p className="font-bold">{formatCash(totalProductPrice)}</p>
                        </div>
                        {products.length > 0 ? (
                            <div className="flex flex-col gap-3 mt-5 text-[14px] font-semibold">
                                <div
                                    onClick={handlePlaceOrder}
                                    className="p-[8px] cursor-pointer text-white text-center bg-orange-300 hover:bg-orange-200 rounded-xl"
                                >
                                    {user ? 'Thanh toán' : 'Đăng nhập để thanh toán'}
                                </div>
                                <p className="text-gray-300 text-[12px] text-center font-normal">
                                    Quét mã. Thanh toán. Không cần đăng nhập.
                                </p>
                                {/* <div className="p-[8px] cursor-pointer text-white bg-blue-700 hover:bg-blue-500 rounded-xl flex items-center justify-center gap-3">
                                    <FaPaypal />
                                    <p>Mua siêu tốc qua Paypal</p>
                                </div>
                                <div className="p-[8px] cursor-pointer text-white bg-purple-700 hover:bg-purple-500 rounded-xl flex items-center justify-center gap-3">
                                    <FaStripeS />
                                    <p>Mua siêu tốc qua Stripe</p>
                                </div> */}
                            </div>
                        ) : null}
                    </div>
                </section>
            </div>
            <ToastContainer />
        </div>
    );
}

export default CartPage;
