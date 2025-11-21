import { Router } from "express";

import { RarityDAO } from "../DAO/RarityDAO";
import { RarityService } from "../Services/RarityService";
import { RarityController } from "../Controllers/RarityController";

export function rarityRoutes(rarityDAO:RarityDAO): Router {
    const router = Router();

    const rarityService = new RarityService(rarityDAO);
    const rarityController = new RarityController(rarityService);

    router.get("/", rarityController.getAll);
    router.get("/:id", rarityController.get);
    router.post("/", rarityController.create);
    router.delete("/id", rarityController.delete);
    router.put("/:id", rarityController.update);
    router.patch("/:id", rarityController.update);

    return router;
}