import { Router } from "express";

import { UserDAO } from "../DAO/UserDAO";
import { AuthService } from "../Services/AuthService";
import { AuthController } from "../Controllers/AuthController";

export function authRoutes(UserDAO:UserDAO): Router {
    const router = Router();

    const authService = new AuthService(UserDAO);
    const authController = new AuthController(authService);

    router.post("/login", authController.login);

    return router;
}