import { Pizza } from 'src/types/pizza';

export const calcTotalAmount = (items: Pizza[]) => {
  return items.reduce((acc, cur) => cur.amount + acc, 0);
};
