// function MyFirstDecorator(constructor: any) {
//   console.log("Mi primera función de decorador");
// }

function Controller(value: string) {
  console.log(`Controller ${value}`);

  // Los decoradores retornan una función
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      urlName: string = `/${value}`;
    };
  };
}

// @MyFirstDecorator('producto')
@Controller("product")
export class ProductController {}

@Controller("user")
export class UserController {}
