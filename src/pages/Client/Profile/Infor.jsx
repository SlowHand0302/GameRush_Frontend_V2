import { useEffect, useState } from 'react';
import axios from 'axios';

import { Input } from '../../../components/FormBasic';
import { FaRegEye } from 'react-icons/fa6';
import validateFormInfor from './validateFormInfor';

function Infor(props) {
    const [userInfor, setUserInfor] = useState({});
    const [alertMsg, setAlertMsg] = useState({});
    const [changeInfor, setChangeInfor] = useState({
        name: '',
        email: '',
        username: '',
        phoneNumb: '',
        password: '',
    });

    const handleFormChange = (data) => {
        setChangeInfor({ ...changeInfor, ...data });
    };

    const handleOnSubmit = () => {
        const errors = validateFormInfor(changeInfor);
        if (Object.keys(errors).length > 0) {
            setAlertMsg(errors);
            return;
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
        <>
            <h1 className="text-[30px] mb-5 font-bold">Tổng quan</h1>
            <div className="grid grid-cols-4 grid-flow-row gap-4 items-center">
                <div className="flex flex-col gap-3">
                    <p className="text-[13px]">Tên đăng nhập</p>
                    <p>{userInfor.username || 'Chưa có tên đăng nhập'}</p>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-[13px]">Email</p>
                    <p className="font-bold text-[16px]">{userInfor.email}</p>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-[13px]">Họ và tên</p>
                    <p className="font-bold text-[16px]">{userInfor.name}</p>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-[13px]">Số điện thoại</p>
                    <p className="font-bold text-[16px]">{userInfor.phoneNumber}</p>
                </div>
            </div>
            <hr className="h-px w-full my-4 bg-gray-200 border-1"></hr>
            <form className="flex flex-col gap-3">
                <h1 className="text-[30px] font-bold">Chỉnh sửa thông tin cá nhân</h1>
                <div className="flex flex-col gap-8 w-[80%]">
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label htmlFor="name">Họ và tên</label>
                            <Input
                                className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                                type={'text'}
                                placeholder={userInfor.name || 'Họ và tên'}
                                id={'name'}
                                value={changeInfor.name}
                                onChange={(event) => handleFormChange({ name: event.target.value })}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="email">Email</label>
                            <Input
                                className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                                type={'email'}
                                id={'email'}
                                placeholder={userInfor.email || 'Email'}
                                value={changeInfor.email}
                                onChange={(event) => handleFormChange({ email: event.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label htmlFor="username">Tên đăng nhập</label>
                            <Input
                                className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                                type={'text'}
                                id={'username'}
                                placeholder={userInfor.username || 'Tên đăng Nhập'}
                                value={changeInfor.username}
                                onChange={(event) => handleFormChange({ username: event.target.value })}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="phoneNumb">Số điện thoại</label>
                            <Input
                                className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                                type={'text'}
                                id={'phoneNumb'}
                                placeholder={userInfor.phoneNumber || 'Số điện thoại'}
                                value={changeInfor.phoneNumb}
                                onChange={(event) => handleFormChange({ phoneNumb: event.target.value })}
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <label htmlFor="password">Mật khẩu</label>
                        <Input
                            className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                            type={'password'}
                            id={'password'}
                            placeholder={'Mật Khẩu'}
                            value={changeInfor.password}
                            onChange={(event) => handleFormChange({ password: event.target.value })}
                        />
                        <FaRegEye
                            onClick={handleShowPassword}
                            className="absolute right-4 top-1/2 translate-y-[0.35rem] text-slate-400 cursor-pointer"
                        />
                    </div>
                </div>
                <div
                    onClick={handleOnSubmit}
                    className="rounded-2xl w-[80%] cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 text-center text-[20px] font-bold"
                >
                    Lưu Thay đổi
                </div>
            </form>
        </>
    );
}

export default Infor;
