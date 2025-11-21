import { Router } from "express";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { CardHistDAO } from "../DAO/CardHistDAO";
import { CardHistService } from "../Services/CardHistService";
import { CardHistController } from "../Controllers/CardHistController";

export function cardHistRoutes(cardHistDAO:CardHistDAO): Router {
    const router = Router();

    const cardHistService = new CardHistService(cardHistDAO);
    const cardHistController = new CardHistController(cardHistService);

    router.get("/", cardHistController.getAllCardHist);
    router.get("/:id", cardHistController.getCardHist);
    router.post("/", cardHistController.createCardHist);
    router.delete("/0", cardHistController.deleteCardHist);
    router.put("/", cardHistController.updateCardHist);
    router.patch("/", cardHistController.updateCardHist);

    return router;
}