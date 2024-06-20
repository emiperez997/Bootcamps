# Módulo 12 - Webhooks y eventos

**WebHooks**: Son un servicio que permite a una aplicación enviar datos a otra aplicación. Un tercero hace una petición HTTP a nuestro servidor enviando los datos para finalizar el proceso.

Por ejemplo: Cuando se procesan pagos con PayPal, es la misma aplicación de PayPal que envía los datos a nuestra aplicación.

**Puntos a considerar**

- Nunca compartas los "secrets"
- Deben ser aleatorios y seguros
- Sigue las recomendaciones de la documentación
- Nunca confíes en que el anonimato va a ser tu salvación
- La idea es la misma entre servicios

## Práctica

```bash
nest new webhooks

# Creamos un recurso para Github
nest g res github
```

- Cuando trabajamos con Github, este trabaja con Headers que se llama `x-github-event`

- Este Webhook lo podemos utilizar en cualquier repositorio donde queramos escuchar eventos
- Podemos agregar Webhooks para que se ejecuten las acciones que nos interesan
- En `Payload URL` vamos a ingresar la URL de nuestro servidor, para esto nos ofrece un puente entre nuestro proyecto y Github llamado `smee`
- Para esto debemos instalar `smee-client` de manera global

```bash
npm install -g smee-client
```

- Luego debemos acceder a `smee.io`, que nos va a brindar un Proxy URL que nos permitirá conectar nuestro servidor

```bash
# Dentro de nuestro proyecto
smee --url WEBHOOK_PROXY_URL --path /endpoint --port 3000
```

- Dentro de Github podemos elegir que eventos vamos a estar escuchando desde nuestro servidor.
- Una vez creado el Webhook, el servidor va a enviar una petición con el evento `ping` a nuestro servidor.

```bash
{ "githubEvent": "ping" }
```

- Ahora cada vez que sucede un evento dentro del repositorio que tenemos configurado, el servidor va a enviar una petición a nuestro servidor
- También dentro de `smee.io` podemos ver cada evento que se envió y los datos dentro de la petición
- Desde el Payload de la petición del Webhook podemos acceder a los datos de la petición y hacer algo con ellos

## Integrando con Discord

- Para esto debemos crear un nuevo server en Discord y e integrar un Webhooks en su configuración
- Dentro de nuestro server de Discord, podemos configurar el nombre y nos van a brindar un URL para el Webhook

