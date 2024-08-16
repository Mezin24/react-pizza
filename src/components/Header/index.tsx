import { Link, useLocation } from 'react-router-dom';
import pizzaLogo from 'src/assets/img/pizza-logo.svg';
import { CartIcon } from './icons/CartIcon';
import { SearchPizza } from './SearchPizza';
import { useSelector } from 'react-redux';
import { selectCartData } from 'src/redux/slices/cart';

export const Header = () => {
  const { totalAmount, totalPrice } = useSelector(selectCartData);
  const { pathname } = useLocation();

  return (
    <div className='header'>
      <div className='container'>
        <Link to='/' className='header__logo'>
          <img width='38' src={pizzaLogo} alt='Pizza logo' />
          <div className='text'>
            <h1>React Pizza</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </Link>
        <SearchPizza />
        <div className='header__cart'>
          {pathname !== '/cart' && (
            <Link to='/cart' className='button button--cart'>
              <span>{totalPrice} ₽</span>
              <div className='button__delimiter'></div>
              <CartIcon />
              <span>{totalAmount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
