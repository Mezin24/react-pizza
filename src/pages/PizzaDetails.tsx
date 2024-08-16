import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, selectCartItemById } from 'src/redux/slices/cart';
import { Pizza, PizzaData } from 'src/types/pizza';

export const PizzaDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [pizza, setPizza] = useState<PizzaData | null>(null);
  const navigate = useNavigate();
  const cartItem = useSelector(selectCartItemById(id));
  const dispatch = useDispatch();

  const onAddPizza = () => {
    if (!pizza) return;

    const newItem = {
      id,
      price: pizza.price,
      title: pizza.title,
      imageUrl: pizza.imageUrl,
      size: pizza.sizes[0],
      type: pizza.types[0],
      amount: 1,
    };
    dispatch(addProduct(newItem));
  };

  useEffect(() => {
    const fetchPizzaById = async (id: string) => {
      try {
        const { data } = await axios.get<PizzaData>(
          'https://66b22a731ca8ad33d4f6cda8.mockapi.io/items/' + id
        );

        setPizza(data);
      } catch (error) {
        alert('Пицца не найдена');
        navigate('/');
      }
    };

    if (id) {
      fetchPizzaById(id);
    }
  }, []);

  if (!pizza) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='container pizza__block'>
      <div className='pizza__image-box'>
        <img className='pizza__image' src={pizza.imageUrl} alt={pizza.title} />
      </div>
      <div className='pizza__description'>
        <h1 className='pizza__title'>{pizza.title}</h1>
        <p className='pizza__text'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, error
          distinctio ea fugiat vitae perferendis, earum voluptatum ipsa maiores
          esse obcaecati iure consectetur nisi impedit nobis, assumenda tempora
          tempore laudantium odit ab necessitatibus sequi debitis commodi.
          Numquam praesentium dignissimos beatae?
        </p>
        <h3 className='pizza__price'>Цена {pizza.price} р.</h3>
        <button
          className='button button--outline button--add'
          onClick={onAddPizza}
        >
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
          {cartItem?.amount && <i>{cartItem?.amount}</i>}
        </button>
      </div>
    </div>
  );
};
