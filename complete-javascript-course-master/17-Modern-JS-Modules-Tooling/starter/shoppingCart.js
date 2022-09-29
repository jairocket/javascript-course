console.log('Exporting module');

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
