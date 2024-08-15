import { Outlet } from 'react-router-dom';

import { Header } from 'src/components/Header';

export const MainTemplate = () => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
