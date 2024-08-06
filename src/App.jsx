import { useState, useEffect } from 'react';
import { Header } from 'src/components/Header';
import { Categories } from 'src/components/Categories';
import { PizzaSort } from 'src/components/PizzaSort';
import { PizzaBlock } from 'src/components/PizzaBlock';

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await fetch(
          'https://66b22a731ca8ad33d4f6cda8.mockapi.io/items'
        );
        const data = await response.json();
        if (!data) {
          throw new Error('Fetch error');
        }
        setPizzas(data);
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchPizza();
  }, []);

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
            {pizzas.map((pizza) => (
              <PizzaBlock
                key={pizza.id}
                title={pizza.title}
                price={pizza.price}
                imageUrl={pizza.imageUrl}
                sizes={pizza.sizes}
                types={pizza.types}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
