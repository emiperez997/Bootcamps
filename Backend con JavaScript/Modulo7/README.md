# Módulo 7 - Bases de Datos No Relacionales - Parte 1

## ¿Qué es una base de datos?

Es un conjunto organizado de **información almacenada de manera estructurada** que permite la gestión de datos mediante las operaciones CRUD (Crear, Leer, Actualizar y Eliminar)

**¿De qué maneras puedo almacenar la información?**

Existen muchas maneras, las más utilizadas y conocidas son:

- Modelo Relacional: Utiliza tablas para organizar datos en **filas y columnas**. Cada tabla representa una entidad y las relaciones entre ellas se establecen mediante claves primarias y foráneas.
- Modelo de Documentos: Los datos se almacenan en documentos que pueden ser tipo JSON, XML o BSON. Cada documento puede tener su propio esquema y no se requiere una estructura uniforme para todos los datos

**ODM**

Un ODM es una herramienta que facilita la _comunicación_ entre un programa de computadora y una _base de datos de documentos_, como MongoDB, al mapear objetos del código a documentos de la base de datos y viceversa.

**Ventajas**

- Abstracción de la base de datos
- Velocidad de desarrollo
- Legibilidad y orden
- Modelado de datos complejos

_¿Las bases de datos de documentos es la solución perfecta?_

No, cada problema requiere una solución específica. A veces conviene bases de datos relacionales, y otras veces documentos

> La tecnología son herramientas para resolver problemas

**Mongoose**

Es un ODM utilizado en Node.js para simplificar la **interacción con la base de datos** MongoDB. Permite a los desarrolladores definir **esquemas de datos**, crear **modelos** y realizar operaciones **CRUD** en la base de datos desde su aplicación en Node.js

## Conceptos de MongoDB

- Collection
- Document
- Schema
- Model
- Query

### Collection (Colección)

Contenedor de _documentos similares_, lo que se asemeja a lo que en bases de datos realcionales se conoce como una _"tabla"_. Cada documento en una colección puede tener una estructura diferente.

### Document (Documento)

Es un _registro individual_ almacenado en una colección. Un documento es la _unidad básica_ de almacenamiento de datos en MongoDB y está representado en formato BSON (Binary JSON), que es una extensión binaria de JSON:.

### Schema (Esquema)

Es una descripción de la _estructura de los documentos_ que se pueden almacenar en una colección específica. Un esquema peude definir _restricciones opcionales_ para los campos, como su tipo de dato y si son requeridos u opcionales.

### Model (Modelo)

Es una clase que se crea a partir de un _schema_ y _representa una colección_ específica en la base de datos. Proporciona una interfaz para interactuar con documentos en esa colección

### Query (Consulta)

```javascript
// Para ejecutar los métodos tenemos que acceder a la colecction correcta
nombre_db.nombre_colection;

// Método find
// db.collection.find({ campo: valor }) => []
// db.collection.findOne({}) => {} (El primero que encuentra)
empresa.productos.find({ nombre: "Television" });

// Método sort
// db.collection.find({}).sort({ 1: asc, -1: desc}) => []
empresa.productos.find().sort({ price: 1 });
```

**Filtros**

```javascript
// Filtrar por valor
db.collection.find({ campo: valor});
empresa.productos.find({ name: 'Clock' });

// Filtrar por rango
db.collection.find({ campo: { $gte: valor_min, $lte: valor_ max } })
empresa.productos.find({ price: { $gte: 10, $lte: 50 } });

// Filtrar por campo anidado
db.colecction.find({ 'objeto.campo_anidad': valor })
empresa.productos.find({ 'measurements.width': 10 })

// Seleccionar campos (proyección)
db.colecction.find({}, { campo1: 1, campo2: 1})
empresa.productos.find({}, { price: 1, name: 1 })

// Ordenar resultados
db.colecction.find({}).sort({ campo: 1 }) // Ascendente
db.colecction.find({}).sort({ campo: -1}) // Descendente
empresa.productos.find({}).sort({ price: 1 })

// Contar resultados
db.colecction.find({}).count();
empresa.productos.find({}).count();

// Limitar cantidad de resultados
db.colecction.find({}).limit(numero);
empresa.productos.find({}).limit(5);

// Saltar docmentos
db.colecction.find({}).skip(numero);
empresa.productos.find({}).skip(5);
```

## Servidores de MongoDB

- Cada servidor de MongoDB puede tener múltiples dbs dentro
- El nombre de la db se lo damos desde _Nest_ cuando la inicializamos

## Bases de datos

- Cada db puede contener infinitas **colecciones**
- Las colecciones se generan desde _Nest_ de acuerdo al schema que definamos
- Por cada **schema** se va a crear una **colección**

## Colecciones

- Cada colección puede incluir infinitos documentos
- Los documentos de cada colección, tienen que respetar el schema que definimos
- Los schemas pueden tener campos opcionales, por lo que pueden haber documentos con **campos distintos**
- Las consultas o queries se realizan sobre una sola colección
- Toda query retorna un JSON o array de JSON
- Las queries generalmente las vamos a utilizar para filtrar y ordenar documentos

## Herramientas a utilizar

