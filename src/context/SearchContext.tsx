import { createContext, useState, useMemo, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState('');

  const value = useMemo(
    () => ({
      searchInput,
      setSearchInput,
    }),
    [searchInput, setSearchInput]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
