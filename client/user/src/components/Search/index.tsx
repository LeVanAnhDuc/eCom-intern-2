import SearchIcon from '@mui/icons-material/Search';

import { useEffect, useState } from 'react';

import useDebounceCustom from '../../hook/useDebounceCustom';

interface Iprops {
    setSearch?: React.Dispatch<React.SetStateAction<string>>;
    setDoneSearch?: React.Dispatch<React.SetStateAction<boolean>>;
    placeholder?: string;
    titleButton?: string;
}

const Search = (props: Iprops) => {
    const { setSearch, setDoneSearch, placeholder = 'Tìm kiếm sản phẩm bạn cần...', titleButton = 'Tìm' } = props;

    const [valueSearch, setValueSearch] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueSearch(e.target.value);
    };
    const handleSubmitSearch = () => {
        setDoneSearch && setDoneSearch(true);
    };

    const debounce = useDebounceCustom(valueSearch, 500);
    useEffect(() => {
        if (!debounce.trim()) {
            setSearch && setSearch('');
            return;
        }
        setSearch && setSearch(debounce);
    }, [debounce]);

    return (
        <div className="w-full relative ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon sx={{ color: 'gray' }} />
            </div>
            <input
                type="search"
                className="w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                required
                value={valueSearch}
                onChange={handleChange}
            />
            {setDoneSearch && (
                <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
                    onClick={handleSubmitSearch}
                >
                    {titleButton}
                </button>
            )}
        </div>
    );
};

export default Search;
