import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { useEffect, useState } from 'react';

import { AdminProducTypeAPI } from '../../../API';
import { formatDateFields } from '../../../utils/helpers';
import { sortProductTypeItems } from '../constants';
import Select from '../../../components/Form/Select';
import TableV2 from '../components/TableV2';
import AddProductType from './AddProductType';

function ProductTypesPage(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [productTypes, setProductTypes] = useState([]);
    const ignoreAttr = ['_id', 'desc', 'categories', 'subCategories', '__v', 'description', 'createdAt'];
    const [sort, setSort] = useState({ Newest: '-updatedAt' });
    const onSelectSort = (data) => {
        setSort(data);
    };
    const fetchData = async (query) => {
        try {
            const productTypeData = await AdminProducTypeAPI.getProductTypesByFilter(query);
            setProductTypes(formatDateFields(productTypeData));
        } catch (error) {
            console.log(error);
        }
    };
    const handleOnClickDetailsBtn = (data) => {
        navigate('/' + data._id, { target: '_blank' });
    };
    const handleOnClickEditsBtn = (data) => {
        navigate(location.pathname + '/' + data._id);
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
            fetchData();
        }
    };
    useEffect(() => {
        fetchData({ sort: Object.values(sort) });
    }, [sort]);

    return (
        <div
            className={'px-4 my-4 bg-white rounded-xl mx-5 /*2sm:max-h-[80vh] 2sm:hideScrollbar 2sm:overflow-scroll*/'}
        >
            <p className="font-bold text-[25px]">Manage Product Type</p>
            <div className="flex items-center 2sm:flex-col 2sm:items-start 2sm:gap-0">
                <div className="flex items-center relative py-5 w-[50%] sm:w-full 2sm:w-full">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="border w-full border-gray-200 rounded-l-xl p-3 outline-none"
                        placeholder="Tìm kiếm sản phẩm"
                        onChange={(event) => handleOnSearch(event.target.value)}
                    />
                    <div className="p-5 bg-blue-700 rounded-r-xl text-white">
                        <IoIosSearch />
                    </div>
                </div>
                <div className="flex w-full justify-end items-center font-bold 2sm:mb-3 2sm:flex-col 2sm:items-start">
                    <Link
                        to={`${location.pathname}/create`}
                        className="bg-green-500 py-3 px-8 text-center rounded-xl text-white 2sm:px-12"
                    >
                        Add
                    </Link>
                    <div className="flex items-center bg-white px-5 min-w-[100px] rounded-xl 2sm:px-0">
                        <p className="whitespace-nowrap">Sort by:</p>
                        <Select
                            id={'sort'}
                            selectValues={sortProductTypeItems}
                            onSelect={onSelectSort}
                            customClass={'py-1'}
                            value={Object.keys(sort)}
                        />
                    </div>
                </div>
            </div>
            {productTypes.length > 0 ? (
                <TableV2
                    itemsList={productTypes}
                    ignoreAttr={ignoreAttr}
                    onClickDetailBtn={handleOnClickDetailsBtn}
                    onClickEditBtn={handleOnClickEditsBtn}
                />
            ) : null}
        </div>
    );
}

export { ProductTypesPage, AddProductType };
