import React from 'react';
import keys from 'lodash/keys';

import price from '../../pizza-price';
import formatPrice from '../../price-format';

const Cart = ({items, emptyCart}) => {
  let total = 0;
  return (
    <div className="cart">
      <h2>Current Cart</h2>
      <ul>
        {items.map((item) => {
          const cost = price(item, item.toppings);
          total += (cost * item.quantity);
          const toppings = keys(item.toppings)
          return (
            <li key={item.id}>
              <div>
                <p>{`${item.quantity} ${item.name} pizza${item.quantity > 1 ? 's': ''}`}</p>
                <p>{formatPrice(cost * item.quantity)}</p>
                {toppings.length > 0 && <span>Toppings - {keys(item.toppings).join(', ')}</span>}
                {toppings.length === 0 && <span>No toppings? BORING!</span>}
              </div>
            </li>
          );
        })}
      </ul>
      <strong>Total cart - {formatPrice(total)}</strong>
      <button onClick={emptyCart}>Clear Cart</button>
    </div>
  );
}

export default Cart;
