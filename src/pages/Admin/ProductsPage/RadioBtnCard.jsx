import { MdOutlineCheckCircle, MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { formatCash, splitCamelText } from '../../../utils/helpers';

function RadioBtnCard({ title, details, active = true, value, name, onClick, ...props }) {
    const handleOnClick = () => {
        onClick(value);
    };
    return (
        <div
            onClick={handleOnClick}
            className={`relative border rounded-xl ${
                active ? 'border-orange-200' : 'text-gray-300 text-opacity-25'
            } p-5 cursor-pointer basis-80`}
        >
            {active ? (
                <MdOutlineCheckCircle className="absolute text-[1.5em] right-0 top-0 m-3 text-orange-200" />
            ) : (
                <MdOutlineRadioButtonUnchecked className="absolute text-[1.5em] right-0 top-0 m-3" />
            )}
            <div className={`text-[16px] max-w-[90%] line-clamp-1 font-bold ${active ? 'text-orange-200' : ''}`}>{title} </div>
            <div className="text-[16px] font-medium text-opacity-25">
                {Object.entries(details).map(([key, value], index) => {
                    return (
                        <div key={index}>
                            <strong>{splitCamelText(key)}:</strong> {key.toLocaleLowerCase().includes('price') ? formatCash(value) : value}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RadioBtnCard;
