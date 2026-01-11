import { Router } from "express";
import { authJWT, requireRole } from "../Middleware/authMiddleware";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { BoosterDropRateDAO } from "../DAO/BoosterDropRateDAO";
import { BoosterDropRateService } from "../Services/BoosterDropRateService";
import { BoosterDropRateController } from "../Controllers/BoosterDropRateController";

export function boosterDropRateRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const boosterDropRateDAO = factoryDAO.createBoosterDropRateDAO();
    const boosterDropRateService = new BoosterDropRateService(boosterDropRateDAO);
    const boosterDropRateController = new BoosterDropRateController(boosterDropRateService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), boosterDropRateController.getAll.bind(boosterDropRateController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), boosterDropRateController.get.bind(boosterDropRateController));
    router.post("/", authJWT, requireRole(["ADMIN"]), boosterDropRateController.create.bind(boosterDropRateController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), boosterDropRateController.delete.bind(boosterDropRateController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), boosterDropRateController.update.bind(boosterDropRateController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), boosterDropRateController.update.bind(boosterDropRateController));

    return router;
}