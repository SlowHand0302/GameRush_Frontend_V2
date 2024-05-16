export default function Input({ className, ...props }) {
    return (
        <input
            {...props}
            autoComplete="off"    
            className={`w-full h-[3.4rem] px-3 outline-none focus:ring-0 placeholder-gray-300 border border-gray-200 text-xl ${className}`}
        />
    );
}
