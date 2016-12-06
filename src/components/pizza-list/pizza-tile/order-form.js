import React from 'react';
import { Field, reduxForm, formValueSelector, getFormSyncErrors } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import transform from 'lodash/transform';
import valuesIn from 'lodash/valuesIn';
import compact from 'lodash/compact';
import values from 'lodash/values';

import {cartFetch, pizzaCost} from '../../../redux/reducers';
import formatPrice from '../../../price-format';

const activeToppings = compose(compact, valuesIn);

let OrderForm = (props) => {
  const {
    handleSubmit,
    toppings,
    maxToppings,
    userToppings = {},
    form,
    adding,
    errors,
    price
  } = props;

  // Gives me all the currently active toppings
  const currentToppings = activeToppings(userToppings);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Quantity</label>
        <div>
          <Field
            name="quantity"
            component="input"
            type="number"
            parse={(value) => +value}
          />
          {errors && errors.quantity && <p>{errors.quantity}</p>}
        </div>
      </div>
      <div>
        {values(toppings).map((t) => (
          <div key={`${form}-${t.topping.name}`}>
            <label>{t.topping.name} - <span>({formatPrice(t.topping.price)})</span>
              <Field
                name={`toppings.${t.topping.name}`}
                component="input"
                type="checkbox"
                disabled={currentToppings.length >= parseInt(maxToppings, 10) && !userToppings[t.topping.name]}/>
            </label>
          </div>
        ))}
      </div>
      <div>
        <strong>Total cost - {formatPrice(price)}</strong>
        <button type="submit" disabled={adding || errors}>Add to Cart</button>
      </div>
    </form>
  )
}

OrderForm = reduxForm({
  validate: (values) => {
    const errors = {};
    if (values.quantity <= 0) {
      errors.quantity = 'You must enter a whole number greater than 1.';
    }

    return errors;
  }
})(OrderForm);

OrderForm = connect(
  (state, ownProps) => {
    const selector = formValueSelector(ownProps.form);
    const errors = getFormSyncErrors(ownProps.form);
    // Make a map here because that is how data is reporesented in the form
    const toppings = transform(ownProps.toppings, (res, value, key) => {
      res[key] = value.defaultSelected
    }, {});
    const {toppings: userToppings, quantity} = selector(state, 'toppings', 'quantity');
    return {
      userToppings,
      initialValues: {
        toppings,
        quantity: 1
      },
      adding: cartFetch(state).loading,
      errors: errors(state),
      price: pizzaCost(state, { name: ownProps.pizzaName, toppings: userToppings }) * quantity
    };
  }
)(OrderForm)

export default OrderForm;
