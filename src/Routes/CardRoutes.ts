import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { CardDAO } from "../DAO/CardDAO";
import { CardService } from "../Services/CardService";
import { CardController } from "../Controllers/CardController";

export function cardRoutes(cardDAO:CardDAO): Router {
    const router = Router();

    const cardService = new CardService(cardDAO);
    const cardController = new CardController(cardService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), cardController.getAll.bind(cardController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), cardController.get.bind(cardController));
    router.post("/", authJWT, requireRole(["ADMIN"]), cardController.create.bind(cardController));
    router.delete("/id", authJWT, requireRole(["ADMIN"]), cardController.delete.bind(cardController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), cardController.update.bind(cardController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), cardController.update.bind(cardController));

    return router;
}