// Esta clase solo sirve para extender, no para instanciar
abstract class Controller {
  abstract path: string;
}

class ProductController extends Controller {
  path: string;

  constructor(path: string) {
    super();
    this.path = path;
  }
}

const myController = new ProductController("/products");

console.log(myController);
