import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosSearch, IoIosArrowBack } from 'react-icons/io';

import { AdminProducTypeAPI, AdminProductAPI } from '../../../API';
import { formatDateFields } from '../../../utils/helpers';
import RadioBtnCard from './RadioBtnCard';
import Overlay from '../../../components/Overlay';
import AddProduct from './AddProduct';

function ProductByType(props) {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [title, setTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const fetchProductsByTypes = async () => {
        try {
            const productsData = await AdminProductAPI.getProductByType(location.pathname.split('/').pop());
            setProducts(formatDateFields(productsData));
            const productTypeData = await AdminProducTypeAPI.getProductTypesByFilter({
                _id: location.pathname.split('/').pop(),
            });
            setTitle(productTypeData[0].name);
        } catch (error) {
            console.log(error);
        }
    };
    const handleOnSearch = async (query) => {};

    useEffect(() => {
        fetchProductsByTypes();
    }, []);

    return (
        <>
            <div className={'p-4 my-4 bg-white rounded-xl mx-5'}>
                <div className="sticky top-[120px] bg-white z-50">
                    <div className="flex gap-5 items-center">
                        <Link to={'/admin/products'}>
                            <IoIosArrowBack className="text-[30px] cursor-pointer" />
                        </Link>
                        <p className="font-bold text-[25px]">Products By Type</p>
                    </div>
                    <p className="text-[20px] ml-16 text-orange-200">{title}</p>
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
                        <div
                            onClick={() => {
                                setShowModal(true);
                                setSelectedProduct({});
                            }}
                            className="bg-green-500 py-3 px-8 ml-5 cursor-pointer text-center rounded-xl text-white 2sm:px-12"
                        >
                            Add
                        </div>
                    </div>
                </div>

                <div className="flex gap-5">
                    {products.map((item, index) => {
                        return (
                            <RadioBtnCard
                                key={index}
                                name={'productTypeId'}
                                title={item.productCode}
                                details={{
                                    status: item.status,
                                    expireDate: item.expireDate,
                                }}
                                active={item.status === 'available'}
                                value={item}
                                onClick={(item) => {
                                    setSelectedProduct(item);
                                    setShowModal(true);
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            {showModal && (
                <Overlay customClass={'flex justify-center items-center'}>
                    <AddProduct
                        onClose={() => {
                            setShowModal(false);
                            fetchProductsByTypes();
                        }}
                        dataForUpdate={selectedProduct}
                    />
                </Overlay>
            )}
        </>
    );
}

export default ProductByType;
