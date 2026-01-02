import { Router } from "express";

import { FactoryDAO } from "../DAO/FactoryDAO";

import { UserDAO } from "../DAO/UserDAO";
import { AuthService } from "../Services/AuthService";
import { AuthController } from "../Controllers/AuthController";

export function authRoutes(factoryDAO:FactoryDAO): Router {
    const router = Router();

    const userDAO = factoryDAO.createUserDAO();
    const authService = new AuthService(userDAO);
    const authController = new AuthController(authService);

    router.post("/login", authController.login.bind(authController));
    router.post("/register", authController.register.bind(authController))

    return router;
}