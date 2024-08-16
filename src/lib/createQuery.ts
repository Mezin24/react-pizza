import { SortByProps } from 'src/types/pizza';

export const createQuery = (
  category: number,
  sortBy: SortByProps,
  search?: string
) => {
  const categoryQuery = category === 0 ? '' : `category=${category}&`;
  return `?${categoryQuery}sortBy=${sortBy?.sortProperty.replace(
    '-',
    ''
  )}&order=${
    sortBy?.sortProperty.includes('-') ? 'desc' : 'asc'
  }&search=${search}`;
};
