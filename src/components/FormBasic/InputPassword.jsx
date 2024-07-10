import { FaRegEye, FaEyeSlash } from 'react-icons/fa6';

function InputPassword(props) {
    const { className } = props;
    const handleShowPassword = () => {
        const passwordField = document.getElementById('password');
        const showPasswordIcon = document.getElementById('showPasswordIcon');
        const hidePasswordIcon = document.getElementById('hidePasswordIcon');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            hidePasswordIcon.classList.remove('hidden');
            showPasswordIcon.classList.add('hidden');
        } else {
            passwordField.type = 'password';
            hidePasswordIcon.classList.add('hidden');
            showPasswordIcon.classList.remove('hidden');
        }
    };

    return (
        <div className="relative">
            <input
                {...props}
                autoComplete="off"
                className={`w-full h-[3.5rem] px-3 outline-none focus:ring-0 placeholder-gray-300 border border-gray-200 text-lg ${className}`}
            />
            <FaRegEye
                id="showPasswordIcon"
                onClick={handleShowPassword}
                className="absolute right-4 top-1/2 -translate-y-[0.65rem] text-slate-400 cursor-pointer"
            />
            <FaEyeSlash
                id="hidePasswordIcon"
                onClick={handleShowPassword}
                className="absolute hidden right-4 top-1/2 -translate-y-[0.65rem] text-slate-400 cursor-pointer"
            />
        </div>
    );
}

export default InputPassword;
