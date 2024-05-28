import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BsCartPlus, BsFillCreditCard2FrontFill } from 'react-icons/bs';

import Input from '../../../components/Form/Input';

function AdditionInforForm(props) {
    const { productInfor } = props;
    const [spotifyInforForm, setSpotifyInforForm] = useState({
        email: '',
        password: '',
    });
    const handleOnFormChange = (data) => {
        setSpotifyInforForm({ ...spotifyInforForm, ...data });
    };

    const handleAddToCart = () => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            const cartArr = JSON.parse(cart);
            if (cartArr.filter((item) => item._id === productInfor._id).length === 0) {
                localStorage.setItem('cart', JSON.stringify([...cartArr, { ...productInfor, ['quantity']: 1 }]));
                toast.success('Thêm vào giỏ hàng thành công');
            }else{
                toast.warning('Sản phẩm này đã có trong giỏ hàng');
            }
        } else {
            localStorage.setItem('cart', JSON.stringify([{ ...productInfor, ['quantity']: 1 }]));
            toast.success('Thêm vào giỏ hàng thành công');
        }
        window.dispatchEvent(new Event('storage'));
    };
    return (
        <>
            <form className="flex flex-col gap-10 mt-8">
                {/* <p className="font-bold border-b border-gray-300 pb-5 mt-5">Nhập thông tin bổ sung</p>
            <Input
                type={'text'}
                id={'email'}
                value={spotifyInforForm.email}
                label={'Email tài khoản Spotify'}
                placeHolder={'Email tài khoản Spotify'}
                onChange={handleOnFormChange}
            />
            <Input
                type={'text'}
                id={'password'}
                value={spotifyInforForm.password}
                label={'Mật khẩu Spotify'}
                placeHolder={'Mật khẩu Spotify'}
                onChange={handleOnFormChange}
            /> */}
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
