import { Link } from 'react-router-dom';
import cartEmty from 'src/assets/img/cartEmpty.png';

export const CartEmpty = () => {
  return (
    <>
      <div className='content'>
        <div className='cart cart--empty'>
          <h2>
            Корзина пустая <span>😕</span>
          </h2>
          <p>
            Вероятней всего, вы не заказывали ещё пиццу.
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <img src={cartEmty} alt='Empty cart' />
          <Link to='/' className='button button--black' href='/'>
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </>
  );
};
