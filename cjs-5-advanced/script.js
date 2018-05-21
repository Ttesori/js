// Function constructor

// var Person = function(name, yearOfBirth, job) {
//   this.name = name;
//   this.yearOfBirth = yearOfBirth;
//   this.job = job;
// };

// Person.prototype.calculateAge = function() {
//   console.log(2016 - this.yearOfBirth);
// };

// var john = new Person("John", 1990, "teacher");
// var jane = new Person("Jane", 1982, "designer");
// var tom = new Person("Tom", 1967, "retired");

// john.calculateAge();
// jane.calculateAge();
// tom.calculateAge();

// Object.create method
var personProto = {
  calculateAge: function() {
    console.log(2018 - this.yearOfBirth);
  }
};

var john = Object.create(personProto);
