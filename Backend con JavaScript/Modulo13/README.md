# Módulo 13 - Caché y Performance

**Caché**

- Es una técnica para almacenar temporalmente respuestas a las solicitudes realizadas a un servidor
- Actúa como una memoria _intermedia_ entre el cliente y el servidor

_¿Por qué es importante?_

- Es útili en entornos donde se realizan solicitudes repetitivas a recursos que no cambian frecuentemente
- Permite reducir la latencia
- Permite reducir la carga tento en el cliente como en el servidor

_¿Cómo se utiliza la caché en la web?_

El caché utiliza encabezados HTTP como:

- Cache-Control
- Expires

- **Cache-Control:** Permite especificar cómo se deben almacenar en caché las respuestas
- **Expires:** Permite especificar una fecha de vencimiento para la respuesta

- También se utiliza la etiqueta "ETag" para validar si la respuesta ha cambiado

_¿Cómo funciona la caché en el backend?_

- Si el proyecto escala mucho y rápido, es posible que los recursos del servidor y bases de datos no sean suficientes para manejar la carga
- El caché iría en medio del `controller` y el `servicio`
- El caché es una pequeña "bases de datos" que almacena los datos con clave y valor
- Esto reduce la latencia de las respuestas

**Ejemplo de petición con caché**

1. El cliente realiza una petición al servidor a `/cursos`
2. El servidor verifica si la respuesta está en caché
3. Si la respuesta está en caché, la devuelve al cliente
4. Si la respuesta no está en caché, el servidor realiza la consulta a la base de datos y almacena la respuesta en caché

**Recomendaciones cuando se utiliza caché**

- No cachear recursos que cambian frecuentemente
- No cachear recursos sensibles
- Cuando se actualiza un recurso, se debe invalidar la caché
- No cachear recursos grandes
- Peticiones POST, PUT/PATCH y DELETE no deben ser cacheadas

**Configuración de Caché en Nestjs**

Hay dos versiones de caché en Nestjs:

- Versión 4: Recibe el tiempo de vida en segundos
- Versión 5 (Última versión): Recibe el tiempo de vida en milisegundos

- Instalación de la dependencia:

```bash
pnpm install @nestjs/cache-manager cache-manager -E
```

- Por defecto, utiliza el caché en memoria. Esto quiere decir que va a existir mientras el servidor viva
- Por otro lado, se puede utlizar Redis para almacenar el caché. Redis es una una base de datos que se maneja con clave y valor

> ![WARNING]
> La ultima version de cache-manager es la 6.1.3. Para que funcione en Nest debemos tener la versión 5

**Ejemplo de código**

- Esto es la forma tradicional sin utilizar lo que nos ofrece Nestjs

```typescript
@Controller("news")
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    // Inyectamos el caché manager
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  @Get()
  async news() {
    // Verificamos si la respuesta está en caché
    const cacheNews = await this.cacheManager.get("news");

    if (!cacheNews) {
      // Si no está en caché, realizamos la petición al servicio
      const { data } = await this.newsService.getNews();

      // Almacenamos la respuesta en caché
      await this.cacheManager.set("news", data, 6000);
      return data;
    }

    return cacheNews;
  }
}
```

- El siguiente ejemplo utilizamos las herramientas (decoradores) que nos ofrece Nestjs

```typescript
  @Get('top-headlines')
  // Intercede en la respuesta de la petición
  @UseInterceptors(CacheInterceptor)
  // Indicamos la clave de la caché a consultar
  @CacheKey('top-headlines')
  // Indicamos el tiempo de vida de la caché
  @CacheTTL(6000)
  async topHeadlines() {
    const { data } = await this.newsService.getTopHeadlines();

    return data;
  }
```

- Para lograr persistir la memoria caché vamos a utilizar Redis

Documentación: [Redis](https://docs.nestjs.com/techniques/caching)

- Para levantar Redis utilizo docker compose

```yaml
services:
  redis:
    image: "redis:latest"
    container_name: "redis-container"
    ports:
      - "6379:6379"
    volumes:
      - ./cache/redis-data:/data
    restart: always
```

- También debemos instalar la dependencia de Redis

```bash
pnpm install redis cache-manager-redis-yet
```

- Debemos cambiar la configuración de la caché en el archivo `app.module.ts`

```typescript
import { redisStore } from "cache-manager-redis-yet";
import type { RedisClientOptions } from "redis";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),
    NewsModule,
  ],
})
export class AppModule {}
```

- Para poder consultar las keys que se generan en redis debemos ingresar al contenedor de docker

```bash
docker exec -it redis-container redis-cli

# Consultamos las keys
> KEYS *
1) "top-headlines"
2) "news"
```

> ![NOTE]
> La configuración de la caché debemos declararla donde realmente lo necesitemos. Si la vamos a usar en varios lugares a lo largo de nuestra aplicación, entonces la declaramos en el `app.module.ts`

**Conclusiones**

- Mejora el rendimiento
- Reduce la carga del servidor
- Ahorra ancho de banda
- Mejora la experiencia del usuario
- Permite el funcionamiento offline

# Ejercicio

Después de haber visto en la clase de cache y performance, como almacenar datos en cache para nuestras respuestas.

Hemos dado la posibilidad que los datos obtenidos por parte de nuestros usuarios se almacenen de manera correcta, en este caso para la ruta `/news` y `/news/top-headlines` provenientes desde la API de NewsAPI.

Ahora te toca a ti aplicar lo que haz aprendido a lo largo del bootcamp. Sabemos, que de momento hemos hecho la solicitud a la News API a través de query params en la propia URL dentro del servicio. Por ejemplo, `https://newsapi.org/v2/everything?q=finanzas`.

Y que tal, si dentro de nuestro endpoint tuviéramos la oportunidad de enviar el query param desde la solicitud, ¿como lo almacenarías en cache?

Ejemplo:
`/news?q=finanzas`
`/news?q=tesla`
`/news?q=negocios`

Nota: Cada una de estás solicitudes son resultados diferentes.
