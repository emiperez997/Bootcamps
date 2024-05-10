# Modulo 6 - Estructura de Código en NestJS

## Decisiones de arquitectura y patrones de diseño en Nestjs

Los creadores de Nestjs tomaron ciertas decisiones a la hora de crear este framework y muchas veces las usamos sin pensar que hay detrás

- POO (paradigma)
- SOLID (Principios de diseño)

- Express (framework no opinionado)
- MVC (Patrón de diseño)

**Nestjs**

- Arquitectura modular
- Decoradores
- Inyección de dependencias

**Decisiones de arquitectura**: Son prácticas que se tienen en cuenta a la hora de implementar decisiones
**Patrones de diseño**: Los patrones de diseño son soluciones reutilizables a problemas comunes que se encuentran en el diseño de software. Estas soluciones son más como `plantillas` que se pueden adoptar a una variedad de situaciones.

> No son soluciones concretas y específicas para un solo problema

**En el centro de NestJS:**

- Decoradores
- Inyección de dependencias
- Arquitectura modular

¿De dónde salen estas decisiones?

- Programación orientada a objetos
  - Encapsulamiento
  - Abstracción
  - Herencia
  - Polimorfismo

### POO

**Encapsulamiento**

Es la práctica de "ocultar" detalles internos del funcionaiento de una clase mediante el uso de modificadores de acceso (como privado, protegido o público). Encapsular los datos de un objeto asegura que estos no puedan ser modificados de manera inesperada o incorrecta.

```typescript
// Ejemplo nest
@Injectable()
export class UserService {
  private users = [];

  findAll() {
    return this.users;
  }

  // Otros métodos relacionados con los usuarios
}
```

- "Todo debería ser privado hasta que _necesitemos_ que sea público"
- `readonly`: Aunque sea accesible, no se puede modificar

**Abstracción**

La abstracción implica trabajar con ideas más que con eventos o cosas concretas, enfocándose en lo esencial de algo más que en los detalles específicos. En POO, esto se logra definiendo clases que representan conceptos abstractos y que pueden contener propiedades y métodos relacionados

```typescript
// user.repository.ts
export asbtract class UserRepository {
  abstract findAllUsers(): Promise<User[]>;
  abstract findUserBydId(id: string): Promise<User | null>;
  abstract createUser(user: CreateUserDto): Promise<User>;
  abstract updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  abstract delteUser(id: string): Promise<void>;
  // Definición de otros métodos abstractos según sea necesario
}
```

_Diferencia con interface_

- `Interface`: Simplemente una plantilla
- `Clase abstracta`: Contiene métodos concretos (más allá de las propiedades)

**Herencia**

La herencia es un principio fundamental de la programación orientada a objetos (POO) que permite que una clase (denominada subclase o clase derivada) herede propiedades y comportamientos (métodos) de otra clase (denominada superclase o clase base). La idea es promover la reutilización de código y establecer una relación jerárquica entre clases

```typescript
class AdminUser extends User {
  constructor(
    id: number,
    email: string,
    password: string,
    public readonly privileges: string[]
  ) {
    uper(id, email, password);
  }

  // Método especifico de Admin para agregar privilegios
  addPrivileges(privilege: string): void {
    this.privileges.push(privilege);
  }
}
```

> [!TIP]
> En TypeScript no existe herencia múltiple

**Polimorfismo**

Permite que clases derivadas sean tratadas como instancias de una superclase desde la perspectiva de métodos y propiedades compartidos, lo que significa que pueden tener diferentes implementaciones de métodos, manteniendo la misma interfaz

```typescript
class CatService implements AnimalService {
  makeSound() {
    return "Mew";
  }
}

class DogService implements AnimalService {
  makeSound() {
    return "Woof";
  }
}
```

### SOLID

Es un acrónimo que representa cinco principios de la POO y del diseño de software que, cuando se aplican juntos, pretenden hacer que el software sea más complensible, flexible y mantenible.

_S_

Principio de Responabilidad Única (Single Responsability Principle, SRP)

Sostiene que una clase debe tener solo una razón para cambiar. En otras palabras, debería tener sólo una tarea o responsabilidad. Violaciones de este principio pueden llevar a clases "monstruo" que son difíciles de entender y mantener

_O_

Principio Abierto/Cerrado (Open/Closed Principle, OCP)

Las entidades de software (clases, módulos, funciones, etc) deberían estar abiertas para extensión pero cerradas para modificación. Esto significa que deberíasp oder añadir nuevas funcionalidades sin cambiar el código existente.

NestJS fomenta esto a través de la _inyección de dependencias_ y el uso de módulos. Puede extender la funcionalidad de los componentes existentes mediante herencia o componiendo comportamientos con módulos sin modificar los componentes existentes

_L_

Principio de sustitución de Liskov (Liskov Substitution Principle, LSP)

Establece que los objetos de una superclase deben poder ser reemplazados con objetos de una sublcase de T, un objeto de tipo T debería poder ser reemplazado por un objeto de tipo S sin alterar las propiedades deseables del programa.

En NestJS, si un servicio extiende a otro, el servicio hijo debe poder ser utilizado en cualquier donde se espere el servicio padre, asegurándose de que todas las expectativas de las clase base sean cumplidas.

_I_

Principio de Segregación de interfaz (Interface Segregation Principle, ISP)

Sugiere que una clase no debería estar forzada a implementar interfaces que _no utiliza_. Por eso en lugar de una clase que tiene muchos métodos, es mejor tener múltiples interfaces pequeñas y específicas

_D_

