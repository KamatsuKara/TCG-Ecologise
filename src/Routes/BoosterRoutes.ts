import { Router } from "express";
import { authJWT, requireRole } from "../Middleware/authMiddleware";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { BoosterDAO } from "../DAO/BoosterDAO";
import { BoosterService } from "../Services/BoosterService";
import { BoosterController } from "../Controllers/BoosterController";

export function boosterRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const boosterDAO = factoryDAO.createBoosterDAO();
    const boosterService = new BoosterService(boosterDAO);
    const boosterController = new BoosterController(boosterService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), boosterController.getAll.bind(boosterController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), boosterController.get.bind(boosterController));
    router.post("/", authJWT, requireRole(["ADMIN"]), boosterController.create.bind(boosterController));
    router.delete("/id", authJWT, requireRole(["ADMIN"]), boosterController.delete.bind(boosterController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), boosterController.update.bind(boosterController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), boosterController.update.bind(boosterController));

    return router;
}