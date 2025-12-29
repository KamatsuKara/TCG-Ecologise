import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { CardModelDAO } from "../DAO/CardModelDAO";
import { CardModelService } from "../Services/CardModelService";
import { CardModelController } from "../Controllers/CardModelController";

export function cardModelRoutes(cardModelDAO:CardModelDAO): Router {
    const router = Router();

    const cardModelService = new CardModelService(cardModelDAO);
    const cardModelController = new CardModelController(cardModelService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), cardModelController.getAll);
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), cardModelController.get);
    router.post("/", authJWT, requireRole(["ADMIN","USER"]), cardModelController.create);
    router.delete("/id", authJWT, requireRole(["ADMIN","USER"]), cardModelController.delete);
    router.put("/:id", authJWT, requireRole(["ADMIN","USER"]), cardModelController.update);
    router.patch("/:id", authJWT, requireRole(["ADMIN","USER"]), cardModelController.update);

    return router;
}