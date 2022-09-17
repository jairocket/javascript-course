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

/*
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
*/
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} current speed ${this.speed} km/h`);
};

ferrari.accelerate();

/*
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
*/

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} current speed ${this.speed} km/h`);
};

ferrari.brake();
console.log(ferrari.speed);

/*

4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀

*/

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
BMW.brake();
mercedes.brake();
