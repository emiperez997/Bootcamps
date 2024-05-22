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

**Exception Filters en NestJS**
Proporcionan una manera flexible de manejar errores permitiendo una respuesta personalizada y consistente en toda la aplicación.

- **Captura las excepciones:** Interceptan excepciones lanzadas en el contexto de una petición HTTP
- **Personalización:** Permiten personalizar la respuesta de error que se devuelve a la cliente
- **Flexibilidad:** Pueden aplicarse a nivel de método, controlador o globalmente

```typescript
// app.module.ts
import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // host.switchHttp() -> Obtiene el contexto de la petición HTTP
    const ctx = host.switchToHttp();
    // ctx.getResponse() -> Obtiene el contexto de la respuesta HTTP
    const response = ctx.getResponse();
    // ctx.getRequest() -> Obtiene el contexto de la petición HTTP
    const request = ctx.getRequest();
    // exception.getStatus() -> Obtiene el código de estado HTTP
    const statusCode = exception.getStatus();
    const message = exception.getResponse();

    response.status(status).json({
      statusCode,
      message,
    });

    return exception;
  }
}

// app.controller.ts
import { Controller, Get, Post, Body, HttpException } from "@nestjs/common";
import { CustomExceptionFilter } from "./custom-exception.filter";

@Controller()
export class AppController {
  constructor(private readonly customExceptionFilter: CustomExceptionFilter) {}

  @Get()
  getHello(): string {
    throw new HttpException("Error de prueba", 400);
  }

  @Post()
  createUser(@Body() userData: any): any {
    throw new HttpException("Error de prueba", 400);
  }
}
```

**Bonus: Loggin Libraries**

- [Winston](https://github.com/winstonjs/winston)
- [Bunyan](https://github.com/trentm/node-bunyan)
- [Pino](https://github.com/pinojs/pino)
- [Log4js](https://github.com/log4js-node/log4js-node)
- [Morgan](https://github.com/expressjs/morgan)
- [Express-Winston](https://github.com/winstonjs/express-winston)

**Validación**

- [yup](https://github.com/jquense/yup)
- [Joi](https://github.com/sideway/joi)
- [zod](https://github.com/colinhacks/zod)

_Validation Pipe de NestJS_

Valida automáticamente los datos entrantes de la aplicación seg´n estén definidos los DTOs a través de reglas definidas por los decoradores de class-validator.

- `@IsString()`
- `@IsNumber()`
- `@IsBoolean()`
- `@IsDate()`
- `@IsEmail()`

```typescript
// main.ts
...
  app.useGlobalPipes(new ValidationPipe());
...
```

- **Pruebas unitarias:** Nos permite validar módulos y funciones de manera independiente de la aplicación.
- **Pruebas de integración:** Prueba de integración de módulos y funciones que se integran en la aplicación.
- **Pruebas de punto a punto:** Abarca el flujo completo de la aplicación, desde la entrada de datos hasta la salida de la respuesta.

> [!NOTE]
> ¿Cobertura mínima de 80%?
