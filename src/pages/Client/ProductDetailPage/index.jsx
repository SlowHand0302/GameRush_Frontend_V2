import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { AdminProducTypeAPI } from '../../../API';
import { formatCash } from '../../../utils/helpers';
import { FaBell, FaHeart } from 'react-icons/fa6';
import { BsBoxSeam, BsTag } from 'react-icons/bs';
import { VscKey } from 'react-icons/vsc';

import AdditionInforForm from './AdditionInforForm';
function ProductDetailPage(props) {
    const location = useLocation();
    const [productInfor, setProductInfor] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);

    const testType = [
        'TK 1 tuần',
        'TK 1 tháng',
        'TK 2 tháng',
        'TK 3 tháng',
        'TK 4 tháng',
        'TK 6 tháng',
        'TK 12 tháng',
        'TK nghe nhạc khác',
    ];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productType = await AdminProducTypeAPI.getProductTypesByFilter({
                    _id: location.pathname.split('/').pop(),
                });
                setProductInfor(productType[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [location.pathname]);
    useEffect(() => {
        const appCategory = productInfor?.categories?.filter((item) => item.type === 'app');
        const fetchRelatedProduct = async () => {
            try {
                if (Array.isArray(appCategory) && appCategory.length > 0) {
                    const promises = appCategory.map((category) =>
                        AdminProducTypeAPI.getProductTypesByFilter({ categories: category.categoryName }),
                    );
                    const productTypes = await Promise.all(promises);
                    setRelatedProduct([...productTypes[0]]);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchRelatedProduct();
    }, [productInfor.categories]);
    return (
        <div className="w-full flex justify-center items-center p-7 ">
            <div className="xl:w-layout lg:w-full md:w-full sm:w-full 2sm:w-full">
                <div className="flex gap-5 sm:flex-wrap 2sm:flex-wrap">
                    <div className="w-[50%] sm:w-full 2sm:w-full">
                        <img src={productInfor.image} alt="productImg" className="rounded-xl w-full" />
                    </div>
                    <div className="w-[50%] sm:w-full 2sm:w-full">
                        <div className="text-[14px] gap-3 flex flex-col border-b border-gray-300 pb-5">
                            Sản phẩm
                            <div className="text-[25px] font-semibold">{productInfor.name}</div>
                            <div className="font-thin flex gap-3 items-center">
                                <VscKey className="w-[17.5px] h-[17.5px]" /> Mã sản phẩm: {productInfor._id}
                            </div>
                            <div className="font-thin flex gap-3 items-center">
                                <BsBoxSeam className="w-[17.5px] h-[17.5px]" />
                                Tình trạng:{' '}
                                <span
                                    className={`${
                                        productInfor.status === 'available' ? 'text-green-500' : 'text-red-300'
                                    }`}
                                >
                                    {productInfor.status}
                                </span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <BsTag className="w-[17.5px] h-[17.5px]" /> Thể loại:{' '}
                                {productInfor?.categories?.map((category, index) => {
                                    return (
                                        <Link key={index} to={`/search/${category.slug}`} className="hover:underline">
                                            {category.categoryName},
                                        </Link>
                                    );
                                })}
                            </div>
                            <p className="text-[21px] font-bold flex gap-2 items-center">
                                {formatCash(`${productInfor?.originalPrice}`)}{' '}
                                <FaBell className="text-gray-400 cursor-pointer" />{' '}
                                <FaHeart className="text-gray-400 cursor-pointer" />
                            </p>
                            <div className="flex gap-3 items-center">
                                <p className="line-through text-gray-300 text-[15.75px] font-bold">
                                    {formatCash(`${productInfor?.sellPrice}`)}
                                </p>
                                <div className="bg-red-300 text-white text-[12.25px] font-semibold p-[2.25px] rounded-lg">{`-${Math.round(
                                    ((productInfor?.originalPrice - productInfor?.sellPrice) /
                                        productInfor?.originalPrice) *
                                        100,
                                )}%`}</div>
                            </div>
                        </div>
                        <div className="font-bold border-b border-gray-300 pb-5 mt-5">
                            Các gói dịch vụ khác
                            <div className="flex flex-wrap gap-4 mt-2">
                                {relatedProduct.map((product, index) => {
                                    return (
                                        <Link
                                            to={`/${product._id}`}
                                            key={index}
                                            className={`${
                                                product._id === productInfor._id
                                                    ? 'text-orange-400 border-orange-400'
                                                    : 'text-gray-400 border-gray-400'
                                            } text-[14px] px-[14px] py-2 rounded-lg border  text-center`}
                                        >
                                            {product.businessType === 'account'
                                                ? 'TK '
                                                : product.businessType === 'extend'
                                                ? 'GH '
                                                : 'NC '}
                                            {product.useTime}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="font-bold border-b border-gray-300 pb-5 mt-5">
                            Nhập thông tin bổ sung
                            <AdditionInforForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
