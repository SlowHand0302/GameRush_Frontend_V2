import { Link } from 'react-router-dom';

import { FaTrashAlt } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';

import { productAPI } from '../../../API';
import { formatCash } from '../../../utils/helpers';
import QuantityInput from '../../../components/Form/QuantityInput';
import { useEffect, useState } from 'react';

function SimpleProductCard(props) {
    const { url, img, id, name, originalPrice, sellPrice, status, quantity, onQuantityChange, onRemove } = props;
    const [maxProductInType, setMaxProductInType] = useState();
    useEffect(() => {
        const countProductInType = async () => {
            try {
                const count = await productAPI.getCountByType(id);
                if (count !== 0) {
                    setMaxProductInType(count);
                } else {
                    setMaxProductInType(1);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (onQuantityChange) {
            countProductInType();
        }
    }, [id]);
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
                    </div>
                    {onQuantityChange ? (
                        <QuantityInput
                            id={id}
                            productQuantity={quantity}
                            onChange={onQuantityChange}
                            max={maxProductInType}
                        />
                    ) : (
                        <p>Quantity: {quantity}</p>
                    )}
                    <div className="flex flex-col items-end gap-2 2sm:flex-row">
                        {sellPrice && <p className="font-bold">{formatCash(sellPrice)}</p>}
                        <div className="flex text-[14px] gap-2 items-center">
                            {originalPrice && <p className="line-through text-gray-300">{formatCash(originalPrice)}</p>}
                            {originalPrice && sellPrice && (
                                <p className="bg-red-300 text-white text-[12.25px] font-semibold p-[3.25px] rounded-lg">
                                    -{Math.round(((originalPrice - sellPrice) / originalPrice) * 100)}%
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <hr className="h-px w-full my-4 bg-gray-200 border-0"></hr>
                <div className="flex justify-between items-center">
                    {status && (
                        <div className="flex items-center gap-2">
                            <BsBoxSeam className="w-[17.5px] h-[17.5px]" />
                            Tình trạng: <span className="text-green-500">{status}</span>
                        </div>
                    )}
                    {onRemove && (
                        <FaTrashAlt
                            className="w-[20px] h-[20px] text-red-300 cursor-pointer"
                            onClick={() => onRemove(id)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SimpleProductCard;
