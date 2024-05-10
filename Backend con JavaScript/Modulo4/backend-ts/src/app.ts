// import "./decorators/no_decorators";

import { ProductController } from "./decorators/decorators";

const productController = new ProductController();
console.log(productController);

// import { AppRoutes } from "./presentation/routes";
// import { ServerApp } from "./presentation/server";

// // Código autoejecutable
// (() => {
//   main();
// })();

// async function main() {
//   const server = new ServerApp({
//     port: 3000,
//     routes: AppRoutes.routes,
//   });

//   server.start();
// }
