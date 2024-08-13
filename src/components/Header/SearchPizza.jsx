import { useRef, useState } from 'react';
import styles from './SearchPizza.module.scss';
import { CloseIcon } from './icons/CloseIcon';
import { SearchIcon } from './icons/SearchIcon';
import { useSearchContext } from 'src/context/SearchContext';
import { useDebounce } from 'src/hooks/useDebounce';

export const SearchPizza = () => {
  const { setSearchInput } = useSearchContext();
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const debounce = useDebounce((value) => {
    setSearchInput(value);
  }, 400);

  const onClearHandler = () => {
    setSearchInput('');
    setValue('');
    inputRef.current.focus();
  };

  const onChangeHandler = (e) => {
    const str = e.target.value;
    setValue(str);
    debounce(str);
  };

  return (
    <div className={styles.search}>
      <SearchIcon className={styles.searchIcon} />
      <input
        ref={inputRef}
        type='text'
        className={styles.input}
        placeholder='Название пиццы...'
        value={value}
        onChange={onChangeHandler}
      />
      {value.length > 0 && (
        <button className={styles.closeBtn} onClick={onClearHandler}>
          <CloseIcon className={styles.closeIcon} />
        </button>
      )}
    </div>
  );
};
