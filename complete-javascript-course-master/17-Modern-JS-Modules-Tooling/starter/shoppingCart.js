console.log('Exporting module');

//blocking code

// console.log('start fetching users');

// await fetch('https://jsonplaceholder.typicode.com/users');

// console.log('finished fetching users');

const shoppingCart = 10; //|_ scoped to the module
const cart = []; //|

//named exports:

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

//changing the name of exported values using 'as'
export { totalPrice, totalQuantity as qt, cart };

//default exports => no names involved. just export the value
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}

//module pattern using closure
// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCart = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
//   };

//   const orderStock = function (product, quantity) {
//     console.log(`${quantity} ${product} ordered feom supplier`);
//   };

//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

//common js modules

// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// };
// const {addToCart} = require('./shoppingCart.js')
