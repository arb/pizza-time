import {combineReducers} from 'redux';

import {
  GET_PIZZAS_SUCCESS
} from '../constants';

import price from '../../pizza-price';

const pizzas = (state = {}, action) => {
  switch (action.type) {
    case GET_PIZZAS_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.Pizza
      }
    default:
      return state;
  }
};

const reducer = combineReducers({ pizzas });

export default reducer;

export const getPizzaEntity = (state) => state.pizzas
export const getPizzaByName = (state, name) => state.pizzas[name]
export const getPriceByName = (state, props) => {
  const pizza = getPizzaByName(state, props.name);

  if (!pizza) { return 0; }
  return price(pizza, props.toppings);
};
