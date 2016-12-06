import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import pizzas, * as pizzaSelectors from './pizzas';
import entities, * as entitySelectors from './entities';
import cart, * as cartSelectors from './cart';
import transform from 'lodash/transform';
import compact from 'lodash/compact';

const reducer = combineReducers({
  pizzas,
  entities,
  form: formReducer,
  cart
});

export default reducer;

export const pizzaList = (state) => pizzaSelectors.pizzaList(state.pizzas).map((name) => entitySelectors.getPizzaByName(state.entities, name));
export const pizzaFetch = (state) => pizzaSelectors.pizzaFetch(state.pizzas)

export const cartItems = (state) => {
  const items = cartSelectors.cartItems(state.cart);
  return compact(Object.keys(items).map((key) => {
    const item = items[key];
    const pizza = entitySelectors.getPizzaByName(state.entities, item.name);

    // If the entity cache is not loaded yet or this size is gone?
    if (!pizza) { return null; }

    const activeToppings = transform(item.toppings, (result, value, key) => {
      if (value) {
        result[key] = pizza.toppings[key]
      }
      return result;
    }, {});

    return {
      ...item,
      ...pizza,
      toppings: activeToppings,
      id: key
    };
  }));
};
export const cartFetch = (state) => cartSelectors.cartFetch(state.cart);
export const pizzaCost = (state, props) => entitySelectors.getPriceByName(state.entities, props);
