import axios from 'axios';
import { useState } from 'react';

import { Input } from '../components/FormBasic';
import { loginIcon } from '../assets/img';

function Login(props) {
    const [loginInfor, setLoginInfor] = useState({
        email: '',
        password: '',
    });
    const handleOnFormChange = (data) => {
        setLoginInfor({ ...loginInfor, ...data });
    };
    const handleOnSubmit = async () => {
        const options = {
            url: 'http://localhost:5000/api/user/auth',
            method: 'POST',
            data: loginInfor,
        };

        await axios(options)
            .then((response) => {
                const result = response.data;
                if (result.success) {
                    alert(result.msg);
                }
            })
            .catch((err) => alert(err.response.data.msg));
    };

    return (
        <div className="flex items-center h-screen justify-center">
            <div className="max-w-[60%] shadow-2xl rounded-2xl border-gray-200 lg:max-w-[90%] md:max-w-[90%] sm:min-w-[80%] 2sm:min-w-[90%]">
                <div className="flex justify-center">
                    <div className="self-center sm:hidden 2sm:hidden">
                        <img src={loginIcon} alt="loginIcon" />
                    </div>
                    <div className="flex-shrink w-[2px] bg-gray-200 my-5 sm:hidden 2sm:hidden"></div>
                    <form className="min-w-[60%] flex-grow flex flex-col justify-center gap-5 p-5 sm:min-w-[90%] 2sm:min-w-[90%]">
                        <h1 className="font-bold text-[50px] bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Login
                        </h1>
                        <div className="w-full">
                            <label className="font-bold" htmlFor="email">
                                Email:{' '}
                            </label>
                            <Input
                                type={'email'}
                                placeholder={'Please enter email'}
                                value={loginInfor.email}
                                onChange={(event) => handleOnFormChange({ email: event.target.value })}
                            />
                        </div>
                        <div className="w-full">
                            <label className="font-bold" htmlFor="password">
                                Password:{' '}
                            </label>
                            <Input
                                type={'password'}
                                placeholder={'Please enter password'}
                                value={loginInfor.password}
                                onChange={(event) => handleOnFormChange({ password: event.target.value })}
                            />
                        </div>
                        <div className="text-orange-200">Quên mật khẩu ?</div>
                        <div>
                            Chưa có tài khoản? <span className="text-orange-200">Đăng ký ngay</span>
                        </div>
                        <div
                            onClick={handleOnSubmit}
                            className="cursor-pointer w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 text-center text-[20px] font-bold"
                        >
                            Login
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
