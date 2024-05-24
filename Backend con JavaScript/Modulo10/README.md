# Módulo 10 - Conceptos avanzados de bases de datos

## Conceptos avanzados de bases de datos

**Objetivos**

- Índices, definición y utilidad e importancia
- Tipos de índices
- Creación de índices
- Procesamiento de datos en el servidor
- Elegir un tipo de base de datos

**¿Qué es un índice?**

En una base de datos, es una porción específica de los datos guardados en ella, ordenados y seleccionados de forma tal que permitan un eficiente acceso a la información.

**Utilidad de los índices**

Permiten el acceso a la información de forma tal que no sea necesario recorrer secuencialmente la base de datos hasta encontrar el contenido que necesitamos.

- Aumenta notoriamente la velocidad de la consulta de datos
- Funciona asi en bases de datos relacionales y no relacionales

**¿Por que son importantes los índices?**

La indexación eficiente de una base de datos es primordial para el ahorro de tiempo y recursos. El tiempo en el que es ejecutada una query es fundamental para la performance de un software. A mejor indexación, menor uso de recursos de entrada y salida de un sistema. Ahorrándonos tiempo y dinero, y generando una mejor experiencia de usuario.

**Contraindicaciones**

Indexar excesivamente una base de datos puede degradar la performance de la misma, dado que cada operación CRUD sobre la misma require de la misma operación en los índices.

> [!TIP]
> Es primordial realizar una buena indexación

## Tipos de índices

**Índice único**

Identifica unívocamente cada elemento de una colección de la base de datos. Se utiliza para robustecer la integridad de los datos, dado que no permite la creación de documentos duplicados.

**Índice simple**

Agrupa u ordena los documentos de una colección con base a un elemento del documento. _Ejemplo:_ Si tenemos una colección de usuarios y queremos saber cuántos usuarios tienen un nombre de usuario, podemos crear un índice que agrupe los documentos por nombre de usuario.

**Índice múltiple o compuesto**

Agrupa u ordena los documentos de una colección con base en más de un elemento del documento. Es utilizado mayormente en búsquedas que utilizan varios parámetros. _Ejemplo:_ Nombre y apelllido

## Creación de índices

- Podemos crearlo desde el propoio shell de MongoDB

```bash
# Crea un índice ordenado de forma ascendente
db.COLLECITON_NAME.createIndex({ FIELD_NAME: 1 })

# Crea un índice ordenado de forma descendente
db.COLLECITON_NAME.createIndex({ FIELD_NAME: -1 })
```

- Podemos crearlo al momento de declarar nuestro modelo de Mongoose

```typescript
@Schema()
export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, required: true })
  currency: string;

  @Prop({ type: [String], required: true })
  categories: string[];

  @Prop({ type: Object, required: true })
  measurements: {
    height: number;
    width: number;
    weight: number;
  };
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Agregamos los índices que creo que necesitan
ProductSchema.index({ code: 1 }, { unique: true });
ProductSchema.index({ name: 1, code: 1 });
ProductSchema.index({ price: -1 });
```

**Consideraciones sobre índices**

- Siempre es importante indexar una base de datos
- No sobre indexar, esto puede llevar al deterioro de la performance
- ¿Podemos saber de antemano todos los índices que vamos a necesitar? No. Pero podemos hacer una _estimación_ de aquellos que creemos necesarios; sin embargo, una base de datos no relacional basada en documentos como MongoDB siempre es un ente en transformación.
- Los índices nacen de las búsquedas que se realizan en la base de datos.

## Procesamiento de datos en el servidor

**Stored procedures en SQL**

- Son sentencias SQL que permiten la manipulación de datos por parte del servidor. Están almacenados en el servidor y son ejecutadas cuando se cumple una condición predefinida (triggers)
- Permiten ahorrar tráfico y tiempo de ejecución de nuestra aplicación

_¿Stored procederues en NoSQL?_

MongoDB no implementa esta funcionalidad; sin embargo, permite el procesamiento de datos del lado del servidor de dos maneras diferentes:

- Atlas Stored JavaScript functions: Son funciones que pueden escribirse en ES6+ y pueden ser invocadas mediante triggers o condiciones predefinidas
- Aggregations Pipelines: Permite la manipulación de los resultados de una query para transformar los datos de la búsqueda según los requerimientos específicados. Operaciones concatenadas.

**¿Cómo funcionan los Pipelines?**

- Se ejecutan en pasos concatenados mediante los cuales se transforman los datos de una colección para obtener resultados pre procesados

```javascript
salesModel.aggregate([
  // Stage 1: Filtramos el producto que queremos
  {
    $match: { code: "XXX" },
  },
  // Stage 2: Agrupamos y sumamos el monto de las ventas para obtener el total de ventas
  {
    $group: { _id: "$name", totalAmount: { $sum: "$amount" } },
  },
]);
```

## Como elegir un tipo de base de datos

- Principales ventajas de SQL: consistencia de datos, transacciones, disponibilidad y facilidad de interrelación entre tablas, datos tipados y estructurados. Desventajas: alto costo de mantenimiento, baja performance en altos volúmenes de datos.

- Principales ventajas de MongoDB: Alta performance manejando grandes volúmenes de entrada y salida, datos poco estructurados, altamente escalable. Desventajas: Imposibilidad de relacionar documentos, composición de documentos con datos desestructurados.
