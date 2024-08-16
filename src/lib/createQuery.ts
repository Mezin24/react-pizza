export const createQuery = (category, sortBy, search) => {
  const categoryQuery = category === 0 ? '' : `category=${category}&`;
  return `?${categoryQuery}sortBy=${sortBy?.sortProperty.replace(
    '-',
    ''
  )}&order=${
    sortBy?.sortProperty.includes('-') ? 'desc' : 'asc'
  }&search=${search}`;
};
