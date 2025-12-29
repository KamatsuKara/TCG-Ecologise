import { Router } from "express";
import { authJWT, requireRole } from "../authMiddleware"

import { RarityDAO } from "../DAO/RarityDAO";
import { RarityService } from "../Services/RarityService";
import { RarityController } from "../Controllers/RarityController";

export function rarityRoutes(rarityDAO:RarityDAO): Router {
    const router = Router();

    const rarityService = new RarityService(rarityDAO);
    const rarityController = new RarityController(rarityService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), rarityController.getAll);
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), rarityController.get);
    router.post("/", authJWT, requireRole(["ADMIN","USER"]), rarityController.create);
    router.delete("/id", authJWT, requireRole(["ADMIN","USER"]), rarityController.delete);
    router.put("/:id", authJWT, requireRole(["ADMIN","USER"]), rarityController.update);
    router.patch("/:id", authJWT, requireRole(["ADMIN","USER"]), rarityController.update);

    return router;
}