import React from 'react';
import { shallow } from 'enzyme';
import Cart from '../';

jest.mock('../../../pizza-price', () => {
  return jest.fn(() => 1);
});

jest.mock('../../../price-format', () => {
  return jest.fn((cost) => cost * 2);
});

describe('<Cart />', () => {
  it('renders without crashing', () => {
    shallow(<Cart items={[]} />);
  });

  it('renders a list of items', () => {
    const wrapper = shallow(
      <Cart
        items={[{
          quantity: 2,
          id: 1,
          name: 'small',
          toppings: {
            cheese: true,
            mushrooms: true
          }
        }, {
          quantity: 3,
          id: 2,
          name: 'medium',
          toppings: {
            cheese: true,
            mushrooms: true
          }
        }]}
      />
    );
    expect(wrapper.find('li').length).toBe(2);
    expect(wrapper.find('strong').text()).toBe('Total cart - 10');
  });

  it('renders topping information', () => {
    const wrapper = shallow(
      <Cart
        items={[{
          quantity: 2,
          id: 1,
          name: 'small',
          toppings: {
            cheese: true,
            mushrooms: true
          }
        }, {
          quantity: 3,
          id: 2,
          name: 'medium',
          toppings: {}
        }]}
      />
    );
    expect(wrapper.find('span').at(0).text()).toBe('Toppings - cheese, mushrooms');
    expect(wrapper.find('span').at(1).text()).toBe('No toppings? BORING!');
  });

  it('renders a line item total cost', () => {
    const wrapper = shallow(
      <Cart
        items={[{
          quantity: 2,
          id: 1,
          name: 'small',
          toppings: {
            cheese: true,
            mushrooms: true
          }
        }]}
      />
    );
    expect(wrapper.find('p').at(1).text()).toBe('4');
  });

  it('calls the emptyCart function on button click', () => {
    const emptyCart = jest.fn();
    const wrapper = shallow(
      <Cart
        items={[{
          quantity: 2,
          id: 1,
          name: 'small',
          toppings: {
            cheese: true,
            mushrooms: true
          }
        }]}
        emptyCart={emptyCart}
      />
    );
    wrapper.find('button').simulate('click');
    expect(emptyCart).toBeCalled();
  });
});
