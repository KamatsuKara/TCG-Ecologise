import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { FactoryDAO } from "../DAO/FactoryDAO";

import { RarityDAO } from "../DAO/RarityDAO";
import { RarityService } from "../Services/RarityService";
import { RarityController } from "../Controllers/RarityController";

export function rarityRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const rarityDAO = factoryDAO.createRarityDAO();
    const rarityService = new RarityService(rarityDAO);
    const rarityController = new RarityController(rarityService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), rarityController.getAll.bind(rarityController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), rarityController.get.bind(rarityController));
    router.post("/", authJWT, requireRole(["ADMIN"]), rarityController.create.bind(rarityController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), rarityController.delete.bind(rarityController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), rarityController.update.bind(rarityController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), rarityController.update.bind(rarityController));

    return router;
}