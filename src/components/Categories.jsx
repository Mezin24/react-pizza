import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import { categories } from 'src/const';
import { setCategoryIndex } from 'src/redux/slices/filter';

export const Categories = () => {
  const { categoryIndex } = useSelector((state) => state.filter);
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
};
