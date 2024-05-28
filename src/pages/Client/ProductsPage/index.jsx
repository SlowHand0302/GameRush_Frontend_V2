import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { producTypeAPI } from '../../../API';
import ProductCard from '../components/ProductCard';
import FilterForm from './FilterForm';
import { emptyFilterIcon } from '../../../assets/img';

function ProductsPage(props) {
    const location = useLocation();
    const [productsByType, setProductsByType] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        category: 'Tất cả',
        subCategory: 'Tất cả',
        maxPrice: 0,
        minPrice: 0,
    });

    const handleOnFilterOptionsChange = (data) => {
        setFilterOptions({ ...filterOptions, [Object.keys(data)[0]]: Object.values(data)[0] });
    };

    const handleFetchData = async () => {
        try {
            const productTypes = await producTypeAPI.getProductTypesByFilter({
                slug: location.pathname.split('/').pop(),
            });
            setProductsByType(productTypes);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnFilter = async () => {
        const query = Object.assign(
            {},
            ...Object.entries(filterOptions).map(([key, value]) =>
                value !== 'Tất cả' && value != 0 ? { [key]: value } : {},
            ),
        );
        const { category, subCategory, ...rest } = query;
        try {
            const productTypes = await producTypeAPI.getProductTypesByFilter({
                categories: [category, subCategory],
                ...rest,
            });
            setProductsByType(productTypes);
        } catch (error) {
            if (error.response.status === 400) {
                setProductsByType([]);
            } else {
                console.log(error);
            }
        }
    };
    useEffect(() => {
        handleFetchData();
    }, []);
    return (
        <div className="w-full flex justify-center items-center p-7 bg-gray-100">
            <div className="xl:w-layout lg:w-full md:w-full sm:w-full 2sm:w-full">
                <div className="font-bold text-[31.5px]">Tìm kiếm sản phẩm</div>
                <FilterForm
                    filterOptions={filterOptions}
                    onFormChange={handleOnFilterOptionsChange}
                    onFilter={handleOnFilter}
                />
                {/* <div
                    className="text-red-300 flex justify-start items-center gap-3 pb-3 cursor-pointer"
                    onClick={handleOnResetFilter}
                >
                    <FiRefreshCw />
                    Khôi phục bộ lọc
                </div> */}
                {productsByType.length === 0 ? (
                    <div className="bg-white flex flex-col justify-center items-center rounded-2xl xl:relative lg:relative">
                        <div className="w-full text-center xl:absolute xl:top-5 lg:absolute lg:top-5">
                            <h1 className="font-bold text-[30px]">Không có sản phẩm phù hợp với tìm kiếm!</h1>
                            <p>Bạn có thể thử từ khóa đơn giản hơn hoặc liên hệ với hỗ trợ.</p>
                        </div>
                        <img src={emptyFilterIcon} alt="emptyFilter" className="w-[50%]" />
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 sm:gap-3 2sm:grid-cols-2 2sm:gap-3">
                        {productsByType.map((product, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    name={product.name}
                                    link={product._id}
                                    originalPrice={product.originalPrice}
                                    sellPrice={product.sellPrice}
                                    img={product.image}
                                    status={product.status}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductsPage;
