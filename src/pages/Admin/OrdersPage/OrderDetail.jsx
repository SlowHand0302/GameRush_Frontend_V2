import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { formatCash, formatDate, formatDateFields } from '../../../utils/helpers';
import { orderAPI } from '../../../API';
import Badge from '../../../components/Badge';

function OrderDetail(props) {
    const location = useLocation();
    const [orderDetail, setOrderDetail] = useState({});
    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const orderData = await orderAPI.getOrderById(location.pathname.split('/').pop());
                setOrderDetail(formatDateFields([orderData])[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrderDetail();
    }, []);

    return (
        <div className={'p-10 my-4 bg-white rounded-xl mx-5 flex flex-col gap-3'}>
            <p className="font-bold text-[31px]">
                Order Details: <span className="text-orange-500 font-medium">{orderDetail._id}</span>
            </p>
            <div className="flex items-center gap-3 justify-start">
                <h1 className="text-orange-500 text-[31px]">
                    {orderDetail?.finalPrice && formatCash(orderDetail?.finalPrice)}
                </h1>
                <Badge state={orderDetail.status}>{orderDetail.status}</Badge>
            </div>
            <div className="flex justify-start items-start gap-10">
                <div className="flex gap-3">
                    <p className="font-bold">Created At: </p>
                    <p>{orderDetail.createdAt}</p>
                </div>
                <div className="flex gap-3">
                    <p className="font-bold">Last Updated At: </p>
                    <p>{orderDetail.updatedAt}</p>
                </div>
            </div>
            <div>
                <h1 className="text-[25px] font-bold">Customer Details: </h1>
                <div className="flex gap-3 items-start flex-col">
                    <div className="flex gap-3">
                        <h2 className="font-bold text-[16px]">Name:</h2>
                        <p className="font-medium text-[16px]">{orderDetail.customer?.name}</p>
                    </div>
                    <div className="flex gap-3">
                        <h2 className="font-bold text-[16px]">Email:</h2>
                        <p className="font-medium text-[16px]">{orderDetail.customer?.email}</p>
                    </div>
                    <div className="flex gap-3">
                        <h2 className="font-bold text-[16px]">Phone: </h2>
                        <p className="font-medium text-[16px]">{orderDetail.customer?.phoneNumb}</p>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-[25px] font-bold">Checkout Summary</h1>
                <table className="table-auto w-full text-center border-seperate rounded-2xl hideScrollbar overflow-scroll">
                    <thead className="bg-gray-200 rounded-2xl p-4 capitalize sticky top-0">
                        <tr>
                            <th className="py-5">Type ID</th>
                            <th className="py-5">Type Name</th>
                            <th className="py-5">Code Sold</th>
                            <th className="py-5">Sold Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetail?.productTypes?.map((type, index) => {
                            return (
                                <tr key={index}>
                                    <td className="py-5 border border-gray-200">{type.productType}</td>
                                    <td className="py-5 border border-gray-200">{type.name}</td>
                                    <td className="py-5 border border-gray-200">
                                        {type.products.map((product, index) => {
                                            return (
                                                <div className="flex gap-3">
                                                    <p>{index + 1}.</p>
                                                    <p key={index}>{product.productCode}</p>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td className="py-5 border border-gray-200">{formatCash(type.subtotal)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderDetail;
