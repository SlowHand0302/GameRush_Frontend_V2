import { useState } from 'react';

import { authAPI } from '../../../API';
import { useAuth } from '../../../hooks/authContext';
import { Input, InputPassword } from '../../../components/FormBasic';
import validateFormInfor from './validateFormInfor';

function Infor(props) {
    const { user, setUser } = useAuth();
    const [alertMsg, setAlertMsg] = useState({});
    const [changeInfor, setChangeInfor] = useState({
        name: '',
        email: '',
        username: '',
        phoneNumb: '',
        password: '',
    });

    const handleClearForm = () => {
        setChangeInfor({
            name: '',
            email: '',
            username: '',
            phoneNumb: '',
            password: '',
        });
    };

    const handleFormChange = (data) => {
        if (alertMsg[Object.keys(data)]) {
            delete alertMsg[Object.keys(data)];
        }
        setChangeInfor({ ...changeInfor, ...data });
    };

    const handleOnUpdate = async (userInfor) => {
        try {
            const result = await authAPI.putUpdateUserById(userInfor);
            console.log(result);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const errors = validateFormInfor(changeInfor);
        if (Object.keys(errors).length !== 0) {
            setAlertMsg(errors);
            return;
        }
        const props = Object.keys(changeInfor).reduce((accumulator, currentValue) => {
            if (changeInfor[currentValue] !== '') {
                accumulator[currentValue] = changeInfor[currentValue];
            }
            return accumulator;
        }, {});
        if (Object.keys(props).length > 0) {
            setUser({ ...user, ...props });
            handleOnUpdate(props);
            handleClearForm();
        }
    };

    return (
        <>
            <h1 className="text-[30px] mb-5 font-bold">Tổng quan</h1>
            <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-2 2sm:grid-cols-2 grid-flow-row gap-4 items-center">
                <div className="flex flex-col gap-3">
                    <p className="text-[13px]">Tên đăng nhập</p>
                    <p>{user.username || 'Chưa có tên đăng nhập'}</p>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-[13px]">Email</p>
                    <p className="font-bold text-[16px]">{user.email}</p>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-[13px]">Họ và tên</p>
                    <p className="font-bold text-[16px]">{user.name}</p>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-[13px]">Số điện thoại</p>
                    <p className="font-bold text-[16px]">{user.phoneNumb}</p>
                </div>
            </div>
            <hr className="h-px w-full my-4 bg-gray-200 border-1"></hr>
            <form className="flex flex-col gap-3 xl:w-[80%] w-full">
                <h1 className="xl:text-[30px] lg:text-[30px] font-bold text-[20px]">Chỉnh sửa thông tin cá nhân</h1>
                <div className="flex flex-col gap-8">
                    <div className="flex gap-3 w-full">
                        <div className="flex-1">
                            <label htmlFor="name">Họ và tên</label>
                            <Input
                                className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                                type={'text'}
                                placeholder={user.name || 'Họ và tên'}
                                id={'name'}
                                value={changeInfor.name}
                                onChange={(event) => handleFormChange({ name: event.target.value })}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="email">Email</label>
                            <Input
                                className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl ${
                                    alertMsg.email ? 'ring-red-500 ring-1' : ''
                                }`}
                                type={'email'}
                                id={'email'}
                                placeholder={user.email || 'Email'}
                                value={changeInfor.email}
                                onChange={(event) => handleFormChange({ email: event.target.value })}
                            />
                            <p className={`text-red-500 text-[14px] italic ${alertMsg.email ? 'block' : 'hidden'}`}>
                                {alertMsg?.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label htmlFor="username">Tên đăng nhập</label>
                            <Input
                                className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                                type={'text'}
                                id={'username'}
                                placeholder={user.username || 'Tên đăng Nhập'}
                                value={changeInfor.username}
                                onChange={(event) => handleFormChange({ username: event.target.value })}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="phoneNumb">Số điện thoại</label>
                            <Input
                                className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl ${
                                    alertMsg.email ? 'ring-red-500 ring-1' : ''
                                }`}
                                type={'text'}
                                id={'phoneNumb'}
                                placeholder={user.phoneNumb || 'Số điện thoại'}
                                value={changeInfor.phoneNumb}
                                onChange={(event) => handleFormChange({ phoneNumb: event.target.value })}
                            />
                            <p className={`text-red-500 text-[14px] italic ${alertMsg.phoneNumb ? 'block' : 'hidden'}`}>
                                {alertMsg?.phoneNumb}
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <label htmlFor="password">Mật khẩu</label>
                        <InputPassword
                            className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl`}
                            type={'password'}
                            id={'password'}
                            placeholder={'Mật Khẩu'}
                            value={changeInfor.password}
                            onChange={(event) => handleFormChange({ password: event.target.value })}
                        />
                    </div>
                </div>

                <button
                    onClick={handleOnSubmit}
                    className="rounded-2xl cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 text-center text-[20px] font-bold"
                >
                    Lưu Thay đổi
                </button>
            </form>
        </>
    );
}

export default Infor;
