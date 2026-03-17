import { Router } from "express";
import { authJWT, requireRole } from "../Middleware/authMiddleware";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { BoosterModelDAO } from "../DAO/BoosterModelDAO";
import { BoosterModelService } from "../Services/BoosterModelService";
import { BoosterModelController } from "../Controllers/BoosterModelController";

export function boosterModelRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const boosterModelDAO = factoryDAO.createBoosterModelDAO();
    const boosterDAO = factoryDAO.createBoosterDAO();
    const walletDAO = factoryDAO.createWalletDAO();

    const boosterModelService = new BoosterModelService(boosterModelDAO, boosterDAO, walletDAO);
    const boosterModelController = new BoosterModelController(boosterModelService);

    router.get("/", authJWT, requireRole(["ADMIN","USER", "BOT"]), boosterModelController.getAll.bind(boosterModelController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER", "BOT"]), boosterModelController.get.bind(boosterModelController));
    router.post("/", authJWT, requireRole(["ADMIN"]), boosterModelController.create.bind(boosterModelController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), boosterModelController.delete.bind(boosterModelController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), boosterModelController.update.bind(boosterModelController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), boosterModelController.update.bind(boosterModelController));

    router.post("/buy/:id", authJWT, requireRole(["USER"]), boosterModelController.buyBooster.bind(boosterModelController));

    return router;
}