import { SortByProps } from './types/pizza';

export const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

export const pizzaSort: SortByProps[] = [
  { name: 'популярности ⬆️', sortProperty: 'rating' },
  { name: 'популярности ⬇️', sortProperty: '-rating' },
  { name: 'цене ⬆️', sortProperty: 'price' },
  { name: 'цене ⬇️', sortProperty: '-price' },
  { name: 'алфавиту ⬆️', sortProperty: 'title' },
  { name: 'алфавиту ⬇️', sortProperty: '-title' },
];
