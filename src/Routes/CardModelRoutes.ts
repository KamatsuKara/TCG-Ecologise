import { Router } from "express";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { CardModelDAO } from "../DAO/CardModelDAO";
import { CardModelService } from "../Services/CardModelService";
import { CardModelController } from "../Controllers/CardModelController";

export function cardModelRoutes(cardModelDAO:CardModelDAO): Router {
    const router = Router();

    const cardModelService = new CardModelService(cardModelDAO);
    const cardModelController = new CardModelController(cardModelService);

    router.get("/", cardModelController.getAllCardModel);
    router.get("/:id", cardModelController.getCardModel);
    router.post("/", cardModelController.createCardModel);
    router.delete("/0", cardModelController.deleteCardModel);
    router.put("/", cardModelController.updateCardModel);
    router.patch("/", cardModelController.updateCardModel);

    return router;
}