import { Router } from "express";

import { CardModelDAO } from "../DAO/CardModelDAO";
import { CardModelService } from "../Services/CardModelService";
import { CardModelController } from "../Controllers/CardModelController";

export function cardModelRoutes(cardModelDAO:CardModelDAO): Router {
    const router = Router();

    const cardModelService = new CardModelService(cardModelDAO);
    const cardModelController = new CardModelController(cardModelService);

    router.get("/", cardModelController.getAll);
    router.get("/:id", cardModelController.get);
    router.post("/", cardModelController.create);
    router.delete("/id", cardModelController.delete);
    router.put("/:id", cardModelController.update);
    router.patch("/:id", cardModelController.update);

    return router;
}