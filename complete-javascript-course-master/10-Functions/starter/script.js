'use strict';

// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   // ES5
//   // numPassengers = numPassengers || 1
//   // price = price || 199
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };
// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);
// createBooking('LH123', undefined, 1000);
// console.log(bookings);

// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 2134461326548,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr.' + passenger.name;

//   if (passenger.passport === 2134461326548) {
//     alert('Checkin');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 10000000000);
// };

// newPassport(jonas);
// checkIn(flight, jonas);

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// //HIgher order/ callback function
// const transformer = function (str, fn) {
//   console.log(`Original: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);
//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer('JavaScript is the best!', upperFirstWord);
// transformer('JavaScript is the best!', oneWord);

// const highFiver = function () {
//   console.log('👋');
// };
// const people = ['Jonas', 'Martha', 'Adam'];
// document.body.addEventListener('click', highFiver);
// people.forEach(highFiver);

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };
// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greet('Hello')('Jonas');

// const greetRefactored = greeting => name => {
//   console.log(`${greeting} ${name}`);
// };

// greetRefactored('Hi')('Jai');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book: function (flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
//book(23, 'Sarah Williams') //Cannot read property

//call() method sets which object this keyword should point to

book.call(eurowings, 23, 'Sarah Williams');
book.call(lufthansa, 239, 'Mary Cooper');
console.log(eurowings);
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'EW',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

//apply() method works just like call() but it takes an array as argument

const GeorgeCooperFlight = [583, 'George Cooper'];
const JaiAnjosFlight = [584, 'Jai Anjos'];
book.apply(swiss, GeorgeCooperFlight);

//works just like

book.call(swiss, ...JaiAnjosFlight);

//Bind method returns a new function with a key word that points to a this keyword

const bookEW = book.bind(eurowings);
bookEW(23, 'Steven Williams');

console.log(eurowings);

//you can pass parameters to the binded function to set them when it is called.
//in this example, the flightNum is set to 23, so we only need to pass passenger's name
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');
console.log(eurowings);

//With Listeners.
//when this keywork is called inside a event listener it points to the DOM object that is being listened.
//So we can use bind() method to set what is the object that this keyword should point to

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//Partial Application

const addTax = (rate, value) => value + value * rate;

console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
//addVAT = value => value + value * 0.23

console.log(addVAT(100));
console.log(addVAT(23));

const addVATRefactored = function (rate) {
  return function (value) {
    return (value += value * rate);
  };
};
const addVAT2 = addVATRefactored(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of 
replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:

  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should 
  look like this:

        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value 
  AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense 
  (e.g answer 52 wouldn't make sense, right?)

2. Call this method whenever the user clicks the "Answer poll" button.

3. Create a method 'displayResults' which displays the poll results. The method takes a string as 
an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results 
array as it is, using console.log(). This should be the default option. If type is 'string', display a string like 
"Poll results are 13, 2, 4, 1". 

4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 
'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this 
situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
// */

const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  //This generates [0, 0, 0, 0]. More in the next section
  answers: new Array(4).fill(0),
};

// For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check
// if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
poll.saveAnswer = function (answer) {
  for (const [index, option] of this.answers.entries()) {
    index === answer && this.answers[index]++;
  }
};

poll.displayResults = function (type = 'array') {
  let output = 'Poll results are ';
  if (type === 'array') {
    this.answers.forEach(answer => console.log(answer));
  } else {
    for (const index in this.answers) {
      if (index == this.answers.length - 1) {
        output += `${this.answers[index]}`;
      } else {
        output += `${this.answers[index]}, `;
      }
    }
    console.log(output);
  }
};

poll.registerNewAnswer = function () {
  let promptText = this.question + '\n';
  for (const option of this.options) {
    const [alternative, language] = option.split(' ');
    promptText += ' '.repeat(10) + `${alternative} ${language}\n`;
  }
  const answer = prompt(promptText + '(Write option number)'.padStart(31));
  answer >= 0 && answer <= 3 && Number(answer) === parseInt(answer)
    ? poll.saveAnswer(Number(answer))
    : alert('invalid option');
  this.displayResults();
  this.displayResults('string');
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// const displayResults = poll.displayResults;
// console.log(poll);

// [5, 2, 3][(1, 5, 3, 9, 6, 1)];

// poll.displayResults.call({ answers: [5, 2, 3] });
// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

//immedially invoked function expression
//Function executed once and then disappear.
//we could create a function, and exectute it only once

const runOnce = function () {
  console.log('this will never run again. But it could.');
};
runOnce(); //this will never run again.But ut it could.

//but then, nothing stops us to execute it again somewhere else in the scope. IIFE prevents that

(function () {
  console.log('it will never run again. Ever.');
})(); //it will never run again. Ever.

(() => console.log('it will also never run again. Ever.'))();

//IIFE creates a scope which protects data inside from being accidentally overwritten. That means that data is
//encapsulated. In modern JavaScript, let and const variables does that job for us, so IIFE is only used when we
// need to create a function that will be executed only once

{
  const isPrivate = '23';
  var notPrivate = '46';
}

//console.log(isPrivate) //error
console.log(notPrivate); //46

//Closures

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

/* Functions always have access to the variable environment of the execution context  in which the function 
was created. Booker was created in the execution context of secureBooking, that's why it can access passengerCount 
Variable, even though secureBooking is no longer on the call stack
Variable environment is attached to the function, exactly as it was at the time and place the function was created
Closure has priority over scope chain
*/

/*
A closure is the closed-over variable environment of execution context in which a function was created, even after
that execution context is gone;

A closure gives a function access to all the variables of its parent function, even after that parent function has
returned. the function keeps a reference to its outer scope, which preserves the scope chain throughout time.

A closure makes sure that a function doesn't lose connection to variables that existed at the function's "birth place"

A closure is like a backpack that a function carries around wherever it goes. This backpack has all the variables that
were present in the environment where the function was created

We do not have to manually create closures. This is a JavaScript feature that happens automatically. We can't even access
closed over variables explicitly. A closure is not a tangible JavaScript Object.

It is possible to see closed variables using console.dir(<function with closure>)
*/

console.dir(booker); //[[Socpes]] property (double brackets mean that we don't have a access to the content in our code)

//Example 1

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); //46
console.dir(f); //closure(g) {a: 23}

//Reassning f function

h();
f(); //1554
console.dir(f); //closure(h) {b: 777}

//Example 2

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will start board in ${wait} seconds`);
};
const perGroup = 1000;
boardPassengers(180, 3);

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1
 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. 
Think about WHEN exactly the callback function is executed, and what that means for the variables involved
 in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color == 'red'
      ? (header.style.color = 'blue')
      : (header.style.color = 'red');
  });
})();

//it works because addEventListener has access to its parent function. that's why you do not need to select header
//element again. This is possible thanks to Closures. Even though the iife function is gone by the time addEventListener
//is executed, it is carried like a backpack of addEventListener, so it can be executed as soon as it is needed
