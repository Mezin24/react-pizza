import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    className='pizza-block'
    speed={1}
    width={280}
    height={460}
    viewBox='0 0 280 460'
    backgroundColor='#e9e7e7'
    foregroundColor='#adacac'
  >
    <rect x='187' y='350' rx='0' ry='0' width='3' height='0' />
    <rect x='241' y='371' rx='0' ry='0' width='1' height='0' />
    <rect x='143' y='352' rx='0' ry='0' width='0' height='1' />
    <circle cx='125' cy='126' r='120' />
    <rect x='0' y='259' rx='8' ry='8' width='260' height='26' />
    <rect x='1' y='294' rx='8' ry='8' width='260' height='80' />
    <rect x='0' y='389' rx='8' ry='8' width='80' height='40' />
    <rect x='120' y='386' rx='20' ry='20' width='143' height='40' />
  </ContentLoader>
);
