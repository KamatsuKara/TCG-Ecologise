import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { CardHistDAO } from "../DAO/CardHistDAO";
import { CardHistService } from "../Services/CardHistService";
import { CardHistController } from "../Controllers/CardHistController";

export function cardHistRoutes(cardHistDAO:CardHistDAO): Router {
    const router = Router();

    const cardHistService = new CardHistService(cardHistDAO);
    const cardHistController = new CardHistController(cardHistService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), cardHistController.getAll);
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), cardHistController.get);
    router.post("/", authJWT, requireRole(["ADMIN","USER"]), cardHistController.create);
    router.delete("/id", authJWT, requireRole(["ADMIN","USER"]), cardHistController.delete);
    router.put("/:id", authJWT, requireRole(["ADMIN","USER"]), cardHistController.update);
    router.patch("/:id", authJWT, requireRole(["ADMIN","USER"]), cardHistController.update);

    return router;
}