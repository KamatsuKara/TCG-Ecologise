import { Router } from "express";
import { authJWT, requireRole } from "../Middleware/authMiddleware";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { TradeDAO } from "../DAO/TradeDAO";
import { TradeService } from "../Services/TradeService";
import { TradeController } from "../Controllers/TradeController";

export function tradeRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const tradeDAO = factoryDAO.createTradeDAO();
    const tradeService = new TradeService(tradeDAO);
    const tradeController = new TradeController(tradeService);

    router.get("/", authJWT, requireRole(["ADMIN"]), tradeController.getAll.bind(tradeController));
    router.get("/:id", authJWT, requireRole(["ADMIN"]), tradeController.get.bind(tradeController));
    router.post("/", authJWT, requireRole(["ADMIN"]), tradeController.create.bind(tradeController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), tradeController.delete.bind(tradeController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), tradeController.update.bind(tradeController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), tradeController.update.bind(tradeController));

    return router;
}