import clsx from 'clsx';
import { useState } from 'react';

/**
 * @param{{
 * imageUrl: string;
 * title: string;
 * types: Array,
 * sizes: Array,
 * price: number,
 * category?: number
 * rating?: number
 * }}props
 */

const pizzaTypeNames = ['тонкое', 'традиционное'];

export const PizzaBlock = ({ price, title, imageUrl, sizes, types }) => {
  const [currentType, setCurrentTupe] = useState(types?.[0]);
  const [currentSize, setCurrentSize] = useState(sizes?.[0]);

  const onChangeType = (typeIndex) => setCurrentTupe(typeIndex);
  const onChangeSize = (size) => setCurrentSize(size);

  const renderTypes = types?.map((type) => (
    <li
      className={clsx({ active: type === currentType })}
      onClick={() => onChangeType(type)}
      key={type}
    >
      {pizzaTypeNames[type]}
    </li>
  ));

  const renderSizes = sizes?.map((size) => (
    <li
      className={clsx({ active: size === currentSize })}
      onClick={() => onChangeSize(size)}
      key={size}
    >
      {size}
    </li>
  ));

  return (
    <div className='pizza-block'>
      <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
      <h4 className='pizza-block__title'>{title}</h4>
      <div className='pizza-block__selector'>
        {types && <ul>{renderTypes}</ul>}
        {sizes && <ul>{renderSizes}</ul>}
      </div>
      <div className='pizza-block__bottom'>
        <div className='pizza-block__price'>от {price} ₽</div>
        <div className='button button--outline button--add'>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span>Добавить</span>
          <i>1</i>
        </div>
      </div>
    </div>
  );
};
