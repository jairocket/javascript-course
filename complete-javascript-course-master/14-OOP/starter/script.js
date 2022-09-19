'use strict';

//Constructor functions are used to programmaticaly create objects
//By convention, starts with capital letter
//Arrow functions don't work because they do not have the this key word

const Person = function (firstName, birthYear) {
  //instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never do this:
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
  //use prototypal inheritance instead
};

Person.hey = function () {
  console.log('Hey there 👋');
};

const jonas = new Person('Jonas', 1991);

//when you use the reserved word 'new' and the object constructor happens the following:
//1. New empty object is created {}
//2. function is called and this is assigned to the new empty object this = {}
//3. new empty object is linked to prototype => create __proto__ property and sets its value to the prototype property
//of the function that is being called
//4. function automatically returns the new object

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jonas, jack);

//Considering JavaScript does not have classes from traditional Oriented Object Programming,
//Constructor functions are used to emulate them. Since objects are being created from a function, just as if it was
//a class, we can call them instances of it.

const jay = 'jay';

//we can verify if something is an instance of a constructor function:

console.log(jonas instanceof Person); //true
console.log(jay instanceof Person); //false

//Prototypes

//All objects created by a constructor function has access to its prototype property. That being said, we can always add
//methods and properties to the prototype
console.log(Person.prototype);
//Prototypal Inheritance
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

//that way we do not create a copy of calcAge function to each instance of Person. There's only one copy on the constructor
//prototype that can be resused by all instances.

//to check the prototype of an instance, we can do this:

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); //true

//Person.prototype is what's going to be used as the prototype of each object created with Person function

console.log(Person.prototype.isPrototypeOf(jonas)); //true
console.log(Person.prototype.isPrototypeOf(jack)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false

//Adding properties

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species); //Homo Sapiens Homo Sapiens

//checking if some property is within the object

console.log(jonas.hasOwnProperty('species')); //false
console.log(jonas.hasOwnProperty('firstName')); //true

//jonas.prototype.construction is the constructot function
//Person.prototype is the prototype of the objects created by Person, no prototype of Person itself

//If a property or method can't be found on a object, JavaScript looks for it on its prototype. This behavior is known
// as prototype inheritance or prototype delegation. All objects created by a constructor has access to those methods
// and properties on the prototype. That helps with performance because avoid repeating code

//Prototype Chain

/*

Constructor function creates a new empty object is linked to prototype => create __proto__ property and sets its value
 to the prototype property of the function that is being called. In our example, Person.prototype. The new object has a
 property __proto__ that points to Person.prototype
                   
Person.Prototype is an object and in JavaScript all objects have a prototype. The prototype of Person.prototype is
Object.prototype.

Object.prototype is created by a Constructor Function as well. JavaScript calls new Object when we write an object literal:
{...} === new Object(...)

The series of links between objects linked through prototypes is called prototype chain. it works like scope chain but for
properties and methods. When JS can't find them on the object, it checks if they are on the prototype chain, one by one.

Object.Prototype is the top of the prototype chain, that's why its __proto__ property is null

*/

console.log(jonas.__proto__); //Jonas prototype
console.log(jonas.__proto__.__proto__); //Object prototype => top of prototype chain
console.log(jonas.__proto__.__proto__.__proto__); //null

console.dir(Person.prototype.constructor); //function itself

const arr = [3, 6, 5, 9, 3, 7, 9, 41]; // === new Array

console.log(arr.__proto__); //all array methods
console.log(arr.__proto__ === Array.prototype); //true
console.log(arr.__proto__.__proto__); //Object prototype

/*
Despite of working, don't do this because next version of javascript could bring a new feature with the same name
and do something else.
Besides, when you work with a team, other developers could create other methods for build in objects too leading to bugs
*/
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique()); //[3, 6, 5, 9, 7, 41]

//inspecting DOM tree elements

const h1 = document.querySelector('h1');
console.log(h1.__proto__); //HTMLHeadingElement
console.log(h1.__proto__.__proto__); //HTMLElement
console.log(h1.__proto__.__proto__.__proto__); //Element
console.log(h1.__proto__.__proto__.__proto__.__proto__); //Node
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__); //EventTarget
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); //Object Prototype

console.log((x => x + 1).__proto__);
console.log((x => x + 1).__proto__.__proto__);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the 
current speed of the car in km/h;
*/
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const ferrari = new Car('ferrari', 90);
console.log(ferrari.speed);

// /*
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// */
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} current speed ${this.speed} km/h`);
};

ferrari.accelerate();

// /*
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// */

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} current speed ${this.speed} km/h`);
};

ferrari.brake();
console.log(ferrari.speed);

// /*

// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h

// GOOD LUCK 😀

// */

const BMW = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

