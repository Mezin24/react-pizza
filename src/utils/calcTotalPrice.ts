import { Pizza } from 'src/types/pizza';

export const calcTotalPrice = (items: Pizza[]) => {
  return items.reduce((acc, cur) => cur.price * cur.amount + acc, 0);
};
