import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { authAPI } from '../API';
import { Input } from '../components/FormBasic';
import { loginIcon } from '../assets/img';

function Login(props) {
    const { onClose, onRegisterNow } = props;
    const location = useLocation();
    const [loginInfor, setLoginInfor] = useState({
        email: '',
        password: '',
    });

    const handleOnFormChange = (data) => {
        setLoginInfor({ ...loginInfor, ...data });
    };

    const handleOnSubmit = async () => {
        try {
            const authData = await authAPI.login(loginInfor);
            if (authData.auth) {
                toast.success(authData.msg);
                localStorage.setItem('token', authData.token);
                localStorage.setItem('user', JSON.stringify(authData.user));
                window.dispatchEvent(new Event('storage'));
                onClose();
            }
        } catch (error) {
            if (error.response.status === 404 || error.response.status === 401) {
                toast.error(error.response.data.msg);
            }
        }
    };

    return (
        <div className="flex items-center h-screen justify-center">
            <div className="max-w-[60%] shadow-2xl rounded-2xl border-gray-200 lg:max-w-[90%] md:max-w-[90%] sm:min-w-[80%] 2sm:min-w-[90%]">
                <div className="flex justify-center bg-white rounded-xl">
                    <div className="self-center sm:hidden 2sm:hidden">
                        <img src={loginIcon} alt="loginIcon" className="rounded-xl w-full" loading="lazy" />
                    </div>
                    <div className="flex-shrink w-[2px] bg-gray-200 my-5 sm:hidden 2sm:hidden"></div>
                    <form className="min-w-[60%] flex-grow flex flex-col justify-center gap-5 p-5 relative sm:min-w-[90%] 2sm:min-w-[90%]">
                        <div
                            onClick={onClose}
                            className={`absolute top-3 right-3 cursor-pointer ${
                                location.pathname.includes('admin') ? 'hidden' : ''
                            }`}
                        >
                            <IoMdClose className="text-5xl" />
                        </div>
                        <h1 className="font-bold text-[50px] bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Login
                        </h1>
                        <div className="w-full">
                            <label htmlFor="email" className="font-bold">
                                Email
                            </label>
                            <Input
                                id={'email'}
                                type={'email'}
                                className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                                placeholder={'Please enter email'}
                                value={loginInfor.email}
                                onChange={(event) => handleOnFormChange({ email: event.target.value })}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="password" className="font-bold">
                                Mật khẩu
                            </label>
                            <Input
                                type={'password'}
                                id={'password'}
                                className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                                placeholder={'Please enter password'}
                                value={loginInfor.password}
                                onChange={(event) => handleOnFormChange({ password: event.target.value })}
                            />
                        </div>
                        {!location.pathname.includes('admin') && (
                            <>
                                <div className="text-orange-200 cursor-pointer">Quên mật khẩu ?</div>
                                <div>
                                    Chưa có tài khoản?{' '}
                                    <span
                                        onClick={() => {
                                            onClose();
                                            onRegisterNow();
                                        }}
                                        className="text-orange-200 cursor-pointer"
                                    >
                                        Đăng ký ngay
                                    </span>
                                </div>
                            </>
                        )}
                        <div
                            onClick={handleOnSubmit}
                            className="cursor-pointer w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 text-center text-[20px] font-bold"
                        >
                            Login
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
