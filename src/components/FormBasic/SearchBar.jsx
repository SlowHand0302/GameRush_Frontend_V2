import { useEffect, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

import useDebounce from '../../hooks/useDebounce';

function SearchBar(props) {
    const { name, className, onSearch, onSelect, placeholder = '' } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
    const inputRef = useRef(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const handleOnSelect = (result) => {
        setSelectedResult(result);
        inputRef.current.value = '';
        setSearchTerm();
    };
    const handleOnSearch = async () => {
        if (debouncedSearchTerm) {
            try {
                const searchResult = await onSearch(debouncedSearchTerm);
                setSearchResult([...searchResult]);
            } catch (error) {
                console.log(error);
            }
        } else {
            setSearchResult([]);
        }
    };
    useEffect(() => {
        handleOnSearch();
    }, [debouncedSearchTerm]);

    useEffect(() => {
        if (selectedResult) {
            onSelect(selectedResult);
        }
    }, [selectedResult]);
    return (
        <div className={`flex items-center relative ${className}`}>
            <input
                className={`w-full rounded-tl-xl text-black rounded-bl-xl p-[11px] outline-none focus:ring-0 placeholder-gray-300 border border-gray-200 text-xl `}
                type="text"
                ref={inputRef}
                placeholder={placeholder}
                onChange={(event) => setSearchTerm(event.target.value)}
                autoComplete="off"
            />
            <div className="p-5 text-white cursor-pointer bg-orange-200 rounded-tr-xl rounded-br-xl">
                <IoIosSearch />
            </div>
            {searchResult.length > 0 && (
                <div className="rounded-xl absolute bg-white text-black border shadow-2xl z-10 top-20 w-full">
                    {searchResult.map((result, index) => {
                        return (
                            <p
                                className="hover:bg-orange-200 hover:text-white cursor-pointer p-3 rounded-xl"
                                onClick={() => handleOnSelect(result)}
                                key={index}
                            >
                                {result[name]}
                            </p>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
