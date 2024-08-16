import { Route, Routes } from 'react-router-dom';

import { Home, Cart, NotFound, PizzaDetails } from 'src/pages';
import { MainTemplate } from 'src/layouts/MainTemplate';

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
