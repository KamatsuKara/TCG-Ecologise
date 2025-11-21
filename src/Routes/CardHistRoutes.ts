import { Router } from "express";

import { CardHistDAO } from "../DAO/CardHistDAO";
import { CardHistService } from "../Services/CardHistService";
import { CardHistController } from "../Controllers/CardHistController";

export function cardHistRoutes(cardHistDAO:CardHistDAO): Router {
    const router = Router();

    const cardHistService = new CardHistService(cardHistDAO);
    const cardHistController = new CardHistController(cardHistService);

    router.get("/", cardHistController.getAll);
    router.get("/:id", cardHistController.get);
    router.post("/", cardHistController.create);
    router.delete("/id", cardHistController.delete);
    router.put("/:id", cardHistController.update);
    router.patch("/:id", cardHistController.update);

    return router;
}