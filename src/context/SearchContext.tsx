import { createContext, useState, useMemo, useContext, ReactNode } from 'react';

type SearchContextType = {
  searchInput: string;
  setSearchInput: (val: string) => void;
};

const SearchContext = createContext<SearchContextType>({
  searchInput: '',
  setSearchInput: () => {},
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
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
