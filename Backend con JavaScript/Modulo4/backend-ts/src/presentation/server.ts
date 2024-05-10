import express, { Router, type Express } from "express";

// Interface: Es un conjunto de propiedades y metodos que deben ser implementados por una clase. Es un "contrato"
interface ServerOptions {
  port: number;
  routes: Router;
}

export class ServerApp {
  public app: Express;
  public port: number;

  constructor(options: ServerOptions) {
    const { port, routes } = options;

    // Crear servidor de express
    this.app = express();
    this.port = port;

    this.app.use(routes);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}
