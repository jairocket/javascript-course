'strict mode';
//Object.freeze only turns the first object level immutable

//Make budget an immutable array:
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

//Make spendingLimits an immutable object:
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = (limits, user) => limits?.[user] ?? 0;

const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  //const limit = spendingLimits[user] ? spendingLimits[user] : 0;
  const limit = getLimit(limits, user);

  return value <= limit
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget3);

const checkExpenses = function (state, limits) {
  // for (const entry of budget) {
  //   if (entry.value < -getLimit(limits, entry.user)) {
  //     entry.flag = 'limit';
  //   }
  // }
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : { ...entry };
  });
};
const finalBudget = checkExpenses(newBudget3, spendingLimits);

console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  // let output = '';
  // for (const entry of budget) {
  //   output += entry.value <= -limit ? `${entry.description.slice(-2)} /` : '';
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);

  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  //.reduce((str, cur) => `${str}/${cur.description.slice(-2)}/`, '');
  console.log(bigExpenses);
};
logBigExpenses(finalBudget, 1000);
