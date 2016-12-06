import React, {Component} from 'react';
import OrderForm from './order-form';
import formatPrice from '../../../price-format';

export default class PizzaTile extends Component {
  render () {
    const {
      name,
      price,
      maxToppings,
      toppings,
      addToCart
    } = this.props;
    return (
      <div className="order-form-container">
        <p>{name} pizza</p>
        <p>starting at the everyday low price of {formatPrice(price)}</p>
        {maxToppings && <p>please select up to {maxToppings} toppings</p>}
        <OrderForm
          form={`${name}-form`}
          toppings={toppings}
          maxToppings={maxToppings}
          startingPrice={price}
          pizzaName={name}
          onSubmit={(data) => {
            return addToCart(name, data)
          }}
        />
      </div>
    );
  }
}
