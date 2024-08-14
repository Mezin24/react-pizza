import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { Categories } from 'src/components/Categories';
import { PizzaSort } from 'src/components/PizzaSort';
import { PizzaBlock } from 'src/components/PizzaBlock';
import { Skeleton } from 'src/components/PizzaBlock/Skeleton';
import { useSearchContext } from 'src/context/SearchContext';
import { pizzaSort } from 'src/const';
import { setFilters } from 'src/redux/slices/filter';

const createQuery = (category, sortBy, search) => {
  const categoryQuery = category === 0 ? '' : `category=${category}&`;
  return `?${categoryQuery}sortBy=${sortBy?.sortProperty.replace(
    '-',
    ''
  )}&order=${
    sortBy?.sortProperty.includes('-') ? 'desc' : 'asc'
  }&search=${search}`;
};

export const Home = () => {
  const { categoryIndex, sortBy } = useSelector((state) => state.filter);
  const { searchInput } = useSearchContext();
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearh = useRef(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortBy = pizzaSort.find((p) => p.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          categoryIndex: params.category,
          sortBy,
        })
      );
      isSearh.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      const params = qs.stringify({
        category: categoryIndex,
        sortBy: sortBy.sortProperty,
      });
      navigate(`?${params}`);
    }
    isMounted.current = true;
  }, [categoryIndex, navigate, searchInput, sortBy]);

  useEffect(() => {
    const fetchPizza = async () => {
      setIsLoading(true);

      const query = createQuery(categoryIndex, sortBy, searchInput);
      try {
        const { data } = await axios.get(
          'https://66b22a731ca8ad33d4f6cda8.mockapi.io/items' + query
        );
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

    if (!isSearh.current) {
      fetchPizza();
    }
    isSearh.current = false;
  }, [categoryIndex, searchInput, sortBy]);

  const renderSkeleton = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const renderPizza = pizzas.map((pizza) => (
    <PizzaBlock
      key={pizza.id}
      title={pizza.title}
      price={pizza.price}
      imageUrl={pizza.imageUrl}
      sizes={pizza.sizes}
      types={pizza.types}
      id={pizza.id}
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
