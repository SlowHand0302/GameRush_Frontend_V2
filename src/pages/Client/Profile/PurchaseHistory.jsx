import { useEffect, useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import { Input } from '../../../components/FormBasic';

import { getOrdersByCutomer, getOrderById } from '../../../API/order';
import Badge from '../../../components/Badge';
import Overlay from '../../../components/Overlay';
import { formatDate, formatCash } from '../../../utils/helpers';

function PurcaseHistory(props) {
    const [userInfor, setUserInfor] = useState(localStorage.getItem('userId') || {});
    const [orders, setOrders] = useState([]);
    const [selectOrder, setSelectOrder] = useState(-1);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const fetchOrders = async () => {
        try {
            const orders = await getOrdersByCutomer(userInfor);
            setOrders(orders);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);
    // console.log(userInfor);
    return (
        <>
            <div className="mb-5">
                <h1 className="text-[30px] font-bold">Lịch sử mua hàng</h1>
                <p>Hiển thị thông tin các sản phẩm bạn đã mua tại Divine Shop</p>
            </div>
            <form
                action=""
                className="flex justify-between gap-10 items-center mb-5 md:flex-wrap md:justify-normal md:gap-[14px] sm:flex-wrap sm:gap-2 2sm:flex-wrap 2sm:gap-2"
            >
                <div className="flex-grow">
                    <label htmlFor="orderId">Mã đơn hàng</label>
                    <Input
                        id={'orderId'}
                        placeholder={'Mã đơn hàng'}
                        className={'focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl'}
                    />
                </div>
                <div className="flex-grow">
                    <label htmlFor="maxPrice">Số tiền từ</label>
                    <Input
                        id={'maxPrice'}
                        placeholder={'Số tiền từ'}
                        className={'focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl'}
                    />
                </div>
                <div className="flex-grow">
                    <label htmlFor="minPrice">Số tiền đến</label>
                    <Input
                        id={`minPrice`}
                        placeholder={'Số tiền đến'}
                        className={'focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl'}
                    />
                </div>
                <div className="flex-grow">
                    <label htmlFor="fromDate">Từ Ngày</label>
                    <Input
                        id={'fromDate'}
                        type={'date'}
                        className={'focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl'}
                    />
                </div>
                <div className="flex-grow">
                    <label htmlFor="toDate">Đến Ngày</label>
                    <Input
                        id={'toDate'}
                        type={'date'}
                        className={'focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl'}
                    />
                </div>
                <div className="rounded-xl self-end flex gap-2 items-center cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 text-center text-[12px] font-bold">
                    <CiFilter className="text-[20px]" />
                    Lọc
                </div>
            </form>
            <table className="table-auto w-full rounded-xl">
                <thead>
                    <tr className=" border border-1 border-gray-200 rounded-t-xl">
                        <th className="p-3 border-gray-200 border rounded-tl-xl">Thời gian</th>
                        <th className="p-3 border-gray-200 border">Mã đơn hàng</th>
                        <th className="p-3 border-gray-200 border">Sản Phẩm</th>
                        <th className="p-3 border-gray-200 border">Tổng tiền</th>
                        <th className="p-3 border-gray-200 border rounded-tr-xl">Trạng Thái</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => {
                        return (
                            <tr
                                key={index}
                                className="cursor-pointer"
                                onClick={() => {
                                    setSelectOrder(index);
                                    setShowDetailModal(true);
                                }}
                            >
                                <th className="font-normal p-5 text-center border border-gay-200">
                                    {formatDate(order.updatedAt, 'dd/mm/yyyy')}
                                </th>
                                <th className="font-normal p-5 text-center border border-gay-200">{order._id}</th>
                                <th className="font-normal p-5 text-center border border-gay-200">
                                    {order.productTypes?.map((type, index) => {
                                        return (
                                            <p className="line-clamp-1" key={index}>
                                                {type.name}
                                            </p>
                                        );
                                    })}
                                </th>
                                <th className="font-normal p-5 text-center border border-gay-200">
                                    {formatCash(order.finalPrice)}
                                </th>
                                <th className="border border-gay-200 text-center">
                                    <div className="flex items-center justify-center">
                                        <Badge state={order.status}>{order.status}</Badge>
                                    </div>
                                </th>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {showDetailModal && (
                <Overlay customClass={'flex items-center justify-center'} onClick={() => setShowDetailModal(false)}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={'p-10 my-4 bg-white rounded-xl mx-5 flex flex-col gap-3 w-max'}
                    >
                        <p className="font-bold text-[31px]">
                            Order Details:{' '}
                            <span className="text-orange-500 font-medium">{orders[selectOrder]?._id}</span>
                        </p>
                        <div className="flex items-center gap-3 justify-start">
                            <h1 className="text-orange-500 text-[31px]">
                                {orders[selectOrder]?.finalPrice && formatCash(orders[selectOrder]?.finalPrice)}
                            </h1>
                            <Badge state={orders[selectOrder]?.status}>{orders[selectOrder]?.status}</Badge>
                        </div>
                        <div className="flex justify-start items-start gap-10">
                            <div className="flex gap-3">
                                <p className="font-bold">Created At: </p>
                                <p>06/18/2024</p>
                            </div>
                            <div className="flex gap-3">
                                <p className="font-bold">Last Updated At: </p>
                                <p>06/18/2024</p>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-[25px] font-bold">Checkout Summary</h1>
                            <table className="table-auto w-full text-center border-seperate rounded-2xl hideScrollbar overflow-scroll">
                                <thead className="bg-gray-200 rounded-2xl p-4 capitalize sticky top-0">
                                    <tr>
                                        <th className="p-5">Type ID</th>
                                        <th className="p-5">Type Name</th>
                                        <th className="p-5">Code</th>
                                        <th className="p-5">Sold Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders[selectOrder]?.productTypes?.map((type, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="p-5 border border-gray-200">{type.productType}</td>
                                                <td className="p-5 border border-gray-200">{type.name}</td>
                                                <td className="p-5 border border-gray-200">
                                                    {type.products.map((product, index) => {
                                                        return (
                                                            <div className="flex gap-3">
                                                                <p>{index + 1}.</p>
                                                                <p key={index}>{product.productCode}</p>
                                                            </div>
                                                        );
                                                    })}
                                                </td>
                                                <td className="p-5 border border-gray-200">
                                                    {formatCash(type.subtotal)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Overlay>
            )}
        </>
    );
}

export default PurcaseHistory;
