# Módulo 2 - Internals de Node.js

1. La importancia de aprender sobre el funcionamiento interno
2. El estándar
3. El lenguaje
4. El motor
5. El entorno de ejecución

## Parte 1

> Como todo, las herramientas no te dan buenos resultados a menos que sepas como, cuando y por qué aplicarlas. Si sales y compras la mejor sierra del mundo, pero no sabes cómo cortar madera, no te servirá de nada.

### ECMAScript

- ECMA: European Computer Manufacturers Association (Asociación Europea de Fabricantes de Computadoras)
- TC39: Technical Committee 39. Encargado del estándar ECMA 262 == ECMAScript

> JavaScript es una implementación y extensión o superset de ECMAScript, bueno, más o menos.

Los navegadores (JavaScript o ECMAScript engines) tardan en implementar esas características. Además, **agregan características** que necesitan para su entorno específico.

**Nombres de JavaScript**:
Mocha -> LiveScript -> JavaScript

> Además de pensarse como un hermano pequeño y tontuelo de Java, JavaScript estaba pensado para _programadores no profesionales_

### JavaScript Engines

**¿Qué es un motor?**

Es un programa que ejecuta tu código de JavaScript. JavaScript nació como un lenguaje interpretado (es decir, que se ejecuta línea por línea). Es un lenguaje _Compilador Just-in-Time (JIT)_.

**Como funciona un compilador**

Código fuente -> Compilador -> Código máquina -> Salida

**Como funciona un intérprete**

Código fuente -> Intérprete -> Salida

**Motores de JavaScript**

- `v8`
- `SpiderMonkey`
- `ChakraCore`
- `Rinocerous`

**Etapas de un entorno de ejecución**

Hilo principal (ChakraCore) | Interpreter para un inicio rápido y portabilidad

Código fuente -> Parser -> AST (Abstract Syntax Tree) -> Bytecode | Profiling Interpreter | Machine Code (Balout)

V8

JavaScript Source Code -> Parser -> AST -> Interpreter Ignition -→ Compiler TurboFan -> Optimized Machine Code -> ByteCode

**AST**

Es una representación intermedia de tu código fuente. Es un árbol que representa la estructura de tu código.

### Runtime

Node.js -> v8 (APIs) or ChakraCore | Chakra Shim

**Event Loop**: Pertenece al entorno de ejecución, no al motor de JavaScript.

**Web APIs**:

- DOM (document)
- AJAX (XMLHttpRequest)
- Timeout (setTimeout)

## Parte 2

1. ¿Qué es la concurrencia?
2. Modelos de cocncurrencia
3. ¿Qué es el paralelismo?
4. Tecnologías que aprovechan la concurrencia

- Es importante estructurar tu código para aprovechar la concurrencia
- Conoce el modelo de concurrencia adecuado para tu problema
- Aprovecha las tecnologías que te facilitan la concurrencia

### ¿Qué es la concurrencia?\*\*

- **Tratar** Con varias cosas _"a la vez"_
- **Composición** de procesos _independientes_ para realizar una tarea
- Tiene que ver con el diseño

Proceso == Código en ejecución

- Desacoplar lo QUE sucede _CUÁNDO sucede_

**Ejemplos**

Tarea: **Hacer una pizza**

_Sin concurrencia_

1. Order comes in
2. Make dough (Masa)
3. Roll out dough
4. Make sauce (Salsa)
5. Spread sauce
6. Grate cheese
7. Spread cheese
8. Put in oven
9. Wait 10 minutes
10. Serve

_Con concurrencia_

1. Order comes in
   a. Make dough
   b. Grate Cheese
   c. Make Sauce
2. Roll out dough
3. Spread sauce
4. Spread cheese
5. Put in oven
6. Wait 10 minutes
7. Serve

Tarea: Jugar **8** partidas de ajedrez

\*\*Ejemplos de concurrencia

- `Time-slicing`
- `Node.js`
- `NGNX` (Funciona parecido a Node.js)

> Lo importante es dividir tu programa en procesos independientes, que no dependan uno de otro

### Modelos de concurrencia

- Memoria y cómputo
- Locks, Mutex y Semáforos
- Paso de mensajes
- Communicating Sequential Processes (CSP)
- Ejecución: Threads
- Actores

Ejecutores:

- `Futuros`: Promesas
- `Async/Await`: Es un envoltorio de los futuros (promesas). Transforma lo asíncrono, en síncrono. Simula que el código sea secuencial.
- `Mensajes`

### ¿Qué es el paralelismo?

- Hacer varias cosas a la vez
- No tiene que ver con el diseño, sino con la _ejecución_
- Ejecución _simultánea_ de procesos que pueden estar relacionados **o no**.

> Concurrencia > Paralelismo

**Concurrencia**: Es cortar (diseñar, modular) tu programa en partes independientes que se puedan ejecutar cuando quieras (no improta el orden)
**Paralelismo**: Se encarga más el hardware

> Concurrencia + Paralelismo = 💥💥💥

Exprimir la Concurrencia: Buen diseño + Tecnología que use concurrencia

### Tecnologías que aprovechan la concurrencia

- Node.js: En difentes hilos ejecuta varios procesos (Nuestro programa, Garbage Collector, JIT Compiler)
- Go: CSP (Communicating Secuential Processes), Semáforos
- Elixir: Actores. Aprovecha al máximo los recursos
- Phoenix Framework

**Ejercicio**: Explicá un proceso de la vida real que sea concurrente, e indicar que parte es la concurrente

- Escribir y escuchar música a la vez (escribir y escuchar)
- Ver una película subtitulada (leer, ver y escuchar)

Para solucionar el problema varias peticiones, se utilizan clusters.

### Internals de Node.js

- Permitirte hacer cosas que no son parte de ECMAScript o de v8
- Maneja los recursos de manera eficiente
- Permite usar concurrencia y paralelismo (aunque no es lo conveniente para escalar)

Quiero atender 10k clientes simultáneos... ¿Qué tecnicas puedo usar?

- Levanto 10000 procesos
- Levanto 10000 threads
- Corro un solo proceso y qué él los atienda uno tras otro
  - Patrón Reactor
  - Event Loop - Bucle de Eventos

> **Respuesta**: DEPENDE

- Limitado por procesamiento (cpu) [CPU bound]
  - Procesamiento de imágen y video
- Limitado por memoria (entrada y salida) [I/O bound]

  - La mayoría de Webs están limitadas por memoria

- Patrón Reactor
- Event Loop - Bucle de Eventos
- Libevent
  - Especializados en I/O

Libuv (Libevent)

1. Timers
2. Pending Callbacks
3. Idle, prepare
4. Poll (Incoming: Connections, data, etc)
5. Check
6. Close callbacks

> Libuv es el corazón de Node.js
