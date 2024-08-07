import { Link } from 'react-router-dom';

import { formatCash } from '../../../utils/helpers';

function ProductCard(props) {
    const { name, originalPrice, sellPrice, img, link, status } = props;
    return (
        <Link to={`/product/${link}`} className="bg-white rounded-xl relative">
            <img
                src={img}
                alt="productImg"
                className={`w-full rounded-xl ${status === 'unavailable' ? 'opacity-50' : null}`}
            />
            {status === 'unavailable' && (
                <div className="bg-black text-white text-[12.25px] text-center w-[30%] font-semibold p-[2.25px] absolute top-3 left-3 rounded-lg">
                    Hết Hàng
                </div>
            )}
            <div className="p-3 text-[14px]">
                <p className="line-clamp-2">{name}</p>
                <div className="flex gap-[5px] flex-wrap items-center">
                    <p className="font-bold">{formatCash(sellPrice)}</p>
                    <p className="line-through text-gray-300">{formatCash(originalPrice)}</p>
                    <div className="bg-red-300 text-white text-[12.25px] font-semibold p-[3.25px] rounded-lg">{`-${Math.round(
                        ((originalPrice - sellPrice) / originalPrice) * 100,
                    )}%`}</div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
