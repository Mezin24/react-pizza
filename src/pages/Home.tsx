import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { Categories } from 'src/components/Categories';
import { PizzaSort } from 'src/components/PizzaSort';
import { PizzaBlock } from 'src/components/PizzaBlock';
import { Skeleton } from 'src/components/PizzaBlock/Skeleton';
import { pizzaSort } from 'src/const';
import { selectFilter, setFilters } from 'src/redux/slices/filter';
import { fetchPizza, selectPizzaData } from 'src/redux/slices/pizza';
import { AppDispatch, useAppDispatch } from 'src/redux/store';

export const Home = () => {
  const { categoryIndex, sortBy } = useSelector(selectFilter);
  const { pizzas, status } = useSelector(selectPizzaData);
  const { searchValue } = useSelector(selectFilter);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortBy = pizzaSort.find((p) => p.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          // @ts-ignore
          categoryIndex: params.category,
          // @ts-ignore
          sortBy,
        })
      );
      isSearch.current = true;
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
  }, [categoryIndex, navigate, searchValue, sortBy]);

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(
        fetchPizza({ category: categoryIndex, sortBy, search: searchValue })
      );
    }
    isSearch.current = false;
  }, [categoryIndex, dispatch, searchValue, sortBy]);

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
      {status === 'error' ? (
        <div className='content__error'>
          <h2>
            Не удалось загрузить информацию о пиццах <span>😕</span>
          </h2>
          <p>
            Вероятней всего, что то пошло не так.
            <br />
            Попробуйте загрузить страницу позже.
          </p>
        </div>
      ) : (
        <>
          {' '}
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {status === 'loading' ? renderSkeleton : renderPizza}
          </div>
        </>
      )}
    </>
  );
};
