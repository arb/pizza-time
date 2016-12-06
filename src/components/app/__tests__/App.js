import React from 'react';
import { shallow } from 'enzyme';
import {App} from '../';

// Mock node-uuid so jest stops crying about it
jest.mock('node-uuid', () => {
  return jest.fn(() => 4);
});

describe('<App />', () => {
  it('shows loading', () => {
    const wrapper = shallow(
      <App loading={true} />
    );
    expect(wrapper.find('div').at(0).text()).toBe('Getting those piping hot Pizzas...');
  });

  it('shows an error', () => {
    const wrapper = shallow(
      <App error={true} />
    );
    expect(wrapper.find('div').at(0).text()).toBe('Well this is embarassing... we had an issue getting Pizzas!');
  });

  it('renders the pizza list and cart if the data is done loading and there are no errors', () => {
    const wrapper = shallow(
      <App
        loading={false}
        error={null}
      />
    );
    expect(wrapper.find('Cart').length).toBe(1)
    expect(wrapper.find('PizzaList').length).toBe(1);
  });
});
