// const {
//   add,
//   substract,
//   demoAsync,
//   combineArrayWitthASymbol,
// } = require("./modules/math");

// // Example using local modules
// console.log("Hello world");
// console.log(add(5, 5));
// console.log(substract(5, 5));
// demoAsync().then((result) => {
//   console.log(result);
// });
// console.log(combineArrayWitthASymbol([1, 2, 3], " | "));

// Create a new server using a core module from Nodde.js
const http = require("http");

const HOSTNAME = "127.0.0.1";
const PORT = 3000;

const server = http.createServer((request, response) => {
  // Especifico que lo interprete como texto plano
  response.setHeader("Content-Type", "text/plain");
  // response.statusCode = 500;

  // .end -> Fin de la respuesta
  // response.end("Hello world");
  response.end("<h1>Hello world</h1>");
});

server.listen(PORT, HOSTNAME, () => {
  console.log("Server running at http://127.0.0.1:3000");
});
