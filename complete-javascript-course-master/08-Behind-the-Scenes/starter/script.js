// 'use strict';

// // function calcAge(birthYear) {
// //   const age = 2037 - birthYear;

// //   function printAge() {
// //     let output = `${firstName}, you are ${age}, born in ${birthYear}`;
// //     console.log(output);

// //     if (birthYear >= 1981 && birthYear <= 1996) {
// //       var millenial = true;
// //       //creating new variable with same name as outer scope's variable - independent variable
// //       const firstName = 'Steven';
// //       const str = `Oh, you're a millenial, ${firstName}`;
// //       console.log(str);
// //       function add(a, b) {
// //         return a + b;
// //       }
// //       //reassigning outer scope's variable - works
// //       const output = 'NEW OUTPUT';
// //     }
// //     console.log(millenial);
// //     console.log(output);
// //     //add(2, 3); not defined because functions are block scoped i strict mode
// //   }
// //   printAge();
// //   return age;
// // }

// // const firstName = 'Jonas';
// // calcAge(1991);

// //Hoisting Variables
// // console.log(me);
// // console.log(job);
// // console.log(year);

// var me = 'Jonas';
// let job = 'teacher';
// const year = 1991;

// //Hoisting functions

// // console.log(addDcl(2, 3)); //work
// // console.log(addArrow); //undefined

// //doesn't work because it wasn't initialized yet
// // console.log(addArrow(2, 3));
// // console.log(addExpr(2, 3));

// function addDcl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };

// var addArrow = (a, b) => a + b;

// console.log(this);

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this); //points to undefined, cause the function doesn't have a owner
// };

// const calcAgeArr = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this); //points to window object, because arrow functions does not have its own this keyword varible, so it uses its parents' one
// };

// calcAge(1991);
// calcAgeArr(1980);

// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   // calcAge: function () {
//   //   console.log(2037 - this.year);
//   //   const self = this;
//   //   const isMillenial = function () {
//   //     console.log(self.year >= 1981 && self.year <= 1996);
//   //   }; // needs to create a variable (self) for this keyword
//   //   isMillenial();
//   // },
//   calcAge: function () {
//     console.log(2037 - this.year);
//     const isMillenial = () => {
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };
//     isMillenial(); //works because arrow function uses its parents this keyword
//   },
//   greet: () => console.log(`Hey ${this.firstName}`),
// };
// jonas.calcAge();
// jonas.greet(); //undefined - because arrow functions does not have its own this keyword varible, so it uses its parents' one

// // variables created with var creates a property on the window object
// // never use a arrow function as a method

// // const matilda = {
// //   year: 2017,
// // };

// // matilda.calcAge = jonas.calcAge;

// // matilda.calcAge();

// // const f = jonas.calcAge;

// //UNDEFINED BECAUSE f() HAS NO OWNER
// // f()

// const addExpr2 = function (a, b) {
//   console.log(arguments);
// };

// addExpr2(3, 2);

// var addArrow2 = (a, b) => {
//   console.log(arguments);
//   a + b;
// };

let age = 30;
let oldAge = age;
age = 31;

console.log(age);
console.log(oldAge);

const me = {
  name: 'Jonas',
  age: 30,
};

const friend = me;
friend.age = 27;

console.log('friend: ', friend);
console.log('Me: ', me);

//Primitive Types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';

console.log(lastName, oldLastName);

//Reference Types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';

console.log('Before Mariage: ', jessica);
console.log('After Mariage: ', marriedJessica);

//Copying objects - does not work for objects inside objects (push will push elements for both family array inside jessica and jessicaCopy )
const jessicaCopy = Object.assign({}, jessica);
jessicaCopy.lastName = 'White';
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before Mariage: ', jessica);
console.log('After Mariage: ', jessicaCopy);
