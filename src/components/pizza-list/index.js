import React from 'react';
import PizzaTile from './pizza-tile';

const PizzaList = ({pizzas, addPizza}) => (
  <div className="order-list">
    <h2>Order Forms</h2>
    {pizzas.map((p) => (
      // No spread because that's been deemed an anti-pattern
      <PizzaTile
        key={p.name}
        name={p.name}
        price={p.basePrice}
        maxToppings={p.maxToppings}
        toppings={p.toppings}
        addToCart={addPizza}
      />
    ))}
  </div>
);

export default PizzaList;
