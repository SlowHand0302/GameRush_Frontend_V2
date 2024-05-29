import { useEffect, useState } from 'react';
import { Input } from '../../../components/FormBasic';

function Infor(props) {
    const [userInfor, setUserInfor] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [registerInfor, setRegisterInfor] = useState({
        name: '',
        email: '',
        username: '',
        phoneNumb: '',
        password: '',
    });
    const handleOnSubmit = () => {};
    return (
        <>
            <h1 className="text-[30px] mb-5 font-bold">Tổng quan</h1>
            <div className="grid grid-cols-4 grid-flow-row gap-4 items-center">
                <div className='flex flex-col gap-3'>
                    <p className="text-[13px]">Tên đăng nhập</p>
                    <p>{userInfor.userName || 'Chưa có tên đăng nhập'}</p>
                </div>
                <div className='flex flex-col gap-3'>
                    <p className="text-[13px]">Email</p>
                    <p className="font-bold text-[16px]">{userInfor.email}</p>
                </div>
                <div className='flex flex-col gap-3'>
                    <p className="text-[13px]">Họ và tên</p>
                    <p className="font-bold text-[16px]">{userInfor.name}</p>
                </div>
                <div className='flex flex-col gap-3'>
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
                                placeholder={'Họ và tên'}
                                id={'name'}
                                value={registerInfor.name}
                                onChange={(event) => handleFormChange({ name: event.target.value })}
                            />
                        </div>
                        <div className="flex-1">
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
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-1">
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
                        <div className="flex-1">
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
                    </div>
                    <div className="">
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
