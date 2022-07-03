JS Engine

Program that executes javascript node. Ex V8 Engine (Node)
The engine has a **call stack** (where out code is executed using execution context) and a **heap** (where the objects neeeded by the application are stored)

### Highlevel

Developer does not have to worry about managing resources manually. The Programming language does it
through abstractions.

### Garbage-collected

An algorithm on javascript engine removes all unused objects from the computer memory

### Interpreted or just-in-time compiled?

Computer only understands zeros and ones (machine code), so programming languages are
abstractions for the commands computers understands. That means these abstractions need to be translated into
machine code so the computer can execute the commands. it can be done through compilation or interpretation.

**Compilation:** entire code is converted into machine code at once, and written to a binary file that can be executed by a computer.

**Interpretation:** interpreter runs through the source code and executes it line by line.

Interpreted languages are much slower than the compiled ones. So, to make it more efficient, modern JavaScript is a **Just-in-time compilation** language, in which entire code is converted into machine code at once, then executed immediately.

The code is parsed into a data structure called **Abstract Syntax Tree (AST)**. Essentially, it splits up lines of code into pieces that are meaningful to the language (key words, such as _const_ and _functions_) and organize them in that abstract tree. During this process the engine checks if there are any syntax errors. Then, this parsed tree (AST) is compiled and executed right away. During the execution that takes place in **Call Stack**, an optimation process runs in the background, making the machine code more efficient while the computer runs it. It makes Javascript faster. These processes happen in special threads non accessible from code.

#### Runtime Javascript

Runtime can be imagined as a container including all the things that we need to use JavaScript (on the browser or elsewhere). it's composed by the **JS Engine**; **Web API's** (on browsers), that are a pack of functionalities provided to the engine, accessible on winddow object (DOM, Timers, Fetch API, etc); and **Callback Queue**, that is a data structure with all callback functions ready to be executed (callback function from DOM event listener).
When a callback function is called, it is taken to the **Call Stack** so it can be executed. This process happens through **event loop**. On Nodejs Runtime, we have no Web API's. Instead, we have C++ bindings and a Thread Pool.

### Call Stack

After compilation, a **global execution context** is created for top-level code (code that is not inside a function). **Execution Context** is an environment in which a piece of javascript code is executed. It stores all the necessary information for some code to be executed. In Javascript projects, there is only one global execution context. For each function existent in the project, an execution context is created. All these execution contexts forms the **Call Stack**. After executing the functions, the JS Engine waits on Callbacks functions to arrive to execute them.

Execution Contexts have a **Variable Environment**, in which all variables declarations, functions and the arguments object (contains all arguments of the functions) are stored; **Scope Chain**, that references to variables that are outside the functions; and the **this** keyword. These are created during the **creation phase**, right before execution.

Arrow functions exectution contexts doesn not have nor arguments object, neither this keyword. Instead they can use from the closest regular function parent.

**Call Stack** is an environment where execution contexts get stacked on top of each other, to keep track of where we are in the execution. The execution context on the top of the stack is the one currently running. After it is done, the next one is run, and so forth.

### Scope Chain

**Scoping** is how our program's variables are **organized** and **accessed**. JavaScript uses **lexical scoping**, in which scopping is controlled by **placement** of functions and blocks of code.

**Scope** is a space or environment in which a certain variable is **declared** (_variable enviroment in case of functions_). There is **global** scope (top-level code, accessed **everywhere**), **function** scope (accessible only **inside function** and is also called local scope), and **block** scope (accessible only inside block [inside curl braces]). Block Scope applies to **let** and **const** variables. In strict mode, functions are also block scoped. **var** variables are function scoped.

**Scope of a variable** is a region of our code where a certain variable can be **accessed**.

**Scope Chain**: Every scope has access to the variables available in its parent scope. This process is called variable look up. It does not work the other way around.

**"Sibling scopes"** have no access to each other's variables.

**_Call Stack_** order in which functions were **called** and includes Variable Environment. **_Scope Chain_** order in which functions are **written in the code**, but has **nothing** to do with order i which functions are **called**.

### Variable Enviroment

**Hoisting** makes some types of variables accessible/usable in the code before they are actually declared. "Variables lifted to the top of their scope". **Before execution**, code is scanned for variable declarations, and for each variable, a new property is created in the **variable environment object**.

### Multi-paradigm

Paradigm is an approach and mindset of structuring code which will direct your coding style
and technique. Paradigms can be classified as Imperative or Declarative. You can adopt any of these paradigms using javascipt:

**Procedural programming** (organize code in a linear way, with functions in between)
**Object-Oriented programing (OOP)**
**Functional Programming (FP)**

### Prototype-based object-oriented

### First-class functions

functions are simply treated as variables. we can pass them into other functions and
return them from functions

### Dymamic typed language

### Single threaded

**Concurrency model** is how the Javascript engine handles multiple tasks happening at the same time.
JavaScript runs in one single thread, so it can do one thing at a time.

### Non-blocking event loop

By using an **event loop**, Javascript takes long running tasks, executes them in the "background" and puts them back in the main thread once they are finished

### this keyword/variable

Special variable that is created for every execution context. Takes the value of (points to) the "owner" of the function in which the this keyword is used.

this is **NOT** static. It depends on **how** the function is called, and its value is only assigned when the function is **actually called**.

- **Method** this = <Object that is calling the method>
- **Simple function call** on strict mode, this = undefined, else, global object.
- **Arrow Function** this = this of surrounding function (lexical this)
- **Event Listener** this = <DOM element that the handler is attached to>

this does **NOT** point to the function itself, and also **NOT** the its variable environment

### Primitives x Objects

**Primitives** are located on the variable enviroment, inside the call stack. When you create a variable, it points to the address in which the actual data is stored, not the data itself. **Objects** are located on the heap. So, the variable points to a reference of the address the actual object are stored on heap. This means that if you if you assign a variable that stores a primitive value into another variable, both variables will point to the same data. if you change the value of one of these variables, the changed variable will get the new value and the other will still have the first one.
when you do the same thing with an object, you change the value on the heap. Considering both variables will be pointing to the same reference address, the object will be changed to both variables.
