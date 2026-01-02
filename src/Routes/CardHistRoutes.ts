import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { FactoryDAO } from "../DAO/FactoryDAO";

import { CardHistDAO } from "../DAO/CardHistDAO";
import { CardHistService } from "../Services/CardHistService";
import { CardHistController } from "../Controllers/CardHistController";

export function cardHistRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const cardHistDAO = factoryDAO.createCardHistDAO();
    const cardHistService = new CardHistService(cardHistDAO);
    const cardHistController = new CardHistController(cardHistService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), cardHistController.getAll.bind(cardHistController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), cardHistController.get.bind(cardHistController));
    router.post("/", authJWT, requireRole(["ADMIN","USER"]), cardHistController.create.bind(cardHistController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), cardHistController.delete.bind(cardHistController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), cardHistController.update.bind(cardHistController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), cardHistController.update.bind(cardHistController));

    return router;
}