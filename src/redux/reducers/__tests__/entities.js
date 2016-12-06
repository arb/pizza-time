import entities, {
  getPizzaEntity,
  getPizzaByName,
  getPriceByName
} from '../entities';

import {
  GET_PIZZAS_SUCCESS
} from '../../constants';

describe('entities reducer', () => {
  it('creates an entity cache on GET_PIZZAS_SUCCESS', () => {
    expect(entities(undefined, {
      type: GET_PIZZAS_SUCCESS,
      payload: {
        entities: {
          Pizza: {
            1: true,
            2: true,
            3: false
          }
        }
      }
    })).toEqual({
      pizzas: {
        1: true,
        2: true,
        3: false
      }
    })
  });
  describe('getPriceByName()', () => {
    it('returns the total price by name', () => {
      const result = getPriceByName({
        pizzas: {
          'large': {
            basePrice: 5,
            toppings: {
              cheese: {
                topping: {
                  price: 2
                }
              }
            }
          }
        }
      }, { name: 'large', toppings: { cheese: true }});

      expect(result).toBe(7.00);
    });
  });
});
