import { Router } from "express";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { CardDAO } from "../DAO/CardDAO";
import { CardService } from "../Services/CardService";
import { CardController } from "../Controllers/CardController";

export function cardRoutes(cardDAO:CardDAO): Router {
    const router = Router();

    const cardService = new CardService(cardDAO);
    const cardController = new CardController(cardService);

    router.get("/", cardController.getAllCard);
    router.get("/:id", cardController.getCard);
    router.post("/", cardController.createCard);
    router.delete("/0", cardController.deleteCard);
    router.put("/", cardController.updateCard);
    router.patch("/", cardController.updateCard);

    return router;
}