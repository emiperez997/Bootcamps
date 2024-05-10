const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Map, filter, etc
const even = arr.filter((number) => number % 2 === 0);
console.log(even);

// Optional chaining (?.)
const firstStudent = {
  name: "John",
  age: 29,
  passport: {
    number: 123456,
    country: "US",
  },
};

const secondStudent = {
  name: "Jane",
  age: 24,
};

// Si el objeto tiene la propiedad passport, imprime el número de pasaporte
// Si no, imprime undefined
console.log(firstStudent.passport?.number);
console.log(secondStudent.passport?.number);

// Nullish operator (??)

const age = 38;

// Sin nullish operator
const canDrive = age >= 18 ? true : false;

// Evalúa si algo es true o si es null o undefined
const canDrive2 = age >= 18 ?? false;

console.log(canDrive);
console.log(canDrive2);
