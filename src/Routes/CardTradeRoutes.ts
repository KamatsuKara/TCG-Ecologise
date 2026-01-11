import { Router } from "express";
import { authJWT, requireRole } from "../Middleware/authMiddleware";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { CardTradeDAO } from "../DAO/CardTradeDAO";
import { CardTradeService } from "../Services/CardTradeService";
import { CardTradeController } from "../Controllers/CardTradeController";

export function cardTradeRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const cardTradeDAO = factoryDAO.createCardTradeDAO();
    const cardTradeService = new CardTradeService(cardTradeDAO);
    const cardTradeController = new CardTradeController(cardTradeService);

    router.get("/", authJWT, requireRole(["ADMIN","USER"]), cardTradeController.getAll.bind(cardTradeController));
    router.get("/:id", authJWT, requireRole(["ADMIN","USER"]), cardTradeController.get.bind(cardTradeController));
    router.post("/", authJWT, requireRole(["ADMIN"]), cardTradeController.create.bind(cardTradeController));
    router.delete("/id", authJWT, requireRole(["ADMIN"]), cardTradeController.delete.bind(cardTradeController));
    router.put("/:id", authJWT, requireRole(["ADMIN"]), cardTradeController.update.bind(cardTradeController));
    router.patch("/:id", authJWT, requireRole(["ADMIN"]), cardTradeController.update.bind(cardTradeController));

    return router;
}