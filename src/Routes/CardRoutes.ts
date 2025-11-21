import { Router } from "express";

import { CardDAO } from "../DAO/CardDAO";
import { CardService } from "../Services/CardService";
import { CardController } from "../Controllers/CardController";

export function cardRoutes(cardDAO:CardDAO): Router {
    const router = Router();

    const cardService = new CardService(cardDAO);
    const cardController = new CardController(cardService);

    router.get("/", cardController.getAll);
    router.get("/:id", cardController.get);
    router.post("/", cardController.create);
    router.delete("/id", cardController.delete);
    router.put("/:id", cardController.update);
    router.patch("/:id", cardController.update);

    return router;
}