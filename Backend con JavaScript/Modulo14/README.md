# Módulo 14: Documentación y Comunicación

**¿Por qué documentamos?**

- Queremos comunicar cómo interactuar con nuestro código
- Queremos fomentar la colaboración
- Para vender nuestro producto
- Pasar na entrevista
- Etc

**¿Para quién documentamos?**

- Usuarios
- Otros desarrolladores
- Nosotros mismos en el futuro

**Tipos de documentación**

La _documentación de código_ se enfoca en los detalles técnicos y la implementación interna del software orientada hacia nuevos colaboradores.

La _documentación general_ proporciona una visión más amplia y accesbile del proyecto, útil para una variedad de usuarios. Ambas son cruciales para el éxito y la adopción de cualquier proyecto de software.

**La documentación depende del proyecto**

No es lo mismo documentar una librería third party que una API comercial para usuarios. Los métodos y herramientas qeu usemos deben adecuarse al proyecto.

**¿Quién escribe la documentación?**

Usualmente cada desarrollador en un equipo se ocupa de crear, actualizar y mantener la documentación de las funcionalidades que agrega / modifica. En proyectos muy grandes existen profesionales que se dedican específicamente a mantener, publicar y ordenar la documentación e incluso a crear ejemplos, demos y tutoriales para usuarios.

## Documentación de código

**Ofrece una explicación de lo que hace el código, cómo lo hace y porqué se hizo de esa manera específica.**

Forma:

- Comentarios en el código
- Herramientas específicas como JSDoc, Doxygen o Swagger para APIs

## Documentación general

Explica cómo instalar, configurar y utilizar el software.

Forma:

- Documentos o páginas web.
- Puede utilizar herramientas como GitBook, Confluence, o wikis.

**README**
Es una pieza que no debería faltar en ningún proyecto y como su nombre lo indica siempre los deberíamos leer.

Vive en el mismo repositorio y nos indica cómo comenzar a utilizarlo, donde encontrar información útil y más.

Usualmente se escribe en Markdown.

**Swagger**
Esta herramienta define una interfaz estándar para describir APIs REST, que incluye rutas, parámetros, respuestas y mucho más.

Para implementarlo debemos instalarlo y configurarlo en el bootstrap de Nest.

```bash
pnpm add @nestjs/Swagger
```

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("API")
    .setDescription("The API description")
    .setVersion("1.0")
    .addTag("user")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
```

En NestJS, cuando se utiliza Swagger (OpenAPI) para documentar una API, se emplean varios decoradores que ayudan a definir y organizar la documentación de manera clara y estructurada. Por ejemplo `@ApiTags`, `@ApiResponse`, `@ApiProperty`

**Compodoc**

Es una herramienta de documentació para proyectos de TypeScript, muy utilizada en aplicaciones Angular y también compatible con NestJS y otros frameworks de TypeScript.

Para instalarla:

```bash
pnpm add @compodoc/compodoc --save-dev
```

Dnetro de nuestro código o función, debemos agregar comentarios de documentación:

```typescript
/**
 * Función que realiza una operación matemática
 * @param a Número a multiplicar
 * @param b Número a multiplicar
 * @returns El resultado de la multiplicación
 */
function multiplicar(a: number, b: number): number {
  return a * b;
}
```

Para ejecutarlo debemos agregar el siguiente script en `package.json`:

```json
{
  "scripts": {
    "compodoc": "compodoc -p tsconfig.json -s"
  }
}
```

Y ejecutarlo:

```bash
pnpm run compodoc
```

Como resultado, obtendremos diferentes páginas que documentan cada función, clase, etc.

- No existe una sola fuente de la verdad
  La documentación es un trabajo colaborativo que se nutre de diferentes fuentes para garantizar la comunicación eficientemente de nuestro proyecto.

- Siempre tenemos que escribir para nuestro usuario menos preparado
  Detalles que pueden parecer obvios cuando estamos en contexto pueden perderse fácilmente para quien recién se acerca a nuestro proyecto

Documentación mínima para un challenge laboral que incluye una API (de una entrevistadora cansada)

- README con breve descripción del proyecto
- Indicaciones de cómo instalar e iniciar el proyecto
- Listado de endpoints disponibles y sus métodos HTTP con referencia a parámetros, su tipo y si son opcionales o no
- Opcional: Indicaciones sobre cómo correr tests en caso de que haya
- Opcional: Colección de postman o similar para probar funcionalidad rápidamente
