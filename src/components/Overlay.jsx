function Overlay({ children, onClick, customClass = null }) {
    return (
        <div
            className={`fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 w-full h-full z-[998] ${customClass}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export default Overlay;
