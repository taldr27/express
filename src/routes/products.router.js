import { Router } from "express";
import * as productsController from "../controllers/product.controller.js";

export const productsRouter = Router();

productsRouter.get("/create", productsController.createProduct);
productsRouter.get("/all", productsController.getAllProducts);
productsRouter.get("/by-id/:id", productsController.getProductById);
