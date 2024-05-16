import { Link } from 'react-router-dom';

import { FaTrashAlt } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';

import { formatCash } from '../../../utils/helpers';
import QuantityInput from '../../../components/Form/QuantityInput';

function SimpleProductCard(props) {
    const { url, img, id, name, category, originPrice, discount, status, quantity, onQuantityChange } = props;

    return (
        <div className="w-full flex gap-[14px] p-[18px] border border-gray-200 rounded-2xl sm:flex-col 2sm:flex-col">
            <Link to={url} className="max-w-[30%] rounded-xl sm:max-w-full 2sm:max-w-full">
                <img src={img} alt={id} className="w-full rounded-xl" />
            </Link>
            <div className="w-full">
                <div className="flex justify-between gap-3 items-start 2sm:flex-col">
                    <div className="w-[45%] 2sm:w-full">
                        <Link to={url} className="text-[16px] font-semibold mb-2">
                            {name}
                        </Link>
                        <p>{category.join(', ')}</p>
                    </div>
                    <QuantityInput id={id} productQuantity={quantity} onChange={onQuantityChange} />
                    <div className="flex flex-col items-end gap-2 2sm:flex-row">
                        <p className="font-bold">{formatCash(originPrice - (discount * originPrice) / 100)}</p>
                        <div className="flex text-[14px] gap-2 items-center">
                            <p className="line-through text-gray-300">{formatCash(originPrice)}</p>
                            <p className="bg-red-300 text-white text-[12.25px] font-semibold p-[3.25px] rounded-lg">
                                -{discount}%
                            </p>
                        </div>
                    </div>
                </div>
                <hr className="h-px w-full my-4 bg-gray-200 border-0"></hr>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <BsBoxSeam className="w-[17.5px] h-[17.5px]" />
                        Tình trạng: <span className="text-green-500">{status}</span>
                    </div>
                    <FaTrashAlt className="w-[20px] h-[20px] text-red-300 cursor-pointer" />
                </div>
            </div>
        </div>
    );
}

export default SimpleProductCard;
