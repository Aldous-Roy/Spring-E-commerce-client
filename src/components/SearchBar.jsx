import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import debounce from 'lodash.debounce';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearch(term);
    }, 500),
    [onSearch]
  );

  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  return (
    <div className="relative w-full flex items-center shadow-sm rounded-[2px] overflow-hidden">
      <input
        type="text"
        className="block w-full p-3.5 text-sm bg-white text-black outline-none border-none placeholder-gray-400 font-medium"
        placeholder="Search for products, brands and more"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="bg-white p-3.5 text-[#2874f0] cursor-pointer hover:bg-gray-50 transition-colors border-l border-gray-100 flex items-center justify-center">
        <Search className="w-5 h-5" />
      </div>
    </div>
  );
};

export default SearchBar;
