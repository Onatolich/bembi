# bembi
Lightweight and powerful class names utility without dependencies.

## Installation
```sh
$ npm install bembi
```

## Import
```
import bembi from 'bembi'; // ES6
const bembi = require('bembi'); // AMD
```

## Usage

#### Arguments

Bembi accepts any amount of arguments. Accepted arguments types are String, Array\<String> and Object.

But there is an exception: first argument can be only String or Array\<String>!
```
// good
bembi('', [], '', {}, ...);
bembi([''], '', [], {}, ...);
 
// exception will be thrown
bembi({}, [], '', ...);
```

#### Base usage

In base case bembi is just joining passed class names.
```
bembi('class1', 'class2', 'class3', ...);   // Result: "class1 class2 class3 ..."
bembi(['class1', 'class2', 'class3', ...]); // Result: "class1 class2 class3 ..."
```

#### Usage with BEM

In fact bembi is a powerful BEM class names utility.

Next example will show how bembi resolves different arguments to BEM modifiers: 
```
bembi(
  'Button',
  [
    'primary',
  ],
  {
    size: 'sm',
    flat: true,
    'has-icon': true,
    'has-text': true,
  },
  'base-class'
);

// Result: "Button Button--primary Button--size-sm Button--flat Button--has-icon Button--has-text base-class"
```
