import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiFilter, FiRefreshCw } from 'react-icons/fi';

import { categoryAPI } from '../../../API';
import { sortProductTypeItems } from '../../../constants';
import Select from '../../../components/Form/Select';
import Input from '../../../components/Form/Input';

function FilterForm(props) {
    const { filterOptions, onFormChange, onFilter } = props;
    const location = useLocation();
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sort, setSort] = useState({ 'Giá tăng dần': 'sellPrice' });

    const handleFetchCategory = async () => {
        try {
            const categories = await categoryAPI.getCategoryByType({ type: ['app', 'function'] });
            setCategory(categories);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFetchSubCategory = async () => {
        if (filterOptions.category !== 'Tất cả') {
            try {
                const categories = await categoryAPI.getCategoryByType({
                    type: 'service',
                    categoryName: filterOptions.category,
                });
                setSubCategory(categories);
            } catch (error) {
                if (error.response.status === 400) {
                    setSubCategory([]);
                }
                // console.log(error);
            }
        }
    };

    useEffect(() => {
        handleFetchCategory();
    }, []);

    useEffect(() => {
        onFormChange({
            category:
                category.filter((category) => category.slug === location.pathname.split('/').pop())[0]?.categoryName ||
                'Tất cả',
        });
    }, [category]);

    useEffect(() => {
        handleFetchSubCategory();
        onFormChange({ subCategory: 'Tất cả' });
    }, [filterOptions.category]);

    useEffect(() => {
        onFormChange({ sort: Object.values(sort)[0] });
    }, [sort]);
    return (
        <form className="flex justify-between gap-10 items-center mb-5 md:flex-wrap md:justify-normal md:gap-[14px] sm:flex-wrap sm:gap-2 2sm:flex-wrap 2sm:gap-2">
            <Select
                id={'category'}
                selectValues={[
                    ...category.map((item) => {
                        return { [item.categoryName]: item.categoryName };
                    }),
                ]}
                value={filterOptions.category}
                label={'Danh mục'}
                placeHolder={'Tất cả'}
                onSelect={(data) => onFormChange({ category: Object.values(data)[0] })}
                customClass={'md:w-[49%]'}
            />
            <Select
                id={'subCategory'}
                selectValues={[
                    ...subCategory.map((item) => {
                        return { [item.categoryName]: item.categoryName };
                    }),
                ]}
                value={filterOptions.subCategory}
                label={'Chức năng'}
                placeHolder={'Tất cả'}
                onSelect={(data) => onFormChange({ subCategory: Object.values(data)[0] })}
                customClass={'md:w-[49%]'}
            />
            <div className="flex items-center gap-3 xl:w-[250%] lg:w-[150%] md:gap-[14px] md:w-[49%] sm:w-full 2sm:w-full">
                <p className="whitespace-nowrap lg:hidden md:hidden sm:hidden 2sm:hidden">Mức giá: </p>
                <Input
                    type={'number'}
                    id={'minPrice'}
                    value={filterOptions.minPrice}
                    label={'Mức giá từ'}
                    placeHolder={'Mức giá từ'}
                    onChange={onFormChange}
                    customClass={'md:w-[49%]'}
                />
                <p className="lg:hidden md:hidden sm:hidden 2sm:hidden">-</p>
                <Input
                    type={'number'}
                    id={'maxPrice'}
                    value={filterOptions.maxPrice}
                    label={'Mức giá đến'}
                    placeHolder={'Mức giá đến'}
                    onChange={onFormChange}
                    customClass={'md:w-[49%]'}
                />
            </div>
            <Select
                id={'sortOption'}
                selectValues={sortProductTypeItems}
                value={Object.keys(sort)}
                label={'Sắp xếp'}
                placeHolder={'Sắp xếp'}
                onSelect={(data) => setSort({ ...data })}
                customClass={'md:w-[49%]'}
            />
            <div
                onClick={onFilter}
                className="bg-orange-300 text-white p-[7px] flex items-center rounded-lg font-semibold text-center hover:opacity-80 md:justify-items-start"
            >
                <FiFilter className="h-[20px] w-[20px]" /> Lọc
            </div>
        </form>
    );
}

export default FilterForm;
