//changing the name of imported values using 'as'

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
