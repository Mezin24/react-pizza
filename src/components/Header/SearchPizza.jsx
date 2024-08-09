import styles from './SearchPizza.module.scss';
import { CloseIcon } from './icons/CloseIcon';
import { SearchIcon } from './icons/SearchIcon';
import { useSearchContext } from 'src/context/SearchContext';

export const SearchPizza = () => {
  const { searchInput, setSearchInput } = useSearchContext();
  return (
    <div className={styles.search}>
      <SearchIcon className={styles.searchIcon} />
      <input
        type='text'
        className={styles.input}
        placeholder='Название пиццы...'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {searchInput.length > 0 && (
        <button className={styles.closeBtn} onClick={() => setSearchInput('')}>
          <CloseIcon className={styles.closeIcon} />
        </button>
      )}
    </div>
  );
};
