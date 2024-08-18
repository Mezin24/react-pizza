import { LOCAL_STORAGE_CART_KEY } from 'src/const';
import { calcTotalPrice } from './calcTotalPrice';
import { calcTotalAmount } from './calcTotalAmount';

export const getCartFromLS = () => {
  const items =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY) || '""') || [];
  const totalPrice = calcTotalPrice(items);
  const totalAmount = calcTotalAmount(items);

  return {
    items,
    totalPrice,
    totalAmount,
  };
};
