import { IoIosSearch } from 'react-icons/io';
import { useEffect, useState } from 'react';
import axios from 'axios';

import useDebounce from '../../../hooks/useDebounce';
import Select from '../../../components/Form/Select';
import TableV2 from '../components/TableV2';
import { formatDateFields } from '../../../utils/helpers';

function Account(props) {
    const [accounts, setAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const [sort, setSort] = useState({ Newest: 'updatedAt' });
    const sortItems = [
        { Newest: 'updatedAt' },
        { Oldest: '-updatedAt' },
        { Ascending: 'name' },
        { Descending: '-name' },
    ];
    const ignoreAttr = ['_id', '__v', 'password'];
    const onSelectSort = (data) => {
        setSort(data);
    };
    const getAccount = async () => {
        const options = {
            url: 'http://localhost:5000/api/user/readBySort?sort=-updatedAt',
            method: 'GET',
        };
        await axios
            .request(options)
            .then((res) => {
                const result = res.data;
                setAccounts(formatDateFields(result.users));
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleOnSearch = async (query) => {
        if (query) {
            const options = {
                url: `http://localhost:5000/api/user/search?name=${query}`,
                method: 'GET',
            };
            try {
                const response = await axios.request(options);
                const result = response.data;
                setAccounts([...result.users]);
            } catch (error) {
                console.log(error);
            }
        } else {
            getAccount();
        }
    };
    useEffect(() => {
        getAccount();
    }, []);

    useEffect(() => {
        const getAccount = async () => {
            const options = {
                url: `http://localhost:5000/api/user/readBySort?sort=${Object.values(sort)[0]}`,
                method: 'GET',
            };
            await axios
                .request(options)
                .then((res) => {
                    const result = res.data;
                    setAccounts(formatDateFields(result.users));
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getAccount();
    }, [sort]);

    useEffect(() => {
        handleOnSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm]);
    return (
        <div className={'px-4 my-4 bg-white rounded-xl mx-5'}>
            <p className="font-bold text-[25px]">Manage Account</p>
            <div className="flex items-center 2sm:flex-col 2sm:items-start 2sm:gap-0">
                <div className="flex items-center relative py-5 w-[50%] sm:w-[60%] 2sm:w-full">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="border w-full border-gray-200 rounded-l-xl p-3 outline-none"
                        placeholder="Tìm kiếm sản phẩm"
                        // value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <div className="p-5 bg-blue-700 rounded-r-xl">
                        <IoIosSearch />
                    </div>
                </div>
                <div className="flex w-full justify-end items-center font-bold 2sm:mb-3 2sm:flex-col 2sm:items-start">
                    <div className="flex items-center bg-white px-5 min-w-[100px] rounded-xl 2sm:px-0">
                        <p className="whitespace-nowrap">Sort by:</p>
                        <Select
                            id={'sort'}
                            selectValues={sortItems}
                            onSelect={onSelectSort}
                            customClass={'py-1'}
                            value={Object.keys(sort)}
                        />
                    </div>
                </div>
            </div>
            {accounts.length > 0 ? <TableV2 itemsList={accounts} ignoreAttr={ignoreAttr} /> : null}
        </div>
    );
}

export default Account;
