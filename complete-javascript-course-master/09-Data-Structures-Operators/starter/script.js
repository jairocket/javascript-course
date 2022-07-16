'use strict';

// // Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(`Order Received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will
    be delivered to ${address} at ${time}`);
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({ address: 'Via del Sole, 21', starterIndex: 1 });

// //destructuring objects (order doesn't matter, but you need to take match the exact property name)
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// //in order to change the variable names you have to do this:
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// //default values
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters); //[] ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

// //mutating values
// let m = 111;
// let k = 999;
// console.log(m, k); // 111 999
// const obj = { m: 23, k: 7, l: 14 };
// //need to wrapp destructuring within parenthesis
// ({ m, k } = obj);
// console.log(m, k); // 23 7

// //nested objects

// const { fri } = openingHours;
// console.log(fri); //{open: 11, close: 23}
// const {
//   fri: { open: op, close: cl },
// } = openingHours;
// console.log(op, cl); // 11 23

// //destructuring arrays (order matter)
// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// //switching variables
// [main, secondary] = [secondary, main];
// console.log(main, secondary);

//destructuring array returned from funcion call
// console.log(restaurant.order(2, 0));
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// //destructuring nested arrays
// const nested = [2, 4, [5, 6]];
// const [i, , j] = nested; //2, [5, 6]
// const [x, , [y, z]] = nested; //2, 5, 6

// console.log(i, j, x, y, z);

// //default values

// const [p, q, r] = [8, 9];
// console.log(p, q, r); //8 9 undefined

// const [a = 1, b = 1, c = 1] = [8, 9];
// console.log(a, b, c); //8 9 1

// //spread operator - gets all elements of an array individually

// const arr = [7, 8, 9];
// const badrr = [1, 2, arr[0], arr[1], arr[2]];
// const newArr = [1, 2, ...arr];
// console.log(badrr); //[1, 2, 7, 8, 9]
// console.log(newArr); //[1, 2, 7, 8, 9]
// console.log(...newArr); // 1 2 7 8 9

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];

// //copy array (shallow copy)
// const mainMenuCopy = [...restaurant.mainMenu];

// //join 2 arrays

// const completeMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// //iterables: arrays, strings, map, set. NoT objects

// const str = 'Jonas';
// const letters = [...str, ' ', 'S.'];
// console.log(letters);

// // const ingredients = [
// //   prompt("Let's make pasta! Ingredient 1?"),
// //   prompt('ingredient 2?'),
// //   prompt('ingredient 3'),
// // ];
// // console.log(ingredients);

// // // restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// // // restaurant.orderPasta(...ingredients);

// //Objects

// const newRestaurant = { foundIn: 1998, ...restaurant, founder: 'Giuseppe' };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorant Roma';

// console.log(restaurantCopy);
// console.log(restaurant);

// //Destructuring with Rest pattern

// //SPREAD, because on RIGHT side of =
// const arra = [1, 2, ...[3, 4]];

//REST, because on LEFT side of =
// const [first, second, ...others] = [1, 2, 3, 4, 5];
// console.log(first, second, others); // 1 2 [3, 4, 5]

// //does not include skipped elements
// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];

// console.log(pizza, risotto, otherFood);

// //objects
// const { sat, ...weekDays } = restaurant.openingHours;
// console.log(weekDays);

//functions and rest patterns

// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) sum += numbers[i];
//   console.log(sum);
// };
// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// const hadjk = [23, 5, 7];
// add(...hadjk);

//Use any data type, return ANY data type and do short-circuiting
//in OR short-circuiting, JS checks if the first is truthy. If so, the second argument won't be evaluated, and return the first operator.
// If not, it will return the first truthy value of the chain or the last operator

console.log('----OR----');

console.log(3 || 'Jonas'); //3
console.log('' || 'Jonas'); //Jonas
console.log(true || 0); //true
console.log(undefined || null); //null
console.log(null || undefined); //undefined

console.log(undefined || 0 || '' || 'Hello' || 23 || null); //Hello

restaurant.numGuests = 0;
const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;

//falsy values
console.log(guest1); //10
const guest2 = restaurant.numGuests || 10;

//Nulish: null and undefined (NOT 0 or '')
console.log(guest2); //10
const guestCorrect = restaurant?.numGuests ?? 10; //0

// console.log('----AND----');

// //in AND short-circuiting, JS looks for the first falsy operator in the chain and returns it,
// //without checking the others. if all operators are truth, it then returns the last one
// console.log(0 && 'Jonas'); //0
// console.log(7 && 'Jonas'); //Jonas
// console.log('Hello' && 23 && null && 'Jonas'); //null

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// const rest1 = {
//   name: 'Capri',
//   numGuests: 20,
// };

// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Giovanni Rossi',
// };

// //short-circuiting
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests = rest1.numGuests || 10;

// // console.log(rest1);
// // console.log(rest2);

// //OR assigning operator ||= assigns a value to an variable if it is falsy
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// console.log(rest1);
// console.log(rest2);

// //0 is falsy so it doesn't work properly
// rest1.numGuests = 0;

// console.log('------');
// console.log(rest1);

// rest1.numGuests ||= 10;
// console.log(rest1, 'should be 0, but it is falsy');

// //to solve this situation, use the logical nullish assignment operator ??=
// rest1.numGuests = 0;
// rest1.numGuests ??= 10;
// console.log(rest1, 'works because 0 is not nulish');

// console.log('-----');

// //AND LOGICAL ASSIGNMENT OPERATOR ASSigns a value to a variable if it is truthy

// // rest1.owner = rest1.owner && '<ANONYMOUS>'; //owner is undefined, because owner property does not exist in rest1
// // rest2.owner = rest2.owner && '<ANONYMOUS>'; //owner is set to <ANONYMOUS>

// rest1.owner &&= '<ANONYMOUS>'; //does nothing because the property owner doesn't exist in rest1
// rest2.owner &&= '<ANONYMOUS>'; //owner is set to <ANONYMOUS>

// console.log(rest1);
// console.log(rest2);

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
``;
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work 
with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
*/

const players1 = [...game.players[0]];
const players2 = [...game.players[1]];

console.log(players1);
console.log(players2);

//better answer:
//const[players1, players2] = game.players

/*
2. The first player in any player array is the goalkeeper and the others are field players. 
For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array
('fieldPlayers') with all the remaining 10 field players
*/

const [gk, ...fieldPlayers] = [...game.players[0]];
console.log(gk, fieldPlayers);

/*
3. Create an array 'allPlayers' containing all players of both teams (22 players)
*/

const allPlayers = [...game.players[0], ...game.players[1]];
console.log(allPlayers);

/*
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') 
containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
*/

const players1Final = [...game.players[0], 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

/*
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
*/

const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

/*
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) 
and prints each of them to the console, along with the number of goals that were scored in total 
(number of player names passed in)
*/

function printGoals(...players) {
  players.forEach(player => {
    let counter = 0;
    for (let scorer of game.scored) {
      scorer === player && counter++;
    }
    console.log(`${player} scored ${counter} goals`);
  });
}
console.log('----random players----');
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
console.log('----scorers----');
printGoals(...game.scored);

/*
7. The team with the lower odd is more likely to win. 
Print to the console which team is more likely to win, 
WITHOUT using an if/else statement or the ternary operator.
*/

console.log('Case 7', (team1 < team2 && game.team1) || game.team2);

/*
TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again
 with players from game.scored

GOOD LUCK 😀
*/

//for of and entries() method

//.entries() array methods returns an array of arrays. menu.entries() returns an array. Each element of this
//array is an array cointaining a menu element and its index

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
/*
for(const item of menu.entries()){
  console.log(`${item[0]+1}: `{item[1]})
}
*/
//works exactly like because you can destructure each element of menu.entries()

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

/*
console.log(restaurant.openingHours.mon.open) //returns an error because restaurant.openingHours.mon is nullish
*/

console.log(restaurant.openingHours.mon?.open); //no error because it checks if restaurant.openingHours.mon is nulish or null
console.log(restaurant.openingHours?.mon?.open);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

//work with methods

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

//arrays

const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
console.log(users[0]?.name ?? 'User array empty');

//option chaining ? checks if the variable on the left is nullish. if so, returns undefined. Combined with the
// nulish operator ??, it works like an if else statement.

//looping of objects

//keys
const properties = Object.keys(restaurant.openingHours);
let openStr = `We are open on ${properties.length}: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);
//values
const values = Object.values(restaurant.openingHours);
//all
const entries = Object.entries(restaurant.openingHours);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, 
along with the goal number (Example: "Goal 1: Lewandowski")
*/
console.log('---Chalenge #2 - Exercise 01---');
for (const [score, player] of game.scored.entries()) {
  console.log(`Goal ${score + 1}: ${player}`);
}

/*
2. Use a loop to calculate the average odd and log it to the console 
(We already studied how to calculate averages, you can go check if you don't remember)
*/
console.log('---Chalenge #2 - Exercise 02---');

const oddEntries = Object.entries(game.odds);
let accumulator = 0;
for (const [result, odd] of oddEntries) {
  accumulator += parseFloat(odd);
}
const oddAverage = accumulator / oddEntries.length;
console.log(oddAverage);

/*
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). 
HINT: Note how the odds and the game objects have the same property names 😉
*/
console.log('---Chalenge #2 - Exercise 03---');

for (const [result, odd] of oddEntries) {
  game[result]
    ? console.log(`Odd of victory ${game[result]}: ${odd}`)
    : console.log(`Odd of draw: ${odd}`);
}

/*
BONUS: Create an object called 'scorers' which contains the names of the players who scored as 
properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

console.log('---Chalenge #2 - Bonus---');
const scorers = {};
game.scored.forEach(player => {
  let counter = 0;
  for (let scorer of game.scored) {
    scorer === player && counter++;
  }
  scorers[player] = counter;
});
console.log(scorers);