BMW.accelerate();
mercedes.accelerate();
BMW.brake();
BMW.accelerate();
mercedes.brake();
BMW.brake();
mercedes.accelerate();
mercedes.accelerate();
BMW.brake();
mercedes.accelerate();
// BMW.brake();
mercedes.brake();

//ES6 classes

//uses constructor functions behind the scenes

//class expression

// const PersonCl = class {

// }

//class declaration

class PersonCl {
  //Instances have only properties inside the constructor function
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //Methods created here are set in the .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey, I'm ${this.fullName}!`);
  }

  get age() {
    const now = new Date();
    return now.getFullYear() - this.birthYear;
  }

  //Set property that already exists
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }
  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there 👋');
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);
console.log('age', jessica.age);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey, I'm ${this.firstName}!`);
// };

jessica.greet();

/*
1. Classes are not hoisted
2. classes are first class citizens
3. classes are executed in strict mode
*/

//Getters and Setters
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); //300
account.latest = 50;
console.log(account.latest); //50

const walter = new PersonCl('Walter White', 1965);

console.log(walter);

//Static methods

Array.from(document.querySelectorAll('h1'));

//from method is attached to the Array constructor and not on the prototype of the array constructor.
// It doesn't work on arrays

/* [1,2,3].from() */ //it's not a function error

Person.hey();
//matilda.hey();  it's not a function error

PersonCl.hey();

//Object.create

/*
We can create manually the object that we want to be the prototype of any object we want
*/
// create prototype
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
//create empty object and manually setting its prototype
const steven = Object.create(PersonProto);
//add properties

steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge(); //35
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value,
 by multiplying the input by 1.6);
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
  }

  brake() {
    this.speed -= 5;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

/*
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.
DATA CAR 1: 'Ford' going at 120 km/h
GOOD LUCK 😀
*/

const ford = new CarCl('Ford', 120);
console.log(ford);
ford.accelerate();
ford.brake();
console.log(ford.speedUS);
console.log(ford.speed);
ford.speedUS = 75;
console.log(ford.speedUS);
console.log(ford.speed);

//Inheritance between classes
//create a student Class that will inheritance properties from Person using constructor functions

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//LInking prototypes
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.dir(Student.prototype.constructor);

// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and
 current speed, the EV also has the current battery charge in % ('charge' property);
*/
const EletricCar = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EletricCar.prototype = Object.create(Car.prototype);
EletricCar.prototype.constructor = Car;

/*
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
*/
EletricCar.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

/*
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. 
 Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
*/
EletricCar.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed}, with a charge of ${this.charge}`
  );
};

/*
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). 
 Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const tesla = new EletricCar('Tesla', 120, 23);
console.log(tesla);

tesla.accelerate();
tesla.brake();
tesla.chargeBattery(90);
tesla.charge;

// ES6 Class inheritance
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //parents' constructor or superfunction
    //always needs to happen first
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(`I'm ${this.age} but I feel more like ${this.age + 10}`);
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce(); //own method
martha.calcAge(); // parent method overwritten polymorphism

//Object.create()

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const jai = Object.create(StudentProto);
jai.init('Jai', 2010, 'Computer Science');
jai.introduce();
jai.calcAge();
//Jai iherits from StudentProto and StudentProto inherits from PersonProto

//Public fields
//Private fields
//Public methods
//Private methods
//static version for each one

class Account {
  //public fields (instances)
  locale = navigator.language;

  //Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    //convention to tell team that this property shouldn't be accessed outside of the class (_)

    console.log(`Thanks for opening an account ${owner}!`);
  }
  // public interface
  // public methods
  getMovements() {
    return this.#movements;
  }
  deposit(value) {
    this.#movements.push(value);
    return this;
  }

  withdraw(value) {
    this.deposit(-value);
    return this;
  }

  requestLoan(value) {
    if (this._approveLoan(value)) {
      this.deposit(value);
      console.log('Loan approved');
    }
    return this;
  }

  //Private methods same syntax but it moves the method from the prototype to the instance
  _approveLoan(value) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

console.log(acc1);

//public interface
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);

//we shouldnt be able to call internal methods and properties

//we do not want code from outside of the class to accidentally manipulate data inside of the class;
//we can change code from inside of the class without breaking any code from outside.

// console.log(acc1.pin);
// acc1.approveLoan(1000);
// acc1.movements.push(250);
// acc1.movements.withdraw(-140);

//console.log(acc1.#movements); //Private field '#movements' must be declared in an enclosing class
//acc1.#approveLoan(1000);

//chaining

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);

// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 
'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 10;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed}, with a charge of ${this.#charge}`
    );
    return this;
  }

  brake() {
    this.speed -= 5;

    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed}, with a charge of ${this.#charge}`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);

rivian.accelerate().chargeBattery(90).brake();
//console.log(rivian.#charge);

console.log(rivian.speedUS);
