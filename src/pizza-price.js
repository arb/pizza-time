import keys from 'lodash/keys';

export default (pizza, userToppings) => {
  return keys(userToppings).reduce((cost, key) => {
    if (userToppings[key]) {
      cost += pizza.toppings[key].topping.price
    }
    return cost;
  }, pizza.basePrice);
};
