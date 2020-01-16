const people = [
  {
    name: 'Barb',
    age: 29
  },
  {
    name: 'Toni',
    age: 34
  },
  {
    name: 'Shannon',
    age: 35
  }
];

const find35 = people.find((person) => person.age === 35);
console.log(find35.name);
