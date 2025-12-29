import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { CardDAO } from "../DAO/CardDAO";
import { CardService } from "../Services/CardService";
import { CardController } from "../Controllers/CardController";

export function cardRoutes(cardDAO:CardDAO): Router {
    const router = Router();

    const cardService = new CardService(cardDAO);
    const cardController = new CardController(cardService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), cardController.getAll);
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), cardController.get);
    router.post("/", authJWT, requireRole(["ADMIN","USER"]), cardController.create);
    router.delete("/id", authJWT, requireRole(["ADMIN","USER"]), cardController.delete);
    router.put("/:id", authJWT, requireRole(["ADMIN","USER"]), cardController.update);
    router.patch("/:id", authJWT, requireRole(["ADMIN","USER"]), cardController.update);

    return router;
}