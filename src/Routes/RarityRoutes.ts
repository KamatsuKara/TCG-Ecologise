import { Router } from "express";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { RarityDAO } from "../DAO/RarityDAO";
import { RarityService } from "../Services/RarityService";
import { RarityController } from "../Controllers/RarityController";

export function rarityRoutes(rarityDAO:RarityDAO): Router {
    const router = Router();

    const rarityService = new RarityService(rarityDAO);
    const rarityController = new RarityController(rarityService);

    router.get("/", rarityController.getAllRarity);
    router.get("/:id", rarityController.getRarity);
    router.post("/", rarityController.createRarity);
    router.delete("/0", rarityController.deleteRarity);
    router.put("/", rarityController.updateRarity);
    router.patch("/", rarityController.updateRarity);

    return router;
}