[Mi Webhook](https://discord.com/api/webhooks/1253390833290317856/EZZFHOTtABoz7ZvlHrpMyjpq9a58C4p_KgkNeNzg0005qyvkNbg80zlr2W4Rsaqx0Bzg)

- Dentro de nuestro proyecto, creamos un servicio para Discord

```bash
nest g s discord
```

- En ese servicio, vamos a crear una función `notify` que envie un mensaje a nuestro server de Discord
- El Webhook de discord va a esperar que le enviemos dentro del body la propiedad `content` con el mensaje que queremos enviar

```typescript
  async notify(message: string) {
    const body = {
      content: message,
    };

    const resp = await fetch(this.discordURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if(!resp.ok) {
      console.log("Error al enviar mensaje a discord");
      return false
    }

    return true
  }

```

## Solución a peticiones sin autenticación

- Cuando hacemos una petición POST a nuestro servidor, nos va a enviar el evento hasta Discord de igual forma
- Por esto debemos solucionar este problema
- Para esto debemos agregar a nuestro Webhook de Github un secreto que nos permita acceder a nuestro servidor
- En nuestro proyecto creamos un Guard que verifica si la petición es autenticada

```typescript
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import * as crypto from "crypto";
import type { Request } from "express";

const WEBHOOK_SECRET = "secret";

@Injectable()
export class GithubGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest() as Request;

    try {
      const signature = crypto
        .createHmac("sha256", WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest("hex");

      const xHubSignature = req.header("x-hub-signature-256") ?? "";

      let trusted = Buffer.from(`sha=${signature}`, "ascii");

      let untrusted = Buffer.from(xHubSignature, "ascii");

      return crypto.timingSafeEqual(trusted, untrusted);
    } catch (eerror) {
      return false;
    }
  }
}
```

- Dentro de nuestro Webhook de Github, agregamos el Guard

```typescript
import { GithubGuard } from 'src/guards/github.guard';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Post()
  webhookHandler(
    @Headers('x-github-event') githubEvent: GithubEvent,
    @Headers('X-Hub-Signature-256') signature: string,
    @Body() body: GithubPayload,
    @UseGuards(GithubGuard)
  ) {
    // console.log({ githubEvent });
    // console.log({ signature });

    this.githubService.handlePayload(githubEvent, body);

    return { githubEvent };
  }
}
```

---

# Tarea sobre WebHooks

## Parte 1 - Aplicación de Nest

1. Crear un proyecto de NestJS

```
nest new webhooks
```

2. Eliminar `app.controller.ts` y `app.service.ts`, actualizar el `app.module.ts` adecuadamente para evitar los errores.

3. Crear (REST API) con un módulo, servicio y controlador llamado github, sin pruebas unitarias. Seleccionar "**NO**" cuando pregunte sobre CRUD.

```
nest g resource github --no-spec
```

4. Crear el manejador de evento para peticiones `POST` que vendrán desde GitHub (Dentro de `github.controller.ts`)

```
@Post( '/' )
webhookHandler(
    @Headers( 'x-github-event' ) githubEvent: any,
    @Body() body: any,
) {

  console.log({ githubEvent });

  return { githubEvent };
}
```

- Recuerden realizar las importaciones de los decoradores que vienen de @nestjs/common

5. Levantemos el servidor `npm run start:dev`

6. Abramos POSTMAN y enviemos una petición `POST` a la siguiente URL y añadan un custom HEADER llamado `x-github-event` con el valor `ping`

```
POST http://localhost:3000/github

Headers:
  x-github-event: ping
```

- Deberíamos ver en la respuesta y en consola, el evento que nos envía GitHub

## Parte 2 - Subida a Github

1. Crear un repositorio en GitHub llamado `webhooks` en su cuenta
2. Usar los comandos que les da GitHub para subir el repositorio

Ejemplo:

```
git add .
git commit -m "first commit"
git remote add origin https://github.xxxx.xxx.xxxx.xxx.xxxx
git branch -M main
git push -u origin main
```

3. Confimar que nuestro repositorio se subiera a GitHub

### Parte 3 - Configurar SMEE Proxy

Necesario para poder desarrollar y probar webhooks.

Alternativas:

- Smee - Recomendado (Gratuito)
- Ngrok - Recomendado pero expone IP Pública en tier gratuito
- LocalTunnel
- Serveo

**NO USAR ** - VSCode Ports, porque no se puede autorizar en GitHub.

1. Ir a [https://smee.io/](https://smee.io/)
2. Click en `"Start a new channel"`
3. Instalar CLI de SMEE como Administrador (Linux, Mac como **sudo**, Windows correr consola como **admin**)

```
npm install --global smee-client
```

4. Copiar la URL que nos da SMEE

Información adicional:
Esto está en la documentación [oficial de GitHub sobre WebHooks](https://docs.github.com/en/webhooks/using-webhooks/handling-webhook-deliveries#setup)

5. Ejecutar el siguiente comando en la terminal

```
smee --url <El WEBHOOK_PROXY_URL que les da SMEE> --path /github --port 3000
```

- Reemplazar WEBHOOK_PROXY_URL por la URL que nos da SMEE
- Reemplazar el puerto 3000 en caso de estar usando otro puerto
- /github es nuestro ENDPOINT que creamos en la parte 1

6. Probar que todo funcione enviando una petición `POST` desde POSTMAN a la URL que nos da SMEE.
   **(Revisar el sitio web de SMEE y la consola de la aplicación de NestJS, deberían de ver el mensaje enviado por los headers) **

```
POST https://smee.io/XXXXXXXXX

Headers:
  x-github-event: ping-smee
```

Importante:

- No cancelen los procedimientos de SMEE hasta que terminen el ejercicio.

### Parte 4 - Configurar WebHooks en GitHub

1. Ir a la configuración de nuestro repositorio y seleccionar la opción de WebHooks

```
Settings > WebHooks
```

2. Click en "Add WebHook"
3. Payload URL: Copiar la URL que nos da SMEE (que también es el mismo URL del sitio web si ya recibieron un mensaje)
4. En el Content Type seleccionar la opción de `application/json`
5. El Secret lo dejamos en blanco (No lo ocupamos para este ejercicio)
6. En la parte de `"Which events would you like to trigger this webhook?"` seleccionar la opción de "Let me select individual events."
7. Seleccionar la opción de `"issues"` y `"stars"`
8. Revisar que al final, tengamos el check de `"Active"`
9. Click en `"Add WebHook"`
10. Unos segundos después, deberían de ver en la consola, que Github mandó un `ping` a nuestro ENDPOINT `(ver consola de Nest)`
11. También pueden probar colocar una estrella en su repositorio y/o crear un issue, y esto debería de disparar el webhook

### Felicidades, implementaron su primer WebHook con NestJS y GitHub.

### Parte 5 - Discord

Mostrar evento en Discord como un Bot

1. Abran discord
2. Creen un servidor nuevo, en el panel de la izquierda
   <img width="104" alt="Screenshot 2023-11-30 at 10 29 20 AM" src="https://github.com/DevTalles-corp/cf-webhooks-nest/assets/3438503/2b329494-dec9-450f-911d-fbab4c644011">

3. Seleccionen `Create My Own`, luego `For me and my firends`. Coloquen cualquier nombre al server
4. Hagan click derecho sobre el servidor creado y seleccionen `Server Settings` >> `Integrations`
   <img width="511" alt="Screenshot 2023-11-30 at 10 32 16 AM" src="https://github.com/DevTalles-corp/cf-webhooks-nest/assets/3438503/ddc961d7-f0cf-40a6-964b-0c4925d8966d">

5. Seleccionen `Create Webhook`
6. Opcional: (Pueden personalizar el nombre y avatar del bot)
7. Copiar el Webhook URL
   <img width="927" alt="SCR-20231130-jrfz" src="https://github.com/DevTalles-corp/cf-webhooks-nest/assets/3438503/c170b1b9-a418-4608-8bcf-0d42bfbde722">

8. Implementar el `github.service.ts` de esta forma:

```
import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubService {

  private readonly discordWebhookUrl = 'https://discord.com/api/webhooks/1179807432088764457/EKn3ib_NPOlfz_RiaY4D44Y6RVp_T3sVsM-pm7J4J5xXUsXLqapZE6Agdn_uv7MIodui';

  async notify( message: string) {

    const body = {
      content: message,
    };

    const resp = await fetch(this.discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      console.log('Error sending message to discord');
      return false;
    }

    return true;
  }
}


```

9. En el archivo `github.controller.ts` llamar el método `notify` del servicio así:

```
@Post('/')
  webhookHandler(
    @Headers('x-github-event') githubEvent: any,
    @Body() body: any,
  ) {
    console.log({ githubEvent });

    this.githubService.notify(`Event received: ${githubEvent}`); // <--- Aquí

    return { evento: githubEvent };
  }
```

10. Probar todo lo realizado asignando o removiendo una estrella en el repositorio y/o creando Issues en GitHub, si todo sale bien, podrán ver los eventos en el canal de Discord con su bot.

### Felicidades, lograron conectar GitHub con tu servidor de Nest con Discord utilizando WebHooks!

#### Nota

Pueden revisar el código fuente del ejercicio de Fernando para ver los controladores de issues