- MongoDB Server
- MongoDB Compass
- Mongoose
- [Bases de datos del curso](mongodb+srv://codigo:facilito@codigofacilito.kct8dig.mongodb.net/)

> [!TIP]
> En mi caso, voy a utilizar `docker-compose.yml` para ejecutar el server local de MongoDB

```yml
services:
  mongo:
    image: "mongo"
    ports:
      - "27017:27017"
    volumes:
      - "MONGO_DATA:/data/db"

volumes:
  MONGO_DATA:
```

## Mongo Compass

Tiene 3 vistas

- Formato lista
- Formato objecto
- Modo tabla (parecido a SQL)

## Mongoose

```bash
# Ubicado en nuestro proyecto
npm i @nestjs/mongoose mongoose
```

## Tarea

1. Conectarse al servidor de prueba con Compass (la base de datos se llama "empresa")
2. Dentro de la collection "productos" encontrar utilizando queries:
   a. El producto más caro
   b. El producto que contenga un width de 20 en sus measurements
   c. El producto que contiene la categoria "technology"
   d. Todos los productos que tengan un precio de 40 o más

## Soluciones

Hecho en mongosh (dentro de Mongo Compass)

```javascript

use empresa

// a
db.productos.find().sort({ price: -1 }).limit(1)

// b
db.productos.find({ "measurements.width": 20 })

// c
db.productos.find({ categories: "technology" })

// d
db.productos.find({ price: { $gte: 40 } })

```

# Módulo 7 - Bases de Datos No Relacionales - Parte 2

## Busquedas parciales

Podemos utilizar expresiones regulares. En el ejemplo la expresión regular va a buscar cualquier ocurrencia de "re" (o "RE", "Re", "rE", etc) en un texto, sin importar cuántos caracteres lo rodeen o dónde aparezca en el texto

```javascript
/.*re/i;
```

- `.*`: Cualquier caracter repetido (.) cero o más veces (\*). Permite que busque algo en cualquier parte del texto
- `re`: La secuencia "re" de manera literal
- `/i`: Indica que la busqueda es insesible a mayúsculas y minúsculas

## Consultar múltiples collections

En MongoDB se puede consultar múltiples collections a la veez. Se utiliza la funcinalidad llamada **aggregate**. Son secuencias de etapas que pueden consultar, filtrar, modificar y procesar nuestros documentos

Para consultar multiples collections se utiliza la etapa de ejecución llamada `$lookup`

```javascript
{
  from: "string", // La collection foránea de cual queremos traer información
  localField: "string", // Campo local de referencia en la collection local (identificador)
  foreignField: "string", // Mismo campo pero en la collection foránea
  as: "string" // Alias- El nombre que le asignamos al resultado
}
```

## MongoDB en nest

- Instalar mongoose en nest

```bash
# Creamos el proyecto en Nest
nest new project-name

# Instalamos el typo de mongodb y mongoose
pnpm add @nestjs/mongoose mongoose
```

- Importamos el Modulo de Mongoose

```javascript
import { MongooseModule } from "@nestjs/mongoose";

import { Products Module } from "./products/products.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nombre_db'),
    ProductsModule,
  ]
  ...
})
```

## Creando un Schema en Nest

- Se utiliza el decorador `@Schema`, seguido de la declaración de la clase
- Dentro de la clase se usa `@Prop` recibiendo por parámetro un objeto con las propiedades del campo. Seguido del nombre del campo y tipo del campo.

```typescript
// product.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

// Puede o no recibir parametros para definir dentro del esquema
@Schema()
// Product: Debe ser en singular
export class Product {
  // @Prop: recibe las propiedades del campo
  @Prop({ type: String, required: true })
  name: string;

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

// Exportamos el Schema a partir de la clase Product
export const ProductSchema = SchemaFactory.createForClass(Product);
```

```typescript
// products.module.ts
@Module({
  imports: [
    // Le pasamos el name de la clase y el Schema creado
    // Esto crea la colection
    // Product.name === Product -> Products (lo transforma MongoDB)
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
```

`DTOs`: Es una clase donde nosotros específicamos el tipo del campo y si son requeridos o no. Generalmente tenemos dos: Para la creación y la actualización. Generalmente son sólo atributos

```typescript
// create-product.ts
export class CreateProductDto {
  readonly name: string;
  readonly price: number;
  readonly currency: string;
  readonly categories: string[];
  readonly measurements: {
    height: number;
    width: number;
    weight: number;
  };
}
```

`Service`

- No es necesario ponerle un await

```typescript
@Injectable()
export class ProductsService {
  // Dentro del Service vamos a inyectar al modelo de Mongoose
  // Este productModel usamos dentro del service
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModle.find().lean();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModle.findById(id).lean();
  }

  async create(CreateProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModle(CreateProductDto);
    return createdProduct.save();
  }

  async update(
    id: string,
    CreateProductDto: CreateProductDto
  ): Promise<Product> {
    return this.productModle.findByIdAndUpdate(id, CreateProductDto).lean();
  }

  async remove(id: string): Promise<Product> {
    return this.productModle.findByIdAndDelete(id).lean();
  }
}
```

**Diferencia entre `lean()` y `exec()`**

- `lean()`: Devuelve un objeto de JavaScript
- `exec()`: Devuelve una instancia de objeto de Mongoose (Modelo Product)

## Práctica

1. Conectar su proyecto de Nest a MongoDB
2. Crear una base de datos acorde al nombre de su proyecto
3. Crear los schemas necesarios para sus collections
4. Implementar métodos CRUD para cada collection
