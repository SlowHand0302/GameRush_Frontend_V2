import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { logos, headerIcons } from '../../../assets/img';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { FaBook, FaEye, FaFire, FaPercent, FaCreditCard, FaUserAlt } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import { LuBadgePercent, LuShoppingCart, LuMenu } from 'react-icons/lu';
import { FiPhone } from 'react-icons/fi';

import { useAuth } from '../../../hooks/authContext';
import { SearchBar } from '../../../components/FormBasic';
import Overlay from '../../../components/Overlay';
import Sidebar from './Sidebar';
import Register from '../Register';
import Login from '../../Login';

function Header(props) {
    const { user, authenticated } = useAuth();
    const [showSidebar, setShowSidebar] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const [cartCount, setCartCount] = useState(0);
    const [userLogin, setUserLogin] = useState(user.username || user.email || '');

    const handleOnShowSidebar = () => {
        setShowSidebar(!showSidebar);
    };
    const handleOnSidebarClick = (event) => {
        event.stopPropagation();
    };
    const loadUserName = () => {
        if (authenticated && user.role === 'Customer') {
            setUserLogin(user.username);
        } else {
            setUserLogin('');
        }
    };
    useEffect(() => {
        const handleStorageChange = () => {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            setCartCount(cartItems.length);
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [userLogin, cartCount]);

    useEffect(() => {
        window.dispatchEvent(new Event('storage'));
        loadUserName();
    }, [user]);
    return (
        <>
            <header className="text-white text-[14px] sticky top-0 z-50">
                <nav className="w-full flex justify-center items-center bg-orange-500 xl:flex lg:flex md:hidden sm:hidden 2sm:hidden">
                    <div className="flex justify-between px-2 py-5 xl:w-layout lg:w-full">
                        <div className="flex gap-2 items-center cursor-pointer">
                            <IoIosArrowBack /> <IoIosArrowForward /> Pad chuột Divide
                        </div>
                        <div className="flex justify-between gap-4">
                            <p className="flex gap-2 items-center cursor-pointer">
                                <FaBook />
                                Hướng dẫn mua hàng
                            </p>
                            <p className="flex gap-2 items-center cursor-pointer">
                                <LuBadgePercent />
                                Ưu đãi khách hàng
                            </p>
                            <p className="flex gap-2 items-center cursor-pointer">
                                <FiPhone />
                                Thông tin liên hệ
                            </p>
                        </div>
                    </div>
                </nav>
                <nav className="w-full flex justify-center items-center bg-orange-300">
                    <div className="py-5 xl:w-layout lg:w-full md:w-full sm:w-full 2sm:w-full">
                        <div className="flex justify-between items-center">
                            <Link
                                to={'/'}
                                className="flex items-center p-[10.5px] xl:flex lg:flex md:hidden sm:hidden 2sm:hidden "
                            >
                                <img src={logos[2]} alt="logo" width={100} height={100} />
                                <p className="text-4xl font-bold">GameRush</p>
                            </Link>
                            <div
                                className="flex items-center cursor-pointer xl:hidden lg:hidden md:block sm:block"
                                onClick={handleOnShowSidebar}
                            >
                                <div className="text-[45px] p-[10.5px]">
                                    <LuMenu />
                                </div>
                            </div>
                            <div className="p-[10.5px] w-[35%] sm:w-[60%] 2sm:w-[60%]">
                                <SearchBar />
                            </div>
                            <div className="flex items-center gap-3 p-[10.5px] sm:hidden 2sm:hidden">
                                <div className="border-1 border-white rounded-full text-[17.5px] p-[12.5px]">
                                    <FaUserAlt />
                                </div>
                                {userLogin !== '' ? (
                                    <Link to={'/me'}>{userLogin}</Link>
                                ) : (
                                    <p>
                                        <span
                                            onClick={() => setShowLoginForm(true)}
                                            className="font-medium cursor-pointer"
                                        >
                                            Đăng Nhập
                                        </span>{' '}
                                        /{' '}
                                        <span
                                            onClick={() => setShowRegisterForm(true)}
                                            className="font-medium cursor-pointer"
                                        >
                                            Đăng Ký
                                        </span>
                                    </p>
                                )}
                            </div>
                            <Link
                                to={'/cart'}
                                className="rounded-md border border-white pr-[12.5px] flex items-center justify-center mr-[10.5px]"
                            >
                                <div className="text-[17.5px] p-[12.5px]">
                                    <LuShoppingCart />
                                </div>
                                <p className="sm:hidden 2sm:hidden">Giỏ hàng</p>
                                <p className="bg-white rounded-sm text-black ml-1 p-1 font-medium">{cartCount}</p>
                            </Link>
                        </div>
                        <div className="flex justify-between items-center md:hidden sm:hidden 2sm:hidden">
                            <div className="flex gap-2 items-center cursor-pointer px-[10.5px]">
                                <FaEye />
                                <p>Sản phẩm bạn vừa xem</p>
                            </div>
                            <Link to={'/'} className="flex gap-2 items-center px-[10.5px]">
                                <FaFire />
                                <p>Sản phẩm mua nhiều</p>
                            </Link>
                            <Link to={'/'} className="flex gap-2 items-center px-[10.5px]">
                                <FaPercent />
                                <p>Sản phẩm khuyến mãi</p>
                            </Link>
                            <Link to={'/'} className="flex gap-2 items-center px-[10.5px]">
                                <FaMapLocationDot />
                                <p>Đại lý giao dịch</p>
                            </Link>
                            <Link to={'/'} className="flex gap-2 items-center px-[10.5px]">
                                <FaCreditCard />
                                <p>Hình thức thanh toán</p>
                            </Link>
                        </div>
                    </div>
                </nav>
                <nav className="text-black py-[7px] flex justify-center border-b border-gray-200 bg-white items-center w-full md:hidden sm:hidden 2sm:hidden">
                    <div
                        className="flex justify-between items-center xl:w-layout lg:w-full md:w-full sm:w-full "
                        onClick={handleOnShowSidebar}
                    >
                        <div className="flex items-center gap-5">
                            <div className="text-[17.5px] p-[12.5px]">
                                <LuMenu />
                            </div>
                            Danh mục sản phẩm
                        </div>
                        <div className="flex items-center gap-5 mr-3">
                            <Link to={'/'} className="flex items-center gap-3">
                                <img src={headerIcons[0]} alt="icon" />
                                <p className="font-semibold">Thủ thuật & Tin tức</p>
                            </Link>
                            <Link to={'/'} className="flex items-center gap-3">
                                <img src={headerIcons[1]} alt="icon" />
                                <p className="font-semibold">Giới thiệu bạn bè</p>
                            </Link>
                            <Link to={'/'} className="flex items-center gap-3">
                                <img src={headerIcons[2]} alt="icon" />
                                <p className="font-semibold">Liên hệ hợp tác</p>
                            </Link>
                            <Link to={'/'} className="flex items-center gap-3">
                                <img src={headerIcons[3]} alt="icon" />
                                <p className="font-semibold">Ưu đãi khách hàng VIP</p>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
            {showSidebar && (
                <Overlay onClick={handleOnShowSidebar}>
                    <Sidebar onClick={handleOnSidebarClick} onCloseSidebar={handleOnShowSidebar} />
                </Overlay>
            )}
            {showLoginForm && (
                <Overlay>
                    <Login onClose={() => setShowLoginForm(false)} onRegisterNow={() => setShowRegisterForm(true)} />
                </Overlay>
            )}
            {showRegisterForm && (
                <Overlay>
                    <Register onClose={() => setShowRegisterForm(false)} onLoginNow={() => setShowLoginForm(true)} />
                </Overlay>
            )}
        </>
    );
}

export { Header as ClientHeader };
