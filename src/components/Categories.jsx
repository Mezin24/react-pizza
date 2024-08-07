import clsx from 'clsx';
import { categories } from 'src/const';

/**
 * @param {{
 * value: number,
 * onChangeCategory: Function
 * }}props
 */

export const Categories = ({ onChangeCategory, value }) => {
  const currentCategory = categories[value];

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, i) => (
          <li
            key={category}
            onClick={() => onChangeCategory(i)}
            className={clsx({ active: category === currentCategory })}
          >
            {categories[i]}
          </li>
        ))}
      </ul>
    </div>
  );
};
