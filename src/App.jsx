import { Route, Routes } from 'react-router-dom';

import { Home, Cart, NotFound } from 'src/pages';
import { MainTemplate } from './layouts/MainTemplate';
import { PizzaDetails } from './pages/PizzaDetails';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainTemplate />}>
        <Route index element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route path='pizza/:id' element={<PizzaDetails />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
