import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaRegEye } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { authAPI } from '../../API';
import { Input } from '../../components/FormBasic';

import { registerIcon } from '../../assets/img';
function Register(props) {
    const { onClose, onLoginNow } = props;
    const [alertMsg, setAlertMsg] = useState({});
    const [registerInfor, setRegisterInfor] = useState({
        name: '',
        email: '',
        username: '',
        phoneNumb: '',
        password: '',
    });

    const handleFormChange = (data) => {
        setRegisterInfor({ ...registerInfor, ...data });
    };
    const validateFormInfor = () => {
        let typeErrors = {};
        if (registerInfor.name === '') {
            typeErrors.name = 'Họ và tên là thông tin bắt buộc';
        }
        if (registerInfor.username === '') {
            typeErrors.username = 'Username là thông tin bắt buộc';
        }
        if (registerInfor.phoneNumb === '') {
            typeErrors.phoneNumb = 'Số điện thoại là thông tin bắt buộc';
        } else if (!/^[0]\d{9}$/.test(registerInfor.phoneNumb)) {
            typeErrors.phoneNumb = 'Không đúng định dạng của số điện thoại';
        }
        if (registerInfor.email === '') {
            typeErrors.email = 'Email là thông tin bắt buộc';
        } else if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(registerInfor.email)) {
            typeErrors.email = 'Không đúng định dạng của email';
        }
        if (registerInfor.password === '') {
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
            const result = await authAPI.register(registerInfor);
            if (result.success) {
                toast.success(result.msg);
                setTimeout(() => {
                    onClose();
                    onLoginNow();
                }, 3000);
            }
        } catch (error) {
            console.log(error);
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
            <div className="max-w-[70%] shadow-2xl rounded-2xl border-gray-200 lg:max-w-[90%] md:max-w-[90%] sm:min-w-[80%] 2sm:min-w-[90%]">
                <div className="flex justify-center bg-white rounded-xl">
                    <div className="self-center sm:hidden 2sm:hidden">
                        <img src={registerIcon} alt="registerIcon" loading="lazy" className="w-full" />
                    </div>
                    <div className="flex-shrink w-[2px] bg-gray-200 my-5 sm:hidden 2sm:hidden"></div>
                    <form className="relative min-w-[60%] flex flex-col justify-center gap-3 p-5 sm:min-w-[90%] 2sm:min-w-[90%]">
                        <div
                            onClick={onClose}
                            className={`absolute top-3 right-3 cursor-pointer ${
                                location.pathname.includes('admin') ? 'hidden' : ''
                            }`}
                        >
                            <IoMdClose className="text-5xl" />
                        </div>
                        <h1 className="font-bold text-[50px] bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Register
                        </h1>
                        <div className="flex flex-col gap-3">
                            <div>
                                <label htmlFor="name">Họ và tên</label>
                                <Input
                                    className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl ${
                                        alertMsg.name ? 'ring-red-500 ring-1' : ''
                                    }`}
                                    type={'text'}
                                    placeholder={'Họ và tên'}
                                    id={'name'}
                                    value={registerInfor.name}
                                    onChange={(event) => handleFormChange({ name: event.target.value })}
                                />
                                <p className={`text-red-500 text-[14px] italic ${alertMsg.name ? 'block' : 'hidden'}`}>
                                    {alertMsg?.name}
                                </p>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <Input
                                    className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl ${
                                        alertMsg.email ? 'ring-red-500 ring-1' : ''
                                    }`}
                                    type={'email'}
                                    id={'email'}
                                    placeholder={'Email'}
                                    value={registerInfor.email}
                                    onChange={(event) => handleFormChange({ email: event.target.value })}
                                />
                                <p className={`text-red-500 text-[14px] italic ${alertMsg.email ? 'block' : 'hidden'}`}>
                                    {alertMsg?.email}
                                </p>
                            </div>
                            <div>
                                <label htmlFor="username">Tên đăng nhập</label>
                                <Input
                                    className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl ${
                                        alertMsg.username ? 'ring-red-500 ring-1' : ''
                                    }`}
                                    type={'text'}
                                    id={'username'}
                                    placeholder={'Tên đăng Nhập'}
                                    value={registerInfor.username}
                                    onChange={(event) => handleFormChange({ username: event.target.value })}
                                />
                                <p
                                    className={`text-red-500 text-[14px] italic ${
                                        alertMsg.username ? 'block' : 'hidden'
                                    }`}
                                >
                                    {alertMsg?.username}
                                </p>
                            </div>
                            <div>
                                <label htmlFor="phoneNumb">Số điện thoại</label>
                                <Input
                                    className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl ${
                                        alertMsg.phoneNumb ? 'ring-red-500 ring-1' : ''
                                    }`}
                                    type={'text'}
                                    id={'phoneNumb'}
                                    placeholder={'Số điện thoại'}
                                    value={registerInfor.phoneNumb}
                                    onChange={(event) => handleFormChange({ phoneNumb: event.target.value })}
                                />
                                <p
                                    className={`text-red-500 text-[14px] italic ${
                                        alertMsg.phoneNumb ? 'block' : 'hidden'
                                    }`}
                                >
                                    {alertMsg?.phoneNumb}
                                </p>
                            </div>
                            <div className="w-full">
                                <label htmlFor="password">Mật khẩu</label>
                                <div className="relative">
                                    <Input
                                        className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl ${
                                            alertMsg.password ? 'ring-red-500 ring-1' : ''
                                        }`}
                                        type={'password'}
                                        id={'password'}
                                        placeholder={'Mật Khẩu'}
                                        value={registerInfor.password}
                                        onChange={(event) => handleFormChange({ password: event.target.value })}
                                    />
                                    <FaRegEye
                                        onClick={handleShowPassword}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                                    />
                                </div>
                                <p
                                    className={`text-red-500 text-[14px] italic ${
                                        alertMsg.password ? 'block' : 'hidden'
                                    }`}
                                >
                                    {alertMsg?.password}
                                </p>
                            </div>
                        </div>
                        <div>
                            Đã có tài khoản?{' '}
                            <span
                                className="text-orange-200 cursor-pointer"
                                onClick={() => {
                                    onClose();
                                    onLoginNow();
                                }}
                            >
                                Đăng Nhập ngay
                            </span>
                        </div>
                        <div
                            onClick={handleOnSubmit}
                            className="w-full rounded-2xl cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 text-center text-[20px] font-bold"
                        >
                            Register
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Register;
