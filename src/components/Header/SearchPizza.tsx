import { ChangeEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { CloseIcon } from './icons/CloseIcon';
import { SearchIcon } from './icons/SearchIcon';
import { useDebounce } from 'src/hooks/useDebounce';
import { setSearchValue } from 'src/redux/slices/filter';

import styles from './SearchPizza.module.scss';

export const SearchPizza = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const debounce = useDebounce((value) => {
    dispatch(setSearchValue(value));
  }, 400);

  const onClearHandler = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
