import './App.css';
import { Header } from 'src/components/Header';
import { Categories } from 'src/components/Categories';
import { PizzaSort } from 'src/components/PizzaSort';
import { PizzaBlock } from 'src/components/PizzaBlock';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <PizzaSort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            <PizzaBlock title='Чизбурге пицца' price={350} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
