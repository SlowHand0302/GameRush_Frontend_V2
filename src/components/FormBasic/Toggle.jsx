const Toggle = ({ label, checked, onChange, ...props }) => {
    return (
        <>
            <label className="flex gap-3 cursor-pointer select-none items-center">
                <p className="font-bold">{label}</p>
                <div className="relative">
                    <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
                    <div
                        className={`block h-8 w-14 rounded-full transition ${
                            checked ? 'bg-orange-300' : 'bg-[#E5E7EB]'
                        }`}
                    ></div>
                    <div
                        className={`dot absolute ${
                            checked ? 'right-1' : 'left-1'
                        } top-1 h-6 w-6 rounded-full bg-white transition`}
                    ></div>
                </div>
            </label>
        </>
    );
};

export default Toggle;
