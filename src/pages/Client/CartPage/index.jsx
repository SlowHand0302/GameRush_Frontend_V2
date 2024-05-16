import { useEffect, useState } from 'react';
import { FaCircle, FaPaypal, FaStripeS } from 'react-icons/fa';
import { cartIcons } from '../../../assets/img';
import { formatCash } from '../../../utils/helpers';
import SimpleProductCard from './SimpleProductCard';
// dummy data
import products from '../../../constants/dummyData/products';

function CartPage(props) {
    const [fetchedData, setFetchedData] = useState(products.map((item) => ({ ...item, quantity: 1 })));

    // uncomment code below to view the empty cart
    // const [fetchedData, setFetchedData] = useState({});

    const [tab, setTab] = useState('cart');
    const [totalProductPrice, setTotalProductPrice] = useState(0);

    useEffect(() => {
        if (fetchedData.length > 0) {
            setTotalProductPrice(0);
            fetchedData.map((item) => {
                return setTotalProductPrice(
                    (prev) => (prev += (item.originPrice - (item.discount * item.originPrice) / 100) * item.quantity),
                );
            });
        }
    }, [fetchedData]);

    const handleOnSwitchTab = (tab) => {
        setTab(tab);
    };
    const handleOnQuantityChange = (id, quantity) => {
        setFetchedData((prevData) => prevData.map((item) => (item.id === id ? { ...item, quantity: quantity } : item)));
    };
    return (
        <div className="w-full bg-gray-100 flex justify-center items-center p-7 2sm:p-0">
            <div className="xl:w-layout lg:w-full md:w-full sm:w-full ">
                <section className="flex justify-center w-full">
                    <p
                        className={`flex items-center gap-3 mx-3 ${
                            tab === 'cart' ? 'text-orange-500' : 'text-gray-300'
                        } `}
                        onClick={() => handleOnSwitchTab('cart')}
                    >
                        <FaCircle />
                        Giỏ hàng
                    </p>
                    <hr className="h-px w-[36%] my-8 bg-gray-200 border-0"></hr>
                    <p
                        className={`flex items-center gap-3 mx-3 ${
                            tab === 'verify' ? 'text-orange-500' : 'text-gray-300'
                        } `}
                        onClick={() => handleOnSwitchTab('verify')}
                    >
                        <FaCircle />
                        Xác nhận
                    </p>
                    <hr className="h-px w-[36%] my-8 bg-gray-200 border-0"></hr>
                    <p
                        className={`flex items-center gap-3 mx-3 ${
                            tab === 'payment' ? 'text-orange-500' : 'text-gray-300'
                        } `}
                        onClick={() => handleOnSwitchTab('payment')}
                    >
                        <FaCircle />
                        Thanh toán
                    </p>
                </section>
                <section className="flex justify-center gap-8 w-full bg-white border rounded-xl p-[35px]  mt-[21px] md:flex-col sm:flex-col 2sm:flex-col 2sm:p-5">
                    {fetchedData.length > 0 ? (
                        <div className="w-[75%] md:w-full sm:w-full 2sm:w-full">
                            <p className="text-[27px] font-bold">
                                Giỏ hàng{' '}
                                <span className="text-[14px] font-light">( {fetchedData.length} sản phẩm )</span>
                            </p>
                            <div className="w-full flex flex-col gap-5">
                                {fetchedData.map((item, index) => {
                                    return (
                                        <SimpleProductCard
                                            key={index}
                                            url={item.url}
                                            img={item.img}
                                            id={item.id}
                                            name={item.name}
                                            category={item.category}
                                            originPrice={item.originPrice}
                                            discount={item.discount}
                                            status={item.status}
                                            quantity={item.quantity}
                                            onQuantityChange={handleOnQuantityChange}
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
                        {fetchedData.length > 0 ? (
                            <div className="flex flex-col gap-3 mt-5 text-[14px] font-semibold">
                                <div className="p-[8px] cursor-pointer text-white text-center bg-orange-300 hover:bg-orange-200 rounded-xl">
                                    Đăng nhập để thanh toán
                                </div>
                                <p className="text-gray-300 text-[12px] text-center font-normal">
                                    Quét mã. Thanh toán. Không cần đăng nhập.
                                </p>
                                <div className="p-[8px] cursor-pointer text-white bg-blue-700 hover:bg-blue-500 rounded-xl flex items-center justify-center gap-3">
                                    <FaPaypal />
                                    <p>Mua siêu tốc qua Paypal</p>
                                </div>
                                <div className="p-[8px] cursor-pointer text-white bg-purple-700 hover:bg-purple-500 rounded-xl flex items-center justify-center gap-3">
                                    <FaStripeS />
                                    <p>Mua siêu tốc qua Stripe</p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CartPage;
