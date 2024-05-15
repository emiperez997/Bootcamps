# Módulo 9 - Manejo de errores, validación de datos y unit testing

## Manejo de Errores

Es el proceso de capturar y responder a situaciones excepcionales o errores que ocurren durante la ejecución de un program, con el objetivo de evitar fallos del software y proporiconar una solución o salida de controlada

**¿Por qué manejar errores?**

_Estabilidad:_ Ayuda a prevenir fallos de la aplicación en situaciones inesperadas, asegurando que el software funcione de manera estale y predecible al proporcionar retroalimentación clara y acciones de recuperación en caso de erroers, en lugar de un fallo total

_Seguridad:_ Los errores no controlados pueden exponer vulnerabilidades de seguridad, como información sensible o puntos de entrada para ataques.

_Depuración y mantenimiento:_ Facilita la identificación y corrección de problemas en el código, mejorando la calidad y mantenibilidad del software.

_Integridad de Datos:_ En operaciones críticas (como transacciones financieras), el correcto manejo de errores es vital para asegurar la integridad de los datos y prevenir pérdidas o corrucpción de los mismos

**Conceptos clave**

- Errores síncronos y asíncronos
- .catch() vs bloques try-catch
- Clases de error personalizadas: Nos ayuda a ser más claros con los errores que se producen
- Middleware de errores en ExpressJS
- Filtro de excepciones en NestJS

**Errores síncronos**
Ocurren en operaciones que se ejecutan de manera secuencial, en el hilo principal de ejecución. Estos errores se producen inmediatamente durante la ejecución de una instrucción.

```javascript
// Forma correcta de arrojar un error
throw new Error("Error de prueba"); // Lanza un error del tipo (clase) Error

// No tiene stack trace
throw "Error de prueba"; // Lanza un error del tipo String
```

- Es importante que si tenemos una función que pueda fallar encerrar esa función en un bloque try-catch para poder controlar el error y manejarlo de forma correcta.

```javascript
try {
  // Código...
  functionThatMayFail(); // Si esta función falla, se lanza un error y corta la ejecución para ir directamente al catch
  // Código...
} catch (error) {
  // Capturamos el error y lo resolvemos
  console.log(error);
  // Código...
}
```

**Errores asíncronos**
Ocurren en operaciones que se ejecutan fuera del flujo principal, como callbacks, promesas o eventos.

```javascript
async function main() {
  // Código...

  // Try Catch no maneja errores fuera del contexto inmediato de ejecución
  try {
    await promiseThatMayFail(); // Utiliza reject para enviar el error en lugar de throw new Erorr
  } catch (error) {
    console.log(error);
  }

  // De esta forma pueden manejarse las promesas
  // .then() -> Resuelve las promesas
  // .catch() -> Recibe los errores
  promiseThatMayFail()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });

  // Código...
}

main();
```

_Errores síncronos_: El flujo es predecible y lineal, lo que simplifica el manejo de errores
_Errores asíncronos_: El flujo de control puede ser no lineal y los errores pueden surgir después de que el contexto original haya finalizado su ejecución

**Arrojar errores**
Podemos arrojar errores manualmente en nuestra aplicación cuando el criterio de ejecución no se cumple. Para esto utilizaremos la clase Error y por medio de la palabra clave throw.

También podemos crear clases de error que hereden de la clase `Error` nativa de JS para extender su funcionalidad

```javascript
throw new Error("Error de prueba");

class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }

  // Metodos
}
```
