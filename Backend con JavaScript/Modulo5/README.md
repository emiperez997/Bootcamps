# Módulo 5 - RESTful APIs

## Clase 1

### ¿Qué es una API REST?

- Es una forma para compartir información de forma segura por internet

Cliente -> Request: URL (Petición) -> Servidor -> Response: JSON (Respuesta) -> Cliente

- `Request`: Le pega (`hit`) a un servidor por medio de una url (`endpoint`)
- `JSON`: JavaScript Objec Notation. Es un formato estándar para intercambiar información.

**API de Prueba**: [PokeAPI](https://pokeapi.co/api/v2/pokemon/ditto)

### ¿Qué podemos hacer con una API REST?

- Leer (Read): GET
- Crear (Create): PSOT
- Modificar (Update): PUT
- Borrar (Delete): DELETE

**Nest.js**: Nos brinda un Framework completo con las herramientas para poder escalar una aplicación backend, trabaja de una forma más estructurada.

Cliente -> Controller -> Service

- Cliente: Navegador web, app web
- Controller: Punto de entrada. Consulta cada servicio para obtener la información necesaria
- Service: Proveedor de información

### Ejemplo práctico

- src

  - `app.*`: Hablan de una misma cosa

- `@Controller`: Decorador para declarar que esa clase es un Controller
- `@Get`: Decorador parar declarar que esa función sirve para una petición GET

```json
// Error de página no encontrada
{
  "message": "Cannot GET /test",
  "error": "Not Found",
  "statusCode": 404
}
```

- Se pueden utilizar interfaces para _"tipar"_ la respuesta de las peticiones

### Query params

`@Query()`

- Son parametros que se pasan por medio de la url. Se utilizan para aplicar filtros a las consultas
- Nos sirve para obtener los query params. Dentro del parentesis podemos especificar que parametro queremos obtener
- Si no especifico nada dentro de `@Query()` recibo un objeto en vez del valor específico

#### Ejemplo práctico

- key=value
- anotherkey=value

> localhost:3000/example?key=1&anotherkey=2

`localhost:3000/api/items`

- 0 - 49

`localhost:3000/api/items?page=2`

- 50 - 99

### URL Params

`@Param`

- Nos sirve para obtener sólo un elemento en base a un criterio único
- `@Get('/example/:name)`: La notación de `:name` hace referencia a un valor _dinámico_
- Al igual que `@Query()` si le paso un argumento a `@Param`, devuelve el valor, sino devuelve un bojeto

#### Ejemplo práctico

`localhost:3000/api/items/:id`
`localhost:3000/api/items/1`

- `http://localhost:3000/api/users/emi`

Respuesta:

```json
{
  "name": "emi"
}
```

Código:

```javascript
  @Get('/api/users/:name')
  getUser(@Param() allParams: any): any {
    return allParams;
  }
```

### Recomendación de proyecto final

- Copiar proyectos reales (lo más completo que pueda)
  - Plataforma de DaVinci
  - Plataforma de Coding Giants
  - Plataforma de Coderhouse

### Práctica

Crear una aplicación que tenga tres rutas:

- `GET` /api/users
- `GET` /api/users/qty
- `GET` /api/users/:id

En donde el endpoint de usuarios tiene que devolver un array con 5 objetos que tengan 4 propiedades: **ID, name, surname y age**

El endpoint **/api/users/qty** tiene que devolver un number con la cantidad de usuarios que tiene el array (de manera dinámica)

El endpoint **/api/users/:id** tiene que devolver un objeto con la información del usuario cuyo ID sea igual al parametro **:id**

### Solución

```javascript
// user.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): object[] {
    return this.userService.getUsers();
  }

  @Get('/qty')
  getQuantity(): object {
    return this.userService.getQuantity();
  }

  @Get('/:id')
  getUser(@Param('id') id: string): object {
    return this.userService.getUser(Number(id));
  }
}

// user.service.ts
import { Injectable } from '@nestjs/common';

const users = [
  {
    id: 1,
    name: 'John',
    surname: 'Doe',
    age: 25,
  },
  {
    id: 2,
    name: 'Jane',
    surname: 'Doe',
    age: 30,
  },
  {
    id: 3,
    name: 'Bob',
    surname: 'Smith',
    age: 35,
  },
  {
    id: 4,
    name: 'Alice',
    surname: 'Johnson',
    age: 40,
  },
  {
    id: 5,
    name: 'Tom',
    surname: 'Brown',
    age: 45,
  },
];

@Injectable()
export class UserService {
  getUsers(): object[] {
    return users;
  }

  getQuantity(): object {
    return {
      quantity: users.length,
    };
  }

  getUser(id: number): object {
    return users.find((user) => user.id === id);
  }
}
```

## Clase 2

### Creando nueva data

```typescript
@Post('/users')
addUser(@Body() userData: any): any {
 this.users.push(userData);
 return this.users
}
```

- `@Body()`: Cuerpo de la petición
- El método `post` nos ayuda a enviar datos de manera segura (a diferencia de `get`)
- `@Post()`: Se puede utilizar el mismo endpoint que en `@Get` ya que es un método HTTP diferente
- Por defecto el navegador aplica peticiones `get` por defecto

### Postman

- Para enviar datos con `post` es necesario utilizar la pesttaña de `Body`, el formato `raw` (crudo) y en formato `json`

**Ejemplo de json:**

```json
{
  "id": 1,
  "name": "Emiliano",
  "surname": "Perez",
  "age": 27
}
```

**Puntos importantes en Postman**

- `Status code`: Cuando creamos un dato (utilizamos post) debe devolver un estado _201 Created_
- `Response Time`: Es necesario tener en cuenta el tiempo de respuesta. Si el tiempo de respuesta es muy prolongado, afecta la experiencia de usuario. Esto se debe a una mala performance
  - `Prepare`
  - `Socket initialization`
  - `DNS Lookup`
  - `TCP Handshake`
  - `Transfer Start`
  - `Download`
  - `Process`
- `Response Size`: En el caso de la respuesta del `post` devolvió aproximadamente _232 B_

### Status code

- `2XX`: Todo está bien
- `3XX`: Redirección (No es muy común)
  - Permanente
  - Temporal
- `4XX`: Error del cliente (En el software del cliente algo hicieron mal)
- `5XX`: Error del servidor

**Ejemplos comúnes**

- `200`: Success
- `201`: Created
- `301`: Moved Permanently
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not found
- `418`: I'm a teapod
- `500`: Internal server error

**Ataques de fuerza bruta**: Envía peticiones a nuestro servidor hasta que logre entrar a nuestro sistema

- Se puede hacer un `rate limit`. Limitar las request de una IP

### Error handling

- Es importante tener en cuenta los posibles errores que el usuario puede cometer al a hora de envíar datos (falta de información, agregar campos que no existen, etc)

```typescript
@Post('/users')
addUser(@Body() userData: any): any {
 if(!userData.name) {
  throw new BadRequestException("Name os required");
 }
}
```

### Práctica

Al ejercicio anterior queremos agregarle una nueva ruta

`POST` /api/users

La cual tiene que agregar un usuarioa a nuestro array original de usuarios

**Importante**: El id no lo tenemos que enviar por body, se tiene que _calcular_ automáticamente. Sumado a eso, si el body no está correctamente estructurado, tenemos que devolver el _status code_ correspondiente

### Solución

```typescript
// user.controller.ts
@Post()
createUser(@Body() userData: any): any {
  if (!userData.name || !userData.surname || !userData.age) {
    throw new BadRequestException('Todos los campos son requeridos');
  }

  const response = this.userService.createUser(userData);

  return response;
}

// user.service.ts
createUser({
  name,
  surname,
  age,
}: {
  name: string;
  surname: string;
  age: number;
}): object {
  const lastId = this.users[this.users.length - 1].id;

  this.users.push({
    id: lastId + 1,
    name,
    surname,
    age,
  });

  return {
    id: lastId + 1,
    name,
    surname,
    age,
  };
}
```

**Recursos**:

- [Nest Error Handling](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)

### Consumiendo una API desde nuestra API

Usualmente las APIs necesitan de otras APIs para funcionar, especialemnte si nuestro proyecto tiene una estructura de microservicios, aprendamos cómo hacerlo con Nest

**Monolitico vs Microservicios**

[ ⏹️ -> ⏺️ -> 🔼 -> ⏸️ ] -> Monolítico

- Si alguna parte se rompe, se rompe todo el sistema

⏹️ - - > ⏺️ - - > 🔼 - - > ⏸️ -> Microservicio

- Cada parte del sistema funciona independientemente de los demás
- Siempre necesita algo externo (aplica a todas las APIs)

Nest utiliza un patrón de diseño llamado `serverless`

```bash
# Módulo HTTP de nest
# axios: sirve para hacer peticiones HTTP
npm i --save @nestjs/axios axios
```

**Uso**:

```typescript
// app.module.ts
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

// app.service.ts
...
  constructor(private readonly httpService: HttpService) {}
...

  getPokemonByName(name: string): any {
    return this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
```

- En la forma actual, el `firstValueFrom` debe utilizarse en el `service` y no en el `controller`

### Práctica final

Queremos crear una aplicación que tenga las siguientes rutas:

- `GET` /api/pokemon/:name
- `GET` /api/compare/:firstPokemon/:secondPokemon

En donde el primer endpoint tiene que devolver toda la información del Pokémon, y el segundo tiene que devolver el siguiente objeto en base a la comparación de dos pokemons enviados

```json
{
  "higherHp": "pokemonName",
  "higherAttack": "pokemonName",
  "higherDefense": "pokemonName"
}
```

### Solución

Se encuentra en el módulo de `pokemon` dentro del proyecto de `api-nest`
