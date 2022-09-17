Object-Oriented programming is a programming paradigm based on the concept of objects. In this context, paradigm means
style of code, how we write and organize code

We use objects to model (describe) real-world (E.g. todo list item or user) or abstract features, such as HTML components
or data structure

Objects may contain data (properties) and code (methods). By using objects, we pack data and corresponding behaviour
into the block

In OOP, objects are self contained pieces/blocks of code that work as building blocks of applications and interact
interact with one another

Interactions happen through a public interface (API): methods that the code outside of the object can access and use to
communicate with the object

OOP's goal is organizing code, to make it more flexible and easier to maintain (avoid spaghetti code)

Classes are like blueprints from with we can create new objects

Instances are the objects created from a class

The 4 fundamental OOP principles are Abstraction, Encapsulation, Inheritance and Polymorphism

**Abstraction**

Ignoring or hiding details that don't matter, allowing us to get an overview perspective of the thing we're implementing,
instead of messing with details that don't really matter to our implementation

**Encapsulation**

Keeping properties and methods private inside the class, so they are not accessible from outside the class. Some methods can be exposed as public interface (API). That prevents external code from accidentally manipulating internal properties/state, causing bugs. It also allows to change internal implementation without the risk of breaking external code.

**Inheritance**

Make all properties and methods of a certain class available to a child class, forming a hirarchical relationship between classes. This allows us to reuse common logic and to model real-world relationships.
The child class _extends_ parent class methods and properties and have its own.

**Polymorphism**

A child class can overwrite a method it inherited from a parent class.

**OOP IN JS: PROTOTYPES**

All Objects in JavaScript are linked to a prototype object.
Prototype objects contains methods that are accessible to all objects linked to it. This behaviour is known as Prototypal inheritance/delegation.

Behavior is delegated to the linked prototype.

**3 of implementing prototypal inheritance in javascript**

Constructor Functions

- Tecnique to create objects from a function
- This is how built-in objects like Arrays, Maps or Sets are actually implemented

ES6 Classes

- Modern alternative to constructor function syntax
- "Syntactic Sugar": behind the scenes, ES6 classes work exactly like constructor functions
- ES6 classes do NOT behave like classes in "classical OOP"

Object.create()

- The easiest and most straightforward way of linking an object to a prototype object

**4 pilars of OOP are still valid: _Abstraction_, _Encapsulation_, _Inheritance_ and _Polymorphism_**
