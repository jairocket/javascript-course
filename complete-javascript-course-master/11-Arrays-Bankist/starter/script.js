'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
        ${i + 1} ${type}
      </div>
      <div class="movements__value">${mov} €</div>
    </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const creatUsername = function (user) {
  const username = user
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  return username;
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance} €`;
};

console.log(creatUsername('Steven Thomas Williams'));

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumIn.textContent = `${incomes} €`;
  labelSumOut.textContent = `${Math.abs(out)} €`;
  labelSumInterest.textContent = `${interest} €`;
};

const createUsername = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);
console.log(accounts);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

//Event handler - login

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //Display data
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE - Does not mutate the original array
console.log(arr.slice(2)); //['c', 'd', 'e'] ->
console.log(arr.slice(2, 4)); //['c', 'd']
console.log(arr.slice(-2)); // ['d', 'e']
console.log(arr.slice(-2)); //['e']
console.log(arr.slice(1, -2)); // ['b', 'c']
console.log(arr.slice()); //['a', 'b', 'c', 'd', 'e'] -> Shallow copy of original array

//SPLICE - Mutate the original array
console.log(arr.splice(2)); //['c', 'd', 'e'] -> removes arr elements from index 2 and return them
console.log(arr); //['a', 'b'] -> changed array
arr.splice(-1); //removes last arr element
console.log(arr); //[arr]
//Second argument on splice array method is the number of elements you need to delete from the array

//REVERSE - Mutate the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); //['f', 'g', 'h', 'i', 'j']
console.log(arr2); //['f', 'g', 'h', 'i', 'j']

//CONCAT - Does not mutate the original array
const letters = arr.concat(arr2);
console.log(letters);
//works like spread operator [...arr, ...arr2]

//JOIN
console.log(letters.join(' - ')); //a - b - c - d - e - f - g - h - i - j

//AT
const arr3 = [23, 11, 64];
console.log(arr3[0]); //23
console.log(arr3.at(0)); //23
console.log(arr3[arr3.length - 1]); //64
console.log(arr3.slice(-1)[0]); //64
console.log(arr3.at(-1)); //64
//works with arrays
console.log('jonas'.at(0)); //j
console.log('jonas'.at(-1)); //s

//forEach
//forEach passes the element, index and the array as parameters, in that order in wach iteration
//break and continue doesn't work

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log('FOR OF');

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('FOREACH');
movements.forEach(function (movement, i, array) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

//forEach for maps and sets
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
//sets don't have keys or indexes so, the second argument of forEach method refers to the element.
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data 
into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy.
 A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following 
things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow 
copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function 
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a 
puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const checkDogs = function (dogsJulia, dogsKate) {
  const actualDogsJulia = dogsJulia.slice(1, 3);
  const dogAges = actualDogsJulia.concat(dogsKate);
  dogAges.forEach((dogAge, index) => {
    dogAge > 3
      ? console.log(
          `Dog number ${index + 1} is an adult, and is ${dogAge} years old`
        )
      : console.log(`Dog number ${index + 1} is still a puppy 🐶`);
  });
};

console.log('first data');
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('second data');
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

/*
MAP takes an array, execute a callback function over every element and returns a new array
FILTER takes an array and returns a new array containing the array elements that passed a specified test condition
REDUCE takes an array and boils all array elements down to one single value
*/

const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];

for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);

/*
forEach method produces a side effect. It loops over an iterable and does something with it. Map, on the other hand, loops over an iterable and creates a new
array of elements changed by its callback function. It doesn't change the original array"
*/

const deposits = movements.filter(mov => mov > 0);
console.log(movements);
console.log(deposits);

const depositsFor = [];

for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

const balance = movements.reduce((acc, cur, i, arr) => {
  return acc + cur;
}, 0);
console.log(balance);

let balance2 = 0;

for (const mov of movements) balance2 += mov;

console.log(balance2);

//Maximum value

const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);
console.log(max);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their 
study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: 
if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.

2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
*/

const calcAverageHumanAge = function (dogAges) {
  const humanAges = dogAges
    .map(dogAge => {
      return dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4;
    })
    .filter(humanAge => humanAge >= 18)
    .reduce((acc, cur, i, arr) => {
      acc += cur / arr.length;
      return acc;
    }, 0);

  return humanAges;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

const totalDepositsUSD = movements
  .filter(mov => mov > 0) //we can debug using arr parameter
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * eurToUsd;
  })
  //.map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

//find method

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

//includes checks equality
console.log(movements.includes(-130)); //true
//some checks condition
console.log(movements.some(mov => mov === -130)); //true

const anydeposits = movements.some(mov => mov > 0);
console.log(anydeposits); //true

//Every checks if all elements satisfy certain condition
console.log(movements.every(mov => mov > 0));

console.log(account4.movements.every(mov => mov > 0));

const deposit = mov => mov > 0;

console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

//flat

const arra = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arra.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arra.flat());
console.log(arra.flat(2));

// const accountsMovements = accounts.map(acc => acc.movements);
// console.log(accountsMovements);
// const allMovements = accounts.flat();
// console.log(allMovements);
// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);

//flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//flatmap

const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

//sorting strings -> change original array
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

//sorting numbers -> change original array
// return < 0 -> A, B
// return > 0 -> B, A
movements.sort((a, b) => a - b); //ascending
movements.sort((a, b) => b - a); //descending

const art = [1, 2, 3, 4, 5, 6, 7];
console.log([1, 2, 3, 4, 5, 6, 7]);
//create an empty array
console.log(new Array([1, 2, 3, 4, 5, 6, 7]));

const x = new Array(7);
const y = new Array(7);
console.log(x);

//fill array x with 1
x.fill(1);
console.log(x);
//fill array y with 1 starting from index 3
y.fill(1, 3);
console.log(y);
// insert elements from index 4 to 6
art.fill(23, 4, 6);
console.log(art);

//Array.from

const z = Array.from({ length: 7 }, () => 1);
console.log(z);
const w = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(w);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
  const movementsU2 = [...document.querySelectorAll('.movements__value')];
});

//Practise

const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

const numDeposit1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposit1000);

//prefixed  ++ operator
const numDeposit10001 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(numDeposit10001);

const { depositos, withdrawalsz } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      //cur > 0 ? (sums.depositos += cur) : (sums.withdrawalsz += cur);
      sums[cur > 0 ? 'depositos' : 'withdrawalsz'] += cur;
      return sums;
    },
    { depositos: 0, withdrawalsz: 0 }
  );
console.log(depositos, withdrawalsz);

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new
   property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams 
   of food, and the weight needs to be in kg)
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
dogs.forEach(dog => {
  dog.recomendedFood = dog.weight ** 0.75 * 28;
});
console.log(dogs);

/*
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need
   to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
*/
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));

if (sarahDog.curFood > sarahDog.recomendedFood * 1.1) {
  console.log('Eating too much');
} else if (sarahDog.curFood < sarahDog.recomendedFood * 0.9) {
  console.log('Eating too little');
}

/*
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little 
   ('ownersEatTooLittle').
*/

const ownersEatTooMuch = dogs
  .filter(cur => {
    return cur.curFood > cur.recomendedFood * 1.1;
  })
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(cur => {
    return cur.curFood < cur.recomendedFood * 0.9;
  })
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

/*
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and
   Michael's dogs eat too little!"
*/
const tooMuchString = ownersEatTooMuch.reduce((acc, cur, i) => {
  i < ownersEatTooMuch.length - 1 ? (acc += `${cur} and `) : (acc += cur);
  return acc;
}, '');
console.log(tooMuchString + "'s dogs eat too much");

console.log(ownersEatTooLittle.join(' and ') + "'s dogs eat too little");
/*

5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
*/

console.log(dogs.some(dog => dog.curFood === dog.recomendedFood));
/*
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
*/
console.log(
  dogs.some(
    dog =>
      dog.curFood >= dog.recomendedFood * 0.9 &&
      dog.curFood <= dog.recomendedFood * 1.1
  )
);
/*
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
*/
const okEatingDogs = dogs.filter(
  dog =>
    dog.curFood >= dog.recomendedFood * 0.9 &&
    dog.curFood <= dog.recomendedFood * 1.1
);
console.log(okEatingDogs);
/*
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are 
   inside the array's objects)
*/
const dogsCopy = dogs
  .slice()
  .sort((a, b) => a.recomendedFood - b.recomendedFood);
console.log(dogsCopy);
/*
HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). 
Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:


GOOD LUCK 😀
*/
