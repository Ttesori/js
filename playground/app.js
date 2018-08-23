// ES6 Classes

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  greeting() {
    return `Hello there ${this.firstName} ${this.lastName}.`;
  }
}

const mary = new Person('Mary', 'Williams');
console.log(mary);
console.log(mary.greeting());
