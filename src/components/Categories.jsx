import clsx from 'clsx';
import { useState } from 'react';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

export const Categories = () => {
  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  return (
    <div className='categories'>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => setCurrentCategory(category)}
            className={clsx({ active: category === currentCategory })}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
