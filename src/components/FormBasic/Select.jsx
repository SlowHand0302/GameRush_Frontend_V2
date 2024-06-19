import { IoIosArrowDown } from 'react-icons/io';

export default function Select({ className, options, ...props }) {
    return (
        <div className="relative w-full">
            <IoIosArrowDown className="absolute right-3 bottom-0 -translate-y-1/2" />
            <select
                {...props}
                className={`w-full h-[3.4rem] px-3 text-xl outline-none focus:ring-0 border placeholder-gray-200 appearance-none border-gray-200 ${className}`}
            >
                <option value="" disabled hidden>
                    Select an option
                </option>
                {options &&
                    options.map((option, index) => {
                        return (
                            <option key={index} value={option.value}>
                                {option.name}
                            </option>
                        );
                    })}
            </select>
        </div>
    );
}
