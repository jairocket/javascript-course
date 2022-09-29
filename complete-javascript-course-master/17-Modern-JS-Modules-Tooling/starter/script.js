//changing the name of imported values using 'as'
import cloneDeep from '../../node_modules/lodash-es/cloneDeep.js';

import { addToCart, totalPrice as price, qt } from './shoppingCart.js';

//importing everything from module

import * as ShoppingCart from './shoppingCart.js'; //convention start with capilized letter

//we can name the imported default value any way we want
import add from './shoppingCart.js';

console.log('importing module');
addToCart('bread', 5);
console.log(price, qt);

console.log(ShoppingCart.cart);

add('salame', 1);

//top level await works in modules

//it blocks the execution of the module

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);
  return { title: data.at(-1).title, text: data.at(-1) };
};

const lastPost = await getLastPost();
console.log(lastPost);

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
console.log(stateClone);

state.user.loggedIn = false;

console.log(stateClone.user.loggedIn); //false
console.log(stateDeepClone.user.loggedIn); // true
