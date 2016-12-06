import cart from '../cart';
import {
  ADD_TO_CART_SUCCESS,
  EMPTY_CART
} from '../../constants';

describe('cart reducer', () => {
  it('has a default state', () => {
    expect(cart(undefined, {})).toEqual({
      data: {},
      fetch: {
        error: null,
        loading: false
      }
    });
  });

  it('adds items to the cart on ADD_TO_CART_SUCCESS', () => {
    expect(cart({
      data: {
        456: {
          name: 'small',
          foo: 'baz'
        }
      }
    }, {
      type: ADD_TO_CART_SUCCESS,
      payload: {
        id: 123,
        name: 'large',
        data: { foo: 'bar' }
      }
    })).toEqual({
      data: {
        123: {
          name: 'large',
          foo: 'bar'
        },
        456: {
          name: 'small',
          foo: 'baz'
        }
      },
      fetch: {
        error: null,
        loading: false
      }
    });
  });

  it('empties the cart on EMPTY_CART', () => {
    expect(cart({
      data: {
        123: {
          name: 'large',
          foo: 'bar'
        }
      },
      fetch: {
        error: null,
        loading: false
      }
    }, {
      type: EMPTY_CART,
    })).toEqual({
      data: {},
      fetch: {
        error: null,
        loading: false
      }
    });
  });
});
