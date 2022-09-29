**Modules**

Reusable piece of code that encapsulates implementation details

Usually a standalone fine, but doesnt need to be

import -> dependencies from other modules to use them in the module logic
export -> sends dependencies from module as public API

**Compose software** Modules are small building blocks that we put together to build complex applications;

**Isolate components** Modules can be developed in isolation without thinking about the entire codebase;

**Abstract code** Implement low-level code in modules and import these abstractions into other modules

**Organized Code** Modules naturally lead to a more organized codebase

**Reuse code** Modules allow us to easily reuse the sane across multiple projects.

**ES6 MODULES**

Modules stored in files, exactly one module per file.

_ES6_
Top-level variable - scoped to module
Default mode - strict mode
top-level this - undefined
allows imports and exports
HTML linking <script type="module">
File downloading - Asynchronous

_Script_
Top-level variable - global
Default mode - "sloppy" mode
top-level this - window object
does not allow imports and exports
HTML linking <script>
File downloading Synchronous

Modules are imported before execution, synchronously
Possible thanks to top-level ('static') imports, which make imports known before execution
This makes bundling and dead code elimination possible
