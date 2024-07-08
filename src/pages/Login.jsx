import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import { FaRegEye } from 'react-icons/fa6';
import 'react-toastify/dist/ReactToastify.css';

import { authAPI } from '../API';
import { useAuth } from '../hooks/authContext';
import { Input } from '../components/FormBasic';
import { logos, loginIcon } from '../assets/img';

function Login(props) {
    const { onClose, onRegisterNow } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const { login, setUser } = useAuth();
    const [alertMsg, setAlertMsg] = useState({});
    const [loginInfor, setLoginInfor] = useState({
        email: '',
        password: '',
    });

    const handleOnFormChange = (data) => {
        if (alertMsg[Object.keys(data)]) {
            delete alertMsg[Object.keys(data)];
        }
        setLoginInfor({ ...loginInfor, ...data });
    };

    const validateFormInfor = () => {
        let typeErrors = {};
        if (loginInfor.email === '') {
            typeErrors.email = 'Email là thông tin bắt buộc';
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(loginInfor.email)) {
            typeErrors.email = 'Không đúng định dạng của email';
        }
        if (loginInfor.password === '') {
            typeErrors.password = 'Mật khẩu là thông tin bắt buộc';
        }
        return typeErrors;
    };

    const handleOnSubmit = async () => {
        const errors = validateFormInfor();
        if (Object.keys(errors).length > 0) {
            setAlertMsg(errors);
            return;
        }
        try {
            const authData = await authAPI.login(loginInfor);
            if (authData?.token && authData?.user) {
                const userRole = authData.user.role;
                const userPath = location.pathname;

                if (userRole === 'Admin') {
                    // Check if trying to access admin page
                    if (userPath.includes('admin')) {
                        localStorage.setItem('token', authData.token);
                        localStorage.setItem('userId', authData.user._id);
                        window.dispatchEvent(new Event('storage'));
                        login();
                        setUser(authData.user);
                        navigate('/admin');
                    } else {
                        toast.error('Không tìm thấy tài khoản');
                    }
                } else {
                    // Check if trying to access client page
                    if (!userPath.includes('admin')) {
                        localStorage.setItem('token', authData.token);
                        localStorage.setItem('userId', authData.user._id);
                        window.dispatchEvent(new Event('storage'));
                        login();
                        setUser(authData.user);
                        onClose();
                    } else {
                        toast.error('Không tìm thấy tài khoản');
                    }
                }
            } else {
                toast.error('Không tìm thấy tài khoản');
            }
        } catch (error) {
            if (error.response?.status === 404 || error.response?.status === 401) {
                toast.error(error.response.data.msg);
            }
        }
    };

    const handleShowPassword = () => {
        const passwordField = document.getElementById('password');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    };
    return (
        <div className="flex items-center h-screen justify-center">
            <div className="max-w-[60%] shadow-2xl rounded-2xl border-gray-200 lg:max-w-[90%] md:max-w-[90%] sm:min-w-[80%] 2sm:min-w-[90%]">
                <div className="flex justify-center bg-white rounded-xl">
                    <div className="self-center max-w-[365px] sm:hidden 2sm:hidden">
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
                        <div className="flex items-center justify-center mb-[-20px]">
                            <img
                                src={logos[0]}
                                alt="logo"
                                className={`h-[150px] m-[-38px] mb-[-28px] ${
                                    location.pathname.includes('admin') ? 'block' : 'hidden'
                                }`}
                            />
                            <h1 className="font-bold text-[50px] bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                Login
                            </h1>
                        </div>
                        <div className="w-full">
                            <label htmlFor="email" className="font-bold">
                                Email
                            </label>
                            <Input
                                id={'email'}
                                type={'email'}
                                className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl ${
                                    alertMsg.email ? 'ring-red-500 ring-1' : ''
                                }`}
                                placeholder={'Please enter email'}
                                value={loginInfor.email}
                                onChange={(event) => handleOnFormChange({ email: event.target.value })}
                            />
                            <p className={`text-red-500 text-[14px] italic ${alertMsg.email ? 'block' : 'hidden'}`}>
                                {alertMsg?.email}
                            </p>
                        </div>
                        <div className="w-full">
                            <label htmlFor="password" className="font-bold">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <Input
                                    className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl ${
                                        alertMsg.password ? 'ring-red-500 ring-1' : ''
                                    }`}
                                    type={'password'}
                                    id={'password'}
                                    placeholder={'Mật Khẩu'}
                                    value={loginInfor.password}
                                    onChange={(event) => handleOnFormChange({ password: event.target.value })}
                                />
                                <FaRegEye
                                    onClick={handleShowPassword}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                                />
                            </div>
                            <p className={`text-red-500 text-[14px] italic ${alertMsg.password ? 'block' : 'hidden'}`}>
                                {alertMsg?.password}
                            </p>
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
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleOnSubmit();
                            }}
                            className="cursor-pointer w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 text-center text-[20px] font-bold"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
