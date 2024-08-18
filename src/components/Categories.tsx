import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import { categories } from 'src/const';
import { selectFilter, setCategoryIndex } from 'src/redux/slices/filter';
import { memo } from 'react';

export const Categories = memo(() => {
  const { categoryIndex } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const currentCategory = categories[categoryIndex];

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, i) => (
          <li
            key={category}
            onClick={() => dispatch(setCategoryIndex(i))}
            className={clsx({ active: category === currentCategory })}
          >
            {categories[i]}
          </li>
        ))}
      </ul>
    </div>
  );
});
