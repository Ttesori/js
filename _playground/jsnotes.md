#var, let, const

- use const unless you plan on value changing, then use let
- can mutate arrays or objects assigned using const, just cannot reassign them

---

#Primitive vs Reference Types

- Primitive: stored directly, string, number, boolean, null, undefined, symbols
- Reference: stored in memory, arrays, object literals, functions, dates

JS is dynamically typed; data types are associated with values not variables, so variables can hold multiple data types (unlike Java which is statically typed)

## Convert to string

- `String(thingToConvert)`
- `thingToConvert.toString()`

## Convert to number

- `Number(thingToConvert)`
- `parseInt(thingToConvert)`
- `parseFloat(thingToConvert)`
- For true/false returns 1/0
- If cannot be parsed, returns NaN

## Type coersion

```
const val1 = 5;
const val2 = 'hi';
const sum = val1 + val2
// => 5hi
```

# Using templte strings

## Without template strings

`html = '<li>' + variable + '</li>';`

## With template strings

html = `<li>Name: ${name}</li>`;

# Functions

With ES6, can set parameter defaults like:
`function greet(firstname = 'John')`

## Function Expressions

`const square = function(x = 3) { ...`

##Immediately Invokable Function Expressions (IFFEs)

```
(function() {
  console.log('IIFE Ran...');
}());
```

## Property Methods

const todo = {
add: function() {
console.log('Add todo');
},
edit: function(id) {
console.log(`Edit todo ${id}`);
}
}
todo.add();

# Loops

const user = {
firstName = 'John',
lastName = 'Doe'
};
const cars = ['Honda','Chevy'];

## ForEach Loop

cars.forEach(function(car, index)) {
console.log(`${index} : ${car}`);
}

## For...In Loop

for (let x in user) {
console.log(`${x} : ${user[x]}`);
}

# Scope

a `var` set globally can be overridden in a block; `let` and `const` cannot -- which is why they're better

# Event Bubbling

Events bubble up through the DOM, when an event is fired on an element, it also fires for the parent and grandparent, etc.

# Event delegation

Set event listener on parent element, then use event.target to get element event fired on

# LocalStorage
