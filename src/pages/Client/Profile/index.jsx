import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';

import Infor from './Infor';
import PurcaseHistory from './PurchaseHistory';
import { logout } from '../../../API/auth';

function Profile(props) {
    const navigate = useNavigate();
    const [showSection, setShowSection] = useState('account');

    return (
        <div className="w-full bg-gray-100 flex justify-center items-center p-7 2sm:p-0">
            <div className="xl:w-layout lg:w-full md:w-full sm:w-full">
                <div className="flex gap-5 sm:flex-col 2sm:flex-col">
                    <div className="bg-white rounded-xl w-[20%] h-full sm:flex 2sm:flex sm:w-fit 2sm:w-fit">
                        <div
                            onClick={() => setShowSection('account')}
                            className="flex gap-3 items-center cursor-pointer p-6 border border-gray-200 border-l-4 border-l-orange-400 rounded-tl-xl"
                        >
                            <FaUser />
                            Tài khoản
                        </div>
                        <div
                            onClick={() => setShowSection('history')}
                            className="flex gap-3 items-center cursor-pointer p-6 border border-gray-200 border-l-4 border-l-orange-400"
                        >
                            <FaShoppingCart />
                            Lịch sử mua hàng
                        </div>
                        <div
                            onClick={() => {
                                logout();
                                window.dispatchEvent(new Event('storage'));
                                navigate('/');
                            }}
                            className="flex gap-3 items-center cursor-pointer p-6 border border-gray-200 border-l-4 border-l-orange-400 rounded-bl-xl"
                        >
                            <LuLogOut />
                            Đăng xuất
                        </div>
                    </div>
                    <hr />
                    <div className="flex-1 bg-white rounded-xl p-9">
                        {showSection === 'account' && <Infor />}
                        {showSection === 'history' && <PurcaseHistory />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