Principio de Inversión de Dependencias (Dependency Inversion Principle, DIP)

Este principio establece que las clases de alto nivel no deben depender de las clases de bajo nivel. Ambas debenn depender de abstracciones. Además, las abstracciones no deben depender de los detalles; los detalles deben depender de las abstracciones.

Una implementación común de la inversión de dependencias es la inyección de dependencias que NestJS usa como pilar de su arquitectura

## Decisiones de Arquitectura en Nestjs

**Orientación a Decoradores**

NestJS hace un uso extenso de los decoradores para agregar metadatos a las clases, métodos y propiedades. Esto hace que el código sea más limpio y fácil de razonar

**Arquitectura Modular**

Se trata de un enfoque que promueve la separación de las distintas partes de una aplicación den módulos independientes pero altamente cohesivos. Cada módulo encapsula una funcionalidad específica y se compone de varios elementos como controladores, proveedores, servicios, etc

**Inyección de Dependencias**

Es un patrón de diseño utilizado en programación para lograr la inversión de control (IoC) entre clases y sus dependencias. En lugar de que una clase cree una instancia de su dependencia o la obtenga mediante una búsqueda global, la dependencia es provista (inyectada) a la clase (generalmente a través del constructor o, en algunas casos, mediante métodos setter o propiedades).

## Componentes clave de la arquitectura de NestJS:

**Módulos**

Son clases decoradas con `@Module()`. Un módulo es un contenedor que agrupa un conjunto relacionado de capacidades.

**Controladores**

Son responsables de manejar peticiones HTTP entrantes y devolver respuestas al cliente. Se definen como clases decoradas con `@Controller()`.

**Proveedores**

Son clases que NestJS puede instanciar e inyectar en otras clases. Los proveedores más comunes son los servicios, que son clases decoradas con `@Injectable()`. Pueden contener lógicas de negocio y funcions que se pueden reutilizar en varios lugares.

## ¿Qué es un patrón de diseño?

Son soluciones reutilizables a problemas comunes que se encuentran en el diseño de software. Estas soluciones son más como plantillas que se pueden adaptar a una variedad de situaciones.

**No son soluciones concretas y especíicas para un solo problema**

_Singleton_

Granatiza que una clase tenga solo una instancia y proporciona un punto de acceso global a esa instancia. El objeto principal del patrón singleton es asegurarse de que una clase siempre tenga exactamente una única instancia, no importa cuántas veces se solicite su creación, y proporcionar un mecanismo para acceder fácilmente a esta instancia desde cualquier punto del código

**En NestJS, todos los servicios (providers) son singleton por defecto**

_Factory_

Es un patrón de diseño creacional que proporciona una interfaz para crear objetos en una superclase, pero permite a las subclases alterar el tipo de objetos que se crearán. En lugar de llamar directamente al constructor de un objeto, un método de fábrica se utiliza para crear el objeto. Esto nos permite entre otras cosas crear objetos en el momento de la ejecución que dependan de las condiciones en las que estamos trabajando

**En NestJS tenemos la implementación useFactory**

- [Documentacion](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory)

_Strategy_

Implica definir una familia de algoritmos, encapsular cada uno de ellos y hacerlos intercambiables.

En NestJS, este patrón de diseño se utiliza comúnmente en la implementación de autenticación. NestJS tiene un módulo llamado _Passport_ que integra la biblioteca de autenticación de PassPort.js, la cual está basada en estrategias de autenticación

- [Documentación](https://www.passportjs.org/concepts/authentication/strategies/)

_Observer_

Este patrón permite a un objeto notificar automáticamente a otros objetos (los "observadores") sobre los cambios en su estado. Es especialmente útil cuando se quiere que múltiples partes de una aplicación reaccionen a un evento o cambio en otra parte sin acoplar fuertemente esas partes entre sí.

En NestJS, el HttpService, que internamente utiliza Axios para hacer solicitudes HTTP, está diseñado para trabajar con observables de `RxJS`. Una solicitud utilizando HttpService, por defecto, devuelve un Observable que emite el resultado de la solicitud HTTP

- [Documentación](https://rxjs.dev/guide/overview)

## La herencia de Express y el patrón MVC

MVC es el acrrónimo de `Model-View-Controller`, que se traduce como `Modelo-Vista-Controlador`. Es un patrón de diseño de software que se utiliza principalmente en el desarrollo de aplicaciones web.

**Model**: Representa la lógica de negocio y los datos. Es responsable de recuperar, almacenar y procesar la información. Normalmente, el modelo interactúa con la base de datos.

**View**: Representa la interfaz de usuario de la aplicación. Muestra los datos del modelo al usuario y envía comandos al controlador para actuar sobre los datos.

**Controller**: Actúa como un intermediario entre el modelo y la vista. Recibe las entradas del usuario a travéz de la vista y las procesa y devuelve la representación adecuada para mostrar en la vista.

## Conclusioens

La estructura de las aplicaciones en NestJS a veces peude parecer un poro rígida, sobre todo si venimos de escribir JavaScript puro o utilizar frameworks no opinionado como express pero detrás de esta complejidad se encuentran implementaciones de buenos principios y prácticas que hacen que nuestro código sea más simple de mantener.

En Express podemos lograr lo mismo pero muchas implementaciones tendrán que hacerse a mano o utilizando librerías externas.

## Tarea:

Elegir un patrón o principio de los expuestos en clase de hoy y escribir un tutorial técnico sobre cómo está implementado específicamente en NestJS.

El formato es libre, pero tiene que incluir ejemplos de código
