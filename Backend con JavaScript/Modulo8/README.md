# Módulo 8 - Auth y Seguridad Parte 1

> ¿Qué información le mostramos y a quién?

## Mecanismos para proteger nuestra API

- `Basic Auth`
  - Es el más basico de todos
  - Un mismo usuario y contraseña para todo enviado por un header de HTTP
  - Está codificado en Base64
  - Es una mala práctica
- `Bearer Token`
  - Se genera y codifica un token con duración especifica
  - Se envía en las HTTP requests para que el servidor determine la validez del usuario y su identidad
  - Quien posea el token posee acceso a la información
  - Se utiliza con JWT en su mayoría
  - Es el más común
  - El tiempo definido es alto, pero se pide doble autenticación para realizar ciertas acciones
  - El token lo genera el servidor (Backend)
  - El cliente guarda (en las cookies generalmente) el token y lo utiliza cuando hace peticiones HTTP al servidor
- `OAuth`
  - Permite a las aplicaciones externas obtener acceso limitado a cuentas de usuario en un servicio HTTP
  - Se utiliza para otorgar permisos a una aplicación para actuar en nombre de un usuario
  - Twitter, Github, Google, etc
  - Se elige los permisos que la aplicacion entrega al HTTP
- `API Key`
  - Se crea una clave de acceso para un usuario en particular y se le solicita que la envie en cada HTTP request
  - Con eso se determina quien nos está llamando y qué información podemos o no podemos brindarle
  - B2B (Bussines to Bussines)
  - No está pensado para usarlo de forma masiva
  - Se puede monetizar con este metodo (limitando las request)

## Bearer token

¿Qué necesitamos?

**Passport**: Es un _middleware_ de autenticación para Node.js

- Capacidad de aplciar _estrategias_
- Extremedamente flexible
- Buena integración con _frameworks_

**Estrategias**: Son formas de autenticar a nuestros usuarios.

- Twitter
- Google
- Github

**JWT**: Es un estándar para compartir información de forma _compacta_ y _autónoma_ entre dos partes de forma segura. Esta información puede ser verificada y confiable porque está _firmada_ digitalmente

## Login con Email

1. Creación de proyecto

```bash
# Creación de proyecto
nest new <nombre>

# Passport
pnpm add @nestjs/passport passport passport-local
npm install @nestjs/pasport passport passport-local

# Librería de JWT
pnpm add @nestjs/jwt passport-jwt
npm install @nestjs/jwt passport-jwt

# Tipos para TS
pnpm add @types/passport-local @types/passport-jwt --save-dev
npm install @types/passport-local @types/passport-jwt --save-dev
```

2. Creamos un modulo

```bash
# Crear un modulo con el cli de nest
# Sólo crea la estructura de carpetas
nest g module auth

# Output
CREATE src/auth/auth.module.ts (85 bytes)
UPDATE src/app.module.ts (318 bytes)
```

3. Creamos nuestro servicio (auth.service.ts)

- Sólo va a tener la función `validateUser`
- Va a recibir el `username` y `password`
- Para validar un usuario que va a estar _hardcodeado_

```typescript
// auth.service.ts
import { Injectable } from "@nestjs/common";
import { User } from "src/types/User";

@Injectable()
export class AuthService {
  // Para tipar debemos usar un interface o un type
  testUser: User;

  constructor() {
    this.testUser = {
      id: 1,
      username: "Juani",
      password: "1234",
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    if (
      this.testUser.username === username &&
      this.testUser.password === password
    ) {
      // Se devuelve un objeto nuevo para proteger datos
      // La seguridad depende totalmente de nosotros
      return { userId: this.testUser.id, username: this.testUser.username };
    }

    return null;
  }
}

// User.ts
export type User = {
  id: number;
  username: string;
  password: string;
};
```

**Recursos**

- [Interfaces](https://learn.microsoft.com/es-es/training/modules/typescript-implement-interfaces/2-interfaces-typescript)
- [Type](https://learn.microsoft.com/es-es/training/modules/typescript-declare-variable-types/)
- [Diferencias entre Type e Interfaces](https://blog.nubecolectiva.com/diferencia-entre-interface-y-type-en-typescript/)

4. Creamos nuestra estrategia (local.strategy.ts)

- Si tenemos más de una estrategia, lo más conveniente es crear una carpeta con todas las estrategias (dentro del módulo de auth)
- Es necesario separar la lógica de negocio dentro de la estrategia
- Se aplica el principio de responsabilidad única

```typescript
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // usernameField: El campo que contiene el campo que se va a evaluar
    super({ usernameField: "username " });
  }

  async validate(username: string, password: string): Promise<any> {
    // Aplicamos el principio de responsabilidad única
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
```

5. _<u>Configuramos</u>_ nuestro módulo

- Configuramos las propiedades necesarios para nuestro módulo

```typescript
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [PassportModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

6. Creamos nuestro AuthGuard (local-auth.guard.ts)

- Eso sirve para tener multiples estrategias en nuestra app
- `@UseGuards`: Nos permite definir la estrategia a usar en cada endpoint
- Se crea un Guard para cada estrategia

```typescript
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {}
```

7. Creamos nuestro controller (auth.controller.ts)

```typescript
import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("/auth")
export class AuthController {
  constructor() {}

  // Utiliza el guard de autenticación local
  // Se utiliza para proteger nuestras rutas
  // Verifica si el usuario está logueado
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  // Obtenemos el objeto request
  // Proviene de Express
  async login(@Request() req: any) {
    // En req.user se almacena el usuario
    // Es el usuario que retornamos en el servicio
    return req.user;
  }
}
```

**Orden de ejecución en Passport**

1. LocalAuthGuard

- `@UseGuards`: Funciona como _middleware_. El usuario debe estar registrado previamente
- `Middleware`: Es un _intermediario_ entre la petición y el controller

2. LocalStrategy validate()

- `validate()`: Por defecto, ejecuta esta función cuando pasa por el middleware

3. AuthService validateUser()

- Contiene la lógica de negocio
- COnsulta la Base de datos
- `throw new Error`: Corta la ejecución. No vuelve al controller

4. Controller

# Módulo 8 - Auth y Seguridad Parte 2

**JWT**: Es un estándar para compartir información de forma _compacta_ y _autónoma_ entre dos partes de forma segura. Esta información puede ser verificada y confiable porque está _firmada_ digitalmente

**Payload**: Información que se envía en el token

8. Agregamos la funcion login (auth.service.ts)

```typescript
class AuthService {
  // Importamos el jwtService
  constructor(private readonly jwtService: JwtService) {
    this.testUser = {
      id: 1,
      username: "Juani",
      password: "1234",
    };
  }

  // ...

  login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return {
      // Firmar el token
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

9. Actualizamos nuestro AuthModule (auth.module.ts)

```typescript
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: "secret", // Clave secreta
      signOptions: { expiresIn: "1h" }, // Tiempo de expiración
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
```

**2FA**: Autenticación de dos factores

- No usar mensajes de texto

10. Actualizamos nuestro controller (auth.controller.ts)

```typescript
import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() req: any) {
    // return req.user;
    return this.authService.login(req.user);
  }
}
```

## Protegiendo endpoints con JWT

11. Creamos nuestra estrategia JWT (jwt.strategy.ts)

```typescript
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: "secret",
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
```
