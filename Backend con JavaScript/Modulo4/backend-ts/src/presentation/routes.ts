import { Router } from "express";
import { ProductRoutes } from "./products/routes";

export class AppRoutes {
  // static: Para no generar una instancia
  static get routes() {
    const routes = Router();

    routes.use("/products", ProductRoutes.routes);

    return routes;
  }
}
