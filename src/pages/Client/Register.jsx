import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { authAPI } from '../../API';
import { Input } from '../../components/FormBasic';

import { registerIcon } from '../../assets/img';
function Register(props) {
    const { onClose, onLoginNow } = props;
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
    const handleOnSubmit = async () => {
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
    return (
        <div className="flex items-center h-screen justify-center">
            <div className="max-w-[70%] shadow-2xl rounded-2xl border-gray-200 lg:max-w-[90%] md:max-w-[90%] sm:min-w-[80%] 2sm:min-w-[90%]">
                <div className="flex justify-center bg-white rounded-xl">
                    <div className="self-center sm:hidden 2sm:hidden">
                        <img src={registerIcon} alt="registerIcon" loading="lazy" className="w-full" />
                    </div>
                    <div className="flex-shrink w-[2px] bg-gray-200 my-5 sm:hidden 2sm:hidden"></div>
                    <form className="relative min-w-[60%] flex flex-col justify-center gap-5 p-5 sm:min-w-[90%] 2sm:min-w-[90%]">
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
                        <div className="flex flex-col gap-8">
                            <div>
                                <label htmlFor="name">Họ và tên</label>
                                <Input
                                    className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                                    type={'text'}
                                    placeholder={'Họ và tên'}
                                    id={'name'}
                                    value={registerInfor.name}
                                    onChange={(event) => handleFormChange({ name: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <Input
                                    className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                                    type={'email'}
                                    id={'email'}
                                    placeholder={'Email'}
                                    value={registerInfor.email}
                                    onChange={(event) => handleFormChange({ email: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="username">Tên đăng nhập</label>
                                <Input
                                    className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                                    type={'text'}
                                    id={'username'}
                                    placeholder={'Tên đăng Nhập'}
                                    value={registerInfor.username}
                                    onChange={(event) => handleFormChange({ username: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNumb">Số điện thoại</label>
                                <Input
                                    className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                                    type={'text'}
                                    id={'phoneNumb'}
                                    placeholder={'Số điện thoại'}
                                    value={registerInfor.phoneNumb}
                                    onChange={(event) => handleFormChange({ phoneNumb: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Mật khẩu</label>
                                <Input
                                    className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                                    type={'password'}
                                    id={'password'}
                                    placeholder={'Mật Khẩu'}
                                    value={registerInfor.password}
                                    onChange={(event) => handleFormChange({ password: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="password2">Nhập lại mật khẩu</label>
                                <Input
                                    className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                                    type={'password'}
                                    id={'password2'}
                                    label={'Nhập lại Mật Khẩu'}
                                    placeholder={'Nhập lại Mật Khẩu'}
                                />
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
