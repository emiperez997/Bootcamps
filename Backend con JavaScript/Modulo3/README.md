# Módulo 3 - Manos a la obra con Node.js

## Temario

- Conoceremos los módulos de Node.js y su importancia
- Crearemos un servidor con Node.js

## ¿Cuál es el rol de Node.js en el backend?

- Utilizar JavaScript como backend (fuera del navegador, para apps web o moviles)
- Sacar provecho del lenguaje
- Transición del frontend al backend más amena

## Preparando nuestro entorno de trabajo

- NVM (Recomendado) ✅
- Instalador de Node.js ✅
- FNM (Alternativa a nvm super rápido)

## Módulos

1. Core

   - HTTP
   - Crytpo
   - Path
   - FS
   - Process
   - Console

2. De terceros

   - Lodash
   - React
   - Prisma
   - @nestjs/core
   - Babel
   - TypeScript
   - Express

3. Tus propios módulos

**Recursos**:

- [nodejs.dev](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [npmjs](https://www.npmjs.com/)
- [Versionado](https://semver.org/)
- [http de node](https://nodejs.org/docs/latest/api/http.html)

## El manejador de paquetes de node y su importancia

Manejadores:

- npm (default)
- pnpm
- yarn

Node por defecto tiene su propio manejador de paquetes, aunque hay otras alternativas que toman popularidad.

## Crear un nuevo proyecto

```bash
npm init
# o
pnpm init
```

> [!TIP]
> Siempre en tu proyecto debe estar el _package.json_

```bash
package name: # Nombre del paquete de npm
version: (1.0.0) # Versión del modulo
description: # ...
entry point: (index.js) # Punto de entrada
text command: # Comandos de prueba
git repository: # ...
keywords: # Palabras clave
author: # ...
license: (ISC) # ...
```

**El archivo que lo define todo**: _package.json_

```json
// Datos excluyentes del package.json
{
  "name": "package-name",
  "version": "0.1.0"
}
```

**Y... ¿Por qué es tan importante un manejador de paquetes?**

> _Simple..._ Es quien controla todo

- Dependencias
- Scripts
- Engines (Especificamos versión de Node.js)
- Versiones

**Dependencias**

```json
// Paquetes de los que depende integramente nuestro proyecto
"dependencies": {
  "@nestjs/core": "x.y.z",
  "react": "x.y.z",
  "express": "x.y.z"
}

// Paquetes que si los quito no afectan
"devDependencies": {
  "typescript": "x.y.z",
  "postcss": "x.y.z"
}
```

Se utiliza el comando **npm install** y el flag _--save_ solo _-S_

```json
"scripts": {
  "dev": "vite",
  "build": "webpack -c config.js",
  "index": "node ./index.js",
}
```

Se utiliza el comando **npm run**, por ejemplo **npm run index**

## Crear módulos propios

Node nos permite utilizar la palabra reservada `module.exports` para poder trabajar con módulos

```javascript
const add = (a, b) => {
  return a + b;
};

const substract = (a, b) => {
  return a - b;
};

module.exports = {
  add,
  substract,
};
```

Para poder trabajar con la nueva sintaxis debemos agregar el `"type": "module"` dentro del `package.json`

```json
// Por defecto es commonjs
{
  "type": "module"
}
```

**Lodash**: Paquete que nos permite utilizar métodos
