// Prototipo
function Persona(nombre) {
  this.nombre = nombre;
}

// Método
Persona.prototype.saludar = function () {
  console.log(`Hola, soy ${this.nombre}`);
};

const juan = new Persona("Juan");
juan.saludar(); // Hola, soy Juan

console.log(juan);
console.log(juan.__proto__);

// Herencia
function Empleado(nombre, puesto) {
  Persona.call(this, nombre);
  this.puesto = puesto;
}

// Empleado hereda de Persona
// Object.create crea un nuevo objeto cuyo prototipo es el objeto que se pasa como argumento
Empleado.prototype = Object.create(Persona.prototype);
Empleado.prototype.constructor = Empleado;
