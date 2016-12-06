import {combineReducers} from 'redux';
import fetch from './fetch';
import {
  GET_PIZZAS_REQUEST,
  GET_PIZZAS_SUCCESS,
  GET_PIZZAS_ERROR
} from '../constants';

const data = (state = [], action) => {
  switch (action.type) {
    case GET_PIZZAS_SUCCESS:
      return [...state, ...action.payload.result.pizzaSizes];
    default:
      return state;
  }
};

const reducer = combineReducers({
  data,
  fetch: fetch(GET_PIZZAS_REQUEST, GET_PIZZAS_ERROR, GET_PIZZAS_SUCCESS)
});

export default reducer;

export const pizzaFetch = (state) => state.fetch
export const pizzaList = (state) => state.data
