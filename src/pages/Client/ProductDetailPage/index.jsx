import { Link, useLocation } from 'react-router-dom';

import { formatCash } from '../../../utils/helpers';
import { FaBell, FaHeart } from 'react-icons/fa6';
import { BsBoxSeam, BsTag } from 'react-icons/bs';
import { VscKey } from 'react-icons/vsc';

import AdditionInforForm from './AdditionInforForm';
import products from '../../../constants/dummyData/products';
function ProductDetailPage(props) {
    const location = useLocation();
    const product = products.find((item) => item.url === location.pathname);

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

    return (
        <div className="w-full flex justify-center items-center p-7 ">
            <div className="xl:w-layout lg:w-full md:w-full sm:w-full 2sm:w-full">
                <div className="flex gap-5 sm:flex-wrap 2sm:flex-wrap">
                    <div className="w-[50%] sm:w-full 2sm:w-full">
                        <img src={product.img} alt="productImg" className="rounded-xl w-full" />
                    </div>
                    <div className="w-[50%] sm:w-full 2sm:w-full">
                        <div className="text-[14px] gap-3 flex flex-col border-b border-gray-300 pb-5">
                            Sản phẩm
                            <div className="text-[25px] font-semibold">{product.name}</div>
                            <div className="font-thin flex gap-3 items-center">
                                <VscKey className="w-[17.5px] h-[17.5px]" /> Mã sản phẩm: {product.id}
                            </div>
                            <div className="font-thin flex gap-3 items-center">
                                <BsBoxSeam className="w-[17.5px] h-[17.5px]" />
                                Tình trạng:{' '}
                                <span
                                    className={`${product.status === 'available' ? 'text-green-500' : 'text-red-300'}`}
                                >
                                    {product.status}
                                </span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <BsTag className="w-[17.5px] h-[17.5px]" /> Thể loại: {product.category.join(', ')}
                            </div>
                            <p className="text-[21px] font-bold flex gap-2 items-center">
                                {formatCash(product.originPrice)} <FaBell className="text-gray-400 cursor-pointer" />{' '}
                                <FaHeart className="text-gray-400 cursor-pointer" />
                            </p>
                            <div className="flex gap-3 items-center">
                                <p className="line-through text-gray-400 text-[15.75px] font-bold">
                                    {formatCash(product.originPrice - (product.originPrice * product.discount) / 100)}
                                </p>
                                <div className="bg-red-300 text-white text-[12.25px] font-semibold p-[2.25px] rounded-lg">{`-${product.discount}%`}</div>
                            </div>
                        </div>
                        <div className="font-bold border-b border-gray-300 pb-5 mt-5">
                            Chọn thời hạn
                            <div className="flex flex-wrap gap-4 mt-2">
                                {testType.map((type, index) => {
                                    return (
                                        <Link
                                            to={'/'}
                                            key={index}
                                            className="text-gray-400 text-[14px] px-[14px] py-2 rounded-lg border border-gray-400 text-center"
                                        >
                                            {type}
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
