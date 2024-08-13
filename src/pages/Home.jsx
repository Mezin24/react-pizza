import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Categories } from 'src/components/Categories';
import { PizzaSort } from 'src/components/PizzaSort';
import { PizzaBlock } from 'src/components/PizzaBlock';
import { Skeleton } from 'src/components/PizzaBlock/Skeleton';
import { useSearchContext } from 'src/context/SearchContext';

const createQuery = (category, sortBy) => {
  const categoryQuery = category === 0 ? '' : `category=${category}&`;
  return `?${categoryQuery}sortBy=${sortBy?.sortProperty.replace(
    '-',
    ''
  )}&order=${sortBy?.sortProperty.includes('-') ? 'desc' : 'asc'}`;
};

export const Home = () => {
  const { categoryIndex, sortBy } = useSelector((state) => state.filter);
  const { searchInput } = useSearchContext();
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPizza = async () => {
      setIsLoading(true);

      const query = createQuery(categoryIndex, sortBy);
      try {
        const response = await fetch(
          'https://66b22a731ca8ad33d4f6cda8.mockapi.io/items' + query
        );
        const data = await response.json();
        if (!data) {
          throw new Error('Fetch error');
        }
        setPizzas(data);
      } catch (error) {
        console.log('Error: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPizza();
  }, [categoryIndex, sortBy]);

  const filteredPizza = pizzas.filter((p) =>
    p?.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const renderSkeleton = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const renderPizza = filteredPizza.map((pizza) => (
    <PizzaBlock
      key={pizza.id}
      title={pizza.title}
      price={pizza.price}
      imageUrl={pizza.imageUrl}
      sizes={pizza.sizes}
      types={pizza.types}
    />
  ));
  return (
    <>
      <div className='content__top'>
        <Categories />
        <PizzaSort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading ? renderSkeleton : renderPizza}
      </div>
    </>
  );
};
