import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BsCartPlus, BsFillCreditCard2FrontFill } from 'react-icons/bs';

import Input from '../../../components/Form/Input';

function AdditionInforForm(props) {
    const { productInfor } = props;
    const handleAddToCart = () => {
        if (productInfor.status === 'unavailable') {
            toast.error('Sản phẩm này hiện đang hết hàng 😥');
            return;
        }
        const cart = localStorage.getItem('cart');
        if (cart) {
            const cartArr = JSON.parse(cart);
            if (cartArr.filter((item) => item._id === productInfor._id).length === 0) {
                localStorage.setItem('cart', JSON.stringify([...cartArr, { _id: productInfor._id, ['quantity']: 1 }]));
                toast.success('Thêm vào giỏ hàng thành công');
            } else {
                toast.warning('Sản phẩm này đã có trong giỏ hàng');
            }
        } else {
            localStorage.setItem('cart', JSON.stringify([{ _id: productInfor._id, ['quantity']: 1 }]));
            toast.success('Thêm vào giỏ hàng thành công');
        }
        window.dispatchEvent(new Event('storage'));
    };
    return (
        <>
            <form className="flex flex-col gap-10 mt-8">
                <div className="flex gap-3 items-center text-[14px] sm:flex-wrap 2sm:flex-wrap">
                    <Link className="flex items-center justify-center gap-3 w-[49%] px-[14px] py-3 text-center text-white border rounded-lg border-orange-500 bg-orange-500 sm:w-full 2sm:w-full">
                        <BsFillCreditCard2FrontFill className="w-[17.5px] h-[17.5px]" /> Mua Ngay
                    </Link>
                    <div
                        onClick={handleAddToCart}
                        className="flex items-center justify-center gap-3 cursor-pointer w-[49%] px-[14px] py-3 text-center text-orange-500 border-2 rounded-lg border-gray-300 hover:border-orange-500 sm:w-full 2sm:w-full"
                    >
                        <BsCartPlus className="w-[17.5px] h-[17.5px]" /> Thêm vào giỏ hàng
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    );
}

export default AdditionInforForm;
