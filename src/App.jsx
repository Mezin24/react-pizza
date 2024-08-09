import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from 'src/components/Header';
import { Home, Cart, NotFound } from 'src/pages';

function App() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className='wrapper'>
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <div className='content'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home searchInput={searchInput} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
