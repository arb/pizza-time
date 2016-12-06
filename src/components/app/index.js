import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import * as actions from './actions';
import * as selectors from '../../redux/reducers';
import PizzaList from '../pizza-list';
import Cart from '../cart';

const Container = ({children}) => (
  <div>
    <h1>Welcome to PIZZA TIME!</h1>
    {children}
  </div>
);

export class App extends Component {
  componentDidMount () {
    this.props.fetchPizzas();
  }
  render() {
    const {
      loading,
      error,
      pizzas,
      addPizza,
      cartItems,
      emptyCart
    } = this.props;

    if (loading) {
      return (
        <Container>
          <div>Getting those piping hot Pizzas...</div>
        </Container>
      )
    }

    if (error) {
      return (
        <Container>
          <div>Well this is embarassing... we had an issue getting Pizzas!</div>
        </Container>
      );
    }

    return (
      <Container>
        <div className="flex-container">
          <PizzaList pizzas={pizzas} addPizza={addPizza} />
          <Cart items={cartItems} emptyCart={emptyCart} />
        </div>
        <footer>
          Ⓒ <a href="https://github.com/arb">arb</a> {new Date().getFullYear()}
        </footer>
      </Container>
    );
  }
}


export default connect(
  (state) => ({
    ...selectors.pizzaFetch(state),
    pizzas: selectors.pizzaList(state),
    cartItems: selectors.cartItems(state)
  }),
  actions
)(App);
