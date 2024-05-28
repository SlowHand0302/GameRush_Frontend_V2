import { Link } from 'react-router-dom';
import { useState } from 'react';

import {
    FaUserAlt,
    FaHome,
    FaSteam,
    FaGraduationCap,
    FaWindows,
    FaGoogleDrive,
    FaGooglePlay,
    FaBook,
} from 'react-icons/fa';
import { FiPlusCircle, FiPhone } from 'react-icons/fi';
import { GiConsoleController, GiSuitcase } from 'react-icons/gi';
// import { Md4GPlusMobiledata, MdAccountBalanceWallet, MdOutlineGames, MdOutlineClose } from 'react-icons/md';
import { Md4gPlusMobiledata, MdAccountBalanceWallet, MdOutlineGames, MdOutlineClose } from 'react-icons/md';
import { LuBadgePercent } from 'react-icons/lu';

import Overlay from '../../../components/Overlay';
import Register from '../Register';
import Login from '../../Login';

function Sidebar(props) {
    const { hideSidebarHeader = false, hideSidebarFooter = false, onClick, onCloseSidebar } = props;
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    return (
        <>
            <div
                onClick={(event) => onClick(event)}
                className={`bg-white h-full overflow-y-auto hideScrollbar ${
                    hideSidebarHeader || hideSidebarFooter ? 'w-full rounded-2xl' : 'w-[300px]'
                }`}
            >
                <div
                    className={`flex items-center justify-center gap-3 p-[10.5px] bg-orange-300 text-white ${
                        hideSidebarHeader ? 'hidden' : null
                    }`}
                >
                    <div className="border boder-white rounded-full text-[17.5px] p-[12.5px] cursor-pointer">
                        <FaUserAlt />
                    </div>
                    <p>
                        <span onClick={() => setShowLoginForm(true)} className="font-medium cursor-pointer">
                            Đăng Nhập
                        </span>
                        /
                        <span onClick={() => setShowRegisterForm(true)} className="font-medium cursor-pointer">
                            Đăng Ký
                        </span>
                    </p>
                    <div className="text-[17.5px] p-[12.5px] cursor-pointer" onClick={onCloseSidebar}>
                        <MdOutlineClose />
                    </div>
                </div>
                <div className={`text-black px-[19.5px] py-[10px]`}>
                    <Link
                        to={'/'}
                        className={`flex items-center justify-left gap-3 p-[10px] hover:bg-gray-100 ${
                            hideSidebarHeader || hideSidebarFooter ? 'hidden' : null
                        }`}
                    >
                        <FaHome className="text-[21px]" />
                        <p>Trang chủ</p>
                    </Link>
                    <Link
                        to={'/'}
                        className={`flex items-center justify-left gap-3 p-[10px] hover:bg-gray-100 border-gray-200 border-b ${
                            hideSidebarHeader || hideSidebarFooter ? 'hidden' : null
                        }`}
                    >
                        <FiPlusCircle className="text-[21px]" />
                        <p>Nạp tiền vào tài khoản</p>
                    </Link>
                    <Link
                        to={'/'}
                        className={`flex items-center justify-left gap-3 hover:bg-gray-100 ${
                            hideSidebarHeader || hideSidebarFooter ? 'py-[3px] px-[10px]' : 'p-[10px]'
                        }`}
                    >
                        <GiConsoleController className="text-[21px]" />
                        <p>Giải trí</p>
                    </Link>
                    <Link
                        to={'/'}
                        className={`flex items-center justify-left gap-3 hover:bg-gray-100 ${
                            hideSidebarHeader || hideSidebarFooter ? 'py-[3px] px-[10px]' : 'p-[10px]'
                        }`}
                    >
                        <GiSuitcase className="text-[21px]" />
                        <p>Làm việc</p>
                    </Link>
                    <Link
                        to={'/'}
                        className={`flex items-center justify-left gap-3 hover:bg-gray-100 ${
                            hideSidebarHeader || hideSidebarFooter ? 'py-[3px] px-[10px]' : 'p-[10px]'
                        }`}
                    >
                        <FaGraduationCap className="text-[21px]" />
                        <p>Học Tập</p>
                    </Link>
                    <Link
                        to={'/'}
                        className={`flex items-center justify-left gap-3 hover:bg-gray-100 ${
                            hideSidebarHeader || hideSidebarFooter ? 'py-[3px] px-[10px]' : 'p-[10px]'
                        }`}
                    >
                        <FaSteam className="text-[21px]" />
                        <p>Game Steam </p>
                    </Link>
                    <Link
                        to={'/'}
                        className={`flex items-center justify-left gap-3 hover:bg-gray-100 ${
                            hideSidebarHeader || hideSidebarFooter ? 'py-[3px] px-[10px]' : 'p-[10px]'
                        }`}
                    >
                        <MdOutlineGames className="text-[21px]" />
                        <p>EA Games</p>
                    </Link>
                    <Link
                        to={'/'}
                        className={`flex items-center justify-left gap-3 hover:bg-gray-100 ${
                            hideSidebarHeader || hideSidebarFooter ? 'py-[3px] px-[10px]' : 'p-[10px]'
                        }`}
                    >
                        <FaWindows className="text-[21px]" />
                        <p>Window Office</p>
                    </Link>
                    <Link
                        to={'/'}
                        className={`flex items-center justify-left gap-3 hover:bg-gray-100 ${
                            hideSidebarHeader || hideSidebarFooter ? 'py-[3px] px-[10px]' : 'p-[10px]'
                        }`}
                    >
                        <FaGoogleDrive className="text-[21px]" />
                        <p>Google Drive</p>
                    </Link>
                    <Link
                        to={'/'}
                        className={`flex items-center justify-left gap-3 hover:bg-gray-100 ${
                            hideSidebarHeader || hideSidebarFooter ? 'py-[3px] px-[10px]' : 'p-[10px]'
                        }`}
                    >
                        <MdAccountBalanceWallet className="text-[21px]" />
                        <p>Steam Wallet</p>
                    </Link>
                    <Link
                        to={'/'}
                        className={`flex items-center justify-left gap-3 hover:bg-gray-100 ${
                            hideSidebarHeader || hideSidebarFooter ? 'py-[3px] px-[10px]' : 'p-[10px]'
                        }`}
                    >
                        <Md4gPlusMobiledata className="text-[21px]" />
                        <p>Gói Data Mobile</p>
                    </Link>
                    <Link
                        to={'/'}
                        className={`flex items-center justify-left gap-3 hover:bg-gray-100 ${
                            hideSidebarHeader || hideSidebarFooter ? 'py-[3px] px-[10px]' : 'p-[10px]'
                        }`}
                    >
                        <FaGooglePlay className="text-[21px]" />
                        <p>Goole Plays, iTunes</p>
                    </Link>
                </div>
                <div className={`text-black px-[19.5px] py-[10px] ${hideSidebarFooter ? 'hidden' : null}`}>
                    <Link
                        to={'/'}
                        className="flex items-center justify-left gap-3 p-[10px] hover:bg-gray-100 border-gray-200 border-t"
                    >
                        <FaBook className="text-[21px]" />
                        <p>Hướng dẫn mua hàng</p>
                    </Link>
                    <Link to={'/'} className="flex items-center justify-left gap-3 p-[10px] hover:bg-gray-100">
                        <LuBadgePercent className="text-[21px]" />
                        <p>Ưu đãi khách hàng</p>
                    </Link>
                    <Link to={'/'} className="flex items-center justify-left gap-3 p-[10px] hover:bg-gray-100">
                        <FiPhone className="text-[21px]" />
                        <p>Thông tin liên hệ</p>
                    </Link>
                </div>
            </div>
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

export default Sidebar;
