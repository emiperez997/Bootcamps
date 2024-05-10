# Módulo 4 - Fundamentos de Nest.js

## Problemas básicos

**Node.js**: Not opinionated. La estructura de carpetas, archivos y funcionalidad, puede variar dependiendo el desarrollador o la organización encargada del proyecto.

- Estructura de directorios
- TypeScript o JavaScript
- Rutas, endpoints, GraphQL, REST, WebSockets
- Tareas mecánicas repetitivas por módulo y funcionalidad (Crear rutas, dtos, validaciones)
- Generar builds de producción transpilar TS >= JS

**Nest JS**

- _¿Qué es?_: Es un Framework
- _¿Qué hace?_: Ayuda con la creación de node-apps
- _¿Por qué?_: Velocidad y estanddarización
- _¿Quién lo usa?_: Gitlab, IBM, BMW, Jet Brains

**Ventajas**

- Es opinionated: Tiene una forma más estructurada/estricta de trabajar
- CLI - Command Line Interface: Nos ayuda a generar recursos más rápido
- Tareas automáticas
- Inyección de dependencias
- TypeScript
- Manejo de errores y excepciones
- Middlewares
- Mucho más

**Plugins**

- Fastify
- Express (default)
- Otros

## Inicialización de un proyecto

```bash
# Ininicializar proyecto
npm init -y

# Instalar typescript
npm i -D typescript @types/node ts-node-dev rimraf
```

**Node con TypeScript**

1. Instalar Typescript y demás dependencias

```bash
npm i -D typescript @types/node ts-node-dev rimraf
```

2. Inicializar el archivo de configuración de TypeScript (Se puede configurar al gusto)

```bash
npx tsc --init --outDir dist/ --rootDir src
```

3. Creando scripts para dev, build y start

```json
{
  // Ejecutar el proyecto
  "dev": "tsnd --respawn --clear src/app.ts",
  // Elimina la carpeta y compila el proyecto
  "build": "rimraf ./dist && tsc",
  // Ejecuta el código compliado
  "start": "npm run build && node dist/app.js"
}
```

- `typescript`
- `@types/node`: Tipos de node para TypeScript
- `ts-node-dev`: "Nodemon" para TypeScript
- `rimraf`: Paquete para eliminar un directorio

- `npx tsc`: Crear el archivo de configuración de TypeScript

## Proyecto

- `app.ts`: Punto de entrada del proyecto
- `presentation`: Crecano a la Lógica de negocio
  - `server.ts`:
  - `routes.ts`

**Paquetes extra**

- `express`: Crea servidores
- `@types/express`: Paquete con tipos estrictos para paquetes hechos en JavaScript

```bash
npm i express @types/express
```

Diferencias entre interface y type:

- type es para crear un tipo "primitivo"
- interface cuando queremos hacer herencia o expandir objetos

**Inyección de dependencias**: Hace referencia a dependencias (clases) que nuestra clase necesita para funcionar (servicios, controllers, etc)

## Trabajando con Nest

- Instalamos el cli

```bash
npm i -g @nestjs/cli
```

- Creación del proyecto

```bash
nest new <nombre_proyecto>
```

### Estructura del proyecto

- `eslintrc.js`: Nos ayuda a trabajar de una manera estandarizada con reglas de código
- `.prettierrc`: Configuración de formato
- `nest-cli.json`: Configuración interna de nest
- `package.json`: Genera los scripts necesarios para el proyecto en conjunto con las dependencias

- `src`
  - `app.controller.spec.ts`: Archivo de test
  - `app.controller.ts`: Controlador
  - `app.module.ts`: El módulo es un agrupador. Agrupa los servicios, controlladores, inyecciones, etc
  - `app.service.ts`: "Singleton" (Es la misma instancia)

### Generando recursos

```bash
# res: resource
nest generate res <nombre_recurso>
```

- Se agrega al imports del `app.module.ts`

```javascript
@Module({
  imports: [ProductModule],
  controllers: [],
  providers: [],
})
```

## Preguntas en clase

- `Microservicio`: Servicios de API Rest

## Decoradores

- `@`: Indica que es un decorador
- `@Decorator`: Modifica a una clase

Los decoradores en TypeScript son funciones.

Para que los decoradores funcionen hay que habilitar el `experimentalDecorators` en el archivo `tsconfig.json`
