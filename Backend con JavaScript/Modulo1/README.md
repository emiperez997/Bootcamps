# Módulo 1 - Repaso de JavaScript

## Instrutora

- Belén Rey
- belenrey@gmail.com

## Clase 1: Introducción al Bootcamp

### ¿Qué es JavaScript?

Javascript es un lenguaje de programación de alto nivel, interpretado y de tipado dinámico. Es conocido principalmente por su capacidad de agregar interactividad y funcionalidades dinámicas a las páginas web.

```javascript
function addNumbers(a, b) {
  return a + b;
}

const num = addNumbers(2, 3);
console.log(num); // 5
```

### ¿Qué es TypeScript?

TypeScript es una extensión de JavaScript que introduce tipado estático. Ofrece características avanzadas de POO, y al ser transpilado puede ejecutarse en cualquier entorno que soporte JavaScript.

```typescript
// a → número
function addNumbers(a: number, b: number): number {
  return a + b;
}

const num = addNumbers(2, 3);
console.log(num); // 5
```

Se fija el tipo de dato que se espera recibir y el tipo de dato que se espera devolver. Cuando creamos variables el tipo de dato es inferido automáticamente, es decir que no es necesario declarar el tipo de dato, sino que TypeScript lo infiere (por ejemplo, en el caso de la variable `num`).

> [!TIP]
> Nota: Ver el curso de TypeScript de Código Facilito para más profundizar.

### ¿Qué es el Backend?

El backend es la parte de un sistema o aplicación que opera detrás de escena, gestionando la lógica de negocio, el acceso a la base de datos, la autenticación, y otras operaciones cruciales que el usuario no ve directamente.

- No hace uso del DOM

### JavaScript en el Backend

- Repaso de JavaScript
  - Prototipos
  - Clases
  - Intro a TypeScript
- Node.js
  - Internals
  - Servidores en Node
  - Sistema de archivos
- Nest.js
  - Fundamentos
  - Cache
  - Patrones de diseño
- Construcción de APIs
  - Protocolos
  - Despliegue
  - Testing
  - Documentación
- Bases de datos
  - SQL
  - NoSQL
  - ORM

**Frameworks Backend**

- Express
  - Es "no opinionado"
  - Es un framework minimalista
  - Es el más popular
  - Es fácil de aprender
- Nest
  - Es "opinionado"
  - Tiene sus propios patrones de diseño
  - Es modular (cada módulo es una capa)

### ¿Qué es NodeJS

Es un entorno de ejecución para JavaScript en el servidor. Permite a los desarrolladores utilizar JavaScript, que tradicionalmente se ha utilizado en el navegador, en el lado del servidor para construir aplicaciones de backend

**JavaScript**

Archivo .js → Node JS (Compila y ejecuta) → Código máquina → Procesador

**TypeScript**

Archivo .ts (Transpila a) → Archivo .js → Node JS (Compila y ejecuta) → Código máquina → Procesador

**¿Existen otro runtimes?**

Si, existen otros runtimes como Deno, que es un runtime de JavaScript y TypeScript basado en el motor V8 de Google Chrome y Rust.

**¿Por qué enseñamos Node?**

Porque es el más robusto y utilizado en el ecosistema en este momento

### Desafíos

Se van a aprender muchas cosas distintas en muy poco tiempo, pero no hay que preocuparse, ya que se va a ir paso a paso. Es importante no saltarse ningún paso, ya que cada uno es fundamental para el siguiente.

### Recomendaciones

- Ver todas las clases
- Tomar apuntes
- Revisar las lecturas sugeridas
- Aprovechar los demás cursos de Código Facilito
- Realizar los prácticas
- EXPLORAR pro su cuenta

### Tarea

- Amigarse con la terminal
- Verificar si tienen instalado NodeJS
- Instalar node en caso de que no lo tengan
- Si no tienen un editor de confianza descargar Visual Studio Code
- Ejecutar nuestro primer programa en Node (hello-world.js)

## Clase 2: Repaso de JavaScript

### JavaScript

Es un lenguaje de programación de alto nivel, interpretado y orientado objetos. Es muy utilizado para agregar interactividad y dinamismo a las páginas web, permitiendo a los desarrolladores crear experiencias ricas y agradables para los usuarios

### ECMAScript

Es el estándar en el que se basa JavaScript, además de otros leguajes como JScript y ActionScript. Este estándar es mantenido por Ecma International - ECMA-262 es la especificación técnica oficial. La especificación ECMAScript define las características del lenguaje, incluyendo su sintaxis, tipos, objetos y métodos.

