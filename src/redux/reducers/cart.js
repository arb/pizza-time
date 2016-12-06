import {combineReducers} from 'redux';
import fetch from './fetch';
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_ERROR,
  EMPTY_CART
} from '../constants';

const data = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          name: action.payload.name,
          ...action.payload.data
        },
      };
    case EMPTY_CART:
      return {};
    default:
      return state;
  }
};

const reducer = combineReducers({
  data,
  fetch: fetch(ADD_TO_CART_REQUEST, ADD_TO_CART_ERROR, ADD_TO_CART_SUCCESS)
});

export default reducer;

export const cartFetch = (state) => state.fetch
export const cartItems = (state) => state.data
