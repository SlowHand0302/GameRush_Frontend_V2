// import { Input } from '../../components/FormBasic';
import Input from '../../components/Form/Input';
import { registerIcon } from '../../assets/img';
function Register(props) {
    return (
        <div className="flex items-center h-screen justify-center">
            <div className="max-w-[70%] shadow-2xl rounded-2xl border-gray-200 lg:max-w-[90%] md:max-w-[90%] sm:min-w-[80%] 2sm:min-w-[90%]">
                <div className="flex justify-center">
                    <div className="self-center sm:hidden 2sm:hidden">
                        <img src={registerIcon} alt="registerIcon" />
                    </div>
                    <div className="flex-shrink w-[2px] bg-gray-200 my-5 sm:hidden 2sm:hidden"></div>
                    <form className="min-w-[60%] flex flex-col justify-center gap-5 p-5 sm:min-w-[90%] 2sm:min-w-[90%]">
                        <h1 className="font-bold text-[50px] bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Register
                        </h1>
                        <form action="" className='flex flex-col gap-8'>
                            <Input type={'text'} label={'Họ và tên'} placeHolder={'Họ và tên'} />
                            <Input type={'email'} label={'Email'} placeHolder={'Email'} />
                            <Input type={'text'} label={'Tên đăng Nhập'} placeHolder={'Tên đăng Nhập'} />
                            <Input type={'text'} label={'Số điện thoại'} placeHolder={'Số điện thoại'} />
                            <Input type={'password'} label={'Mật Khẩu'} placeHolder={'Mật Khẩu'} />
                            <Input type={'password'} label={'Nhập lại Mật Khẩu'} placeHolder={'Nhập lại Mật Khẩu'} />
                        </form>
                        <div>
                            Đã có tài khoản? <span className="text-orange-200">Đăng Nhập ngay</span>
                        </div>
                        <div className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 text-center text-[20px] font-bold">
                            Register
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
