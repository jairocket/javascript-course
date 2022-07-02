'use strict';

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      //creating new variable with same name as outer scope's variable - independent variable
      const firstName = 'Steven';
      const str = `Oh, you're a millenial, ${firstName}`;
      console.log(str);
      function add(a, b) {
        return a + b;
      }
      //reassigning outer scope's variable - works
      const output = 'NEW OUTPUT';
    }
    console.log(millenial);
    console.log(output);
    //add(2, 3); not defined because functions are block scoped i strict mode
  }
  printAge();
  return age;
}

const firstName = 'Jonas';
calcAge(1991);
