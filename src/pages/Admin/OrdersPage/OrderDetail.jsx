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
        <div
            className={'px-4 my-4 bg-white rounded-xl mx-5 /*2sm:max-h-[80vh] 2sm:hideScrollbar 2sm:overflow-scroll*/'}
        >
            <p className="font-bold text-[25px]">Order Details </p>
            <div className="flex items-center gap-3 justify-start">
                <h1 className="text-orange-500 text-[50px]">{formatCash(0)}</h1>
                <Badge state={orderDetail.status}>{orderDetail.status}</Badge>
            </div>
            <div className="flex justify-start items-center gap-5">
                <div>
                    <p>Created At: </p>
                    <p>{orderDetail.createdAt}</p>
                </div>
                <div>
                    <p>Last Updated At: </p>
                    <p>{orderDetail.updatedAt}</p>
                </div>
                <div>Created At: </div>
            </div>
            <div>
                <h1>Customer Details: </h1>
                <div className="flex gap-3 items-start">
                    <p>Name: {orderDetail.customer?.name}</p>
                    <p>Email: {orderDetail.customer?.email}</p>
                    <p>PhoneNumber: {orderDetail.customer?.phoneNumb}</p>
                </div>
            </div>
            <div>
                <h1>Checkout Summary</h1>
                <div>
                    <div className=''>
                        <img src="" alt="typeImage" />
                        <p>type Id</p>
                        <p>Type Name</p>
                        <p>Code sold</p>
                        <p>Sold Price</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
