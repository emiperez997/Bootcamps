import { Router } from "express";
import { ProductController } from "./controller";

export class ProductRoutes {
  // static: Para no generar una instancia
  static get routes() {
    const routes = Router();

    const controller = new ProductController();

    routes.get("/", (req, res) => {
      return controller.findAll(req, res);
    });

    return routes;
  }
}
