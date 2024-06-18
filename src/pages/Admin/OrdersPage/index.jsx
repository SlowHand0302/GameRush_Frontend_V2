import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';

import { orderAPI } from '../../../API';
import useDebounce from '../../../hooks/useDebounce';
import { formatDateFields } from '../../../utils/helpers';
import { sortOrderItems } from '../constants';
import OrderDetail from './OrderDetail';
import Select from '../../../components/Form/Select';
import TableV2 from '../components/TableV2';

function OrdersPage(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const ignoreAttr = ['__v', 'products', 'paymentType', 'phoneNumb', 'customer', 'productTypes'];
    const [sort, setSort] = useState({ Costliest: '-finalPrice' });
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const [orders, setOrders] = useState([]);
    const fetchOrders = async () => {
        try {
            const ordersData = await orderAPI.getOrders({ sort: Object.values(sort)[0] });
            setOrders(formatDateFields(ordersData));
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnClickDetailBtn = (item) => {
        navigate(location.pathname + '/' + item._id);
    };
    const onSelectSort = (data) => {
        setSort(data);
    };
    const handleOnSearch = async (query) => {
        if (query) {
            try {
                const searchResult = await orderAPI.getSearch(query);
                setOrders([...searchResult]);
            } catch (error) {
                console.log(error);
            }
        } else {
            fetchOrders();
        }
    };
    useEffect(() => {
        fetchOrders();
    }, [sort]);

    useEffect(() => {
        handleOnSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    console.log(orders);
    return (
        <div
            className={'px-4 my-4 bg-white rounded-xl mx-5 /*2sm:max-h-[80vh] 2sm:hideScrollbar 2sm:overflow-scroll*/'}
        >
            <p className="font-bold text-[25px]">Manage Orders</p>
            <div className="flex items-center 2sm:flex-col 2sm:items-start 2sm:gap-0">
                <div className="flex items-center relative py-5 w-[50%] sm:w-[60%] 2sm:w-full">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="border w-full border-gray-200 rounded-l-xl p-3 outline-none"
                        placeholder="Tìm kiếm sản phẩm"
                        autoComplete="off"
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <div className="p-5 bg-blue-700 rounded-r-xl text-white">
                        <IoIosSearch />
                    </div>
                </div>
                <div className="flex w-full justify-end items-center font-bold 2sm:mb-3 2sm:flex-col 2sm:items-start">
                    <div className="flex items-center bg-white px-5 min-w-[100px] rounded-xl 2sm:px-0">
                        <p className="whitespace-nowrap">Sort by:</p>
                        <Select
                            selectValues={sortOrderItems}
                            onSelect={onSelectSort}
                            customClass={'py-1'}
                            value={Object.keys(sort)}
                        />
                    </div>
                </div>
            </div>
            {orders.length > 0 && (
                <TableV2 itemsList={orders} ignoreAttr={ignoreAttr} onClickDetailBtn={handleOnClickDetailBtn} />
            )}
        </div>
    );
}

export { OrdersPage as AdminOrdersPage, OrderDetail };
