import { Link } from 'react-router-dom';
import { SidebarItems } from '../../constants/adminSidebarItems';
import { IoIosArrowForward } from 'react-icons/io';

function Dashboard(props) {
    return (
        <div className="w-full h-[80%] flex items-center justify-center">
            <div className=" w-[90%] min-h-[50%] relative flex flex-col items-center gap-1 bg-white shadow-lg rounded-xl pb-7">
                <p className="text-[106px] 2sm:text-[50px] sm:text-[50px] text-center font-extralight bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent ">
                    WELCOME BACK
                </p>
                <div className="flex gap-[50px] 2sm:gap-[20px] sm:gap-[30px] flex-wrap p-3 overflow-y-scroll max-h-[90vh] hideScrollbar">
                    {SidebarItems.map((item, index) => {
                        let Icon = item.icon;
                        let url = '';
                        switch (item.title) {
                            case 'Dashboard':
                                url = '/admin';
                                break;
                            case 'Products':
                                url = '/admin/products';
                                break;
                            case 'Order':
                                url = '/admin/order';
                                break;
                            case 'Account':
                                url = '/admin/account';
                                break;
                            default:
                                break;
                        }
                        return (
                            <Link
                                to={url}
                                key={index}
                                className={`flex-1 flex gap-[20px] border border-gray-200 justify-start items-center rounded-xl py-3 px-5 hover:bg-orange-200`}
                            >
                                <div className="flex gap-3 items-center w-full">
                                    <Icon className="text-[30px]" />
                                    <p className="">{item.title}</p>
                                </div>
                                <IoIosArrowForward />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
