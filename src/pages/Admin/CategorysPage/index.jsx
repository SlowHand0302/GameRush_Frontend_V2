import { IoIosSearch } from 'react-icons/io';
import { useEffect, useState } from 'react';

import { AdminCategoryAPI } from '../../../API';
import useDebounce from '../../../hooks/useDebounce';
import Select from '../../../components/Form/Select';
import Overlay from '../../../components/Overlay';
import TableV2 from '../components/TableV2';
import AddCategory from './AddCategory';
import { formatDateFields } from '../../../utils/helpers';
import { sortCategoryItems } from '../constants';

function Category(props) {
    const ignoreAttr = ['_id', '__v'];
    const ignoreChildAttr = ['state'];
    const [categories, setCategories] = useState([]);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [dataForUpdate, setDataForUpdate] = useState({});
    const [sort, setSort] = useState({ Newest: '-updatedAt' });
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const fetchData = async function () {
        try {
            const categoryData = await AdminCategoryAPI.getCategoryBySort(sort);
            setCategories(formatDateFields(categoryData));
        } catch (error) {
            console.log(error);
        }
    };
    const onSelectSort = (data) => {
        setSort(data);
    };
    const handleOnClickEditBtn = (item) => {
        setShowModalAdd(true);
        setDataForUpdate({ ...item });
    };
    const handleOnSearch = async (query) => {
        if (query) {
            try {
                const searchResult = await AdminCategoryAPI.getSearch(query);
                setCategories([...searchResult]);
            } catch (error) {
                console.log(error);
            }
        } else {
            fetchData();
        }
    };
    useEffect(() => {
        fetchData();
    }, [sort]);
    useEffect(() => {
        handleOnSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm]);
    return (
        <div className={'px-4 my-4 bg-white rounded-xl mx-5'}>
            <p className="font-bold text-[25px]">Manage Category</p>
            <div className="flex items-center 2sm:flex-col 2sm:items-start 2sm:gap-0">
                <div className="flex items-center relative py-5 w-[50%] sm:w-[60%] 2sm:w-full">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="border w-full border-gray-200 rounded-l-xl p-3 outline-none"
                        placeholder="Tìm kiếm sản phẩm"
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <div className="p-5 bg-blue-700 rounded-r-xl">
                        <IoIosSearch />
                    </div>
                </div>
                <div className="flex w-full justify-end items-center font-bold 2sm:mb-3 2sm:flex-col 2sm:items-start">
                    <div
                        className="bg-green-500 py-3 px-8 text-center rounded-xl cursor-pointer text-white 2sm:px-12"
                        onClick={() => setShowModalAdd(true)}
                    >
                        Add
                    </div>
                    <div className="flex items-center bg-white px-5 min-w-[100px] rounded-xl 2sm:px-0">
                        <p className="whitespace-nowrap">Sort by:</p>
                        <Select
                            id={'sort'}
                            selectValues={sortCategoryItems}
                            onSelect={onSelectSort}
                            customClass={'py-1'}
                            value={Object.keys(sort)}
                        />
                    </div>
                </div>
            </div>
            {categories.length > 0 ? (
                <TableV2
                    itemsList={categories}
                    ignoreAttr={ignoreAttr}
                    ignoreChildAttr={ignoreChildAttr}
                    onClickEditBtn={handleOnClickEditBtn}
                />
            ) : null}
            {showModalAdd ? (
                <Overlay customClass={'flex items-center justify-center'}>
                    <AddCategory
                        onClose={() => {
                            setShowModalAdd(!showModalAdd);
                            setDataForUpdate({});
                        }}
                        dataForUpdate={dataForUpdate}
                        onAdd={fetchData}
                        onUpdate={fetchData}
                    />
                </Overlay>
            ) : null}
        </div>
    );
}

export default Category;
