import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { FactoryDAO } from "../DAO/FactoryDAO";

import { CardModelDAO } from "../DAO/CardModelDAO";
import { CardModelService } from "../Services/CardModelService";
import { CardModelController } from "../Controllers/CardModelController";

export function cardModelRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const cardModelDAO = factoryDAO.createCardModelDAO();
    const cardModelService = new CardModelService(cardModelDAO);
    const cardModelController = new CardModelController(cardModelService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), cardModelController.getAll.bind(cardModelController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), cardModelController.get.bind(cardModelController));
    router.post("/", authJWT, requireRole(["ADMIN"]), cardModelController.create.bind(cardModelController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), cardModelController.delete.bind(cardModelController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), cardModelController.update.bind(cardModelController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), cardModelController.update.bind(cardModelController));

    return router;
}