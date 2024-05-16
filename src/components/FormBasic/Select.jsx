export default function Select({ className, options, ...props }) {
    return (
        <select
            {...props}
            className={`w-full h-[3.4rem] text-xl outline-none focus:ring-0 border placeholder-gray-300 border-gray-200 ${className}`}
        >
            <option value="" disabled selected>
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
    );
}
