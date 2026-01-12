import { Router } from "express";
import { authJWT, requireRole } from "../Middleware/authMiddleware"

import { FactoryDAO } from "../DAO/FactoryDAO";

import { UserDAO } from "../DAO/UserDAO";
import { UserService } from "../Services/UserService";
import { UserController } from "../Controllers/UserController";

import { CardDAO } from "../DAO/CardDAO";
import { CardService } from "../Services/CardService";
import { CardController } from "../Controllers/CardController";

import { BoosterDAO } from "../DAO/BoosterDAO";
import { BoosterService } from "../Services/BoosterService";
import { BoosterController } from "../Controllers/BoosterController";

export function userRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const userDAO = factoryDAO.createUserDAO();
    const userService = new UserService(userDAO);
    const userController = new UserController(userService);

    const cardDAO = factoryDAO.createCardDAO();
    const cardService = new CardService(cardDAO);
    const cardController = new CardController(cardService);

    const boosterDAO = factoryDAO.createBoosterDAO();
    const boosterService = new BoosterService(boosterDAO);
    const boosterController = new BoosterController(boosterService);

    router.get("/", authJWT, requireRole(["ADMIN", "BOT"]), userController.getAll.bind(userController));
    router.get("/:id", authJWT, requireRole(["ADMIN", "BOT"]), userController.get.bind(userController));
    router.post("/", authJWT, requireRole(["ADMIN", "BOT"]), userController.create.bind(userController));
    router.delete("/:id", authJWT, requireRole(["ADMIN"]), userController.delete.bind(userController));
    router.put("/:id", authJWT, requireRole(["ADMIN", "BOT"]), userController.update.bind(userController));
    router.patch("/:id", authJWT, requireRole(["ADMIN", "BOT"]), userController.update.bind(userController));

    router.get("/:id/cards", authJWT, requireRole(["ADMIN", "BOT"]), cardController.getByUser.bind(cardController));
    router.get("/:id/boosters", authJWT, requireRole(["ADMIN", "BOT"]), boosterController.getByUser.bind(boosterController));

    router.get("/me", authJWT, requireRole(["ADMIN","USER"]), userController.getMe.bind(userController));
    router.put("/me", authJWT, requireRole(["ADMIN","USER"]), userController.updateMe.bind(userController));
    router.patch("/me", authJWT, requireRole(["ADMIN","USER"]), userController.updateMe.bind(userController));

    router.get("/me/cards", authJWT, requireRole(["ADMIN","USER"]), cardController.getByMe.bind(cardController));

    return router;
}