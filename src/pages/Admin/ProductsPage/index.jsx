import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';

import { AdminProductAPI, AdminProducTypeAPI } from '../../../API';
import { formatDateFields } from '../../../utils/helpers';
import Select from '../../../components/Form/Select';
import ProductByType from './ProductByType';
import TableV2 from '../components/TableV2';
import { sortProductItems } from '../constants';

function ProductsPage(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const ignoreAttr = [
        '_id',
        'desc',
        'categories',
        'subCategories',
        '__v',
        'description',
        'createdAt',
        'originalPrice',
        'updatedAt',
    ];
    const [sort, setSort] = useState({ Costliest: '-sellPrice' });
    const [productTypes, setProductTypes] = useState([]);
    const fetchProductTypes = async (query) => {
        try {
            const productTypeData = await AdminProducTypeAPI.getProductTypesByFilter(query);
            const updatedProductTypes = await Promise.all(
                productTypeData.map(async (productType) => {
                    const productNumbs = await AdminProductAPI.getCountByType(productType._id);
                    return { ...productType, stock: productNumbs };
                }),
            );
            setProductTypes(formatDateFields(updatedProductTypes));
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
                const searchResult = await AdminProducTypeAPI.getSearch(query);
                setProductTypes([...searchResult]);
            } catch (error) {
                console.log(error);
            }
        } else {
            fetchProductTypes();
        }
    };
    useEffect(() => {
        fetchProductTypes({ sort: Object.values(sort) });
    }, [sort]);

    return (
        <div
            className={'px-4 my-4 bg-white rounded-xl mx-5 /*2sm:max-h-[80vh] 2sm:hideScrollbar 2sm:overflow-scroll*/'}
        >
            <p className="font-bold text-[25px]">Manage Product</p>
            <div className="flex items-center 2sm:flex-col 2sm:items-start 2sm:gap-0">
                <div className="flex items-center relative py-5 w-[50%] sm:w-[60%] 2sm:w-full">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="border w-full border-gray-200 rounded-l-xl p-3 outline-none"
                        placeholder="Tìm kiếm sản phẩm"
                        autoComplete='off'
                        onChange={(event) => handleOnSearch(event.target.value)}
                    />
                    <div className="p-5 bg-blue-700 rounded-r-xl text-white">
                        <IoIosSearch />
                    </div>
                </div>
                <div className="flex w-full justify-end items-center font-bold 2sm:mb-3 2sm:flex-col 2sm:items-start">
                    <div className="flex items-center bg-white px-5 min-w-[100px] rounded-xl 2sm:px-0">
                        <p className="whitespace-nowrap">Sort by:</p>
                        <Select
                            selectValues={sortProductItems}
                            onSelect={onSelectSort}
                            customClass={'py-1'}
                            value={Object.keys(sort)}
                        />
                    </div>
                </div>
            </div>
            {productTypes.length > 0 && (
                <TableV2 itemsList={productTypes} ignoreAttr={ignoreAttr} onClickDetailBtn={handleOnClickDetailBtn} />
            )}
        </div>
    );
}

export { ProductsPage as AdminProductsPage, ProductByType };