**Ejecutar un archivo de JavaScript:**

```bash
node archivo.js
```

> [!TIP]
> ECMAScript va evolucionando con el tiempo, por lo que es importante estar al tanto de las nuevas características que se van añadiendo.

### El punto y coma final

En JavaScript, el uso de punto y coma (;) al final de las instrucciones es opcional gracias a una característica llamada "Automatic Semicolon Insertion" (ASI). Sin embargo, hay situaciones en las que omitir el punto y coma puede llevar comportamientos inesperados.

### Tipado dinámico

Es un lenguaje de tipado dinámico, lo que significa que las variables pueden cambiar de tipo en tiempo de ejecución. No es necesario especificar el tipo de datos de una variable al declararla, y una variable puede, por ejemplo, contener un string y luego cambiar a un número o un objeto.

```javascript
let variable = "Hola"; // string
console.log(typeof variable);

variable = 10; // number
console.log(typeof variable); // number

variable = true; // boolean
console.log(typeof variable); // boolean

variable = { nombre: "Juan" }; // object
console.log(typeof variable); // object
```

### Tipos de datos

**Primitivos**: Son los tipos de datos más básicos. A diferencia de los objetos, los primitivos son inmutables y pasados por valor.

- `string`: Cadenas de texto
- `number`: Enteros y decimales
- `boolean`: `true` o `false`
- `null`: Representa un valor nulo o "vacío"
- `undefined`: Representa un valor no definido
- `bigint`: Números enteros grandes (a partir de 2^53 - 1)

**Estructura de datos**

- `array`: Colección de elementos. Pueden contener elementos de diferentes tipos de datos
- `object`: Colección de pares clave-valor. Las claves son strings y los valores pueden ser cualquier tipo de dato
- `maps`: Colección de pares clave-valor. Mantienen el orden de inserción
- `buffers (en Node.js)`: Estructura de datos para trabajar con datos binarios fuera del heap de v8. Útil para trabajar con archivos y redes en Node.js

**Estructuras de control**

- `if`: Se ejecuta si una condición es verdadera
- `else`: Se ejecuta si la condición de un `if` es falsa
- `else if`: Se ejecuta si la condición de un `if` es falsa y la condición de un `else if` es verdadera
- `switch`: Evalúa una expresión y ejecuta el bloque de código correspondiente al caso que coincida con el valor de la expresión
- `for`: Se utiliza para iterar una o más instrucciones hasta que la condición especificada se evalúe como falsa
- `while`: Se utiliza para ejecutar un bloque de código mientras la condición especificada sea verdadera
- `do while`: Se utiliza para ejecutar un bloque de código una vez, y luego se repite el bucle mientras la condición especificada sea verdadera
- `try-catch-finally`: Se utiliza para manejar errores en bloques de código

**Métodos de Array**

`Map`: Devuelve un nuevo array con el resultado de llamar a la función indicada en cada uno de sus elementos

```javascript
const numbers = [1, 2, 3, 4, 5];

const double = numbers.map((number) => number * 2);
console.log(double); // [2, 4, 6, 8, 10]
```

`ForEach`: Ejecuta una función por cada elemento del array

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((number) => console.log(number));
```

**Prototipos**

Es una plantilla de la cual se heredan propiedades y métodos para otros objetos. Los prototipos se utilizan para compartir propiedades y métodos comunes entre varios objetos y simplificar la reutilización de código.

```javascript
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
```

**Herencia de Prototipos**

Para implementar herencia entre funciones constructoras, establecemos la propiedad prototype de una función constuctora para que apunte a un objeto que tenga como prototipo el prototype de otra función constructora.

```javascript
// Prototipo
function Persona(nombre) {
  this.nombre = nombre;
}

// Método
Persona.prototype.saludar = function () {
  console.log(`Hola, soy ${this.nombre}`);
};

// Prototipo
function Estudiante(nombre, curso) {
  Persona.call(this, nombre);
  this.curso = curso;
}

// Herencia
Estudiante.prototype = Object.create(Persona.prototype);

// Método
Estudiante.prototype.estudiar = function () {
  console.log(`Estudiando ${this.curso}`);
};

const juan = new Estudiante("Juan", "JavaScript");
juan.saludar(); // Hola, soy Juan
juan.estudiar(); // Estudiando JavaScript
```
