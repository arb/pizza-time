import {
  normalize,
  Schema,
  arrayOf
} from 'normalizr';

import { createAction } from 'redux-actions';

import {reset} from 'redux-form';

import {v1 as uuid} from 'node-uuid';

import keyBy from 'lodash/keyBy';
import forIn from 'lodash/forIn';

import {
  GET_PIZZAS_REQUEST,
  GET_PIZZAS_SUCCESS,
  GET_PIZZAS_ERROR,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  EMPTY_CART
} from '../../redux/constants';

import fetch from '../../delivery-van';

const getPizzas = createAction(GET_PIZZAS_REQUEST);
const getPizzasSuccess = createAction(GET_PIZZAS_SUCCESS);
const getPizzasError = createAction(GET_PIZZAS_ERROR);

const addPizzaToCart = createAction(ADD_TO_CART_REQUEST);
const addPizzaToCartSuccess = createAction(ADD_TO_CART_SUCCESS);

const pizzas = new Schema('Pizza', { idAttribute: 'name' });

export const fetchPizzas = () => {
  return (dispatch) => {
    dispatch(getPizzas());
    fetch(
    `{
      pizzaSizes {
        name,
        maxToppings,
        basePrice,
        toppings {
          topping { name, price }
          defaultSelected
        }
      }
    }`
    ).then(
      (result) => {
        const data = normalize(result.data, {
          pizzaSizes: arrayOf(pizzas)
        });
        forIn(data.entities.Pizza, (value) => {
          value.toppings = keyBy(value.toppings, 'topping.name');
        });
        dispatch(getPizzasSuccess(data));
      },
      (err) => dispatch(getPizzasError(err))
    );
  };
};

export const addPizza = (name, data) => {
  return (dispatch) => {
    dispatch(addPizzaToCart());
    setTimeout(() => {
      dispatch(addPizzaToCartSuccess({ name, data, id: uuid() }));
      dispatch(reset(`${name}-form`));
    }, 500);
  }
};

export const emptyCart = createAction(EMPTY_CART);
